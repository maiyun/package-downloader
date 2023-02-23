import * as cmd from 'commander';
import * as https from 'https';
import * as fs from 'fs';
import * as tar from 'tar';
import * as terser from 'terser';
import * as cleancss from 'clean-css';
const cs = new cleancss.default();

async function build(path: string): Promise<void> {
    const list = await fs.promises.readdir(path);
    for (const item of list) {
        const stat = await fs.promises.lstat(path + '/' + item);
        if (stat.isDirectory()) {
            await build(path + '/' + item);
            continue;
        }
        if (item.endsWith('.min.js') || item.endsWith('.min.css')) {
            continue;
        }
        if (item.endsWith('.js')) {
            const minName = item.slice(0, -2) + 'min.js';
            try {
                await fs.promises.lstat(path + '/' + minName);
                continue;
            }
            catch {
                // --- 继续 ---
            }
            const buf = await fs.promises.readFile(path + '/' + item);
            const rtn = await terser.minify(buf.toString());
            await fs.promises.writeFile(path + '/' + minName, rtn.code ? '/*Minified by MAIYUN.NET using terser*/' + rtn.code : '');
            console.log('Build ' + path + '/' + minName + ' successful.');
            continue;
        }
        if (item.endsWith('.css')) {
            const minName = item.slice(0, -3) + 'min.css';
            try {
                await fs.promises.lstat(path + '/' + minName);
                continue;
            }
            catch {
                // --- 继续 ---
            }
            const buf = await fs.promises.readFile(path + '/' + item);
            const rtn = cs.minify(buf.toString());
            await fs.promises.writeFile(path + '/' + minName, rtn.styles ? '/*Minified by MAIYUN.NET using terser*/' + rtn.styles : '');
            console.log('Build ' + path + '/' + minName + ' successful.');
            continue;
        }
    }
}

const program = new cmd.Command();

program
    .name('package-downloader')
    .description('Download the specified NPM package to your local directory, preserving the original file structure. A compressed version of the CSS and JS files will be automatically generated.')
    .version('0.0.1', '-v, --version');

// --- 下载包 ---
program
    .command('download')
    .description('download one or more packages, separated by spaces')
    .aliases(['dl', 'down'])
    .argument('<pkgs...>')
    .action(async function(pkgs: string[]) {
        for (const pkg of pkgs) {
            const sp = pkg.lastIndexOf('@');
            if (sp <= 0) {
                console.log(pkg + ' do not have @version.');
                continue;
            }
            /** --- 完整包名（含组织名） */
            const full = pkg.slice(0, sp);
            const psp = pkg.indexOf('/');
            /** --- 仅包名 --- */
            const name = psp === -1 ? full : full.slice(psp + 1);
            /** --- 包版本 --- */
            const ver = pkg.slice(sp + 1);
            /** --- 下载的 url --- */
            const url = 'https://registry.npmjs.org/' + full + '/-/' + name + '-' + ver + '.tgz';
            console.log('Downloading ' + url + ' ...');
            try {
                await fs.promises.mkdir('npm/' + pkg + '/', {
                    'recursive': true
                });
            }
            catch (e) {
                console.log('mkdir error', e);
            }
            await new Promise<void>((resolve) => {
                const ws = fs.createWriteStream('npm/' + name + '.tgz');
                https.get(url, (response) => {
                    const totalLength = parseInt(response.headers['content-length'] ?? '0', 10);
                    let downloadedLength = 0;
                    response.on('data', (chunk) => {
                        downloadedLength += chunk.length;
                        const percent = Math.round((downloadedLength / totalLength) * 100);
                        process.stdout.write(`${percent}%\r`);
                    });
                    response.pipe(ws);
                    ws.on('finish', () => {
                        ws.close();
                        console.log(`File ${name}.tgz downloaded to the npm directory.`);
                        // --- 开始解压 ---
                        console.log('Extracting...');
                        fs.createReadStream('npm/' + name + '.tgz').pipe(tar.x({
                            'strip': 1,
                            'cwd': 'npm/' + pkg + '/'
                        })).on('finish', async () => {
                            console.log(`File ${name}.tgz done.`);
                            // --- 删除 tgz 文件 ---
                            fs.unlink('npm/' + name + '.tgz', () => {
                                console.log('Unlink ' + name + '.tgz successful.');
                            });
                            // --- 生成 JS 和 CSS 的 min 版本 ---
                            await build('npm/' + pkg);
                            resolve();
                        }).on('error', () => {
                            console.log(`File ${name}.tgz error.`);
                            resolve();
                        });
                    });
                }).on('error', (error) => {
                    fs.unlink('npm/' + name + '.tgz', () => {
                        console.error(`Error downloading file: ${error}`);
                    });
                    resolve();
                });
            });
            console.log('Package ' + pkg + ' successful.');
        }
        console.log('All successful!');
    });

program.parse();

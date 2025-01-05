/**
 * Project: package-downloader, User: JianSuoQiYue
 * Date: 2023-2-23 17:39:32
 */

// npm publish --tag dev --access public

/**
 * --- clickgo 常用的本地库 ---
 * pkgdl dl whatwg-fetch@3.0.0 @litert/loader@3.4.9 clickgo@3.2.6 vue@3.2.47 @juggle/resize-observer@3.4.0 jszip@3.10.0 monaco-editor@0.34.1
 */

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
            await fs.promises.writeFile(path + '/' + minName, rtn.styles ? '/*Minified by MAIYUN.NET using clean-css*/' + rtn.styles : '');
            console.log('Build ' + path + '/' + minName + ' successful.');
            continue;
        }
    }
}

const program = new cmd.Command();

program
    .name('package-downloader')
    .description('Download the specified NPM package to your local directory, preserving the original file structure. A compressed version of the CSS and JS files will be automatically generated.')
    .version('0.2.2', '-v, --version');

// --- 下载包 ---
program
    .option('-p, --path <path>', 'generated path')
    .option('-l, --location <location>', 'mirror location')
    .argument('<pkgs...>')
    .action(async function(pkgs: string[]) {
        const opts = program.opts();
        /** --- 前置目录 --- */
        let prePath = '';
        if (opts.path) {
            prePath = opts.path;
            if (!prePath.endsWith('/')) {
                prePath += '/';
            }
        }
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
            const url = (opts.location === 'cn' ? 'https://registry.npmmirror.com/' : 'https://registry.npmjs.org/') + full + '/-/' + name + '-' + ver + '.tgz';
            console.log('Downloading ' + url + ' ...');
            try {
                await fs.promises.mkdir(prePath + 'npm/' + pkg + '/', {
                    'recursive': true
                });
            }
            catch (e) {
                console.log('mkdir error', e);
            }
            await new Promise<void>((resolve) => {
                const ws = fs.createWriteStream(prePath + 'npm/' + name + '.tgz');
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
                        fs.createReadStream(prePath + 'npm/' + name + '.tgz').pipe(tar.x({
                            'strip': 1,
                            'cwd': prePath + 'npm/' + pkg + '/'
                        })).on('finish', () => {
                            console.log(`File ${name}.tgz done.`);
                            // --- 删除 tgz 文件 ---
                            fs.unlink(prePath + 'npm/' + name + '.tgz', () => {
                                console.log('Unlink ' + name + '.tgz successful.');
                            });
                            // --- 生成 JS 和 CSS 的 min 版本 ---
                            build(prePath + 'npm/' + pkg).then(() => {
                                resolve();
                            }).catch(() => {
                                resolve();
                            });
                        }).on('error', () => {
                            console.log(`File ${name}.tgz error.`);
                            resolve();
                        });
                    });
                }).on('error', (error) => {
                    fs.unlink(prePath + 'npm/' + name + '.tgz', () => {
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

# Package Downloader

<p align="center">
    <a href="https://github.com/maiyun/package-downloader/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/maiyun/package-downloader?color=blue" />
    </a>
    <a href="https://www.npmjs.com/package/package-downloader">
        <img alt="NPM stable version" src="https://img.shields.io/npm/v/package-downloader?color=brightgreen&logo=npm" />
        <img alt="NPM beta version" src="https://img.shields.io/npm/v/package-downloader/beta?color=yellowgreen&logo=npm" />
        <img alt="NPM development version" src="https://img.shields.io/npm/v/package-downloader/dev?color=yellow&logo=npm" />
    </a><br>
    <a href="https://github.com/maiyun/package-downloader/releases">
        <img alt="GitHub releases" src="https://img.shields.io/github/v/release/maiyun/package-downloader?color=brightgreen&logo=github" />
        <img alt="GitHub pre-releases" src="https://img.shields.io/github/v/release/maiyun/package-downloader?color=yellow&logo=github&include_prereleases" />
    </a>
    <a href="https://github.com/maiyun/package-downloader/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/maiyun/package-downloader?color=blue&logo=github" />
    </a>
</p>

Download the specified NPM package to your local directory, preserving the original file structure. A compressed version of the CSS and JS files will be automatically generated.

## Languages

[简体中文](doc/README.sc.md) | [繁體中文](doc/README.tc.md) | [日本語](doc/README.ja.md) | [한국어](doc/README.ko.md)

## Installation

You can install it directly through the npm command.

```sh
$ npm i package-downloader -g
```

Or install the latest development version to experience the latest features.

```sh
$ npm i package-downloader@dev -g
```

## Usage

After installation, you can use the pkgdl command directly in the current directory. For example, execute the following command:

```sh
$ pkgdl download @litert/loader@3.4.9
```

After execution, an npm folder will be generated in the current directory, which will contain version 3.4.9 of the loader library.

### Download multiple libraries at once

Just add a space between the libraries to download multiple libraries at the same time, for example:

```sh
$ pkgdl dl @litert/loader@3.4.9 clickgo@3.2.6
```

## License

This library is published under [Apache-2.0](./LICENSE) license.
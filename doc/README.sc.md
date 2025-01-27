# Package Downloader

<p align="center">
    <a href="https://github.com/maiyun/package-downloader/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/maiyun/package-downloader?color=blue" />
    </a>
    <a href="https://www.npmjs.com/package/package-downloader">
        <img alt="NPM stable version" src="https://img.shields.io/npm/v/package-downloader?color=brightgreen&logo=npm" />
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

下载 NPM 包的文件到本地文件夹，保持包内原有的目录结构。如果包含 css 和 js 文件的话则会自动生成一个 min 的压缩版。

## 安装

你可以直接通过 npm 命令进行安装。

```sh
$ npm i package-downloader -g
```

或者安装最新的开发版来体验最新的功能。

```sh
$ npm i package-downloader@dev -g
```

## 使用

安装后，直接在当前目录使用命令 `pkgdl` 即可，例如执行以下命令：

```sh
$ pkgdl @litert/loader@3.4.9
```

执行后，当前目录将生成一个 npm 文件夹，其中就会包含 loader 库的 3.4.9 的版本。

### 一次性下载多个库

只需要在库中间加入空格，即可同时下载多个库，例如：

```sh
$ pkgdl @litert/loader@3.4.9 clickgo@3.2.6
```

### 下载到指定文件夹

使用 -p 或 --path 参数指定目录，例如：

```sh
$ pkgdl -p sub @litert/loader@3.4.9 clickgo@3.2.6
```

以上会在当前文件夹自动生成 sub 文件夹，并在 sub 文件夹中生成 npm 文件夹。

### 中国大陆镜像

如果你在中国大陆地区使用，可以使用 -l 或 --location 参数，后面跟随 cn，即可下载中国大陆的镜像包，例如：

```sh
$ pkgdl -l cn @litert/loader@3.4.9 clickgo@3.2.6
```

## 许可

本库使用 [Apache-2.0](../LICENSE) 许可。
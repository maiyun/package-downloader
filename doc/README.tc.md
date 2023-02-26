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

下載 NPM 包的檔案到本地資料夾，保持包內原有的目錄結構。 如果包含 css 和 js 檔的話則會自動生成一個 min 的壓縮版。

## 安裝

你可以直接透過 npm 命令進行安裝。

```sh
$ npm i package-downloader -g
```

或者安裝最新的開發版來體驗最新的功能。

```sh
$ npm i package-downloader@dev -g
```

## 使用

安裝后，直接在當前目錄使用命令 `pkgdl` 即可，例如執行以下命令：

```sh
$ pkgdl @litert/loader@3.4.9
```

執行后，當前目錄將生成一個 npm 資料夾，其中就會包含 loader 庫的 3.4.9 的版本。

### 一次性下載多個庫

只需要在庫中間加入空格，即可同時下載多個庫，例如：

```sh
$ pkgdl @litert/loader@3.4.9 clickgo@3.2.6
```

### 下載到指定資料夾

使用 -p 或 --path 參數指定目錄，例如：

```sh
$ pkgdl -p sub @litert/loader@3.4.9 clickgo@3.2.6
```

以上會在當前資料夾自動生成 sub 資料夾，並在 sub 資料夾中生成 npm 資料夾。

## 許可

本庫使用 [Apache-2.0](../LICENSE) 許可。
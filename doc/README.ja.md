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

ローカルフォルダに NPM パッケージファイルをダウンロードして、パッケージ内の元のディレクトリ構造を維持します。CSS と JS ファイルが含まれている場合、圧縮された min 版が自動生成されます。

## インストール

npm コマンドを使用して直接インストールできます。

```sh
$ npm i package-downloader -g
```

または最新の開発版をインストールして、最新の機能を体験できます。

```sh
$ npm i package-downloader@dev -g
```

## 使用

インストール後、現在のディレクトリで `pkgdl` コマンドを実行するだけです。たとえば、以下のコマンドを実行します。

```sh
$ pkgdl @litert/loader@3.4.9
```

実行後、現在のディレクトリに npm フォルダが生成され、その中には loader ライブラリの3.4.9バージョンが含まれています。

### 複数のライブラリを一度にダウンロードする

ライブラリをスペースで区切って指定するだけで、複数のライブラリを同時にダウンロードできます。例えば：

```sh
$ pkgdl @litert/loader@3.4.9 clickgo@3.2.6
```

### 指定したフォルダにダウンロードする

-p または --path パラメーターを使用してディレクトリを指定してください。例：

```sh
$ pkgdl -p sub @litert/loader@3.4.9 clickgo@3.2.6
```

上記は現在のフォルダに sub フォルダを自動生成し、その中に npm フォルダを生成します。

### 中国本土ミラー

中国本土で使用する場合は、-l または --location パラメータを使用し、その後に cn を入力することで中国本土のミラーパッケージをダウンロードできます。例えば：

```sh
$ pkgdl -l cn @litert/loader@3.4.9 clickgo@3.2.6
```

## ライセンス

このライブラリは [Apache-2.0](../LICENSE) ライセンスで提供されています。
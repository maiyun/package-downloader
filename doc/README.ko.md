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

로컬 폴더로 NPM 패키지 파일을 다운로드하면 패키지의 원래 디렉토리 구조가 유지됩니다. CSS 및 JS 파일이 포함되어 있으면 압축 된 최소 버전이 자동으로 생성됩니다.

## 설치

npm 명령어를 사용하여 직접 설치할 수 있습니다.

```sh
$ npm i @litert/loader -g
```

또는 최신 개발 버전을 설치하여 최신 기능을 체험 할 수 있습니다.

```sh
$ npm i @litert/loader@dev -g
```

## 사용법

설치 후 `pkgdl` 명령어를 사용하여 현재 디렉토리에서 다음과 같이 실행하면 됩니다.

```sh
$ pkgdl download @litert/loader@3.4.9
```

실행 후, 현재 디렉토리에는 3.4.9 버전의 loader 라이브러리가 포함 된 npm 폴더가 생성됩니다.

### 여러 라이브러리를 한 번에 다운로드

공백으로 라이브러리를 구분하여 동시에 다운로드 할 수 있습니다.

```sh
$ pkgdl dl @litert/loader@3.4.9 clickgo@3.2.6
```

## 라이선스

본 라이브러리는 [Apache-2.0](../LICENSE) 라이선스를 사용합니다.
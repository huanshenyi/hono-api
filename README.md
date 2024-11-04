# hono-api

hono 検証用

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
 
To run continer:

```
docker build -t hono-api .
```

To run:
```
docker run -p 3000:3000 hono-api
```

### ログ管理

Pino

説明: 高速で効率的なログ出力を提供するライブラリ。HTTP リクエストやアプリケーションの内部イベントを追跡できます。

- 公式サイト: Pino Documentation
- 関連パッケージ: hono-pino - Hono フレームワーク用の Pino ラッパー

### HTTP リクエスト管理

Stoker

説明: Hono フレームワークでの HTTP リクエスト機能を拡張するライブラリ。

### ドキュメント:

Scalar Documentation

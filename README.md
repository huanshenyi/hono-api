# hono-api

Hono API 検証用

To install dependencies:

Create .env file

```sh
cp .env.example .env
```

Create db

```sh
make up
```

Run database migrations

```sh
bunx drizzle-kit generate
bunx drizzle-kit push
```

Install dependencies

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

To run continer:

```sh
docker build -t hono-api .
```

ecs

```sh
docker buildx build \
  --no-cache \
  --platform=linux/x86_64 \
  -t my-app-api \
  .
```

To run:

```sh
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

URL: https://github.com/scalar/scalar/tree/main/packages/hono-api-reference

### ドキュメント:

Scalar Documentation

### ORM

drizzle

- ドキュメント: https://orm.drizzle.team/

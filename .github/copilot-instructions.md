# Copilot Instructions for `woocommerce-sdk`

## Build, test, and lint commands

Use `pnpm` (CI uses pnpm + Node 20/22).

- Install dependencies: `pnpm install`
- Lint (TypeScript checks): `pnpm run lint`
- Typecheck: `pnpm run typecheck`
- Full test suite: `pnpm run test`
- Coverage: `pnpm run test:coverage`
- Build: `pnpm run build`

Single-test execution with Vitest:

- Single file: `pnpm exec vitest run src/__tests__/utils.test.ts`
- Single test name in file: `pnpm exec vitest run src/__tests__/utils.test.ts -t "normalizeUrl"`

## High-level architecture

The package is an ESM TypeScript SDK exporting a composed facade client plus per-resource clients.

- `src/index.ts` is the public entrypoint. It exports `WooCommerceClient`, individual clients, all types, errors, and shared utilities.
- `src/client/index.ts` defines `WooCommerceClient`, which instantiates one client per WooCommerce resource (`products`, `orders`, `customers`, `coupons`, `webhooks`, `variations`, `categories`, `tags`, `refunds`) with shared config.
- `src/client/base-client.ts` is the central HTTP/auth/error layer used by every resource client:
  - Builds URLs as `${baseUrl}/wp-json/${version}/${endpoint}`
  - Uses `fetch` with timeout via `AbortController`
  - Auth strategy is protocol-driven: query-string key/secret for HTTPS by default, OAuth 1.0a header signing for HTTP
  - Maps HTTP failures into typed SDK errors from `src/errors.ts`
- Resource clients in `src/client/*-client.ts` are thin wrappers over `BaseClient` (`list`, `create`, `update`, `delete*`, `batch`, helper methods like `getAll`, `findByEmail`, etc.).
- Domain model/types are split by resource in `src/types/*.ts`, then re-exported through `src/types/index.ts`.
- Shared helpers in `src/utils/index.ts` cover query encoding, URL normalization, retry/backoff, and pagination-header parsing.

## Key repository conventions

- Resource client pattern:
  - Every resource client extends `BaseClient`.
  - CRUD methods delegate directly to `super.get/post/put/delete`.
  - "Get one" and delete methods are resource-prefixed (`getProduct`, `deleteOrder`, `getCustomer`) rather than generic `get`/`delete`.
- Query parameter encoding is centralized in `buildQueryString` (`src/utils/index.ts`):
  - Arrays are encoded as `key[]=` entries.
  - Object values are JSON-stringified in query params.
- Authentication defaults are intentional (`src/client/base-client.ts`):
  - `queryStringAuth` defaults to `true` for HTTPS URLs.
  - HTTP mode initializes OAuth 1.0a HMAC-SHA256 signing.
- Error handling must preserve typed errors from `src/errors.ts`; status-specific mapping (401/403/404/400/422/429/5xx) is done in `handleErrorResponse`.
- Product bulk stock sync behavior is implemented in `ProductsClient.batchUpdate`:
  - Splits updates into batches of 100 (WooCommerce batch API limit).
  - Applies inter-batch delay from `WOOCOMMERCE_RATE_LIMIT_DELAY_MS` (default `100` ms).
- Tests rely on `global.fetch` mocking utilities in `src/__tests__/setup.ts`; tests usually capture and restore the original fetch in `beforeEach`/`afterEach`.
- Build output is declaration-friendly (`declaration: true`) and excludes tests from compilation (`tsconfig.json` excludes `src/**/__tests__` and test files).

## SDK correction context to preserve (Bsale + WooCommerce)

This project is often maintained alongside `@stockflow/bsale-sdk`. Keep these cross-SDK assumptions explicit when working on ingestion/reconciliation fixes:

- Bsale single-resource responses (`/v1/variants/:id.json`, `/v1/products/:id.json`) may be raw objects, not only wrapped envelopes.
- When Bsale SDK client parsing changes, rebuild `dist` for parity: `pnpm --filter @stockflow/bsale-sdk build`.
- Bsale document ingestion should keep on-demand variant fallback (`variants.getById`) because historical docs can reference variants missing from list endpoints.
- Bsale ID extraction may come from `id`, `href`, `id-as-href`, and querystring-suffixed forms; normalize before downstream use.
- For payload diagnostics in Bsale flows, use `BSALE_DEBUG_CAPTURE=true` and inspect `[BsaleDebugCapture]` logs.

WooCommerce verification priorities for future changes:

- Validate single-resource response shape assumptions across `get*` methods (raw object vs wrapped).
- Keep ID normalization stable at SDK boundaries (order/product/variation IDs).
- Ensure `getAll`/pagination helpers cannot silently truncate pages.
- Preserve stable date/currency typing expected by reconciliation and dashboard consumers.
- Keep error surfaces rich enough for ingestion triage (status + response body details + endpoint context).

Cross-SDK operational checklist (after SDK source edits in monorepo workflows):

- `pnpm --filter @stockflow/bsale-sdk build`
- `pnpm typecheck`
- `pnpm test`

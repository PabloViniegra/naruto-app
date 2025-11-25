# E2E Tests - Naruto Universe App

Comprehensive end-to-end tests for the Naruto Universe application using Playwright.

## Test Structure

```
e2e/
├── home.spec.ts              # Home page tests
├── navigation.spec.ts        # Navigation flow tests
├── characters.spec.ts        # Characters list page tests
├── character-detail.spec.ts  # Character detail page tests
├── clans.spec.ts            # Clans page tests
├── about.spec.ts            # About page tests
├── user-journey.spec.ts     # Complete user journey tests
└── helpers.ts               # Test utilities and helpers
```

## Running Tests

### Run all tests
```bash
pnpm test:e2e
```

### Run tests in UI mode (recommended for development)
```bash
pnpm test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
pnpm test:e2e:headed
```

### Run tests in Chromium only (faster)
```bash
pnpm test:e2e:chromium
```

### Run specific test file
```bash
pnpm playwright test e2e/home.spec.ts
```

### Run tests with specific grep pattern
```bash
pnpm playwright test --grep "search"
```

## Test Coverage

### Home Page (`home.spec.ts`)
- Hero section display
- Statistics display
- CTA button functionality
- Navigation to characters page

### Navigation (`navigation.spec.ts`)
- Navigation through all main pages
- 404 handling
- Browser back/forward navigation

### Characters Page (`characters.spec.ts`)
- Characters list display
- Search functionality
- Search input debouncing
- URL parameter updates
- Clear search button
- Pagination display and navigation

### Character Detail (`character-detail.spec.ts`)
- Character detail display
- Navigation from characters list
- Information sections
- Back navigation
- Invalid ID handling

### Clans Page (`clans.spec.ts`)
- Clans page display
- Grid layout
- Pagination

### About Page (`about.spec.ts`)
- About page display
- Content verification

### User Journey (`user-journey.spec.ts`)
- Complete flow: Home -> Explore -> Search -> View Details
- Navigation through different sections
- Pagination flow
- Search and clear flow

## Best Practices

1. **Avoid hardcoded timeouts** - Use `waitForLoadState` and `expect` with timeout options
2. **Use semantic locators** - Prefer `getByRole`, `getByPlaceholder`, etc. over CSS selectors
3. **Wait for network idle** - Use `waitForLoadState('networkidle')` for dynamic content
4. **Test behavior, not implementation** - Focus on user-facing functionality
5. **Handle optional elements** - Check if elements exist before asserting visibility

## Debugging Tests

### Debug specific test
```bash
pnpm playwright test --debug e2e/characters.spec.ts
```

### View test report
```bash
pnpm playwright show-report
```

### Generate trace
```bash
pnpm playwright test --trace on
```

## CI/CD Integration

Tests are configured to:
- Run with 2 retries on CI
- Use single worker on CI (no parallelization)
- Fail build if `test.only` is found
- Generate trace on first retry

## Configuration

Configuration is in `playwright.config.ts`:
- Base URL: `http://localhost:3000`
- Test directory: `./e2e`
- Dev server: Auto-starts with `pnpm dev`
- Browsers: Chromium, Firefox, WebKit
- Reporter: HTML report

## Notes

- Tests automatically start the dev server before running
- Server is reused if already running (development)
- Tests run in parallel by default (except on CI)
- Each test is isolated with its own browser context

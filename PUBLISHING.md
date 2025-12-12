# Publishing Guide for @mnga.toronto Packages

This guide explains how to publish the `@mnga.toronto/stencil-components` and `@mnga.toronto/react-components` packages to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **npm Login**: Run `npm login` to authenticate
3. **Organization (Optional)**: Create an organization named `mnga.toronto` on npm, or the packages will be published under your personal scope

## Package Structure

- `@mnga.toronto/stencil-components` - Base Stencil web components
- `@mnga.toronto/react-components` - React wrapper components (depends on stencil-components)

## Publishing Process

### Option 1: Manual Publishing (Step by Step)

#### 1. Publish Stencil Components First

```bash
# Navigate to stencil-components
cd packages/stencil-components

# Build the package
npm run build

# Verify the package contents
npm pack --dry-run

# Publish to npm
npm publish --access public
```

#### 2. Update React Components Dependency

After publishing stencil-components, update the version in `packages/react-components/package.json`:

```json
{
  "dependencies": {
    "@mnga.toronto/stencil-components": "^0.0.1"
  }
}
```

#### 3. Publish React Components

```bash
# Navigate to react-components
cd ../react-components

# Build the package
npm run build

# Verify the package contents
npm pack --dry-run

# Publish to npm
npm publish --access public
```

### Option 2: Using Lerna (Recommended)

Lerna can handle versioning and publishing all packages together:

```bash
# From project root

# Build all packages
lerna run build

# Publish all packages (interactive)
lerna publish

# Or publish with a specific version
lerna publish patch  # 0.0.1 -> 0.0.2
lerna publish minor  # 0.0.1 -> 0.1.0
lerna publish major  # 0.0.1 -> 1.0.0
```

Lerna will:

- Detect which packages have changed
- Update version numbers
- Update inter-package dependencies
- Create git tags
- Publish to npm

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes (1.0.0 -> 2.0.0)
- **MINOR**: New features, backwards compatible (1.0.0 -> 1.1.0)
- **PATCH**: Bug fixes, backwards compatible (1.0.0 -> 1.0.1)

## Pre-publish Checklist

- [ ] All tests pass (`npm test` in both packages)
- [ ] Code is built (`npm run build` in both packages)
- [ ] Version numbers are updated
- [ ] CHANGELOG.md is updated (if applicable)
- [ ] README.md is accurate
- [ ] `.npmignore` excludes unnecessary files
- [ ] Package.json `files` field includes only dist/

## Verifying Published Packages

After publishing, verify the packages:

```bash
# Check if packages are available
npm info @mnga.toronto/stencil-components
npm info @mnga.toronto/react-components

# Test installation in a new project
mkdir test-install
cd test-install
npm init -y
npm install @mnga.toronto/stencil-components @mnga.toronto/react-components
```

## Using the Published Packages

### In a React Project

```bash
npm install @mnga.toronto/react-components
```

```tsx
import {
  MyComponent,
  CotButton,
  CotTextbox,
} from "@mnga.toronto/react-components";

function App() {
  return (
    <div>
      <MyComponent first="John" last="Doe" />
      <CotButton>Click me</CotButton>
      <CotTextbox placeholder="Enter text" />
    </div>
  );
}
```

### Using Stencil Components Directly

```bash
npm install @mnga.toronto/stencil-components
```

```typescript
// With loader (lazy loading)
import { defineCustomElements } from "@mnga.toronto/stencil-components/loader";
defineCustomElements();

// Direct imports
import { defineCustomElement as defineCotButton } from "@mnga.toronto/stencil-components/dist/components/cot-button";
defineCotButton();
```

## Troubleshooting

### "Package not found" error

- Ensure you're logged in: `npm whoami`
- Check package visibility: packages with `@scope` need `--access public`

### Version conflicts

- Use `npm outdated` to check version mismatches
- Update dependencies: `npm update`

### Build failures

- Clear caches: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then `npm install`
- Ensure all peer dependencies are installed

## Unpublishing (Emergency Only)

If you need to unpublish a version within 72 hours:

```bash
npm unpublish @mnga.toronto/react-components@0.0.1
```

**Warning**: Unpublishing can break projects that depend on your package. Only use in emergencies.

## CI/CD Integration

For automated publishing, add to your CI pipeline:

```yaml
# Example GitHub Actions workflow
name: Publish Packages

on:
  push:
    tags:
      - "v*"

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://registry.npmjs.org"

      - run: npm install
      - run: npm run build --workspaces
      - run: npm publish --workspaces --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

# AuthApp CI/CD Pipeline

This document provides an overview of the CI/CD pipeline implemented for the **React Native Authentication App**. The pipeline is configured to automate linting, testing, and building processes for Android and iOS using **GitHub Actions**.

---

## Workflows

The pipeline consists of two main workflows:

### 1. Lint & Test

- **Trigger**: Runs on every push or pull request to any branch.
- **Tasks**:
  - Runs **ESLint** to ensure code quality.
  - Executes **Jest** tests for unit testing.

### 2. Build

- **Trigger**: Runs only on the `main` branch.
- **Tasks**:
  - **Android Build**: Generates a release APK and AAB file.
  - **iOS Build**: Builds the app for iOS simulators using Xcode.

---

## Workflow Configuration

```yaml
on:
  push:
    branches: ['**'] # Trigger on all branches
  pull_request:
    branches: [main]

jobs:
  lint-test:
    name: Lint & Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          yarn-version: '1.x'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run ESLint
        run: yarn lint

      - name: Run Jest tests
        run: yarn test

  android-build:
    name: Android Release Build
    needs: lint-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          yarn-version: '1.x'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build Android APK
        run: yarn build:android

      - name: Upload APK artifact
        uses: actions/upload-artifact@v3
        with:
          name: android-release-apk
          path: |
            android/app/build/outputs/apk/release/*.apk
            android/app/build/outputs/bundle/release/*.aab

  ios-build:
    name: iOS Simulator Build
    needs: lint-test
    if: github.ref == 'refs/heads/main'
    runs-on: macos-latest
    env:
      NODE_VERSION: 18
      XCODE_VERSION: 15.2
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          yarn-version: '1.x'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build iOS project
        run: yarn build:ios

      - name: Upload Xcode build
        uses: actions/upload-artifact@v3
        with:
          name: ios-build
          path: ios/build
```

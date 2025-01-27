# CI/CD Documentation

## Workflows

1. Lint & Test - Runs ESLint and Jest on every push
2. Build - Creates production builds for Android/iOS on main branch

## Extending

- Add Firebase distribution: Use `firebase-app-distribution` action
- Add E2E testing: Integrate Detox
- Add code signing: Configure Android Keystore and iOS Code Signing

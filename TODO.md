# TODO

## Goal: Fix VS Code activity bar logo missing

- [ ] Confirm VS Code is loading the built extension (dist folder + reload window).
- [ ] Fix build pipeline so extension build doesn’t fail (backend tsconfig include misconfigured causing `npm run build` to fail).
- [ ] After build fix, rebuild extension and reload VS Code Extension Development Host.
- [ ] Verify activity bar contribution paths:
  - [ ] `extension/assets/icon.svg` exists and is referenced by `extension/package.json`.
  - [ ] `extension/assets/icon.png` exists and is referenced by `extension/package.json`.
- [ ] If icon mismatch is the real issue (expecting MongoDB leaf): replace `extension/assets/icon.svg`/`icon.png` with provided MongoDB Thunder leaf asset and rebuild/reload.


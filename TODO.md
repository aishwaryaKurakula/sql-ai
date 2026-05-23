- [ ] Explore repo for where “failed to fetch” is generated (webview CSP / fetch URL).
- [x] Identified CSP in extension/src/sidebarProvider.js as blocker.
- [x] Implemented permanent CSP fix to allow configured sqlai.apiUrl origin.
- [x] Rebuild extension (npm run build) and reload VSCode window.
- [ ] Verify sidebar “failed to fetch” is gone and requests succeed.



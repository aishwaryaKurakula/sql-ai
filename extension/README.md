# SQL AI — Natural Language to SQL, Inside VS Code

> Write plain English. Get production-ready SQL. Without leaving your editor.

SQL AI is a VS Code extension that converts natural language prompts into SQL queries via a custom sidebar. Choose your dialect, describe what you need, and get back a query, an explanation, and performance hints — instantly.

---

## Features

- **Natural language → SQL** — describe your query in plain English
- **Multi-dialect support** — PostgreSQL, MySQL, and SQLite
- **Inline explanations** — understand what the generated query does
- **Performance hints** — optional suggestions to optimize your query
- **One-click copy** — send the SQL straight to your clipboard
- **Local history** — revisit past queries without re-typing

---

## How It Works

1. Click the **SQL AI** icon in the VS Code activity bar
2. Type a plain-English prompt — e.g. *"Show the top 5 customers by revenue this month"*
3. Select your SQL dialect
4. Hit **Generate**
5. Review the SQL, explanation, and any performance hints
6. Copy the result or pull it from History later

---

## Demo

```
Prompt:   "Show all users who signed up in the last 30 days and haven't placed an order"

SQL:      SELECT u.*
          FROM users u
          LEFT JOIN orders o ON o.user_id = u.id
          WHERE u.created_at >= NOW() - INTERVAL '30 days'
            AND o.id IS NULL;

Hint:     Consider adding an index on users.created_at for large tables.
```

---

## Requirements

- VS Code `1.85.0` or later
- A running SQL AI backend (default: `http://localhost:3000`)
- A valid JWT token stored in the webview's `localStorage` under `sqlai_token`

---

## Getting Started (Local Dev)

**1. Clone the repo and install dependencies**

```bash
git clone https://github.com/aishwaryaKurakula/sql-ai.git
cd sql-ai
npm install
```

**2. Start the backend**

```bash
npm run dev:backend
```

**3. Build the extension**

```bash
npm --workspace=extension run build
```

**4. Launch in VS Code**

- Open the repo in VS Code
- Press `F5` to launch an Extension Development Host
- Click the **SQL AI** icon in the activity bar

For watch mode during development:

```bash
npm run dev:extension
```

---

## Available Command

| Command | Description |
|---|---|
| `SQL AI: Open` | Focus the SQL AI sidebar |

---

## Current Limitations

- No built-in login flow — requires a valid JWT token to already be present
- Backend URL is hardcoded; no settings UI yet to change it
- Query history is local to the webview, not synced from the backend
- Schema auto-detection is in the codebase but not yet wired into the sidebar

---

## Roadmap

- [ ] Auth flow directly inside the extension
- [ ] Configurable backend URL via VS Code settings (`sqlai.apiUrl`)
- [ ] Auto-detect SQL dialect from workspace `.env` files
- [ ] Send schema context with prompts for more accurate generation
- [ ] Sync history with the backend

---

## Extension Info

| | |
|---|---|
| Publisher | `aishwaryaKurakula` |
| Extension ID | `sqlai` |
| VS Code version | `^1.85.0` |
| Marketplace | [View on VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=aishwaryaKurakula.sqlai) |

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

## License

MIT
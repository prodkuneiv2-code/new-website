# RaydeeSolar Admin Panel

## Login Credentials
- **Username:** `admin`
- **Password:** `raydeesolar`

## Features
1. **Dashboard** — Summary cards + recent activity
2. **Products** — CRUD for shop products (localStorage: `solar_products`)
3. **Orders** — View/filter/update order status (localStorage: `solar_orders`)
4. **Quotes** — Manage quote requests with notes (localStorage: `solar_quotes`)
5. **Messages** — Contact form inbox (localStorage: `solar_messages`)

## Data Storage
All data is stored in `localStorage`. Keys:
- `solar_products` — Product catalog
- `solar_orders` — Customer orders
- `solar_quotes` — Quote/consultation requests
- `solar_messages` — Contact form messages
- `solar_admin_session` — Auth session token

## How to Use
1. Open `/admin/index.html` in a browser
2. Login with the credentials above
3. Use the sidebar to navigate between sections
4. First load seeds demo data for testing

## Notes
- Admin credentials are hardcoded in the config object inside `index.html`
- To change credentials, edit the `ADMIN_CONFIG` object
- Session persists until logout or browser data is cleared

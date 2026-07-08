# AdVantage — Vanilla HTML/CSS/JS Frontend

Converted from the React (Vite) frontend. Spring Boot backend, API endpoints,
request/response JSON, and JWT auth flow are **unchanged**.

## How to run

Because this uses ES modules (`import`/`export`), you must serve it over
HTTP — opening `index.html` directly via `file://` will fail due to CORS
module-loading restrictions.

From this folder, run any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 5500
```

Then open `http://localhost:5500` (or whatever port your server prints).

Your Spring Boot backend must still be running on `http://localhost:8080`
(same `baseURL` as the original `axios` instance).

## Page map (React Router → HTML page)

| React route              | HTML file               |
|---------------------------|--------------------------|
| `/`                        | `index.html` (Login)     |
| `/dashboard`                | `dashboard.html`         |
| `/campaigns`                 | `campaigns.html`          |
| `/create-campaign`            | `create-campaign.html`     |
| `/edit-campaign/:id`           | `edit-campaign.html?id=X`  |
| `/manager-campaigns`             | `manager-campaigns.html`    |
| `/roi`                             | `roi.html`                   |
| `/audience`                          | `audience.html`                |

## What changed structurally (not behaviorally)

- React Router → plain `<a href="...">` links / `window.location.href`
- `useState`/JSX rendering → direct DOM manipulation (`innerHTML` + event listeners)
- `axios` instance → `fetch`-based `js/api.js`, which mirrors the same
  `{ data }` / `error.response.data` shape so all page logic ports 1:1
- `ProtectedRoute.jsx` → `js/utils/authGuard.js` (`requireAuth()`), called at
  the top of every protected page
- `<Navbar />` component → `js/components/navbar.js`, injected into a
  `<div id="navbar-root"></div>` on each page that had it in React

Note: `ManagerCampaigns.jsx` in the original project does **not** render
`<Navbar />` — `manager-campaigns.html` intentionally has no navbar either,
to match that exactly (not a bug I introduced).

`CampaignModal.jsx` was unused/unimported anywhere in the original React
project. It's ported to `js/components/campaignModal.js` for parity but is
likewise not wired into any page, matching the original.

## localStorage keys (unchanged)

- `token` — JWT
- `role` — `ADMANAGER` / `CLIENT` / `AUDIENCE`
- `user` — `{ username, role }`

## API base URL (unchanged)

```
http://localhost:8080/api
```

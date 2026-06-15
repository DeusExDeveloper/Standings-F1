# WSS Standings Board

A shared Assetto Corsa championship standings board.
**Anyone can view it. Only people with the editor password can change it.**

## What's inside
- `public/index.html` — the board (the page everyone sees)
- `netlify/functions/standings.js` — reads/saves the data
- the data itself lives in **Netlify Blobs** (built in — nothing to set up)
- the editor password lives in a **Netlify environment variable** — never in the page

## Deploy it (one time, ~5 minutes)

1. Put this folder in a **GitHub repo** (you already use GitHub).
2. On **netlify.com** → *Add new site* → *Import from Git* → pick the repo.
   Leave the build settings as they are and deploy. Netlify reads `netlify.toml`
   and installs the function's dependency automatically.
3. Set the password: in Netlify go to
   **Site configuration → Environment variables → Add a variable**
   - Key: `EDIT_PASSWORD`
   - Value: whatever you want (share it only with the people allowed to edit)
4. **Redeploy** once after adding the variable (Deploys → Trigger deploy),
   so the function picks it up.

That's it. Your site URL shows the board to everyone. Click **Unlock editing**,
type the password, add rounds, enter points, hit **Save changes** — and it's
live for all viewers.

## Notes
- Don't open `index.html` straight from your computer — the data only loads when
  it's running on Netlify (that's where the function lives).
- To change the password later, edit `EDIT_PASSWORD` and redeploy.
- Last save wins. If two editors work at once, hit **Refresh** before editing.
- Want your own domain (like you did before)? Add it in Netlify → Domain settings.

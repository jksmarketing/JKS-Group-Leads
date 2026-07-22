# JKS Group Leads PWA

A small installable PWA that embeds the official JKS monday.com lead form. The wrapper does not store or process submitted lead data.

## Configure the monday form

Recommended: set this Cloudflare Pages build environment variable:

```text
VITE_FORM_URL=<iframe src="https://forms.monday.com/forms/embed/e72857ae9227d7f23bf3c445252a7de5?r=euc1" width="650" height="500" style="border: 0; box-shadow: 5px 5px 56px 0px rgba(0,0,0,0.25);"></iframe>
```

Alternatively, replace the placeholder in `src/App.tsx`.

## Deploy with GitHub and Cloudflare Pages

1. Create a new GitHub repository, for example `jks-group-leads`.
2. Upload all files from this package to the repository root.
3. In Cloudflare Pages, create a project from that repository.
4. Build command: `npm run build`
5. Build output directory: `dist`
6. Add `VITE_FORM_URL` under build environment variables.
7. Deploy.

Suggested production domain: `leads.jks.ch`.

## Install on a phone

- iPhone/iPad: open the site in Safari → Share → Add to Home Screen.
- Android/Chrome: open the site → browser menu → Install app.

## Notes

The monday form is embedded in an iframe. Some form settings or browser policies may prevent embedding. The Settings page includes an “Open form directly” fallback.

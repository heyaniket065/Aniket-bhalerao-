# Aniket-bhalerao-

## Nexora AI workspace

A responsive, static AI-workspace interface.

### Run locally

```bash
npm run build
npm start -- --directory dist
```

Open `http://localhost:4173` in your browser.

### Publish on GitHub Pages

The included GitHub Actions workflow deploys the site whenever the `work` branch is pushed.

1. Push this branch to GitHub.
2. In the GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab and wait for **Deploy GitHub Pages** to finish successfully.
5. Use the URL shown in the completed workflow. For a project repository it is normally `https://<username>.github.io/Aniket-bhalerao-/`.

The app uses relative asset URLs, so it will load correctly from the repository subpath used by GitHub Pages.

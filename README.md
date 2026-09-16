# Nexora AI workspace

Nexora is a responsive static AI-workspace interface. The application is organized into focused modules for state, rendering, chat, model selection, settings, attachments, voice input, and service adapters.

## Local development

```bash
npm run validate
npm start -- --directory dist
```

Open `http://localhost:4173` after starting the server. `npm run build` copies the static entrypoint and `src/` modules into `dist/`; it does not bundle or transform source files.

### Available scripts

- `npm run lint` validates syntax for every JavaScript module and checks required browser assets.
- `npm run format` verifies repository formatting basics, including the organized stylesheet.
- `npm run build` produces a clean static `dist/` directory.
- `npm run validate` runs linting, formatting checks, and the production build in order.

## Service configuration

The browser reads optional runtime configuration from `window.NEXORA_CONFIG` before the app loads. Define it in a small script before `src/main.js` in `index.html`, or inject it with your deployment template:

```html
<script>
  window.NEXORA_CONFIG = {
    mockMode: false,
    endpoint: 'https://your-server.example/api/kie',
    apiKey: ''
  }
</script>
```

`endpoint` should normally point to **your server-side proxy**, not directly to a Kie.ai endpoint. Do not publish a Kie.ai API key in this static client: any value shipped to a browser can be extracted by visitors. The Kie adapter sends `{ message, model }` as JSON and accepts the proxy's JSON response.

## Mock mode

Mock mode is enabled by default, so the demo works with no service configuration and does not make network requests. The **Settings** menu can enable or disable mock responses; this preference is stored in `localStorage` under `nexora.mock-mode`.

When mock mode is disabled, set `NEXORA_CONFIG.endpoint`. Otherwise the chat composer reports a configuration error rather than silently sending data to an unknown destination.

## Browser permissions

Voice mode requests microphone access through `navigator.mediaDevices.getUserMedia({ audio: true })`. Browsers require a secure context (HTTPS, or `localhost` during development) and an explicit user gesture. Users can deny or revoke microphone access in browser site settings; in that case voice mode remains unavailable and the app displays a permission notice. Attachments use the standard file picker and only become selected locally; this demo does not upload them.

## Deployment to GitHub Pages

The included GitHub Actions workflow deploys the site whenever the `work` branch is pushed.

1. Push this branch to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Wait for **Deploy GitHub Pages** to complete in the **Actions** tab.
5. Open the URL reported by that workflow. For a project repository it is normally `https://<username>.github.io/Aniket-bhalerao-/`.

The page loads scripts with relative URLs, so it works from a GitHub Pages project subpath. GitHub Pages serves a static build only: it cannot safely host a Kie.ai secret or act as the protected API proxy described above. Deploy the proxy separately and configure its public endpoint at build or page-template time.

// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { generateStaticHtml } from "./src/lib/generate-static-html";

// Desabilitamos o prerender porque o servidor Cloudflare não roda em Node.js
// durante o build. Em vez disso, usamos um plugin que gera index.html estático
// a partir dos assets do build do cliente.
export default defineConfig({
  plugins: [generateStaticHtml()],
  tanstackStart: {
    client: { entry: "client" },
    server: { entry: "server" },
    prerender: {
      enabled: false,
    },
  },
});

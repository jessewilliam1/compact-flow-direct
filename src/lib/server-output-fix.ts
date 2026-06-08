import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Nitro with the cloudflare-module preset outputs `dist/server/index.mjs`,
 * but TanStack Start's preview-server-plugin hardcodes `dist/server/server.js`
 * when it starts the prerender server.
 *
 * Additionally, the Cloudflare Worker handler crashes during prerender
 * because the preview plugin calls `.fetch(request)` without passing `env`,
 * causing `env.ASSETS` to throw a TypeError.
 *
 * This plugin writes a wrapper that:
 * 1. Re-exports the Cloudflare module
 * 2. Intercepts `.fetch()` to provide an empty `env` / `context` fallback
 */
export function serverOutputFix(): Plugin {
  return {
    name: "server-output-fix",
    apply: "build",
    buildApp: {
      order: "post",
      async handler() {
        const serverDir = path.resolve("dist/server");
        const indexMjs = path.join(serverDir, "index.mjs");
        const serverJs = path.join(serverDir, "server.js");
        if (fs.existsSync(indexMjs)) {
          fs.writeFileSync(
            serverJs,
            `import original from './index.mjs';\nexport default {\n  ...original,\n  fetch(request, env, context) {\n    return original.fetch(request, env ?? {}, context ?? {});\n  }\n};\n`,
            "utf-8"
          );
        }
      },
    },
  };
}

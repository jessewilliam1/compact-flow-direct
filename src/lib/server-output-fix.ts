import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Nitro with the cloudflare-module preset outputs `dist/server/index.mjs`,
 * but TanStack Start's preview-server-plugin hardcodes `dist/server/server.js`
 * when it starts the prerender server.
 *
 * We hook into `buildApp` (order: "post") so this runs after Nitro has
 * finalized `dist/server/index.mjs` but before prerender starts.
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
        if (fs.existsSync(indexMjs) && !fs.existsSync(serverJs)) {
          fs.writeFileSync(
            serverJs,
            'export { default } from "./index.mjs";\n',
            "utf-8"
          );
        }
      },
    },
  };
}

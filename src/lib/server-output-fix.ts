import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Nitro with the cloudflare-module preset outputs `dist/server/index.mjs`,
 * but TanStack Start's preview-server-plugin hardcodes `dist/server/server.js`
 * when it starts the prerender server. This plugin writes a tiny ESM re-export
 * wrapper so the prerender step can find the server entry it expects.
 */
export function serverOutputFix(): Plugin {
  return {
    name: "server-output-fix",
    apply: "build",
    writeBundle(options) {
      const dir =
        typeof options.dir === "string" ? options.dir : undefined;
      if (!dir || !dir.endsWith(path.join("dist", "server"))) {
        return;
      }
      const wrapperPath = path.join(dir, "server.js");
      fs.writeFileSync(
        wrapperPath,
        "export { default } from './index.mjs';\n",
        "utf-8"
      );
    },
  };
}

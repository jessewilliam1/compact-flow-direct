import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

export function serverOutputFix(): Plugin {
  return {
    name: "server-output-fix",
    apply: "build",
    writeBundle(options) {
      const dir =
        typeof options.dir === "string" ? options.dir : undefined;
      console.log("[server-output-fix] writeBundle dir:", dir);
      if (!dir) return;
      const serverPath = path.join(dir, "server.js");
      fs.writeFileSync(
        serverPath,
        "export { default } from './index.mjs';\n",
        "utf-8"
      );
      console.log("[server-output-fix] wrote", serverPath);
    },
  };
}

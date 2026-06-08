import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Gera um index.html estático em dist/client/ após o build do cliente,
 * pois o prerender do TanStack Start falha neste ambiente Cloudflare/Node.
 */
export function generateStaticHtml(): Plugin {
  return {
    name: "generate-static-html",
    apply: "build",
    buildApp: {
      order: "post",
      async handler() {
        const clientDir = path.resolve("dist/client");
        const assetsDir = path.join(clientDir, "assets");
        if (!fs.existsSync(assetsDir)) return;

        const files = fs.readdirSync(assetsDir);
        const jsEntry = files.find((f) => /^index-[A-Za-z0-9]+\.js$/.test(f));
        const cssFile = files.find((f) => /^styles-[A-Za-z0-9]+\.css$/.test(f));

        if (!jsEntry) {
          console.warn("[generate-static-html] Não encontrou entry JS em assets/");
          return;
        }

        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Compacto Fibras - Estações Compactas de Tratamento de Efluentes</title>
  <meta name="description" content="Soluções completas em estações compactas de tratamento de efluentes. Orçamento rápido via WhatsApp." />
  <link rel="icon" type="image/png" href="/favicon.png" />
  ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/${jsEntry}"></script>
</body>
</html>
`;
        fs.writeFileSync(path.join(clientDir, "index.html"), html, "utf-8");
        console.log("[generate-static-html] Gerado dist/client/index.html");
      },
    },
  };
}

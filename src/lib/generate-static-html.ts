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
        const jsFiles = files.filter((f) => /^[A-Za-z0-9_-]+-[A-Za-z0-9]+\.js$/.test(f));

        // Preferimos a entrada estática própria; fallback para a entrada antiga.
        let jsEntry = jsFiles.find((f) => /^client-[A-Za-z0-9]+\.js$/.test(f));

        // O entry point é aquele que importa outro chunk no início do arquivo
        jsEntry ??= jsFiles.find((f) => {
          const content = fs.readFileSync(path.join(assetsDir, f), "utf-8");
          return content.startsWith('import') && jsFiles.some((other) => other !== f && content.includes(`./${other}`));
        });

        // Fallback: se não detectou, pega o menor (geralmente é o entry)
        if (!jsEntry && jsFiles.length > 0) {
          jsEntry = jsFiles.sort((a, b) => fs.statSync(path.join(assetsDir, a)).size - fs.statSync(path.join(assetsDir, b)).size)[0];
        }

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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" />
  ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18204450552"></script>
  <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18204450552');</script>
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

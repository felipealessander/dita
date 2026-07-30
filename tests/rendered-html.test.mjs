import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Ditá commercial site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ditá — Performance em cada movimento<\/title>/i);
  assert.match(html, /Performance em cada movimento/);
  assert.match(html, /Marca para atletas/);
  assert.match(html, /Produtos em/);
  assert.match(html, /Vista sua/);
  assert.match(html, /Peças já produzidas/);
  assert.match(html, /A performance/);
  assert.match(html, /Comprar agora/);
  assert.match(html, /usedita2\.lojavirtualnuvem\.com\.br/);
  assert.match(html, /utm_source=site_dita/);
  assert.match(html, /utm_campaign=lancamento_2026/);
  assert.doesNotMatch(html, /Seu melhor e-mail|Quero acesso antecipado/);
});

test("centralizes the Nuvemshop integration and keeps required assets", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /NEXT_PUBLIC_DITA_STORE_URL/);
  assert.match(page, /function storeUrl/);
  assert.match(page, /utm_content/);
  assert.match(page, /logo-dita-symbol\.jpeg/);
  assert.match(layout, /logo-dita-symbol\.jpeg/);
  assert.match(page, /search\/\?q=hybrid/i);
  assert.match(page, /search\/\?q=triathlon/i);
  assert.match(layout, /Ditá — Performance em cada movimento/);

  await Promise.all([
    access(new URL("../public/collection/hybrid-red-lookbook.png", import.meta.url)),
    access(new URL("../public/collection/hybrid-lime-lookbook.png", import.meta.url)),
    access(new URL("../public/collection/tri-red-product.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/logo-dita-symbol.jpeg", import.meta.url)),
    access(new URL("../public/campaign/linha-pronta/masculino-preto-hybrid.webp", import.meta.url)),
    access(new URL("../public/campaign/linha-pronta/masculino-azul-corrida.webp", import.meta.url)),
    access(new URL("../public/campaign/linha-pronta/feminino-bordo-hybrid.webp", import.meta.url)),
    access(new URL("../public/campaign/linha-pronta/feminino-azul-corrida.webp", import.meta.url)),
  ]);
});

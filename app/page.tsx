"use client";

import { useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;
const STORE_BASE_URL =
  process.env.NEXT_PUBLIC_DITA_STORE_URL ??
  "https://usedita2.lojavirtualnuvem.com.br/";

const storeUrl = (path = "", content = "site") => {
  const url = new URL(path, STORE_BASE_URL);
  url.searchParams.set("utm_source", "site_dita");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "lancamento_2026");
  url.searchParams.set("utm_content", content);
  return url.toString();
};

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  unoptimized?: boolean;
};

const Image = ({ src, alt, className, priority }: SiteImageProps) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
  />
);
const collections = [
  { id: "triathlon", eyebrow: "Natação · Ciclismo · Corrida", name: "Triathlon Series", copy: "Da água à terra, da bike à corrida. Leveza, velocidade e resistência para quem não separa as três disciplinas.", image: "/collection/tri-red-product.png", tone: "tri", accent: "#ff6400" , storePath: "produtos/?q=Triathlon" },
  { id: "hybrid", eyebrow: "Força · Potência · Intensidade", name: "Hybrid Series", copy: "Sete movimentos. Uma única mentalidade. Construída para treinos híbridos, Hyrox e condicionamento funcional.", image: "/collection/hybrid-lime-lookbook.png", tone: "hybrid", accent: "#c6ff00" , storePath: "produtos/?q=Hybrid" },
  { id: "performance", eyebrow: "Versátil · Essencial · Técnico", name: "Performance", copy: "Peças essenciais de alta performance para corrida, musculação e todos os dias em movimento.", image: "/collection/brand-system.png", tone: "performance", accent: "#f3f1ec" , storePath: "produtos/" },
];
const movements = ["Run", "SkiErg", "Sled Push", "Sled Pull", "Row", "Wall Ball", "Burpee"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState("hybrid");
  const active = collections.find((item) => item.id === activeCollection)!;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ditá, início">DITÁ</a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#colecoes" onClick={() => setMenuOpen(false)}>Coleções</a>
          <a href="#tecnologia" onClick={() => setMenuOpen(false)}>Tecnologia</a>
          <a href="#manifesto" onClick={() => setMenuOpen(false)}>Manifesto</a>
          <a href={storeUrl("", "menu_mobile")} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Loja oficial</a>
        </nav>
        <a className="shop-link" href={storeUrl("", "header")} target="_blank" rel="noreferrer">Comprar agora <Arrow /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu"><span /><span /></button>
      </header>

      <section className="hero" id="inicio">
        <Image unoptimized className="hero-image" src="/collection/hybrid-red-lookbook.png" alt="Atletas usando a nova coleção Hybrid da Ditá" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="kicker">Nova era Ditá · 2026</p>
          <h1>Performance<br />em cada<br /><em>movimento.</em></h1>
          <p className="hero-description">Moda esportiva criada para quem atravessa limites — do primeiro mergulho ao último sled push.</p>
          <div className="hero-actions">
            <a className="primary-button" href={storeUrl("", "hero")} target="_blank" rel="noreferrer">Comprar agora <Arrow /></a>
            <a className="secondary-button" href="#colecoes">Conhecer coleções</a>
          </div>
        </div>
        <div className="hero-index"><span>01</span><i /><span>03</span></div>
        <p className="hero-side">TRIATHLON · HYBRID · PERFORMANCE</p>
      </section>

      <section className="intro" id="manifesto">
        <p className="section-label">[ Movimento é identidade ]</p>
        <div>
          <h2>Não vestimos atletas.<br /><span>Vestimos ambição.</span></h2>
          <p>A Ditá nasce de novo para acompanhar uma geração que corre, pedala, nada, empurra, puxa e recomeça. Design brasileiro, construção técnica e uma identidade que não passa despercebida.</p>
        </div>
      </section>

      <section className="collection-section" id="colecoes">
        <div className="section-heading"><p className="section-label">[ Coleções 01—03 ]</p><h2>Escolha seu território.</h2></div>
        <div className="collection-tabs" role="tablist" aria-label="Coleções">
          {collections.map((item, index) => (
            <button key={item.id} role="tab" aria-selected={activeCollection === item.id} onClick={() => setActiveCollection(item.id)} className={activeCollection === item.id ? "active" : ""} style={{ "--accent": item.accent } as React.CSSProperties}>
              <span>0{index + 1}</span>{item.name}
            </button>
          ))}
        </div>
        <article className={`collection-feature ${active.tone}`}>
          <Image unoptimized src={active.image} alt={`Coleção ${active.name} da Ditá`} fill sizes="(max-width: 900px) 100vw, 70vw" />
          <div className="collection-overlay" />
          <div className="collection-copy">
            <p>{active.eyebrow}</p><h3>{active.name}</h3>
            <div className="collection-bottom"><p>{active.copy}</p><a href={storeUrl(active.storePath, `colecao_${active.id}`)} target="_blank" rel="noreferrer">Ver produtos <Arrow /></a></div>
          </div>
        </article>
      </section>

      <section className="campaign" aria-labelledby="campaign-title">
        <div className="campaign-heading">
          <p className="section-label">[ Campanha 2026 ]</p>
          <h2 id="campaign-title">Corpos em movimento.<br /><span>Identidade em ação.</span></h2>
          <p>Recortes da nova coleção em seu ambiente natural: ritmo alto, esforço real e nenhuma distração.</p>
        </div>
        <div className="campaign-grid">
          <figure className="campaign-shot shot-run">
            <Image unoptimized src="/collection/shared-chat/29-atleta-em-foco-no-gin-sio.webp" alt="Atleta feminina da coleção Hybrid usando cropped limão Ditá" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption><span>01</span><strong>Run</strong><small>Hybrid · Masculino</small></figcaption>
          </figure>
          <figure className="campaign-shot shot-lime">
            <Image unoptimized src="/collection/shared-chat/26-confian-a-e-poder-no-treino.webp" alt="Atleta feminina usando top técnico limão da coleção Hybrid Ditá" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption><span>02</span><strong>Power</strong><small>Hybrid · Feminino</small></figcaption>
          </figure>
          <figure className="campaign-shot shot-product">
            <Image unoptimized src="/collection/shared-chat/25-cat-logo-de-produtos-deportivos-dit.webp" alt="Visão completa das coleções Hybrid e Triathlon Ditá" fill sizes="(max-width: 800px) 100vw, 35vw" />
            <figcaption><span>03</span><strong>Tri</strong><small>Três disciplinas</small></figcaption>
          </figure>
          <figure className="campaign-shot shot-detail">
            <Image unoptimized src="/collection/shared-chat/27-for-a-e-confian-a-na-academia.webp" alt="Cropped técnico feminino limão da coleção Hybrid Ditá" fill sizes="(max-width: 800px) 100vw, 65vw" />
            <figcaption><span>04</span><strong>Built to perform</strong><small>Dry fit · Alta performance</small></figcaption>
          </figure>
        </div>
      </section>
      <section className="movement-section" id="tecnologia">
        <div className="movement-intro">
          <p className="section-label">[ Hybrid Series ]</p>
          <h2>Sete movimentos.<br /><span>Zero concessões.</span></h2>
          <p>Modelagens que acompanham o corpo, tecido de secagem rápida e elasticidade para aguentar cada estação.</p>
          <a href={storeUrl("produtos/?q=Hybrid", "linha_hybrid")} target="_blank" rel="noreferrer">Ver linha Hybrid <Arrow /></a>
        </div>
        <div className="movement-board"><Image unoptimized src="/collection/collection-overview.png" alt="Visão geral das coleções Hybrid e Triathlon" fill sizes="(max-width: 900px) 100vw, 55vw" /></div>
        <div className="movement-list">{movements.map((movement, index) => <div key={movement}><span>0{index + 1}</span><strong>{movement}</strong></div>)}</div>
      </section>

      <section className="technology-strip">
        {[["01", "Leve e respirável"], ["02", "Secagem rápida"], ["03", "Alta elasticidade"], ["04", "Proteção UV 50+"]].map(([number, label]) => <div key={number}><span>{number}</span><p>{label}</p></div>)}
      </section>

      <section className="launch" id="lancamento">
        <Image unoptimized src="/collection/hybrid-red-product.png" alt="Produtos da nova coleção Ditá" fill sizes="100vw" />
        <div className="launch-overlay" />
        <div className="launch-content">
          <p className="kicker">Loja oficial Ditá</p><h2>Seu próximo<br />movimento.</h2>
          <p>Conheça as linhas Hybrid e Triathlon. Escolha sua modalidade, encontre sua modelagem e prepare-se para o próximo treino.</p>
          <a className="store-button" href={storeUrl("", "cta_final")} target="_blank" rel="noreferrer">Entrar na loja oficial <Arrow /></a>
          <p className="store-note">Compra segura, pagamento e entrega processados pela loja Ditá na Nuvemshop.</p>
        </div>
      </section>

      <footer>
        <div className="footer-brand">DITÁ</div>
        <div><p>Performance em cada movimento.</p><p className="muted">Triathlon · Hybrid · Fitness</p></div>
        <div className="footer-links">
          <a href={storeUrl("", "footer_loja")} target="_blank" rel="noreferrer">Loja oficial ↗</a>
          <a href={storeUrl("produtos/?q=Hybrid", "footer_hybrid")} target="_blank" rel="noreferrer">Hybrid</a>
          <a href={storeUrl("produtos/?q=Triathlon", "footer_triathlon")} target="_blank" rel="noreferrer">Triathlon</a>
          <a href="#manifesto">Sobre a Ditá</a>
          <a href="https://instagram.com/ditasports" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <div className="footer-bottom"><span>© 2026 Ditá Sports</span><span>Brasil · Feito para mover</span></div>
      </footer>
    </main>
  );
}


"use client";

import { useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

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
  { id: "triathlon", eyebrow: "Natação · Ciclismo · Corrida", name: "Triathlon Series", copy: "Da água à terra, da bike à corrida. Leveza, velocidade e resistência para quem não separa as três disciplinas.", image: "/collection/tri-red-product.png", tone: "tri", accent: "#ff6400" },
  { id: "hybrid", eyebrow: "Força · Potência · Intensidade", name: "Hybrid Series", copy: "Sete movimentos. Uma única mentalidade. Construída para treinos híbridos, Hyrox e condicionamento funcional.", image: "/collection/hybrid-lime-lookbook.png", tone: "hybrid", accent: "#c6ff00" },
  { id: "performance", eyebrow: "Versátil · Essencial · Técnico", name: "Performance", copy: "Peças essenciais de alta performance para corrida, musculação e todos os dias em movimento.", image: "/collection/brand-system.png", tone: "performance", accent: "#f3f1ec" },
];
const movements = ["Run", "SkiErg", "Sled Push", "Sled Pull", "Row", "Wall Ball", "Burpee"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState("hybrid");
  const [submitted, setSubmitted] = useState(false);
  const active = collections.find((item) => item.id === activeCollection)!;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ditá, início">DITÁ</a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#colecoes" onClick={() => setMenuOpen(false)}>Coleções</a>
          <a href="#tecnologia" onClick={() => setMenuOpen(false)}>Tecnologia</a>
          <a href="#manifesto" onClick={() => setMenuOpen(false)}>Manifesto</a>
          <a href="#lancamento" onClick={() => setMenuOpen(false)}>Lançamento</a>
        </nav>
        <a className="shop-link" href="#colecoes">Explorar coleção <Arrow /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu"><span /><span /></button>
      </header>

      <section className="hero" id="inicio">
        <Image unoptimized className="hero-image" src="/collection/hybrid-red-lookbook.png" alt="Atletas usando a nova coleção Hybrid da Ditá" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="kicker">Nova era Ditá · 2026</p>
          <h1>Performance<br />em cada<br /><em>movimento.</em></h1>
          <p className="hero-description">Moda esportiva criada para quem atravessa limites — do primeiro mergulho ao último sled push.</p>
          <a className="primary-button" href="#colecoes">Descubra as coleções <Arrow /></a>
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
            <div className="collection-bottom"><p>{active.copy}</p><a href="#lancamento">Conhecer coleção <Arrow /></a></div>
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
          <a href="#lancamento">Ver linha Hybrid <Arrow /></a>
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
          <p className="kicker">Drop 01 · Em breve</p><h2>Entre antes<br />da largada.</h2>
          <p>Cadastre-se para receber a data do lançamento e acesso antecipado às primeiras peças.</p>
          {submitted ? <div className="success" role="status">Você está na lista. Nos vemos na largada.</div> : (
            <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <label className="sr-only" htmlFor="email">Seu melhor e-mail</label>
              <input id="email" name="email" type="email" placeholder="SEU MELHOR E-MAIL" required />
              <button type="submit">Quero acesso antecipado <Arrow /></button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-brand">DITÁ</div>
        <div><p>Performance em cada movimento.</p><p className="muted">Triathlon · Hybrid · Fitness</p></div>
        <div className="footer-links"><a href="#colecoes">Coleções</a><a href="#manifesto">Sobre a Ditá</a><a href="https://instagram.com/ditasports" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        <div className="footer-bottom"><span>© 2026 Ditá Sports</span><span>Brasil · Feito para mover</span></div>
      </footer>
    </main>
  );
}


/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const STORE_BASE_URL = process.env.NEXT_PUBLIC_DITA_STORE_URL ?? "https://usedita2.lojavirtualnuvem.com.br/";

function storeUrl(path = "", content = "site") {
  const url = new URL(path, STORE_BASE_URL);
  url.searchParams.set("utm_source", "site_dita");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "lancamento_2026");
  url.searchParams.set("utm_content", content);
  return url.toString();
}

const Arrow = () => <span aria-hidden="true">→</span>;

const products = [
  { name: "T-shirt Hybrid", audience: "Masculino", image: "/catalog-placeholder/hybrid-masculino.png", sport: "Hybrid", tone: "lime" },
  { name: "T-shirt Tri Sport", audience: "Masculino", image: "/catalog-placeholder/triathlon-masculino.png", sport: "Triathlon", tone: "navy" },
  { name: "Top Hybrid", audience: "Feminino", image: "/catalog-placeholder/hybrid-feminino.png", sport: "Hybrid", tone: "lime" },
  { name: "Short Hybrid Duplo", audience: "Masculino", image: "/catalog-placeholder/hybrid-masculino.png", sport: "Hybrid", tone: "black", crop: "short" },
  { name: "Top Tri Sport", audience: "Feminino", image: "/catalog-placeholder/triathlon-feminino.png", sport: "Triathlon", tone: "orange" },
  { name: "Short Tri Sport Duplo", audience: "Feminino", image: "/catalog-placeholder/triathlon-feminino.png", sport: "Triathlon", tone: "navy", crop: "short" },
];

const benefits = [
  ["◌", "Tecnologia Dry Fit", "Respirável e leve"],
  ["◷", "Secagem rápida", "Conforto no treino"],
  ["⌁", "Alta elasticidade", "Liberdade total"],
  ["◇", "Resistência", "Feita para acompanhar"],
  ["☼", "Proteção UV 50+", "Treino ao ar livre"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="benefit-bar" aria-label="Benefícios da loja">
        <span>▱ Frete grátis acima de R$ 299</span>
        <span>↻ Troca fácil e rápida</span>
        <span>▣ Até 6x sem juros</span>
      </div>

      <header className="store-header">
        <a className="brand-symbol" href="#inicio" aria-label="Ditá, início">D</a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
          <span className="sr-only">Abrir menu</span>
        </button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Navegação principal">
          <a href={storeUrl("search/?q=masculino", "nav_masculino")}>Masculino</a>
          <a href={storeUrl("search/?q=feminino", "nav_feminino")}>Feminino</a>
          <a href={storeUrl("search/?q=triathlon", "nav_triathlon")}>Triathlon</a>
          <a href={storeUrl("search/?q=hybrid", "nav_hybrid")}>Hybrid</a>
          <a href={storeUrl("search/?q=acessorios", "nav_acessorios")}>Acessórios</a>
          <a href={storeUrl("search/?q=sale", "nav_sale")}>Sale</a>
        </nav>
        <div className="header-actions" aria-label="Ações da loja">
          <a href={storeUrl("search/", "header_search")} aria-label="Buscar">⌕</a>
          <a href={storeUrl("account/login/", "header_account")} aria-label="Minha conta">♙</a>
          <a href={storeUrl("cart/", "header_cart")} aria-label="Sacola">▢</a>
        </div>
      </header>

      <section className="commerce-hero" id="inicio">
        <div className="hero-athlete hero-athlete-tri"><img src="/catalog-placeholder/triathlon-masculino.png" alt="Atleta da coleção Ditá Triathlon" /></div>
        <div className="hero-copy">
          <span className="hero-mark">D</span><p className="eyebrow">Performance em cada movimento</p>
          <h1>Marca para atletas <em>híbridos.</em></h1>
          <p>Triathlon e Hybrid. Desenvolvida para quem vive em movimento.</p>
          <div className="hero-buttons">
            <a className="button button-primary" href={storeUrl("search/?q=triathlon", "hero_triathlon")}>Coleção Triathlon <Arrow /></a>
            <a className="button button-outline" href={storeUrl("search/?q=hybrid", "hero_hybrid")}>Coleção Hybrid <Arrow /></a>
          </div>
        </div>
        <div className="hero-athlete hero-athlete-hybrid">
          <img className="hero-woman" src="/catalog-placeholder/hybrid-feminino.png" alt="Atleta feminina da coleção Ditá Hybrid" />
          <img className="hero-man" src="/catalog-placeholder/hybrid-masculino.png" alt="Atleta masculino da coleção Ditá Hybrid" />
        </div>
      </section>

      <section className="category-grid" aria-label="Coleções">
        <article className="category-card tri-card">
          <div className="category-image"><img src="/catalog-placeholder/triathlon-masculino.png" alt="Coleção Triathlon Ditá" /></div>
          <div className="category-content"><span className="section-kicker">01 / Três disciplinas</span><h2>Triathlon</h2><p>Para quem encara cada etapa. Da água à terra, da bike à corrida.</p>
            <a className="button button-outline orange" href={storeUrl("search/?q=triathlon", "card_triathlon")}>Ver coleção <Arrow /></a>
            <div className="discipline-icons"><span>🏃 Corrida</span><span>◉ Ciclismo</span><span>≋ Natação</span></div>
          </div>
        </article>
        <article className="category-card hybrid-card">
          <div className="category-image"><img src="/catalog-placeholder/hybrid-feminino.png" alt="Coleção Hybrid Ditá" /></div>
          <div className="category-content"><span className="section-kicker">02 / Força e resistência</span><h2>Hybrid</h2><p>Força, resistência e funcionalidade. O treino é híbrido. Você também.</p>
            <a className="button button-outline" href={storeUrl("search/?q=hybrid", "card_hybrid")}>Ver coleção <Arrow /></a>
            <div className="discipline-icons"><span>⌁ Força</span><span>◇ Resistência</span><span>↗ Movimento</span></div>
          </div>
        </article>
      </section>

      <section className="featured" id="destaques">
        <div className="section-heading"><div><span className="section-kicker">Próximos lançamentos</span><h2>Produtos em <em>destaque</em></h2></div><a href={storeUrl("", "featured_all")}>Ver todos os produtos <Arrow /></a></div>
        <div className="product-grid">
          {products.map((product) => (
            <a className="product-card" href={storeUrl("search/?q=" + encodeURIComponent(product.sport), "produto_" + product.name.toLowerCase().replaceAll(" ", "_"))} key={product.name}>
              <div className={"product-image " + (product.crop === "short" ? "product-short" : "")}><img src={product.image} alt={product.name} /><span className="quick-view">Ver na loja</span></div>
              <p>{product.name}</p><small>{product.audience} · {product.sport}</small><span className="launch-label">Em breve</span>
              <div className="swatches" aria-label="Cores previstas"><i className={product.tone} /><i className="black" /><i className="offwhite" /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="tech-grid" aria-label="Tecnologias Ditá">{benefits.map(([icon, title, copy]) => <article key={title}><b>{icon}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</section>

      <section className="discipline-banner">
        <div className="discipline-copy"><span className="section-kicker">Ditá Performance</span><h2>Vista sua <em>disciplina.</em></h2><p>Sua rotina. Seu propósito. Sua melhor versão.</p><a className="button button-outline" href={storeUrl("", "discipline_banner")}>Comprar agora <Arrow /></a></div>
        <img src="/collection/shared-chat/29-atleta-em-foco-no-gin-sio.webp" alt="Atleta Ditá em treino de alta intensidade" />
      </section>

      <section className="social-section">
        <div className="section-heading compact"><h2><em>@usedita</em> no Instagram</h2><a href="https://www.instagram.com/usedita/" target="_blank" rel="noreferrer">Ver mais no Instagram <Arrow /></a></div>
        <div className="social-grid">{["29-atleta-em-foco-no-gin-sio.webp", "28-atleta-confiante-na-academia.webp", "16-cole-o-hybrid-e-triathlon-dit.webp", "26-confian-a-e-poder-no-treino.webp", "27-for-a-e-confian-a-na-academia.webp", "13-cole-o-hybrid-for-a-e-performance.webp"].map((src, index) => <img key={src} src={"/collection/shared-chat/" + src} alt={"Editorial Ditá " + (index + 1)} />)}</div>
      </section>

      <footer className="store-footer">
        <div className="footer-brand"><span className="brand-symbol">D</span><h2>Ditando<br /><em>o movimento.</em></h2><div className="footer-social">Instagram · WhatsApp</div></div>
        <div><h3>Institucional</h3><a href="#inicio">Sobre nós</a><a href="#destaques">Tecnologia</a><a href="#destaques">Sustentabilidade</a></div>
        <div><h3>Ajuda</h3><a href={storeUrl("", "footer_trocas")}>Trocas e devoluções</a><a href={storeUrl("", "footer_faq")}>Perguntas frequentes</a><a href={storeUrl("", "footer_privacidade")}>Política de privacidade</a></div>
        <div><h3>Categorias</h3><a href={storeUrl("search/?q=masculino", "footer_masculino")}>Masculino</a><a href={storeUrl("search/?q=feminino", "footer_feminino")}>Feminino</a><a href={storeUrl("search/?q=triathlon", "footer_triathlon")}>Triathlon</a><a href={storeUrl("search/?q=hybrid", "footer_hybrid")}>Hybrid</a></div>
        <div className="footer-payments"><h3>Compra segura</h3><p>Pagamento e checkout processados pela Nuvemshop.</p><div>VISA · Mastercard · PIX</div><small>Seus dados são protegidos.</small></div>
      </footer>
      <div className="footer-bottom">© 2026 Ditá Performance. Todos os direitos reservados.</div>
    </main>
  );
}

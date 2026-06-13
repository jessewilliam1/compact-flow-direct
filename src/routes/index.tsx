import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle, MapPin, Phone, Cog, Ruler, ShieldCheck, Droplets,
  Factory, Building2, Beef, Hospital, UtensilsCrossed, Home,
  AlertTriangle, Clock, Maximize2, Award,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { WHATSAPP_URL, PHONE_DISPLAY, trackWhatsappConversion } from "@/lib/contact";
import heroImg from "@/assets/station-hero.jpg";
import mascotLogo from "@/assets/mascot-logo.png";
import station1 from "@/assets/station-1.jpg";
import station2 from "@/assets/station-2.jpg";
import station3 from "@/assets/station-3.jpg";
import station4 from "@/assets/station-4.jpg";

const FAQ_ITEMS = [
  { q: "Quanto tempo leva a instalação da ETE compacta de tratamento de esgoto?", a: "Por se tratar de um sistema pré-fabricado em fibra de vidro, a instalação da estação de tratamento de esgoto e efluentes é muito mais rápida do que estações convencionais — normalmente em poucos dias, dependendo do porte do projeto e da preparação do local em Chapecó ou região." },
  { q: "A estação de tratamento de esgoto atende à legislação ambiental vigente?", a: "Sim. Nossas estações compactas de tratamento de esgoto e efluentes são projetadas para atender 100% das exigências do CONAMA e dos órgãos ambientais estaduais e municipais de Santa Catarina, com eficiência de até 97% na redução de DBO." },
  { q: "Vocês atendem o tratamento de esgoto e efluentes fora de Chapecó?", a: "Sim. Estamos sediados em Chapecó-SC, mas atendemos toda a região Oeste de Santa Catarina — incluindo Xanxerê, Concórdia, Joaçaba, Pinhalzinho, São Miguel do Oeste, Maravilha, Quilombo e Xaxim — além de clientes em todo o Brasil." },
  { q: "Como funciona o orçamento da estação de tratamento de esgoto?", a: "É simples e sem compromisso. Você nos chama no WhatsApp, passa as informações básicas do seu projeto e nosso time técnico monta uma proposta sob medida para tratamento de esgoto e efluentes em Chapecó-SC e região." },
  { q: "Qual a diferença entre uma estação de tratamento de esgoto compacta e uma estação convencional?", a: "A estação convencional exige obra civil, grandes áreas e meses de construção. A estação compacta de tratamento de esgoto em fibra de vidro chega pré-fabricada, ocupa muito menos espaço, dispensa obras complexas e entra em operação em poucos dias — com a mesma eficiência de tratamento de efluentes." },
  { q: "A Compacto Fibras instala estações de tratamento de esgoto fora de Chapecó, em outras cidades de Santa Catarina?", a: "Sim. Além de Chapecó, instalamos estações de tratamento de esgoto e efluentes em diversas cidades da região Oeste de SC, como Xanxerê, Concórdia, Joaçaba, Pinhalzinho, São Miguel do Oeste, Maravilha, Quilombo e Xaxim, com logística e suporte técnico completos." },
  { q: "Quanto tempo demora desde o pedido até a estação de tratamento de esgoto estar funcionando?", a: "Depois de definido o projeto, a fabricação e a instalação da estação de tratamento de esgoto compacta levam, em média, poucas semanas — muito mais rápido do que uma ETE convencional, que pode levar meses de obra." },
  { q: "Qual a diferença entre tratamento de esgoto e tratamento de efluentes industriais?", a: "O tratamento de esgoto sanitário trata águas residuais domésticas (de banheiros, cozinhas e condomínios), enquanto o tratamento de efluentes industriais lida com águas residuais de processos produtivos, como frigoríficos e indústrias. A Compacto Fibras projeta estações compactas para os dois casos, sempre conforme o CONAMA." },
];

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Compacto Fibras",
  description: "Empresa especializada em tratamento de esgoto e efluentes industriais em Chapecó-SC. Estações compactas de tratamento de esgoto e efluentes (ETE) em fibra de vidro com até 97% de eficiência na redução de DBO.",
  image: "https://compact-flow-direct.lovable.app/favicon.png",
  url: "https://compact-flow-direct.lovable.app",
  telephone: "+554931993922",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chapecó",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "Chapecó" },
    { "@type": "City", name: "Xanxerê" },
    { "@type": "City", name: "Concórdia" },
    { "@type": "City", name: "Joaçaba" },
    { "@type": "City", name: "Pinhalzinho" },
    { "@type": "City", name: "São Miguel do Oeste" },
    { "@type": "City", name: "Maravilha" },
    { "@type": "City", name: "Quilombo" },
    { "@type": "City", name: "Xaxim" },
    { "@type": "AdministrativeArea", name: "Região Oeste de Santa Catarina" },
  ],
  serviceType: "Tratamento de esgoto e efluentes industriais",
  keywords: "tratamento de esgoto, tratamento de efluentes, estação de tratamento de esgoto, ETE compacta, tratamento de efluentes industriais, Chapecó, Santa Catarina",
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SERVICE_CITIES = [
  "Chapecó", "Xanxerê", "Concórdia", "Joaçaba", "Pinhalzinho",
  "São Miguel do Oeste", "Maravilha", "Quilombo", "Xaxim",
];

const DELIVERED_PROJECTS = [
  "ETE Cliente [NOME DA EMPRESA] — Chapecó (SC)",
  "Estação de Tratamento de Esgoto — [NOME DA EMPRESA] — [CIDADE] (SC)",
  "ETE Compacta — [NOME DA EMPRESA] — Xanxerê (SC)",
  "Estação de Tratamento de Efluentes — [NOME DA EMPRESA] — Concórdia (SC)",
  "ETE Cliente [NOME DA EMPRESA] — São Miguel do Oeste (SC)",
  "Estação de Tratamento de Esgoto — [NOME DA EMPRESA] — [CIDADE] (SC)",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estação de Tratamento de Esgoto e Efluentes em Chapecó-SC | ETE Compacta | Compacto Fibras" },
      { name: "description", content: "Empresa de tratamento de esgoto e efluentes industriais em Chapecó-SC. Estações compactas de tratamento de esgoto em fibra de vidro para indústrias, frigoríficos, condomínios e hospitais. Instalação rápida, 97% de eficiência e 100% conforme legislação ambiental CONAMA. Atendimento em toda a região Oeste de Santa Catarina." },
      { property: "og:title", content: "Tratamento de Esgoto e Efluentes em Chapecó-SC | ETE Compacta" },
      { property: "og:description", content: "Estações compactas de tratamento de esgoto e efluentes em fibra de vidro. Instalação rápida, 97% de eficiência e conforme o CONAMA. Atendimento em Chapecó e região Oeste de SC." },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(LOCAL_BUSINESS_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: Landing,
});


function CTAButton({ size = "md", variant = "primary", children = "Pedir Orçamento no WhatsApp" }: { size?: "md" | "lg" | "xl"; variant?: "primary" | "inverse"; children?: React.ReactNode }) {
  const sizes = {
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
    xl: "px-9 py-5 text-lg",
  };
  const variants = {
    primary: "bg-[var(--brand-lime)] text-white hover:bg-[var(--brand)]",
    inverse: "bg-white text-[var(--brand-dark)] hover:bg-[var(--brand-lime)] hover:text-white",
  };
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsappConversion}
      className={`inline-flex items-center gap-2 rounded-md font-semibold uppercase tracking-wide shadow-brand transition-all hover:-translate-y-0.5 ${sizes[size]} ${variants[variant]}`}
    >
      <MessageCircle className="h-5 w-5" fill="currentColor" />
      {children}
    </a>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={mascotLogo} alt="Logotipo da Compacto Fibras, empresa de tratamento de esgoto e efluentes e estações compactas (ETE) em Chapecó-SC" className="h-12 w-12 object-contain" />
            <div className="leading-tight">
              <div className="font-display text-xl font-extrabold text-[var(--brand-dark)]">COMPACTO FIBRAS</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tratamento de Esgoto e Efluentes</div>
            </div>
          </div>
          <CTAButton size="md">Orçamento WhatsApp</CTAButton>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--brand-dark)] text-white">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest">
              <MapPin className="h-3.5 w-3.5 text-[var(--brand-lime)]" />
              Chapecó — SC · Atendimento em todo o Brasil
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[0.95] sm:text-5xl md:text-6xl">
              Tratamento de Esgoto e Efluentes <span className="text-[var(--brand-lime)]">Compacto</span> em Chapecó-SC, Rápido e 100% Conforme a Lei
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Estações compactas de tratamento de esgoto e efluentes em fibra de vidro com até <strong className="text-[var(--brand-lime)]">97% de eficiência</strong> na redução de DBO. Engenharia séria, instalação em poucos dias em toda a região Oeste de Santa Catarina.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <CTAButton size="xl" />
              <a href={`tel:+554931993922`} className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--brand-lime)]" /> Conforme legislação</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--brand-lime)]" /> Instalação rápida</span>
              <span className="flex items-center gap-2"><Award className="h-4 w-4 text-[var(--brand-lime)]" /> Engenharia certificada</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-[var(--brand-lime)]/20 blur-2xl" />
            <img
              src={heroImg}
              alt="Estação compacta de tratamento de esgoto e efluentes (ETE) em fibra de vidro instalada em indústria de Chapecó SC - Compacto Fibras"
              width={1920}
              height={1080}
              className="relative w-full rounded-xl border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-[var(--brand-lime)] px-5 py-3 font-display text-2xl font-extrabold text-[var(--brand-dark)] shadow-brand md:block">
              97% DE EFICIÊNCIA
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--brand-dark)] sm:text-4xl">
            Precisa de tratamento de esgoto e efluentes em Chapecó sem perder tempo nem espaço?
          </h2>
          <p className="mt-3 text-muted-foreground">Os problemas que adiar custa caro:</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: AlertTriangle, title: "Risco de multa ambiental", desc: "Operar sem tratamento adequado pode gerar autuações pesadas e embargos." },
              { icon: Maximize2, title: "Pouco espaço disponível", desc: "Estações convencionais ocupam grandes áreas que você nem tem." },
              { icon: Clock, title: "Obras lentas e caras", desc: "Construção tradicional leva meses e atrasa a sua operação." },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-white p-6 text-left">
                <p.icon className="h-8 w-8 text-[var(--brand)]" />
                <h3 className="mt-3 font-display text-xl font-bold text-[var(--brand-dark)]">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">A Solução</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--brand-dark)] sm:text-4xl md:text-5xl">
              ETE Compacta de Tratamento de Esgoto e Efluentes de Alta Performance
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Cog, title: "Instalação Rápida", desc: "Sistema pré-fabricado em fibra. Chega pronto, instala em dias." },
              { icon: Ruler, title: "Economia de Espaço", desc: "Design compacto que cabe onde sistemas convencionais não cabem." },
              { icon: ShieldCheck, title: "100% Conformidade", desc: "Atende toda a legislação ambiental vigente — CONAMA e órgãos locais." },
              { icon: Droplets, title: "Até 97% de Eficiência", desc: "Redução comprovada de DBO, garantindo efluente dentro dos padrões." },
            ].map((c) => (
              <div key={c.title} className="group rounded-xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-brand">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand-dark)] text-[var(--brand-lime)] group-hover:bg-[var(--brand)] group-hover:text-white">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-[var(--brand-dark)]">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTAButton size="lg" />
          </div>
        </div>
      </section>

      {/* PROVA */}
      <section className="bg-[var(--brand-dark)] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 text-center md:grid-cols-3">
            {[
              { n: "97%", l: "de eficiência em DBO" },
              { n: "100%", l: "conformidade ambiental" },
              { n: "+10", l: "anos no mercado" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-6xl font-extrabold text-[var(--brand-lime)] md:text-7xl">{s.n}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-display text-xl font-semibold uppercase tracking-wide text-white/90 md:text-2xl">
            Projetado por engenheiros · Testado no campo · Aprovado por órgãos ambientais
          </p>
        </div>
      </section>

      {/* NOSSOS PROJETOS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">Nossos Projetos</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--brand-dark)] sm:text-4xl">
              Estações de Tratamento de Esgoto e Efluentes Fabricadas pela Compacto Fibras
            </h2>
            <p className="mt-3 text-muted-foreground">Fibra de vidro de alta resistência, identidade visual padronizada e engenharia comprovada em cada estação de tratamento de esgoto e efluentes entregue em Santa Catarina.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: station1, label: "Reator + Filtro 1000L", alt: "Reator e filtro de 1000L em fibra de vidro para estação compacta de tratamento de esgoto e efluentes em Chapecó SC - Compacto Fibras" },
              { src: station2, label: "Linha de tanques compactos", alt: "Linha de tanques compactos em fibra de vidro para estação de tratamento de esgoto e efluentes na região Oeste de Santa Catarina - Compacto Fibras" },
              { src: station3, label: "ETE 15M³ instalada", alt: "ETE compacta de 15m³ instalada para tratamento de esgoto e efluentes industriais em Chapecó SC - Compacto Fibras" },
              { src: station4, label: "Módulo Filtro/Reator", alt: "Módulo de filtro e reator de estação compacta de tratamento de esgoto e efluentes - Compacto Fibras Chapecó SC" },
            ].map((g, i) => (
              <figure key={i} className="overflow-hidden rounded-xl border border-border bg-secondary group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={g.src} alt={g.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <figcaption className="px-4 py-3 text-sm font-medium text-[var(--brand-dark)]">{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold text-[var(--brand-dark)] sm:text-4xl">Tratamento de esgoto e efluentes ideal para:</h2>
            <p className="mt-2 text-muted-foreground">Atendemos diversos setores em Chapecó e região com soluções sob medida.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: Factory, label: "Indústrias" },
              { icon: Building2, label: "Condomínios" },
              { icon: Beef, label: "Frigoríficos" },
              { icon: Hospital, label: "Hospitais" },
              { icon: UtensilsCrossed, label: "Restaurantes" },
              { icon: Home, label: "Loteamentos" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-5 text-center">
                <s.icon className="h-8 w-8 text-[var(--brand)]" />
                <span className="font-display text-lg font-bold uppercase text-[var(--brand-dark)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA CENTRAL */}
      <section className="relative overflow-hidden bg-[var(--brand-dark)] py-20 text-white">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
            Tratamento de Esgoto e Efluentes em Chapecó e região Oeste de SC: fale com um especialista
          </h2>
          <p className="mt-4 text-lg text-white/80">Orçamento sem compromisso. Resposta rápida.</p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <CTAButton size="xl" variant="inverse">Quero Meu Orçamento Agora</CTAButton>
            <a href="tel:+554931993922" className="flex items-center gap-2 text-white/90 hover:text-white">
              <Phone className="h-5 w-5" />
              <span className="font-display text-2xl font-bold">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">Clientes</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--brand-dark)] sm:text-4xl">
              O que dizem quem já instalou
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-dark)] text-[var(--brand-lime)] font-display font-bold">
                    C{i}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[var(--brand-dark)]">[NOME EMPRESA]</div>
                    <div className="text-xs text-muted-foreground">[CIDADE — UF]</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground italic">
                  "[INSERIR DEPOIMENTO DE CLIENTE — substituir por avaliação real do projeto entregue]"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold text-[var(--brand-dark)] sm:text-4xl">Perguntas Frequentes sobre Tratamento de Esgoto e Efluentes</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ_ITEMS.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="text-left font-display text-lg font-bold uppercase text-[var(--brand-dark)] hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 text-center">
            <CTAButton size="lg" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--brand-dark)] py-12 text-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={mascotLogo} alt="Logotipo Compacto Fibras - estações compactas de tratamento de esgoto e efluentes em Chapecó SC" className="h-12 w-12 object-contain" />
              <div className="font-display text-xl font-extrabold text-white">COMPACTO FIBRAS</div>
            </div>
            <p className="mt-4 text-sm">Estações compactas de tratamento de esgoto e efluentes. Engenharia, performance e conformidade ambiental.</p>
            <div className="mt-4">
              <CTAButton size="md">Falar no WhatsApp</CTAButton>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-[var(--brand-lime)]">Contato</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Chapecó — SC</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {PHONE_DISPLAY}</li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={trackWhatsappConversion} className="inline-flex items-center gap-2 text-[var(--brand-lime)] hover:underline">
                  <MessageCircle className="h-4 w-4" /> WhatsApp direto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-[var(--brand-lime)]">Localização</h4>
            <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Localização Compacto Fibras - Chapecó SC"
                src="https://www.google.com/maps?q=Chapec%C3%B3%2C+SC%2C+Brasil&output=embed"
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-white/60">
          <p className="mb-2">Compacto Fibras — Tratamento de Esgoto e Efluentes em Chapecó, SC | Atendimento em toda a região Oeste de Santa Catarina</p>
          © {new Date().getFullYear()} Compacto Fibras — Todos os direitos reservados.
        </div>
      </footer>

      <WhatsappFloat />
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PLANE_IMG = "https://cdn.poehali.dev/projects/628887f9-be14-4aea-a496-5fe8bef131ec/files/a68daf9f-63e1-4e89-9bbb-d2246f54dded.jpg";
const TRAIN_IMG = "https://cdn.poehali.dev/projects/628887f9-be14-4aea-a496-5fe8bef131ec/files/43b30817-43d4-466f-af92-8948990db5da.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Обо мне", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Путешествия", href: "#travel" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Plane", title: "Авиабилеты", desc: "Все авиакомпании мира. Прямые и стыковочные рейсы. Бизнес и эконом класс." },
  { icon: "Train", title: "ЖД билеты", desc: "Все направления по России. Купе, плацкарт, СВ. Онлайн-бронирование." },
  { icon: "Globe", title: "Чартерные рейсы", desc: "Эксклюзивные туры и групповые поездки. Специальные цены для групп." },
  { icon: "Shield", title: "Страхование", desc: "Туристические страховки для путешествий. Медицинская и багажная защита." },
];

const PORTFOLIO = [
  { title: "Москва — Абакан", type: "Авиа", tag: "Популярный маршрут", img: PLANE_IMG },
  { title: "Абакан — Красноярск", type: "ЖД", tag: "Ежедневно", img: TRAIN_IMG },
  { title: "Абакан — Новосибирск", type: "Авиа + ЖД", tag: "Лучшая цена", img: PLANE_IMG },
];

const TRAVEL = [
  {
    region: "Хакасия",
    title: "Природные заповедники",
    desc: "Озеро Шира, Сундуки, Хакасский заповедник — уникальная природа Южной Сибири у порога.",
    tag: "Природа",
    icon: "TreePine",
    details: [
      "🌊 Озеро Шира — крупнейшее солёное озеро Хакасии. Лечебные грязи, санатории, пляжи. Лучшее время — июнь–август.",
      "🪨 Сундуки — пять скальных массивов, древняя «обсерватория». Панорамные виды на степь и горы.",
      "🌿 Хакасский заповедник — краснокнижные животные, кедровая тайга, нетронутая природа.",
      "🏕️ Как добраться: авто или автобус из Абакана (70–150 км). Помогу организовать трансфер.",
    ],
  },
  {
    region: "Хакасия",
    title: "Древние курганы и петроглифы",
    desc: "Салбыкский курган, Большой Салбык — загадочные памятники древних цивилизаций.",
    tag: "История",
    icon: "Landmark",
    details: [
      "⛰️ Большой Салбыкский курган — один из крупнейших в мире, возраст более 2500 лет. Огромные каменные плиты весом до 50 тонн.",
      "🎨 Петроглифы Белого Июса — наскальные рисунки эпохи бронзы. Более 3000 изображений животных и людей.",
      "🏛️ Хакасский краеведческий музей в Абакане — богатейшая коллекция артефактов тагарской культуры.",
      "🗺️ Маршрут «Степные пирамиды» — однодневная экскурсия из Абакана по главным историческим памятникам.",
    ],
  },
  {
    region: "Красноярский край",
    title: "Красноярские Столбы",
    desc: "Знаменитый заповедник со скальными останцами. Идеально для активного отдыха.",
    tag: "Активный",
    icon: "Mountain",
    details: [
      "🪨 Заповедник «Столбы» — сиенитовые скалы высотой до 100 м, уникальная флора и фауна. Площадь — 47 тысяч га.",
      "🚡 Канатная дорога «Бобровый лог» — панорамный подъём, горнолыжный склон зимой, трекинг летом.",
      "🏙️ Красноярск — миллионник с Театральной площадью, набережной Енисея, музеем Сурикова.",
      "✈️ Как добраться: авиарейс Абакан–Красноярск (1 час) или поезд (8–10 часов). Оформлю билеты быстро.",
    ],
  },
  {
    region: "Тыва",
    title: "Тыва — край шаманов",
    desc: "Кызыл, центр Азии, горловое пение. Экзотика совсем рядом — 5 часов от Абакана.",
    tag: "Экзотика",
    icon: "Music2",
    details: [
      "🌍 Кызыл — столица Тывы, здесь находится географический центр Азии. Обелиск «Центр Азии» на берегу Енисея.",
      "🎵 Горловое пение хоомей — уникальное нематериальное наследие ЮНЕСКО. Концерты и мастер-классы для туристов.",
      "🏛️ Национальный музей им. Алдан-Маадыр — золото скифов, шаманские артефакты, этнографические коллекции.",
      "🚌 Как добраться: автобус Абакан–Кызыл (5–6 часов) или личный авто по живописной трассе через Саяны.",
    ],
  },
  {
    region: "Алтай",
    title: "Горный Алтай",
    desc: "Чуйский тракт, Телецкое озеро, Мультинские озёра. Один из красивейших регионов России.",
    tag: "Горы",
    icon: "Sunset",
    details: [
      "🛣️ Чуйский тракт — один из красивейших трактов мира по версии National Geographic. Горные перевалы, долины рек.",
      "💧 Телецкое озеро — «Алтайский Байкал», глубина 325 м, объект ЮНЕСКО. Водопады Корбу и Чодор.",
      "🏔️ Мультинские озёра — жемчужина Алтая, пешие маршруты через тайгу, нетронутая природа.",
      "🚗 Как добраться: авторейс или ЖД до Бийска, далее по Чуйскому тракту. Помогу с маршрутом и билетами.",
    ],
  },
  {
    region: "Иркутская область",
    title: "Байкал",
    desc: "Глубочайшее озеро планеты. Листвянка, КБЖД, Ольхон — места, которые меняют восприятие мира.",
    tag: "Озеро",
    icon: "Waves",
    details: [
      "🏝️ Остров Ольхон — сакральное место бурятской культуры. Скала Шаманка, мыс Хобой, бесконечные пляжи.",
      "🚂 КБЖД — Кругобайкальская железная дорога. Уникальный инженерный памятник вдоль берега Байкала.",
      "🏘️ Листвянка — главный туристический посёлок. Нерпинарий, Байкальский музей, рынок омуля.",
      "✈️ Как добраться: авиарейс Абакан–Иркутск (1,5 часа) или поезд (15–18 часов). Оформлю любой вариант.",
    ],
  },
  {
    region: "Любое направление",
    title: "И другие направления",
    desc: "Хотите куда-то ещё? Помогу найти билеты в любую точку России и мира. Организуем групповые поездки на личном автобусе.",
    tag: "Под запрос",
    icon: "Compass",
    details: [
      "🚌 Групповые поездки на личном автобусе — организуем выезды для компаний, коллективов, семей. Комфортный транспорт, согласованный маршрут, без пересадок.",
      "✈️ Любые авиамаршруты — Москва, Санкт-Петербург, Сочи, Казань, за рубеж и не только.",
      "🚂 ЖД билеты по всей России — любое направление, любой класс вагона.",
      "🗺️ Индивидуальный подбор маршрута — расскажите куда хотите, и я найду оптимальный вариант.",
      "📞 Просто свяжитесь со мной — опишите желаемое направление и даты, и я оформлю всё быстро.",
    ],
  },
];

const BLOG = [
  { date: "15 МАЯ 2026", title: "Как купить дешёвый билет в сезон", tag: "Советы", excerpt: "Рассказываем о лайфхаках опытных путешественников, которые экономят до 40% на перелётах." },
  { date: "02 МАЯ 2026", title: "Топ направлений из Абакана лето 2026", tag: "Направления", excerpt: "Составили список самых популярных маршрутов этим летом среди жителей Абакана и Хакасии." },
  { date: "20 АПР 2026", title: "ЖД или самолёт: что выбрать?", tag: "Сравнение", excerpt: "Подробный разбор: цена, время, комфорт — когда какой вид транспорта выгоднее." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

function TravelCards() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TRAVEL.map((t, i) => {
        const isOpen = openIdx === i;
        return (
          <AnimSection key={t.title}>
            <div
              className={`border transition-all duration-300 cursor-pointer ${isOpen ? "border-[#e8b84b]/50 bg-[#0d1a30]" : "border-white/8 hover:border-[#e8b84b]/30 hover:bg-[#0d1a30]"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="p-8" onClick={() => setOpenIdx(isOpen ? null : i)}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#e8b84b]" : "bg-[#e8b84b]/10 group-hover:bg-[#e8b84b]/20"}`}
                    style={{ clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)" }}>
                    <Icon name={t.icon} size={24} className={isOpen ? "text-[#08101f]" : "text-[#e8b84b]"} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-oswald text-[10px] tracking-widest uppercase border border-[#e8b84b]/30 text-[#e8b84b] px-2 py-1 transition-colors ${isOpen ? "bg-[#e8b84b]/10" : ""}`}>
                      {t.tag}
                    </span>
                    <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-[#e8b84b]/60" />
                  </div>
                </div>
                <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-2">{t.region}</div>
                <h3 className={`font-oswald text-xl font-semibold uppercase leading-tight mb-3 transition-colors ${isOpen ? "text-[#e8b84b]" : ""}`}>
                  {t.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{t.desc}</p>
              </div>

              {isOpen && (
                <div className="px-8 pb-8 border-t border-[#e8b84b]/10 pt-6">
                  <ul className="flex flex-col gap-4">
                    {t.details.map((d, j) => (
                      <li key={j} className="text-white/60 text-sm leading-relaxed">{d}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      const el = document.querySelector("#contacts");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 w-full bg-[#e8b84b] text-[#08101f] font-oswald text-xs tracking-widest uppercase px-6 py-3 font-semibold hover:bg-[#f5d080] transition-colors"
                  >
                    Купить билет
                  </button>
                </div>
              )}
            </div>
          </AnimSection>
        );
      })}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [planePos, setPlanePos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPlanePos(p => (p + 0.3) % 110), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#08101f] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(8,16,31,0.97) 60%, transparent)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#e8b84b] flex items-center justify-center">
            <Icon name="Plane" size={16} className="text-[#08101f]" />
          </div>
          <span className="font-oswald text-lg font-semibold tracking-widest uppercase text-white">
            ИП<span className="text-[#e8b84b]"> </span>Миронова
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className={`font-oswald text-xs tracking-widest uppercase transition-colors hover:text-[#e8b84b] ${activeSection === l.href.replace("#", "") ? "text-[#e8b84b]" : "text-white/70"}`}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08101f]/98 flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="font-oswald text-2xl tracking-widest uppercase text-white/80 hover:text-[#e8b84b] transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={PLANE_IMG} alt="hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #08101f 40%, rgba(8,16,31,0.6) 100%)" }} />
        </div>

        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: (Math.sin(i * 13.7) * 0.5 + 1) * 2 + "px",
              height: (Math.sin(i * 13.7) * 0.5 + 1) * 2 + "px",
              top: ((i * 37) % 60) + "%",
              left: ((i * 53) % 100) + "%",
              opacity: (Math.cos(i * 7.3) * 0.25 + 0.35),
            }} />
        ))}

        <div className="absolute top-1/3 pointer-events-none"
          style={{ left: `${planePos}%`, transform: "translateY(-50%)", transition: "left 0.05s linear" }}>
          <Icon name="Plane" size={20} className="text-[#e8b84b] opacity-60" />
        </div>

        <div className="relative z-10 px-6 md:px-16 pt-32 pb-20">
          <AnimSection>
            <div className="inline-flex items-center gap-2 border border-[#e8b84b]/30 rounded-full px-4 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e8b84b] animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#e8b84b]">г. Абакан · Работаем каждый день</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-8xl font-bold leading-none tracking-tight mb-6 uppercase">
              Ваш билет<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(232,184,75,0.5)" }}>в любую</span><br />
              <span className="text-[#e8b84b]">точку мира</span>
            </h1>
            <p className="font-cormorant text-xl md:text-2xl text-white/60 italic max-w-md mb-10">
              Продажа авиа и железнодорожных билетов в Абакане — быстро, выгодно, с заботой о каждом путешественнике
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("#services")}
                className="group font-oswald text-sm tracking-widest uppercase bg-[#e8b84b] text-[#08101f] px-8 py-4 hover:bg-[#f5d080] transition-all duration-300 font-semibold">
                Найти билет
                <Icon name="ArrowRight" size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo("#contacts")}
                className="font-oswald text-sm tracking-widest uppercase border border-white/20 text-white/80 px-8 py-4 hover:border-[#e8b84b]/50 hover:text-white transition-all duration-300">
                Связаться
              </button>
            </div>
          </AnimSection>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-sm">
            {[["500+", "Маршрутов"], ["20 лет", "Опыта"], ["24/7", "Поддержка"]].map(([num, label]) => (
              <AnimSection key={label}>
                <div className="text-center">
                  <div className="font-oswald text-2xl font-bold text-[#e8b84b]">{num}</div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">{label}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">Прокрутить</span>
          <Icon name="ChevronDown" size={16} className="text-white/30" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 md:px-16 relative">
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#e8b84b]/20 to-transparent ml-6 md:ml-16 hidden md:block" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimSection>
            <div className="relative">
              <img src={TRAIN_IMG} alt="Поезд" className="w-full h-96 object-cover"
                style={{ clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)" }} />
              <div className="absolute -bottom-6 -right-6 bg-[#e8b84b] text-[#08101f] p-6 font-oswald">
                <div className="text-3xl font-bold">20</div>
                <div className="text-xs tracking-widest uppercase font-semibold">Лет в деле</div>
              </div>
              <div className="absolute top-4 left-4 border border-[#e8b84b]/30 px-3 py-1.5">
                <span className="font-mono text-[10px] tracking-widest text-[#e8b84b] uppercase">Абакан, Хакасия</span>
              </div>
            </div>
          </AnimSection>
          <AnimSection>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[#e8b84b] uppercase mb-4">// 01. Обо мне</div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
                Личный<br /><span className="text-[#e8b84b]">помощник</span><br />в путешествии
              </h2>
              <p className="font-cormorant text-lg text-white/60 italic mb-6 leading-relaxed">
                Уже более 20 лет я помогаю жителям Абакана и Хакасии находить лучшие билеты на самолёты и поезда. Каждый маршрут — это моя личная ответственность.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Работаю со всеми крупными перевозчиками: Аэрофлот, S7, Победа, РЖД и другие. Помогаю с выбором оптимального маршрута, оформляю билеты быстро и без лишних хлопот.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Авиабилеты", "ЖД билеты", "Чартеры", "Страхование"].map(tag => (
                  <span key={tag} className="font-oswald text-xs tracking-widest uppercase border border-[#e8b84b]/30 text-[#e8b84b] px-4 py-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6 md:px-16 relative" style={{ background: "linear-gradient(180deg, #08101f 0%, #0d1528 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="font-mono text-[10px] tracking-widest text-[#e8b84b] uppercase mb-4">// 02. Услуги</div>
                <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-tight">
                  Что я<br /><span className="text-[#e8b84b]">предлагаю</span>
                </h2>
              </div>
              <p className="font-cormorant text-lg text-white/50 italic max-w-xs">
                Полный спектр билетных услуг в одном месте
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title}>
                <div className="group bg-[#08101f] p-8 hover:bg-[#0d1528] transition-all duration-300 cursor-pointer h-full"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-12 h-12 border border-[#e8b84b]/30 flex items-center justify-center mb-6 group-hover:border-[#e8b84b] transition-colors">
                    <Icon name={s.icon} size={20} className="text-[#e8b84b]" />
                  </div>
                  <h3 className="font-oswald text-xl font-semibold uppercase mb-3 group-hover:text-[#e8b84b] transition-colors">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <div className="w-0 group-hover:w-full h-px bg-[#e8b84b] mt-4 transition-all duration-500" />
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <div className="mb-16">
              <div className="font-mono text-[10px] tracking-widest text-[#e8b84b] uppercase mb-4">// 03. Портфолио</div>
              <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-tight">
                Популярные<br /><span className="text-[#e8b84b]">маршруты</span>
              </h2>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <AnimSection key={p.title}>
                <div className="group relative overflow-hidden cursor-pointer" style={{ transitionDelay: `${i * 100}ms` }}>
                  <img src={p.img} alt={p.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08101f] via-[#08101f]/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#e8b84b] text-[#08101f] px-3 py-1 font-oswald text-xs font-semibold tracking-widest uppercase">
                    {p.type}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="font-mono text-[9px] text-[#e8b84b]/70 uppercase tracking-widest mb-2">{p.tag}</div>
                    <h3 className="font-oswald text-xl font-bold uppercase">{p.title}</h3>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVEL */}
      <section id="travel" className="py-28 px-6 md:px-16" style={{ background: "linear-gradient(180deg, #08101f 0%, #0d1528 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="font-mono text-[10px] tracking-widest text-[#e8b84b] uppercase mb-4">// 04. Путешествия</div>
                <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-tight">
                  Хакасия<br /><span className="text-[#e8b84b]">и соседи</span>
                </h2>
              </div>
              <p className="font-cormorant text-lg text-white/50 italic max-w-xs">
                Уникальные маршруты по региону — помогу добраться до любой точки
              </p>
            </div>
          </AnimSection>

          <TravelCards />
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-28 px-6 md:px-16" style={{ background: "linear-gradient(180deg, #08101f 0%, #0a1220 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <div className="mb-16">
              <div className="font-mono text-[10px] tracking-widest text-[#e8b84b] uppercase mb-4">// 04. Блог</div>
              <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-tight">
                Советы<br /><span className="text-[#e8b84b]">путешественника</span>
              </h2>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-8">
            {BLOG.map((b, i) => (
              <AnimSection key={b.title}>
                <article className="group cursor-pointer border-t border-white/10 pt-8 hover:border-[#e8b84b]/30 transition-colors"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">{b.date}</span>
                    <span className="font-oswald text-[10px] tracking-widest uppercase border border-[#e8b84b]/30 text-[#e8b84b] px-2 py-0.5">{b.tag}</span>
                  </div>
                  <h3 className="font-oswald text-xl font-semibold uppercase leading-tight mb-4 group-hover:text-[#e8b84b] transition-colors">{b.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{b.excerpt}</p>
                  <div className="flex items-center gap-2 mt-6 text-[#e8b84b] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-oswald text-xs tracking-widest uppercase">Читать</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#e8b84b]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#e8b84b]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#e8b84b]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimSection>
            <div className="text-center mb-16">
              <div className="font-mono text-[10px] tracking-widest text-[#e8b84b] uppercase mb-4">// 05. Контакты</div>
              <h2 className="font-oswald text-4xl md:text-7xl font-bold uppercase leading-tight mb-6">
                Готовы<br /><span className="text-[#e8b84b]">лететь?</span>
              </h2>
              <p className="font-cormorant text-xl text-white/50 italic">Свяжитесь со мной — подберу лучший вариант</p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <AnimSection>
              <div className="flex flex-col gap-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (913) 440-59-16" },
                  { icon: "User", label: "Специалист", value: "Миронова Ольга Петровна" },
                  { icon: "MapPin", label: "Адрес", value: "просп. Ленина, 70А, Абакан" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–19:00, Сб 10:00–16:00" },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-10 h-10 border border-[#e8b84b]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#e8b84b] transition-colors mt-1">
                      <Icon name={c.icon} size={16} className="text-[#e8b84b]" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">{c.label}</div>
                      <div className="font-oswald text-base text-white group-hover:text-[#e8b84b] transition-colors">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                <input
                  type="text" placeholder="Ваше имя"
                  className="bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 font-oswald text-sm tracking-wide focus:outline-none focus:border-[#e8b84b]/50 transition-colors"
                />
                <input
                  type="tel" placeholder="Телефон"
                  className="bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 font-oswald text-sm tracking-wide focus:outline-none focus:border-[#e8b84b]/50 transition-colors"
                />
                <textarea
                  placeholder="Куда хотите полететь или поехать?"
                  rows={4}
                  className="bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 font-oswald text-sm tracking-wide focus:outline-none focus:border-[#e8b84b]/50 transition-colors resize-none"
                />
                <button type="submit"
                  className="bg-[#e8b84b] text-[#08101f] font-oswald text-sm tracking-widest uppercase px-8 py-4 font-semibold hover:bg-[#f5d080] transition-colors">
                  Отправить заявку
                </button>
              </form>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#e8b84b] flex items-center justify-center">
              <Icon name="Plane" size={12} className="text-[#08101f]" />
            </div>
            <span className="font-oswald text-sm tracking-widest uppercase text-white/50">
              ИП<span className="text-[#e8b84b]"> </span>Миронова
            </span>
          </div>
          <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            © 2026 · Продажа авиа и ЖД билетов в Абакане
          </div>
          <div className="flex gap-4">
            {["Phone", "MessageCircle"].map(ic => (
              <button key={ic} className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#e8b84b]/50 hover:text-[#e8b84b] transition-colors text-white/40">
                <Icon name={ic} size={14} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
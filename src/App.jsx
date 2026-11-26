import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  Sparkles,
  Coffee,
  ArrowUpRight,
  Menu,
  X,
  Maximize2,
  Compass,
  Lightbulb,
  Flame,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const MENU_ITEMS = [
  {
    id: 1,
    name: "ORANGE POP",
    tagline: "Orange Meets Cloudy Foam",
    description:
      "Kesegaran perasan jeruk pilihan dipadukan dengan lapisan secret cream foam yang lembut.",
    ingredients: ["Fresh Orange", "Secret Cream Foam"],
    image: "/image/orange-pop.png",
  },
  {
    id: 2,
    name: "SUNSET POP",
    tagline: "Sunset Vibes in a Cup",
    description:
      "Perpaduan bold espresso, kesegaran jeruk pilihan, dan lapisan creamy secret foam untuk menemani sore hari.",
    ingredients: ["Bold Coffee", "Fresh Orange", "Secret Foam"],
    image: "/image/sunset-pop.png",
  },
  {
    id: 3,
    name: "CORNSTAR",
    tagline: "Sweet Meets Cheese",
    description:
      "Sensasi menikmati 'jasuke' dalam bentuk minuman creamy, gurih keju, dan manis yang pas.",
    ingredients: ["Sweet Corn", "Creamy Milk", "Cheese Cream"],
    image: "/image/cornstar.png",
  },
];

const BOOK_MENU_SPREADS = [
  {
    id: "coffee",
    pageNumber: "01 / 02",
    tabTitle: "Menu Coffee",
    leftHeading: "SIGNATURE & WILD SIP",
    leftSubtitle: "Racikan kopi & minuman khas FLUX StreetCoffee.",
    leftItems: [
      {
        name: "ORANGE POP",
        desc: "Fresh orange + secret cream foam",
        tag: "NEW DROP",
      },
      {
        name: "SUNSET POP",
        desc: "Bold coffee + fresh orange + secret foam",
        tag: "FAVORITE",
      },
      {
        name: "CORNSTAR",
        desc: "Sweet corn + creamy milk + cheese cream",
        tag: "CREAMY",
      },
    ],
    rightHeading: "DAILY BREW & NON-COFFEE",
    rightSubtitle: "Pilihan kopi harian & minuman santai di street bar.",
    rightItems: [
      {
        name: "FLUX ESPRESSO / AMERICANO",
        desc: "Karakter bold & clean untuk teman gerak harian",
        tag: "DAILY",
      },
      {
        name: "FLUX MILK COFFEE",
        desc: "Kopi susu dengan rasa seimbang & praktis",
        tag: "BEST SELLER",
      },
      {
        name: "MATCHA & CHOCOLATE",
        desc: "Creamy & manis lembut untuk menemani sore hingga malam",
        tag: "STREET",
      },
    ],
    footerNote: "Salatiga Street Bar • 16.00 – 23.00 WIB",
  },
  {
    id: "food",
    pageNumber: "02 / 02",
    tabTitle: "Menu Makanan",
    leftHeading: "STREET BITES & SNACK",
    leftSubtitle: "Teman ngemil hangat pendamping segelas brew.",
    leftItems: [
      {
        name: "CRISPY STREET BITES",
        desc: "Renyah gurih, pas untuk nongkrong bareng teman",
        tag: "CRUNCHY",
      },
      {
        name: "SAVORY ROLLS & FRIES",
        desc: "Hangat praktis dinikmati sambil santai di bar",
        tag: "WARM",
      },
      {
        name: "SWEET TOAST / PASTRY",
        desc: "Manis pas buat pasangan kopi sore hari",
        tag: "SWEET",
      },
    ],
    rightHeading: "HEAVY & SHARING BITES",
    rightSubtitle: "Porsi pas untuk mengisi energi di sela aktivitas.",
    rightItems: [
      {
        name: "RICE / NOODLE BOWL",
        desc: "Mengenyangkan, gurih, dan siap menemani gerakmu",
        tag: "FILLING",
      },
      {
        name: "COMBO STREET PACKAGE",
        desc: "Lebih pas untuk pairing minuman + makanan",
        tag: "PAIRING",
      },
      {
        name: "EXTRA POP-UP SPECIALS",
        desc: "Menu edisi terbatas saat event & pop-up kota",
        tag: "POP-UP",
      },
    ],
    footerNote: "Tersedia di Street Bar & Pop-Up Event",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);

  // State buku menu lengkap: "frontCover" | "pages" | "backCover"
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookStage, setBookStage] = useState("frontCover");
  const [isCoverSwinging, setIsCoverSwinging] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [flippingSheet, setFlippingSheet] = useState(null);

  const swingTimerRef = useRef(null);
  const flipTimerRef = useRef(null);
  const commitStageTimerRef = useRef(null);

  const clearBookTimers = () => {
    if (swingTimerRef.current) clearTimeout(swingTimerRef.current);
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    if (commitStageTimerRef.current) clearTimeout(commitStageTimerRef.current);
  };

  useEffect(() => {
    return () => {
      clearBookTimers();
    };
  }, []);

  const openBookCover = () => {
    clearBookTimers();
    setSelectedPoster(null);
    setBookStage("frontCover");
    setIsCoverSwinging(false);
    setFlippingSheet(null);
    setActivePageIndex(0);
    setBookModalOpen(true);
  };

  const handleOpenBookFromCover = () => {
    if (isCoverSwinging || bookStage === "pages") return;
    setIsCoverSwinging(true);
    swingTimerRef.current = setTimeout(() => {
      setActivePageIndex(0);
      setFlippingSheet(null);
      setBookStage("pages");
      setIsCoverSwinging(false);
    }, 380);
  };

  const handleNextPage = () => {
    if (flippingSheet) return;
    const outgoingPage = BOOK_MENU_SPREADS[activePageIndex];
    const isLastPage = activePageIndex === BOOK_MENU_SPREADS.length - 1;

    clearBookTimers();
    setFlippingSheet({ direction: "next", page: outgoingPage });

    commitStageTimerRef.current = setTimeout(() => {
      if (isLastPage) {
        setBookStage("backCover");
      } else {
        setActivePageIndex((prev) => prev + 1);
      }
    }, 180);

    flipTimerRef.current = setTimeout(() => {
      setFlippingSheet(null);
    }, 430);
  };

  const handlePrevPage = () => {
    if (flippingSheet) return;
    const outgoingPage = BOOK_MENU_SPREADS[activePageIndex];

    clearBookTimers();
    setFlippingSheet({ direction: "prev", page: outgoingPage });

    commitStageTimerRef.current = setTimeout(() => {
      if (activePageIndex === 0) {
        setBookStage("frontCover");
      } else {
        setActivePageIndex((prev) => prev - 1);
      }
    }, 180);

    flipTimerRef.current = setTimeout(() => {
      setFlippingSheet(null);
    }, 430);
  };

  const goToPage = (targetIndex) => {
    if (flippingSheet) return;
    const outgoingPage = BOOK_MENU_SPREADS[activePageIndex];
    const direction = targetIndex >= activePageIndex ? "next" : "prev";

    clearBookTimers();
    setFlippingSheet({ direction, page: outgoingPage });

    commitStageTimerRef.current = setTimeout(() => {
      setBookStage("pages");
      setActivePageIndex(targetIndex);
    }, 180);

    flipTimerRef.current = setTimeout(() => {
      setFlippingSheet(null);
    }, 430);
  };

  const handleBackToCover = () => {
    clearBookTimers();
    setFlippingSheet(null);
    setIsCoverSwinging(false);
    setBookStage("frontCover");
  };

  const handleBackToLastPageFromBackCover = () => {
    clearBookTimers();
    setFlippingSheet(null);
    setActivePageIndex(BOOK_MENU_SPREADS.length - 1);
    setBookStage("pages");
  };

  const closeFullMenuBook = () => {
    clearBookTimers();
    setFlippingSheet(null);
    setIsCoverSwinging(false);
    setBookModalOpen(false);
  };

  const currentBookPage = BOOK_MENU_SPREADS[activePageIndex];

  return (
    <div className="min-h-screen overflow-x-clip flex flex-col font-sans selection:bg-fluxYellow selection:text-fluxBlue">
      {/* Top Checkered Strip */}
      <div className="h-3.5 sm:h-5 w-full checkered-red border-b-3 sm:border-b-4 border-fluxBlue" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-fluxCream/95 backdrop-blur border-b-3 sm:border-b-4 border-fluxBlue">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-fluxBlue bg-[#E5E5E5] overflow-hidden shadow-brutal-sm flex items-center justify-center shrink-0">
              <img
                src="/image/logo-flux.png"
                alt="FLUX StreetCoffee Logo"
                className="w-full h-full object-contain scale-110 mix-blend-multiply"
              />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wide text-fluxRed block leading-none">
                FLUX
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-fluxBlue">
                StreetCoffee
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
            <a href="#about" className="hover:text-fluxRed transition-colors">
              About & Story
            </a>
            <a
              href="#menu-drop"
              className="hover:text-fluxRed transition-colors"
            >
              Menu Drop
            </a>
            <a href="#spot" className="hover:text-fluxRed transition-colors">
              Street Bar & Spot
            </a>
            <a
              href="https://instagram.com/flux.streetcoffee"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-fluxYellow text-fluxBlue px-4 py-2.5 rounded-xl border-3 border-fluxBlue shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
              flux.streetcoffee
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border-2 border-fluxBlue bg-fluxYellow shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-fluxCream border-b-4 border-fluxBlue px-4 py-4 space-y-3 font-bold text-sm uppercase">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-fluxRed"
            >
              About & Story
            </a>
            <a
              href="#menu-drop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-fluxRed"
            >
              Menu Drop
            </a>
            <a
              href="#spot"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-fluxRed"
            >
              Street Bar & Spot
            </a>
            <a
              href="https://instagram.com/flux.streetcoffee"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-fluxRed text-white px-4 py-2 rounded-xl border-2 border-fluxBlue text-xs"
            >
              <InstagramIcon className="w-4 h-4" />
              Follow flux.streetcoffee
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-paper-texture border-b-3 sm:border-b-4 border-fluxBlue pt-5 pb-6 sm:py-14 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-5 sm:gap-10 items-center">
          {/* Mascot / Brand Card — Paling atas di mobile */}
          <div className="order-first lg:order-last lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-sm bg-fluxRed rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-fluxBlue p-3 sm:p-5 shadow-brutal sm:rotate-1 sm:hover:rotate-0 transition-transform">
              <div className="absolute -top-3 right-2 sm:-top-5 sm:-right-4 bg-fluxYellow text-fluxBlue font-display font-bold text-[10px] sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-fluxBlue rotate-6 sm:rotate-12 shadow-brutal-sm z-10">
                NEW DROP. WILD SIP!
              </div>

              <div className="bg-[#E5E5E5] rounded-xl sm:rounded-2xl border-2 sm:border-3 border-fluxBlue p-3 sm:p-5 flex flex-col items-center text-center">
                <img
                  src="/image/logo-flux.png"
                  alt="Mascot FLUX StreetCoffee"
                  className="w-28 h-28 sm:w-52 sm:h-52 object-contain"
                />
                <div className="mt-2 bg-fluxCream w-full py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg sm:rounded-xl border-2 border-fluxBlue">
                  <p className="font-display text-sm sm:text-xl font-bold text-fluxRed tracking-wide leading-none">
                    FLUX STREETCOFFEE
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-fluxBlue mt-1">
                    in every Motion, get a Notion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Content — Di bawah kartu pada mobile */}
          <div className="order-last lg:order-first lg:col-span-7 space-y-3 sm:space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-fluxYellow px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-fluxBlue shadow-brutal-sm font-bold text-[11px] sm:text-sm uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fluxRed" />
              Coffee Street Bar • Salatiga
            </div>

            <h1 className="font-display text-[30px] sm:text-6xl lg:text-7xl font-bold leading-[1.06] text-fluxBlue">
              IN EVERY <span className="text-fluxRed">MOTION,</span>
              <br />
              GET A{" "}
              <span className="bg-fluxYellow px-2.5 sm:px-3 rounded-lg sm:rounded-xl border-2 sm:border-3 border-fluxBlue inline-block -rotate-1">
                NOTION.
              </span>
            </h1>

            <p className="text-xs sm:text-lg font-medium text-fluxBlue/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              <strong>FLUX StreetCoffee</strong> menghadirkan pengalaman
              menikmati kopi secara lebih santai, praktis, dan dekat dengan
              keseharian. Kopi tanpa batasan suasana untuk menemani setiap
              langkah dan pergerakanmu.
            </p>
          </div>
        </div>
      </section>

      {/* Street Chase Animation Banner */}
      <div className="relative w-full bg-fluxYellow border-b-3 sm:border-b-4 border-fluxBlue overflow-hidden pt-2 pb-0 select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest text-fluxBlue/80">
          <span>★ IN EVERY MOTION, GET A NOTION ★</span>
          <span className="hidden sm:inline">★ SALATIGA STREET COFFEE ★</span>
        </div>

        <div className="relative h-22 sm:h-32 w-full">
          <div className="animate-street-convoy absolute bottom-2 sm:bottom-2.5 left-full w-max flex items-end gap-6 sm:gap-12 will-change-transform">
            {/* 1. Bajaj di Depan */}
            <div className="relative shrink-0 flex items-center">
              <img
                src="/image/bajaj-flux.png"
                alt="Bajaj FLUX StreetCoffee"
                className="h-15 sm:h-24 w-auto object-contain animate-bajaj-rumble drop-shadow-[3px_3px_0px_rgba(18,24,166,0.25)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 sm:-right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-1.5"
              >
                <span className="animate-wind-1 w-5 sm:w-8 h-0.5 sm:h-1 rounded-full bg-fluxBlue inline-block" />
                <span className="animate-wind-2 w-3.5 sm:w-5 h-0.5 sm:h-1 rounded-full bg-fluxRed inline-block ml-1" />
                <span className="animate-wind-3 w-4 sm:w-7 h-0.5 sm:h-1 rounded-full bg-fluxBlue inline-block" />
              </div>
            </div>

            {/* 2. Maskot FLUX Berlari Mengejar */}
            <div className="relative shrink-0 flex items-center">
              <img
                src="/image/flux-lari.png"
                alt="Maskot FLUX Mengejar Bajaj"
                className="h-12 sm:h-20 w-auto object-contain animate-flux-pursuit drop-shadow-[3px_3px_0px_rgba(18,24,166,0.25)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-1.5"
              >
                <span className="animate-wind-2 w-4 sm:w-6 h-0.5 sm:h-1 rounded-full bg-fluxRed inline-block" />
                <span className="animate-wind-1 w-3.5 sm:w-5 h-0.5 sm:h-1 rounded-full bg-fluxBlue inline-block ml-1" />
              </div>
            </div>

            {/* 3. Sepeda Kalcer Mengikuti di Belakang */}
            <div className="relative shrink-0 flex items-center">
              <img
                src="/image/sepeda-kalcer-flux.png"
                alt="Sepeda Kalcer FLUX"
                className="h-15 sm:h-24 w-auto object-contain animate-bike-pursuit"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-1.5"
              >
                <span className="animate-wind-3 w-4 sm:w-6 h-0.5 sm:h-1 rounded-full bg-fluxBlue inline-block" />
                <span className="animate-wind-1 w-3.5 sm:w-5 h-0.5 sm:h-1 rounded-full bg-fluxRed inline-block ml-1" />
              </div>
            </div>

            {/* 4. Motor Custom Mengejar Paling Belakang */}
            <div className="relative shrink-0 flex items-center">
              <img
                src="/image/motor-custom-flux.png"
                alt="Motor Custom FLUX"
                className="h-15 sm:h-24 w-auto object-contain animate-moto-pursuit"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 sm:-right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-1.5"
              >
                <span className="animate-wind-1 w-5 sm:w-7 h-0.5 sm:h-1 rounded-full bg-fluxRed inline-block" />
                <span className="animate-wind-2 w-3.5 sm:w-6 h-0.5 sm:h-1 rounded-full bg-fluxBlue inline-block ml-1" />
                <span className="animate-wind-3 w-3.5 sm:w-5 h-0.5 sm:h-1 rounded-full bg-fluxRed inline-block" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-1.5 sm:bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-fluxBlue" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 sm:h-2 checkered-blue" />
        </div>
      </div>

      {/* Running Marquee */}
      <div className="bg-fluxBlue text-fluxYellow border-b-3 sm:border-b-4 border-fluxBlue py-2.5 sm:py-3 overflow-hidden font-display text-sm sm:text-lg tracking-wider uppercase">
        <div className="animate-marquee gap-6 sm:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-5 sm:gap-6">
              <span>IN EVERY MOTION, GET A NOTION</span>
              <span className="text-fluxRed">★</span>
              <span>FLUX STREETCOFFEE</span>
              <span className="text-white">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* About & Story Section */}
      <section
        id="about"
        className="bg-paper-texture py-12 sm:py-24 px-4 sm:px-6 border-b-3 sm:border-b-4 border-fluxBlue"
      >
        <div className="max-w-6xl mx-auto space-y-7 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-fluxBlue text-fluxYellow font-bold text-[11px] sm:text-xs uppercase tracking-widest px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-2 border-fluxBlue shadow-brutal-sm mb-2.5 sm:mb-3">
                <Compass className="w-3.5 h-3.5 text-fluxRed" />
                01 // About & Story
              </span>
              <h2 className="font-display text-[28px] sm:text-5xl font-bold text-fluxBlue leading-tight">
                KOPI JALANAN YANG{" "}
                <span className="text-fluxRed underline decoration-4 decoration-fluxYellow underline-offset-4">
                  SELALU BERGERAK.
                </span>
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-fluxBlue shadow-brutal-sm text-xs sm:text-sm font-bold text-fluxBlue self-start md:self-auto">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-fluxRed inline-block" />
              Salatiga • Street Culture • Daily Brew
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
            <div className="md:col-span-6 bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-fluxBlue p-5 sm:p-8 shadow-brutal flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                  <span className="inline-block bg-fluxRed text-white font-bold text-[11px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-lg border-2 border-fluxBlue">
                    Brand Profile
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold text-fluxBlue/50">
                    #PROFILE
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-fluxBlue mb-3 sm:mb-4 leading-tight">
                  Kopi Tanpa Batasan Suasana
                </h3>

                <p className="text-sm sm:text-base text-fluxBlue/90 leading-relaxed font-medium">
                  <strong>FLUX StreetCoffee</strong> merupakan brand kopi dengan
                  konsep <em>street coffee</em> yang menghadirkan pengalaman
                  menikmati kopi secara lebih santai, praktis, dan dekat dengan
                  keseharian. Berangkat dari semangat menikmati kopi tanpa
                  batasan suasana, FLUX ingin menjadi bagian dari aktivitas dan
                  rutinitas setiap orang melalui sajian kopi yang menemani
                  berbagai momen.
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t-2 border-dashed border-fluxBlue/25 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="text-[11px] sm:text-xs font-bold bg-fluxCream text-fluxBlue px-2.5 sm:px-3 py-1 rounded-full border-2 border-fluxBlue">
                    Santai & Praktis
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold bg-fluxYellow text-fluxBlue px-2.5 sm:px-3 py-1 rounded-full border-2 border-fluxBlue">
                    Dekat Keseharian
                  </span>
                </div>
                <img
                  src="/image/sepeda-kalcer-flux.png"
                  alt="Sepeda Kalcer FLUX"
                  className="h-10 sm:h-12 w-auto object-contain shrink-0"
                />
              </div>
            </div>

            <div className="md:col-span-6 bg-fluxYellow rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-fluxBlue p-5 sm:p-8 shadow-brutal flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                  <span className="inline-block bg-fluxBlue text-fluxYellow font-bold text-[11px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-lg border-2 border-fluxBlue">
                    Our Story
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold text-fluxBlue/60">
                    #STORY
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-fluxBlue mb-3 sm:mb-4 leading-tight">
                  Life Is Always Moving
                </h3>

                <div className="space-y-3 text-sm sm:text-base text-fluxBlue font-medium leading-relaxed">
                  <p className="bg-fluxCream/85 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 border-fluxBlue font-semibold italic">
                    “Life is always moving. Every step, every journey, and every
                    little moment brings something new.”
                  </p>
                  <p>
                    FLUX hadir di tengah dinamika tersebut. Kami percaya bahwa
                    inspirasi bisa datang kapan saja, bahkan dari hal sederhana
                    seperti menikmati secangkir kopi di sela kesibukan.
                  </p>
                  <p className="font-bold">
                    Lebih dari sekadar kopi, FLUX adalah tentang pergerakan,
                    ide, dan cerita yang terus berkembang. Karena di setiap
                    pergerakan, selalu ada gagasan baru untuk ditemukan.
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t-2 border-dashed border-fluxBlue/30 flex items-center justify-between gap-3">
                <span className="font-display text-[11px] sm:text-sm font-bold uppercase tracking-wider text-fluxRed bg-fluxCream px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-fluxBlue">
                  In every Motion, get a Notion
                </span>
                <img
                  src="/image/motor-custom-flux.png"
                  alt="Motor Custom FLUX"
                  className="h-10 sm:h-12 w-auto object-contain shrink-0"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3.5 sm:gap-6">
            <div className="bg-white rounded-2xl border-2 sm:border-3 border-fluxBlue p-4 sm:p-5 shadow-brutal-sm flex items-start gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-fluxRed text-white border-2 border-fluxBlue flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-fluxBlue leading-tight">
                  MOTION
                </h4>
                <p className="text-xs sm:text-sm font-medium text-fluxBlue/80 mt-1 leading-relaxed">
                  Menemani setiap langkah, perjalanan, dan ritme harian yang
                  terus berjalan.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 sm:border-3 border-fluxBlue p-4 sm:p-5 shadow-brutal-sm flex items-start gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-fluxYellow text-fluxBlue border-2 border-fluxBlue flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-fluxBlue leading-tight">
                  NOTION
                </h4>
                <p className="text-xs sm:text-sm font-medium text-fluxBlue/80 mt-1 leading-relaxed">
                  Gagasan dan cerita baru yang tumbuh dari momen santai bersama
                  segelas brew.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 sm:border-3 border-fluxBlue p-4 sm:p-5 shadow-brutal-sm flex items-start gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-fluxBlue text-fluxYellow border-2 border-fluxBlue flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-fluxBlue leading-tight">
                  STREET BAR
                </h4>
                <p className="text-xs sm:text-sm font-medium text-fluxBlue/80 mt-1 leading-relaxed">
                  Sajian kopi dan wild sip yang akrab, praktis, dan bebas sekat
                  suasana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase Section */}
      <section
        id="menu"
        className="bg-fluxRed pt-6 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 border-b-3 sm:border-b-4 border-fluxBlue"
      >
        <div
          id="menu-drop"
          className="max-w-6xl mx-auto scroll-mt-20 sm:scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
            <div className="inline-block bg-fluxYellow text-fluxBlue font-display font-bold text-[11px] sm:text-sm px-4 sm:px-5 py-1 sm:py-1.5 rounded-full border-2 sm:border-3 border-fluxBlue shadow-brutal-sm uppercase">
              Meet Our New Menu's
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-fluxCream rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-fluxBlue p-4 sm:p-5 shadow-brutal flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div
                    onClick={() => setSelectedPoster(item)}
                    className="group relative aspect-square sm:aspect-[4/5] w-full rounded-xl sm:rounded-2xl border-2 sm:border-3 border-fluxBlue overflow-hidden mb-3.5 sm:mb-5 cursor-pointer bg-fluxBlue"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPoster(item);
                      }}
                      aria-label={`Perbesar poster ${item.name}`}
                      className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 bg-fluxCream/95 text-fluxBlue p-2 sm:p-2.5 rounded-xl border-2 border-fluxBlue shadow-brutal-sm active:scale-95 transition-transform"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-fluxRed leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-fluxBlue mt-0.5 mb-2">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-fluxBlue/85 leading-relaxed mb-3.5 sm:mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-fluxBlue/30 flex flex-wrap gap-1.5 sm:gap-2">
                  {item.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] sm:text-xs font-bold bg-white px-2.5 py-1 rounded-lg border-2 border-fluxBlue text-fluxBlue"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Lihat Menu Lengkap membuka Cover Buku */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <button
              type="button"
              onClick={openBookCover}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-fluxYellow text-fluxBlue font-display text-sm sm:text-lg font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-3 sm:border-4 border-fluxBlue shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-98 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-fluxRed" />
              Lihat Menu Lengkap
            </button>
          </div>
        </div>
      </section>

      {/* Street Bar & Location Section */}
      <section
        id="spot"
        className="bg-fluxBlue text-white py-12 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-7 sm:gap-10 items-center">
          <div className="space-y-4 sm:space-y-5">
            <span className="inline-block bg-fluxYellow text-fluxBlue font-bold text-[11px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-lg">
              Coffee Street Bar
            </span>
            <h2 className="font-display text-[28px] sm:text-5xl font-bold leading-tight">
              MAMPIR & TEMUKAN GAGASAN BARUMU.
            </h2>
            <p className="text-xs sm:text-base text-white/85 leading-relaxed">
              Nikmati racikan kopi dan minuman segar langsung di street bar kami
              maupun saat FLUX hadir di berbagai event pop-up kota.
            </p>

            <div className="space-y-2.5 sm:space-y-3 pt-1">
              <div className="flex items-start gap-3 bg-white/10 p-3.5 sm:p-4 rounded-2xl border-2 border-white/20">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-fluxYellow shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-fluxYellow">
                    Lokasi Street Bar
                  </p>
                  <p className="text-xs sm:text-sm text-white/90">
                    Jl. Yos Sudarso, Cungkup, Salatiga
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 p-3.5 sm:p-4 rounded-2xl border-2 border-white/20">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-fluxYellow shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-fluxYellow">
                    Jam Operasional
                  </p>
                  <p className="text-xs sm:text-sm text-white/90">
                    16.00 – 23.00 WIB (Cek Instagram untuk jadwal pop-up event)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-fluxCream text-fluxBlue rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-fluxYellow p-5 sm:p-8 shadow-[6px_6px_0px_0px_#E11D2E] sm:shadow-[8px_8px_0px_0px_#E11D2E]">
            <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-fluxRed text-white flex items-center justify-center border-2 border-fluxBlue shrink-0">
                <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="font-display text-lg sm:text-xl font-bold">
                  flux.streetcoffee
                </p>
                <p className="text-[11px] sm:text-xs font-bold uppercase text-fluxBlue/70">
                  Official Instagram
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed mb-5 sm:mb-6">
              Ikuti perjalanan FLUX StreetCoffee, info menu drop terbaru,
              dokumentasi pop-up market, dan keseruan di balik bar kami.
            </p>

            <a
              href="https://instagram.com/flux.streetcoffee"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-fluxRed text-white font-display text-sm sm:text-lg py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-fluxBlue shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Kunjungi Instagram FLUX
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fluxCream text-fluxBlue py-6 sm:py-8 px-4 sm:px-6 border-t-3 sm:border-t-4 border-fluxBlue">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs sm:text-sm font-bold text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} FLUX StreetCoffee. All rights reserved.
          </p>
          <p className="font-display text-fluxRed tracking-wide">
            IN EVERY MOTION, GET A NOTION.
          </p>
        </div>
      </footer>

      {/* Bottom Checkered Strip */}
      <div className="h-3.5 sm:h-5 w-full checkered-blue border-t-3 sm:border-t-4 border-fluxBlue" />

      {/* Lightbox Modal untuk Poster Satuan Kartu Menu */}
      {selectedPoster && (
        <div
          onClick={() => setSelectedPoster(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 sm:p-6 gap-3"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full bg-fluxCream rounded-3xl border-4 border-fluxYellow p-2.5 sm:p-3 shadow-[8px_8px_0px_0px_#1218A6]"
          >
            <button
              type="button"
              onClick={() => setSelectedPoster(null)}
              className="absolute -top-3.5 -right-3.5 z-20 bg-fluxRed text-white p-2 rounded-full border-3 border-fluxBlue shadow-brutal-sm active:scale-95 transition-transform cursor-pointer"
              aria-label="Tutup pratinjau menu"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <img
              src={selectedPoster.image}
              alt={selectedPoster.name}
              className="w-full max-h-[76vh] object-contain rounded-2xl border-2 border-fluxBlue bg-fluxCream"
            />
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {MENU_ITEMS.map((menu) => {
              const isActive = selectedPoster.id === menu.id;
              return (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => setSelectedPoster(menu)}
                  className={`px-3.5 py-1.5 rounded-xl font-display text-xs sm:text-sm font-bold border-2 border-fluxBlue transition-all cursor-pointer ${
                    isActive
                      ? "bg-fluxYellow text-fluxBlue shadow-brutal-sm -translate-y-0.5"
                      : "bg-fluxCream text-fluxBlue/80 hover:bg-white"
                  }`}
                >
                  {menu.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Buku Lengkap: Cover Depan -> 2-Page Spread UI -> Cover Belakang */}
      {bookModalOpen && (
        <div
          onClick={closeFullMenuBook}
          className="book-scene fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 sm:p-6 gap-3.5 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-book-modal-enter relative w-full max-w-md md:max-w-4xl"
          >
            {/* Tombol Tutup Buku */}
            <button
              type="button"
              onClick={closeFullMenuBook}
              className="absolute -top-3.5 -right-3.5 z-40 bg-fluxRed text-white p-2 rounded-full border-3 border-fluxBlue shadow-brutal-sm active:scale-95 transition-transform cursor-pointer"
              aria-label="Tutup buku menu lengkap"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {bookStage === "frontCover" && (
              /* MODE 1: HARDCOVER DEPAN BUKU TERTUTUP */
              <div
                className={`${
                  isCoverSwinging ? "animate-hardcover-swing-open" : ""
                } book-page-stack relative max-w-sm sm:max-w-md mx-auto rounded-r-3xl rounded-l-xl border-4 border-fluxBlue bg-fluxRed overflow-hidden`}
              >
                {/* Punggung / Spine Hardcover di sisi kiri */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-fluxBlue border-r-3 border-fluxBlue flex flex-col justify-between py-6 items-center z-10"
                >
                  <span className="w-2 h-2 rounded-full bg-fluxYellow" />
                  <span className="w-1 h-24 rounded-full bg-fluxCream/30" />
                  <span className="w-2 h-2 rounded-full bg-fluxYellow" />
                </div>

                {/* Pita Bookmark Kuning */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute top-0 right-7 w-5 h-14 bg-fluxYellow border-x-2 border-b-2 border-fluxBlue z-10"
                />

                <div className="pl-9 sm:pl-12 pr-5 sm:pr-7 py-6 sm:py-8 flex flex-col items-center text-center bg-fluxRed">
                  <span className="inline-block bg-fluxYellow text-fluxBlue font-display text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border-2 border-fluxBlue shadow-brutal-sm mb-4">
                    FLUX STREETCOFFEE • EDITION
                  </span>

                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-3 border-fluxBlue bg-[#E5E5E5] p-2.5 shadow-brutal-sm flex items-center justify-center mb-4">
                    <img
                      src="/image/logo-flux.png"
                      alt="Cover Buku FLUX StreetCoffee"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-fluxYellow leading-none tracking-wide">
                    FLUX MENU BOOK
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-fluxCream mt-2.5 max-w-[260px] leading-relaxed">
                    Buka halaman menu lengkap kopi & makanan FLUX StreetCoffee.
                  </p>

                  <button
                    type="button"
                    onClick={handleOpenBookFromCover}
                    disabled={isCoverSwinging}
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-fluxYellow text-fluxBlue font-display text-sm sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl border-3 border-fluxBlue shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-98 transition-all cursor-pointer disabled:opacity-80"
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-fluxRed" />
                    Lihat Menu
                  </button>
                </div>
              </div>
            )}

            {bookStage === "pages" && currentBookPage && (
              /* MODE 2: BUKU TERBUKA DUA HALAMAN UI SIMETRIS (PREV DI KIRI, NEXT DI KANAN) */
              <div className="book-spread-stage relative">
                {/* LEMBARAN HALAMAN KANAN BERGERAK KE KIRI SEPERTI MEMBUKA BUKU (NEXT) */}
                {flippingSheet && flippingSheet.direction === "next" && (
                  <div
                    aria-hidden="true"
                    className="animate-sheet-swing-left absolute top-0 bottom-0 right-0 w-full md:w-1/2 rounded-2xl md:rounded-l-none md:rounded-r-3xl border-4 md:border-l-2 border-fluxBlue bg-white p-4 sm:p-6 flex flex-col justify-between gap-4 z-30 pointer-events-none"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block bg-fluxRed text-white font-display text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border-2 border-fluxBlue">
                          FLUX MENU LIST
                        </span>
                        <span className="font-display text-xs font-bold text-fluxBlue/70">
                          {flippingSheet.page.tabTitle.toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-fluxBlue leading-tight">
                          {flippingSheet.page.rightHeading}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-fluxBlue/80 mt-0.5">
                          {flippingSheet.page.rightSubtitle}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {flippingSheet.page.rightItems.map((item) => (
                          <div
                            key={item.name}
                            className="bg-fluxCream rounded-2xl border-2 border-fluxBlue p-3 shadow-brutal-sm flex items-start justify-between gap-2.5"
                          >
                            <div>
                              <p className="font-display text-sm sm:text-base font-bold text-fluxBlue leading-snug">
                                {item.name}
                              </p>
                              <p className="text-xs font-medium text-fluxBlue/75 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <span className="shrink-0 bg-fluxRed text-white font-display text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-fluxBlue">
                              {item.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t-2 border-dashed border-fluxBlue/25 flex items-center justify-between gap-2 text-xs font-bold text-fluxBlue/80">
                      <span>{flippingSheet.page.footerNote}</span>
                      <span className="font-display text-fluxRed">FLUX</span>
                    </div>
                  </div>
                )}

                {/* LEMBARAN HALAMAN KIRI BERGERAK KE KANAN SEPERTI MEMBUKA BUKU (PREV) */}
                {flippingSheet && flippingSheet.direction === "prev" && (
                  <div
                    aria-hidden="true"
                    className="animate-sheet-swing-right absolute top-0 bottom-0 left-0 w-full md:w-1/2 rounded-2xl md:rounded-r-none md:rounded-l-3xl border-4 md:border-r-2 border-fluxBlue bg-fluxCream p-4 sm:p-6 flex flex-col justify-between gap-4 z-30 pointer-events-none"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-white text-fluxBlue font-display text-xs font-bold uppercase px-3 py-1.5 rounded-xl border-2 border-fluxBlue">
                          <RotateCcw className="w-3.5 h-3.5" />
                          Cover
                        </span>
                        <span className="font-display text-xs font-bold text-fluxRed bg-fluxYellow px-2.5 py-1 rounded-lg border-2 border-fluxBlue">
                          HAL. {flippingSheet.page.pageNumber}
                        </span>
                      </div>

                      <div>
                        <span className="inline-block bg-fluxBlue text-fluxYellow font-display text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-1">
                          {flippingSheet.page.tabTitle}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-fluxBlue leading-tight">
                          {flippingSheet.page.leftHeading}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-fluxBlue/80 mt-0.5">
                          {flippingSheet.page.leftSubtitle}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {flippingSheet.page.leftItems.map((item) => (
                          <div
                            key={item.name}
                            className="bg-white rounded-2xl border-2 border-fluxBlue p-3 shadow-brutal-sm flex items-start justify-between gap-2.5"
                          >
                            <div>
                              <p className="font-display text-sm sm:text-base font-bold text-fluxBlue leading-snug">
                                {item.name}
                              </p>
                              <p className="text-xs font-medium text-fluxBlue/75 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <span className="shrink-0 bg-fluxYellow text-fluxBlue font-display text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-fluxBlue">
                              {item.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t-2 border-dashed border-fluxBlue/25 text-[11px] font-bold uppercase tracking-wider text-fluxBlue/65">
                      <span>FLUX STREETCOFFEE</span>
                      <span>HAL. {flippingSheet.page.pageNumber}</span>
                    </div>
                  </div>
                )}

                {/* KONTEN HALAMAN AKTIF */}
                <div
                  key={currentBookPage.id}
                  className="animate-spread-reveal-in relative rounded-2xl sm:rounded-3xl border-4 border-fluxBlue bg-fluxCream shadow-[10px_10px_0px_0px_#1218A6] grid md:grid-cols-2"
                >
                  {/* Lipatan Tengah Buku Simetris di Desktop */}
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-5 book-center-gutter z-20 pointer-events-none"
                  />

                  {/* HALAMAN KIRI — TOMBOL PREV DI KIRI */}
                  <div className="bg-fluxCream p-4 sm:p-6 rounded-t-xl md:rounded-l-2xl md:rounded-tr-none border-b-4 md:border-b-0 md:border-r-2 border-fluxBlue flex flex-col justify-between gap-4">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={handleBackToCover}
                          className="inline-flex items-center gap-1.5 bg-white text-fluxBlue font-display text-xs font-bold uppercase px-3 py-1.5 rounded-xl border-2 border-fluxBlue shadow-brutal-sm hover:bg-fluxYellow transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Cover
                        </button>

                        <span className="font-display text-xs font-bold text-fluxRed bg-fluxYellow px-2.5 py-1 rounded-lg border-2 border-fluxBlue">
                          HAL. {currentBookPage.pageNumber}
                        </span>
                      </div>

                      <div>
                        <span className="inline-block bg-fluxBlue text-fluxYellow font-display text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-1">
                          {currentBookPage.tabTitle}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-fluxBlue leading-tight">
                          {currentBookPage.leftHeading}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-fluxBlue/80 mt-0.5">
                          {currentBookPage.leftSubtitle}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {currentBookPage.leftItems.map((item) => (
                          <div
                            key={item.name}
                            className="bg-white rounded-2xl border-2 border-fluxBlue p-3 shadow-brutal-sm flex items-start justify-between gap-2.5"
                          >
                            <div>
                              <p className="font-display text-sm sm:text-base font-bold text-fluxBlue leading-snug">
                                {item.name}
                              </p>
                              <p className="text-xs font-medium text-fluxBlue/75 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <span className="shrink-0 bg-fluxYellow text-fluxBlue font-display text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-fluxBlue">
                              {item.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t-2 border-dashed border-fluxBlue/25">
                      <button
                        type="button"
                        onClick={handlePrevPage}
                        disabled={Boolean(flippingSheet)}
                        className="inline-flex items-center gap-1 bg-fluxYellow text-fluxBlue font-display text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl border-2 border-fluxBlue shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer disabled:opacity-60"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                      </button>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-fluxBlue/65">
                        {activePageIndex + 1} / {BOOK_MENU_SPREADS.length}
                      </span>
                    </div>
                  </div>

                  {/* HALAMAN KANAN — TOMBOL NEXT DI KANAN */}
                  <div className="bg-white p-4 sm:p-6 rounded-b-xl md:rounded-r-2xl md:rounded-bl-none md:border-l-2 border-fluxBlue flex flex-col justify-between gap-4">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block bg-fluxRed text-white font-display text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border-2 border-fluxBlue">
                          FLUX MENU LIST
                        </span>
                        <span className="font-display text-xs font-bold text-fluxBlue/70">
                          {currentBookPage.tabTitle.toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-fluxBlue leading-tight">
                          {currentBookPage.rightHeading}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-fluxBlue/80 mt-0.5">
                          {currentBookPage.rightSubtitle}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {currentBookPage.rightItems.map((item) => (
                          <div
                            key={item.name}
                            className="bg-fluxCream rounded-2xl border-2 border-fluxBlue p-3 shadow-brutal-sm flex items-start justify-between gap-2.5"
                          >
                            <div>
                              <p className="font-display text-sm sm:text-base font-bold text-fluxBlue leading-snug">
                                {item.name}
                              </p>
                              <p className="text-xs font-medium text-fluxBlue/75 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <span className="shrink-0 bg-fluxRed text-white font-display text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-fluxBlue">
                              {item.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t-2 border-dashed border-fluxBlue/25 flex items-center justify-between gap-2 text-xs font-bold text-fluxBlue/80">
                      <span>{currentBookPage.footerNote}</span>

                      <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={Boolean(flippingSheet)}
                        className="inline-flex items-center gap-1 bg-fluxYellow text-fluxBlue font-display text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl border-2 border-fluxBlue shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer shrink-0 disabled:opacity-60"
                      >
                        {activePageIndex === BOOK_MENU_SPREADS.length - 1
                          ? "Back Cover"
                          : "Next"}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {bookStage === "backCover" && (
              /* MODE 3: COVER BELAKANG BUKU */
              <div className="animate-spread-reveal-in book-back-stack relative max-w-sm sm:max-w-md mx-auto rounded-l-3xl rounded-r-xl border-4 border-fluxBlue bg-fluxBlue overflow-hidden">
                {/* Punggung / Spine Hardcover di sisi kanan */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 bg-fluxRed border-l-3 border-fluxBlue flex flex-col justify-between py-6 items-center z-10"
                >
                  <span className="w-2 h-2 rounded-full bg-fluxYellow" />
                  <span className="w-1 h-24 rounded-full bg-fluxCream/35" />
                  <span className="w-2 h-2 rounded-full bg-fluxYellow" />
                </div>

                <div className="pr-9 sm:pr-12 pl-5 sm:pl-7 py-6 sm:py-8 flex flex-col items-center text-center bg-fluxBlue text-white">
                  <span className="inline-block bg-fluxYellow text-fluxBlue font-display text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border-2 border-fluxBlue shadow-brutal-sm mb-4">
                    END OF MENU BOOK
                  </span>

                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-3 border-fluxYellow bg-[#E5E5E5] p-2.5 shadow-brutal-sm flex items-center justify-center mb-4">
                    <img
                      src="/image/logo-flux.png"
                      alt="Back Cover FLUX StreetCoffee"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-fluxYellow leading-tight">
                    IN EVERY MOTION, GET A NOTION.
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-fluxCream/90 mt-2 max-w-[270px] leading-relaxed">
                    Jl. Yos Sudarso, Cungkup, Salatiga • Buka 16.00 – 23.00 WIB
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleBackToLastPageFromBackCover}
                      className="inline-flex items-center gap-1.5 bg-fluxYellow text-fluxBlue font-display text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border-2 border-fluxBlue shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Kembali ke Menu
                    </button>

                    <button
                      type="button"
                      onClick={handleBackToCover}
                      className="inline-flex items-center gap-1.5 bg-fluxCream text-fluxBlue font-display text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border-2 border-fluxBlue shadow-brutal-sm hover:bg-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Cover Depan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tab pemilih halaman saat berada di halaman buku atau cover belakang */}
          {(bookStage === "pages" || bookStage === "backCover") && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {BOOK_MENU_SPREADS.map((page, idx) => {
                const isActive =
                  bookStage === "pages" && idx === activePageIndex;
                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => goToPage(idx)}
                    className={`px-3.5 py-1.5 rounded-xl font-display text-xs sm:text-sm font-bold border-2 border-fluxBlue transition-all cursor-pointer ${
                      isActive
                        ? "bg-fluxYellow text-fluxBlue shadow-brutal-sm -translate-y-0.5"
                        : "bg-fluxCream text-fluxBlue/80 hover:bg-white"
                    }`}
                  >
                    {page.tabTitle.toUpperCase()}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setBookStage("backCover")}
                className={`px-3.5 py-1.5 rounded-xl font-display text-xs sm:text-sm font-bold border-2 border-fluxBlue transition-all cursor-pointer ${
                  bookStage === "backCover"
                    ? "bg-fluxYellow text-fluxBlue shadow-brutal-sm -translate-y-0.5"
                    : "bg-fluxCream text-fluxBlue/80 hover:bg-white"
                }`}
              >
                BACK COVER
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

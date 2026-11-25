import React, { useState } from "react";
import {
  Instagram,
  MapPin,
  Clock,
  Sparkles,
  Coffee,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const MENU_ITEMS = [
  {
    id: 1,
    name: "ORANGE POP",
    badge: "NEW DROP",
    tagline: "Orange Meets Cloudy Foam",
    description:
      "New line up of our refreshment that combines fresh oranges with our secret cream recipe to cheer you up.",
    ingredients: ["Fresh Orange", "Secret Cream Foam"],
    accent: "bg-fluxYellow",
    image: "/images/orange-pop.png",
  },
  {
    id: 2,
    name: "SUNSET POP",
    badge: "SIGNATURE",
    tagline: "Sunset Vibes in a Cup",
    description:
      "Perpaduan bold espresso, kesegaran jeruk pilihan, dan lapisan creamy secret foam untuk menemani sore hari.",
    ingredients: ["Bold Coffee", "Fresh Orange", "Secret Foam"],
    accent: "bg-fluxRed text-white",
    image: "/images/sunset-pop.png",
  },
  {
    id: 3,
    name: "CORNSTAR",
    badge: "WILD SIP",
    tagline: "Sweet Meets Cheese",
    description:
      "Unique selection untuk menikmati 'jasuke' dengan cara baru. Creamy, savory, dan manis dalam satu tegukan.",
    ingredients: ["Sweet Corn", "Creamy Milk", "Cheese Cream"],
    accent: "bg-fluxYellow",
    image: "/images/cornstar.png",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-fluxYellow selection:text-fluxBlue">
      {/* Top Checkered Strip */}
      <div className="h-5 w-full checkered-red border-b-4 border-fluxBlue" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-fluxCream/95 backdrop-blur border-b-4 border-fluxBlue">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl border-3 border-fluxBlue bg-white overflow-hidden shadow-brutal-sm flex items-center justify-center">
              <img
                src="/images/logo-flux.png"
                alt="FLUX StreetCoffee Logo"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="hidden font-display font-bold text-fluxRed text-lg">
                FLUX
              </span>
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-wide text-fluxRed block leading-none">
                FLUX
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-fluxBlue">
                StreetCoffee
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
            <a href="#about" className="hover:text-fluxRed transition-colors">
              About & Story
            </a>
            <a href="#menu" className="hover:text-fluxRed transition-colors">
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
              <Instagram className="w-4 h-4" />
              @flux.streetcoffee
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border-2 border-fluxBlue bg-fluxYellow"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-fluxCream border-b-4 border-fluxBlue px-4 py-5 space-y-4 font-bold uppercase">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-fluxRed"
            >
              About & Story
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-fluxRed"
            >
              Menu Drop
            </a>
            <a
              href="#spot"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-fluxRed"
            >
              Street Bar & Spot
            </a>
            <a
              href="https://instagram.com/flux.streetcoffee"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-fluxRed text-white px-4 py-2 rounded-xl border-2 border-fluxBlue"
            >
              <Instagram className="w-4 h-4" />
              Follow @flux.streetcoffee
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-paper-texture border-b-4 border-fluxBlue py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-fluxYellow px-4 py-1.5 rounded-full border-2 border-fluxBlue shadow-brutal-sm font-bold text-xs sm:text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-fluxRed" />
              Coffee Street Bar • Salatiga
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-fluxBlue">
              IN EVERY <span className="text-fluxRed">MOTION,</span>
              <br />
              GET A{" "}
              <span className="bg-fluxYellow px-3 rounded-xl border-3 border-fluxBlue inline-block -rotate-1">
                NOTION.
              </span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-fluxBlue/90 max-w-xl leading-relaxed">
              <strong>FLUX StreetCoffee</strong> menghadirkan pengalaman
              menikmati kopi secara lebih santai, praktis, dan dekat dengan
              keseharian. Kopi tanpa batasan suasana untuk menemani setiap
              langkah dan pergerakanmu.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-fluxRed text-white font-display text-lg px-7 py-3.5 rounded-2xl border-3 border-fluxBlue shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
              >
                <Coffee className="w-5 h-5" />
                Explore Menu Drop
              </a>
              <a
                href="#spot"
                className="inline-flex items-center gap-2 bg-white text-fluxBlue font-display text-lg px-7 py-3.5 rounded-2xl border-3 border-fluxBlue shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
              >
                <MapPin className="w-5 h-5 text-fluxRed" />
                Find Our Bar
              </a>
            </div>
          </div>

          {/* Right Mascot / Brand Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-fluxRed rounded-3xl border-4 border-fluxBlue p-6 shadow-brutal rotate-1 hover:rotate-0 transition-transform">
              <div className="absolute -top-5 -right-4 bg-fluxYellow text-fluxBlue font-display font-bold text-sm px-4 py-2 rounded-full border-3 border-fluxBlue rotate-12 shadow-brutal-sm">
                NEW DROP. WILD SIP!
              </div>

              <div className="bg-fluxCream rounded-2xl border-3 border-fluxBlue p-6 flex flex-col items-center text-center">
                <img
                  src="/images/logo-flux.png"
                  alt="Mascot FLUX StreetCoffee"
                  className="w-56 h-56 object-contain drop-shadow-md"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <p className="mt-3 font-display text-2xl font-bold text-fluxRed tracking-wide">
                  FLUX STREETCOFFEE
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-fluxBlue mt-1">
                  in every Motion, get a Notion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Running Marquee */}
      <div className="bg-fluxBlue text-fluxYellow border-b-4 border-fluxBlue py-3 overflow-hidden font-display text-lg tracking-wider uppercase">
        <div className="animate-marquee gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6">
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
        className="py-16 sm:py-24 px-4 sm:px-6 bg-fluxCream border-b-4 border-fluxBlue"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Profil Card */}
          <div className="bg-white rounded-3xl border-4 border-fluxBlue p-8 shadow-brutal">
            <span className="inline-block bg-fluxRed text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-lg border-2 border-fluxBlue mb-4">
              Brand Profile
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-fluxBlue mb-4">
              Kopi Tanpa Batasan Suasana
            </h2>
            <p className="text-fluxBlue/90 leading-relaxed font-medium">
              <strong>FLUX StreetCoffee</strong> merupakan brand kopi dengan
              konsep <em>street coffee</em> yang menghadirkan pengalaman
              menikmati kopi secara lebih santai, praktis, dan dekat dengan
              keseharian. Berangkat dari semangat menikmati kopi tanpa batasan
              suasana, FLUX ingin menjadi bagian dari aktivitas dan rutinitas
              setiap orang melalui sajian kopi yang menemani berbagai momen.
            </p>
          </div>

          {/* Cerita Singkat Card */}
          <div className="bg-fluxYellow rounded-3xl border-4 border-fluxBlue p-8 shadow-brutal">
            <span className="inline-block bg-fluxBlue text-fluxYellow font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-lg mb-4">
              Our Story
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-fluxBlue mb-4">
              Life Is Always Moving
            </h2>
            <div className="space-y-3 text-fluxBlue font-medium leading-relaxed">
              <p>
                <em>
                  Life is always moving. Every step, every journey, and every
                  little moment brings something new.
                </em>
              </p>
              <p>
                FLUX hadir di tengah dinamika tersebut. Kami percaya bahwa
                inspirasi bisa datang kapan saja, bahkan dari hal sederhana
                seperti menikmati secangkir kopi di sela kesibukan.
              </p>
              <p className="font-bold">
                Lebih dari sekadar kopi, FLUX adalah tentang pergerakan, ide,
                dan cerita yang terus berkembang. Karena di setiap pergerakan,
                selalu ada gagasan baru untuk ditemukan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase Section */}
      <section
        id="menu"
        className="bg-fluxRed py-16 sm:py-24 px-4 sm:px-6 border-b-4 border-fluxBlue"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block bg-fluxYellow text-fluxBlue font-display font-bold text-sm px-5 py-1.5 rounded-full border-3 border-fluxBlue shadow-brutal-sm uppercase mb-3">
              Meet Our New Menu's
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white drop-shadow-[3px_3px_0px_#1218A6]">
              SIGNATURE & WILD SIP
            </h2>
            <p className="text-white/95 font-medium mt-3">
              Katalog lengkap dan daftar harga sedang disiapkan — berikut
              beberapa varian unggulan yang sudah hadir di bar kami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-fluxCream rounded-3xl border-4 border-fluxBlue p-6 shadow-brutal flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1 rounded-full border-2 border-fluxBlue ${item.accent}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-fluxBlue/70 uppercase">
                      FLUX DROP
                    </span>
                  </div>

                  {/* Product Visual Container */}
                  <div className="h-52 rounded-2xl bg-white border-3 border-fluxBlue mb-5 flex flex-col items-center justify-center p-4 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center text-center">
                      <Coffee className="w-12 h-12 text-fluxRed mb-2" />
                      <span className="font-display font-bold text-sm text-fluxBlue">
                        Foto {item.name}
                      </span>
                      <span className="text-xs text-fluxBlue/60">
                        (Tambahkan ke public{item.image})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-fluxRed">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-fluxBlue mb-2">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-fluxBlue/85 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-fluxBlue/30 flex flex-wrap gap-2">
                  {item.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold bg-white px-2.5 py-1 rounded-lg border-2 border-fluxBlue text-fluxBlue"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Full Catalog Coming Soon Banner */}
          <div className="mt-12 bg-fluxYellow rounded-2xl border-4 border-fluxBlue p-6 shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-fluxBlue">
                FULL MENU & HARGA SEGERA HADIR
              </h3>
              <p className="text-sm font-medium text-fluxBlue/90">
                Pantau pembaruan menu harian dan jadwal pop-up terbaru langsung
                melalui Instagram kami.
              </p>
            </div>
            <a
              href="https://instagram.com/flux.streetcoffee"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-fluxBlue text-white font-bold px-5 py-3 rounded-xl hover:bg-fluxRed transition-colors"
            >
              Cek Update di IG
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Street Bar & Location Section */}
      <section
        id="spot"
        className="bg-fluxBlue text-white py-16 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="inline-block bg-fluxYellow text-fluxBlue font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-lg">
              Coffee Street Bar
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              MAMPIR & TEMUKAN GAGASAN BARUMU.
            </h2>
            <p className="text-white/85 leading-relaxed">
              Nikmati racikan kopi dan minuman segar langsung di street bar kami
              maupun saat FLUX hadir di berbagai event pop-up kota.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border-2 border-white/20">
                <MapPin className="w-6 h-6 text-fluxYellow shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-fluxYellow">Lokasi Street Bar</p>
                  <p className="text-sm text-white/90">
                    Jl. Yos Sudarso, Cungkup, Salatiga
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border-2 border-white/20">
                <Clock className="w-6 h-6 text-fluxYellow shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-fluxYellow">Jam Operasional</p>
                  <p className="text-sm text-white/90">
                    16.00 – 23.00 WIB (Cek Instagram untuk jadwal pop-up event)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof / Instagram CTA Card */}
          <div className="bg-fluxCream text-fluxBlue rounded-3xl border-4 border-fluxYellow p-8 shadow-[8px_8px_0px_0px_#E11D2E]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-fluxRed text-white flex items-center justify-center border-2 border-fluxBlue">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display text-xl font-bold">
                  @flux.streetcoffee
                </p>
                <p className="text-xs font-bold uppercase text-fluxBlue/70">
                  Official Instagram
                </p>
              </div>
            </div>

            <p className="text-sm font-medium leading-relaxed mb-6">
              Ikuti perjalanan FLUX StreetCoffee, info menu drop terbaru,
              dokumentasi pop-up market, dan keseruan di balik bar kami.
            </p>

            <a
              href="https://instagram.com/flux.streetcoffee"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-fluxRed text-white font-display text-lg py-3.5 rounded-2xl border-3 border-fluxBlue shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Kunjungi Instagram FLUX
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fluxCream text-fluxBlue py-8 px-4 sm:px-6 border-t-4 border-fluxBlue">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold">
          <p>
            © {new Date().getFullYear()} FLUX StreetCoffee. All rights reserved.
          </p>
          <p className="font-display text-fluxRed tracking-wide">
            IN EVERY MOTION, GET A NOTION.
          </p>
        </div>
      </footer>

      {/* Bottom Checkered Strip */}
      <div className="h-5 w-full checkered-blue border-t-4 border-fluxBlue" />
    </div>
  );
}

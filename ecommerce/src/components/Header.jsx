import { Heart, ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const navClass = ({ isActive }) =>
  `text-sm transition hover:text-accent ${isActive ? "font-semibold text-accent" : "text-ink/75"}`;
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useSelector((s) =>
    s.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const favoriteCount = useSelector((s) => s.favorites.items.length);
  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-[10px] font-semibold tracking-[.2em] text-white sm:text-xs">
        YENİ SEZON KOLEKSİYONU · 1.500 TL ÜZERİ ÜCRETSİZ KARGO
      </div>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-paper/95 backdrop-blur">
        <div className="page-wrap flex h-[76px] items-center justify-between gap-5">
          <button
            className="md:hidden"
            aria-label="Menüyü aç"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-[.24em]"
          >
            MODA<span className="text-accent">.</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/" end className={navClass}>
              Yeni Sezon
            </NavLink>
            <a
              href="/#products"
              className="text-sm text-ink/75 hover:text-accent"
            >
              Ürünler
            </a>
            <a
              href="/#products"
              className="text-sm text-ink/75 hover:text-accent"
            >
              Koleksiyonlar
            </a>
            <NavLink to="/contact" className={navClass}>
              İletişim
            </NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="/#products"
              aria-label="Ürün ara"
              className="hidden sm:block"
            >
              <Search size={20} strokeWidth={1.6} />
            </a>
            <Link to="/favorites" aria-label="Favoriler" className="relative">
              <Heart size={21} strokeWidth={1.6} />
              {favoriteCount > 0 && (
                <span className="counter">{favoriteCount}</span>
              )}
            </Link>
            <Link to="/cart" aria-label="Sepet" className="relative">
              <ShoppingBag size={21} strokeWidth={1.6} />
              {cartCount > 0 && <span className="counter">{cartCount}</span>}
            </Link>
            <a href="https://github.com/slckcskn/Skillcamp-Frontend-Projeler/tree/main/ecommerce">
            <img src="../../github.svg" alt="Github link" width={24} height={24}/>
            </a>
          </div>
        </div>
        {mobileOpen && (
          <nav className="page-wrap flex flex-col gap-4 pb-5 md:hidden">
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/"
              className={navClass}
            >
              Yeni Sezon
            </NavLink>
            <a
              onClick={() => setMobileOpen(false)}
              href="/#products"
              className="text-sm"
            >
              Ürünler
            </a>
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/favorites"
              className={navClass}
            >
              Favorilerim
            </NavLink>
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/contact"
              className={navClass}
            >
              İletişim
            </NavLink>
          </nav>
        )}
      </header>
    </>
  );
}

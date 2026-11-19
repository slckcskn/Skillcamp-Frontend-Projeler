import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favorites/favoritesSlice";
import { addToCart } from "../features/cart/cartSlice";
import { money } from "../utils/money";

export default function FavoritesPage() {
  const items = useSelector((s) => s.favorites.items);
  const dispatch = useDispatch();
  return (
    <div className="page-wrap py-10 sm:py-14">
      <div className="border-b border-black/10 pb-7">
        <p className="text-[10px] font-bold tracking-[.2em] text-accent">
          KAYDETTİKLERİNİZ
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold">
          Favorilerim
        </h1>
        <p className="mt-3 text-sm text-muted">
          {items.length} ürün favorilerinizde
        </p>
      </div>
      {items.length ? (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((p) => (
            <article
              key={p.id}
              className="flex gap-4 border border-black/10 bg-white p-3 sm:gap-6 sm:p-5"
            >
              <Link to={`/products/${p.id}`} className="w-28 shrink-0 sm:w-36">
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[3/4] w-full object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  {p.category}
                </p>
                <Link to={`/products/${p.id}`} className="mt-2 font-medium">
                  {p.name}
                </Link>
                <p className="mt-2 font-semibold">{money(p.price)}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <button
                    onClick={() => dispatch(addToCart(p))}
                    className="inline-flex items-center gap-2 bg-ink px-3 py-2.5 text-xs text-white hover:bg-accent"
                  >
                    <ShoppingBag size={14} /> Sepete ekle
                  </button>
                  <button
                    onClick={() => dispatch(removeFavorite(p.id))}
                    className="inline-flex items-center gap-2 border border-black/10 px-3 py-2.5 text-xs hover:border-rose-500 hover:text-rose-600"
                  >
                    <Trash2 size={14} /> Kaldır
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Heart size={32} className="mx-auto text-muted" />
          <h2 className="mt-5 font-display text-2xl font-semibold">
            Henüz favori ürününüz yok
          </h2>
          <p className="mt-2 text-sm text-muted">
            Beğendiğiniz ürünleri kalp simgesiyle kaydedebilirsiniz.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-ink px-6 py-3 text-xs font-bold text-white"
          >
            ÜRÜNLERİ KEŞFET
          </Link>
        </div>
      )}
    </div>
  );
}

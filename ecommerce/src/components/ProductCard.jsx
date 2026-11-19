import { Heart, ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { money } from "../utils/money";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.id === product.id),
  );

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-sm bg-lilac">
        <Link to={`/products/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x800/f0edf8/27233a?text=MODA";
            }}
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-[9px] font-bold tracking-[.13em]">
            {product.badge}
          </span>
        )}
        <button
          aria-label="Favorilere ekle"
          onClick={() => dispatch(toggleFavorite(product))}
          className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/95 transition hover:scale-105 ${isFavorite ? "text-rose-600" : "text-ink"}`}
        >
          <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <Link
          to={`/products/${product.id}`}
          className="absolute bottom-3 right-3 grid size-9 translate-y-2 place-items-center rounded-full bg-white opacity-0 shadow-soft transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="pt-4">
        <p className="text-[10px] uppercase tracking-[.14em] text-muted">
          {product.category}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="mt-1 block text-sm font-medium hover:text-accent"
        >
          {product.title}
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="font-semibold">{money(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted line-through">
              {money(product.oldPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-3 inline-flex items-center gap-2 border border-black/10 px-3 py-2 text-xs transition hover:border-ink"
        >
          <ShoppingBag size={14} /> Sepete ekle
        </button>
      </div>
    </article>
  );
}

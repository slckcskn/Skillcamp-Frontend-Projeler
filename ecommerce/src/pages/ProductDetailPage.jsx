import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import ProductCard from "../components/ProductCard";
import { money } from "../utils/money";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((s) => s.product);
  const product = products.find((item) => String(item.id) === id);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setSize(product?.sizes?.[0] ?? "");
  }, [product]);

  const isFavorite = useSelector((s) =>
    product
      ? s.favorites.items.some((item) => item.id === product.id)
      : false,
  );
  const related = products
    .filter((item) => String(item.id) !== id)
    .slice(0, 4);

  if (status === "loading" || status === "idle") {
    return (
      <div className="page-wrap py-20 text-center text-muted">
        Ürün yükleniyor...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div role="alert" className="page-wrap py-20 text-center text-rose-600">
        Ürün yüklenemedi: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-wrap py-20 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Ürün bulunamadı
        </h1>
        <Link to="/" className="mt-5 inline-block underline">
          Ürünlere dön
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrap py-7 sm:py-10">
      <div className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link to="/">Ana Sayfa</Link>
        <ChevronRight size={13} />
        <span>{product.category}</span>
        <ChevronRight size={13} />
        <span className="text-ink">{product.title}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div className="grid grid-cols-[70px_1fr] gap-3 sm:grid-cols-[90px_1fr]">
          <div className="flex flex-col gap-3">
            <img
              src={product.image}
              className="aspect-[3/4] w-full border border-accent object-cover"
              alt={product.title}
            />
            <img
              src={product.image}
              className="aspect-[3/4] w-full object-cover opacity-60"
              alt={`${product.title} alternatif görünüm`}
            />
          </div>
          <img
            src={product.image}
            className="max-h-[760px] min-h-[420px] w-full bg-lilac object-cover"
            alt={product.title}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x1000/f0edf8/27233a?text=MODA";
            }}
          />
        </div>
        <div className="lg:py-5">
          <p className="text-[10px] font-bold tracking-[.2em] text-accent">
            {product.category?.toUpperCase()} / YENİ SEZON
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-semibold">{money(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted line-through">
                {money(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-6 max-w-lg text-sm leading-7 text-muted">
            {product.description}
          </p>
          {product.sizes?.length > 0 && (
            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide">
                  BEDEN SEÇİN
                </span>
                <button className="text-xs text-muted underline">
                  Beden rehberi
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSize(option)}
                    className={`grid size-12 place-items-center border text-sm ${size === option ? "border-ink bg-ink text-white" : "border-black/15 bg-white hover:border-ink"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-xs font-bold tracking-wide">ADET</span>
            <div className="flex items-center border border-black/15">
              <button
                className="p-3"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button className="p-3" onClick={() => setQuantity(quantity + 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="mt-7 flex gap-3">
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  dispatch(
                    addToCart({
                      ...product,
                      ...(size ? { selectedSize: size } : {}),
                    }),
                  );
                }
              }}
              className="flex-1 bg-ink px-5 py-4 text-xs font-bold tracking-[.12em] text-white transition hover:bg-accent"
            >
              SEPETE EKLE
            </button>
            <button
              aria-label="Favorilere ekle"
              onClick={() => dispatch(toggleFavorite(product))}
              className={`grid w-14 place-items-center border border-black/15 bg-white ${isFavorite ? "text-rose-600" : ""}`}
            >
              <Heart fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="mt-8 space-y-4 border-t border-black/10 pt-6 text-sm">
            <div className="flex gap-3">
              <Truck size={18} />
              <div>
                <p className="font-medium">Ücretsiz kargo</p>
                <p className="mt-1 text-xs text-muted">
                  1.500 TL üzeri siparişlerde.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <RotateCcw size={18} />
              <div>
                <p className="font-medium">Kolay iade</p>
                <p className="mt-1 text-xs text-muted">
                  14 gün içinde iade imkânı.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck size={18} />
              <div>
                <p className="font-medium">Güvenli alışveriş</p>
                <p className="mt-1 text-xs text-muted">
                  Ödeme altyapısı backend aşamasında bağlanacak.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-8 text-xs font-semibold underline underline-offset-4"
          >
            ← Alışverişe devam et
          </button>
        </div>
      </div>
      
      <section className="mt-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[.2em] text-accent">
              SİZİN İÇİN
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Bunları da beğenebilirsiniz
            </h2>
          </div>
          <Link to="/" className="text-xs underline">
            Tüm ürünler
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

import { useMemo, useState, useEffect } from "react";
import { ArrowDownUp, SlidersHorizontal, ArrowRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const categories = [
  "Tümü",
  "Tişört",
  "Ceket",
  "Pantolon",
  "Sweatshirt",
  "Mont",
];
export default function CatalogPage() {
  const [category, setCategory] = useState("Tümü");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "Tümü" || p.category === category) &&
        p.title?.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr")),
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, category, sort, query]);
  return (
    <div className="page-wrap">
      <section className="relative my-7 overflow-hidden bg-[#e9e5f5] sm:my-10">
        <div className="grid min-h-[330px] items-center sm:min-h-[420px] md:grid-cols-[1fr_.85fr]">
          <div className="relative z-10 px-7 py-10 sm:px-12 lg:px-16">
            <p className="text-[10px] font-bold tracking-[.25em] text-accent">
              2026 / SONBAHAR-KIŞ
            </p>
            <h1 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Yeni Sezon.
              <br />
              Yeni Bir Sen.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Sade çizgiler, doğal dokular ve her güne eşlik eden zamansız
              parçalar.
            </p>
            <a
              href="#products"
              className="mt-7 inline-flex items-center gap-3 bg-ink px-5 py-3.5 text-xs font-semibold tracking-wide text-white transition hover:bg-accent"
            >
              KOLEKSİYONU KEŞFET <ArrowRight size={16} />
            </a>
          </div>
          <div className="hidden h-full min-h-[420px] md:block">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
              alt="Yeni sezon moda koleksiyonu"
            />
          </div>
        </div>
      </section>
      <section id="products" className="scroll-mt-28 pb-4">
        <div className="mb-7 flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[.2em] text-accent">
              MODA SEÇKİSİ
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">
              Yeni Sezon Koleksiyonu
            </h2>
            <p className="mt-2 text-sm text-muted">
              {filtered.length} ürün listeleniyor
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="w-36 border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent sm:w-44"
            />
            <label className="flex items-center gap-2 border border-black/10 bg-white px-3 py-2.5 text-sm">
              <ArrowDownUp size={15} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent outline-none"
              >
                <option value="featured">Öne çıkan</option>
                <option value="low">Fiyat: artan</option>
                <option value="high">Fiyat: azalan</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mb-7 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 border px-4 py-2 text-xs transition ${category === c ? "border-ink bg-ink text-white" : "border-black/10 bg-white hover:border-ink"}`}
            >
              <SlidersHorizontal size={12} className="mr-2 inline" />
              {c}
            </button>
          ))}
        </div>
        {status === "loading" || status === "idle" ? (
          <p className="py-20 text-center text-muted">Ürünler yükleniyor...</p>
        ) : status === "failed" ? (
          <p role="alert" className="py-20 text-center text-rose-600">
            Ürünler yüklenemedi: {error}
          </p>
        ) : filtered.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-muted">
            Aramanızla eşleşen ürün bulunamadı.
          </p>
        )}
        <div className="mt-12 border-y border-black/10 py-5 text-center text-xs text-muted">
          Her siparişte özenli paketleme · 1.500 TL üzeri ücretsiz kargo
        </div>
      </section>
    </div>
  );
}

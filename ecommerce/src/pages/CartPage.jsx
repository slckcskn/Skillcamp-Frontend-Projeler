import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  clearCart,
  removeFromCart,
} from "../features/cart/cartSlice";
import { money } from "../utils/money";

export default function CartPage() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const subtotal = items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 1500 ? 0 : 79.9;
  return (
    <div className="page-wrap py-10 sm:py-14">
      <div className="border-b border-black/10 pb-7">
        <p className="text-[10px] font-bold tracking-[.2em] text-accent">
          ALIŞVERİŞİNİZ
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold">
          Alışveriş Sepetim
        </h1>
        <p className="mt-3 text-sm text-muted">
          {items.reduce((sum, p) => sum + p.quantity, 0)} ürün sepetinizde
        </p>
      </div>
      {items.length ? (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_350px]">
          <section className="space-y-4">
            {items.map((p) => (
              <article
                key={`${p.id}-${p.selectedSize || ""}`}
                className="flex gap-4 border border-black/10 bg-white p-3 sm:gap-5 sm:p-5"
              >
                <Link
                  to={`/products/${p.id}`}
                  className="w-24 shrink-0 sm:w-32"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted">
                      {p.category}
                    </p>
                    <Link
                      to={`/products/${p.id}`}
                      className="mt-2 block text-sm font-medium"
                    >
                      {p.name}
                    </Link>
                    {p.selectedSize && (
                      <p className="mt-2 text-xs text-muted">
                        Beden: {p.selectedSize}
                      </p>
                    )}
                    <p className="mt-2 text-sm font-semibold">
                      {money(p.price)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:flex-col sm:items-end sm:justify-between">
                    <div className="flex items-center border border-black/10">
                      <button
                        className="p-2"
                        onClick={() =>
                          dispatch(changeQuantity({ id: p.id, delta: -1 }))
                        }
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-xs">
                        {p.quantity}
                      </span>
                      <button
                        className="p-2"
                        onClick={() =>
                          dispatch(changeQuantity({ id: p.id, delta: 1 }))
                        }
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(p.id))}
                      className="text-muted hover:text-rose-600"
                      aria-label="Ürünü kaldır"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
            <button
              onClick={() => dispatch(clearCart())}
              className="text-xs text-muted underline"
            >
              Sepeti temizle
            </button>
          </section>
          <aside className="border border-black/10 bg-white p-5 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Sipariş özeti
            </h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Ara toplam</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Kargo</span>
                <span>{shipping === 0 ? "Ücretsiz" : money(shipping)}</span>
              </div>
              <div className="border-t border-black/10 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Toplam</span>
                  <span>{money(subtotal + shipping)}</span>
                </div>
                <p className="mt-2 text-[11px] text-muted">Vergiler dahil.</p>
              </div>
            </div>
            <button
              onClick={() =>
                alert(
                  "Bu örnek projede ödeme adımı demo amaçlıdır. Backend ve ödeme altyapısı daha sonra bağlanmalıdır.",
                )
              }
              className="mt-6 flex w-full items-center justify-center gap-3 bg-ink px-5 py-4 text-xs font-bold tracking-widest text-white hover:bg-accent"
            >
              ÖDEMEYE GEÇ <ArrowRight size={16} />
            </button>
            <p className="mt-4 text-center text-[11px] text-muted">
              Ödeme sistemi henüz bağlı değil.
            </p>
            <Link to="/" className="mt-5 block text-center text-xs underline">
              Alışverişe devam et
            </Link>
          </aside>
        </div>
      ) : (
        <div className="py-20 text-center">
          <ShoppingBag size={34} className="mx-auto text-muted" />
          <h2 className="mt-5 font-display text-2xl font-semibold">
            Sepetiniz şu an boş
          </h2>
          <p className="mt-2 text-sm text-muted">
            Yeni sezon ürünlerine göz atıp favorilerinizi ekleyin.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-ink px-6 py-3 text-xs font-bold text-white"
          >
            ALIŞVERİŞE BAŞLA
          </Link>
        </div>
      )}
    </div>
  );
}

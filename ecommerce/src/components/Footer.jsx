import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/10 bg-white">
      <div className="page-wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-[.2em]"
          >
            MODA.
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            Günlük stil için zamansız parçalar, sade tasarımlar ve özenle
            seçilmiş koleksiyonlar.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-[.16em]">ALIŞVERİŞ</h3>
          <div className="space-y-3 text-sm text-muted">
            <p>
              <Link to="/">Yeni sezon</Link>
            </p>
            <p>
              <Link to="/favorites">Favorilerim</Link>
            </p>
            <p>
              <Link to="/cart">Sepetim</Link>
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-[.16em]">YARDIM</h3>
          <div className="space-y-3 text-sm text-muted">
            <p>
              <Link to="/contact">İletişim</Link>
            </p>
            <p>Kargo ve teslimat</p>
            <p>İade ve değişim</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-[.16em]">
            BİZİ TAKİP EDİN
          </h3>
          <p className="text-sm leading-6 text-muted">
            Yeni koleksiyonlardan haberdar olmak için e-posta adresinizi
            ekleyin.
          </p>
          <form
            className="mt-4 flex border-b border-ink/40 pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Demo: e-posta kaydı backend ile bağlanacak.");
            }}
          >
            <input
              type="email"
              required
              placeholder="E-posta adresiniz"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button className="text-xs font-bold">KATIL</button>
          </form>
        </div>
      </div>
      <div className="border-t border-black/5 py-5 text-center text-[11px] text-muted">
        © {new Date().getFullYear()} MODA. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

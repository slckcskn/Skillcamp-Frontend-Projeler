import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Sipariş hakkında",
    message: "",
  });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div className="page-wrap py-10 sm:py-14">
      <section className="grid gap-8 bg-lilac px-6 py-10 sm:px-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-[10px] font-bold tracking-[.2em] text-accent">
            BİZE ULAŞIN
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Size nasıl yardımcı olabiliriz?
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            Sorularınız, önerileriniz veya siparişinizle ilgili destek için bize
            yazın. En kısa sürede dönüş yapmayı hedefliyoruz.
          </p>
        </div>
        <div className="border border-black/10 bg-white/70 p-5">
          <p className="text-xs font-semibold">MÜŞTERİ DESTEĞİ</p>
          <p className="mt-2 text-sm text-muted">Hafta içi 09.00–18.00</p>
        </div>
      </section>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_.75fr]">
        <section className="border border-black/10 bg-white p-6 sm:p-9">
          <h2 className="font-display text-2xl font-semibold">
            Mesaj gönderin
          </h2>
          <p className="mt-2 text-sm text-muted">Aşağıdaki formu doldurun.</p>
          {sent ? (
            <div className="mt-8 border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
              <p className="font-semibold">Form demo olarak gönderildi.</p>
              <p className="mt-2">
                Mesajların gerçekten iletilmesi için backend/API bağlantısı
                eklenmelidir.
              </p>
              <button className="mt-4 underline" onClick={() => setSent(false)}>
                Yeni mesaj yaz
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-semibold">
                  Adınız soyadınız
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={update}
                    placeholder="Ad Soyad"
                    className="mt-2 w-full border border-black/15 bg-paper px-4 py-3 text-sm font-normal outline-none focus:border-accent"
                  />
                </label>
                <label className="block text-xs font-semibold">
                  E-posta adresiniz
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={update}
                    placeholder="ornek@mail.com"
                    className="mt-2 w-full border border-black/15 bg-paper px-4 py-3 text-sm font-normal outline-none focus:border-accent"
                  />
                </label>
              </div>
              <label className="block text-xs font-semibold">
                Konu
                <select
                  name="topic"
                  value={form.topic}
                  onChange={update}
                  className="mt-2 w-full border border-black/15 bg-paper px-4 py-3 text-sm font-normal outline-none focus:border-accent"
                >
                  <option>Sipariş hakkında</option>
                  <option>Kargo ve teslimat</option>
                  <option>İade ve değişim</option>
                  <option>Ürün hakkında</option>
                  <option>Diğer</option>
                </select>
              </label>
              <label className="block text-xs font-semibold">
                Mesajınız
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={form.message}
                  onChange={update}
                  placeholder="Size nasıl yardımcı olabiliriz?"
                  className="mt-2 w-full resize-y border border-black/15 bg-paper px-4 py-3 text-sm font-normal outline-none focus:border-accent"
                />
              </label>
              <button className="inline-flex items-center gap-3 bg-ink px-6 py-4 text-xs font-bold tracking-widest text-white hover:bg-accent">
                MESAJI GÖNDER <Send size={15} />
              </button>
            </form>
          )}
        </section>
        <aside className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">
            İletişim bilgileri
          </h2>
          <p className="text-sm leading-6 text-muted">
            Bu alanlardaki örnek bilgileri kendi işletme bilgilerinizle
            değiştirebilirsiniz.
          </p>
          {[
            [Mail, "E-posta", "destek@moda.example"],
            [Phone, "Telefon", "+90 212 000 00 00"],
            [MapPin, "Adres", "İstanbul, Türkiye"],
            [Clock, "Çalışma saatleri", "Hafta içi 09.00–18.00"],
          ].map(([Icon, title, detail]) => (
            <div
              key={title}
              className="flex gap-4 border border-black/10 bg-white p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center bg-lilac">
                <Icon size={19} />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted">{detail}</p>
              </div>
            </div>
          ))}
          <div className="grid min-h-40 place-items-center bg-[#e9e5f5] p-6 text-center">
            <MapPin size={26} />
            <p className="mt-2 text-sm font-medium">Konum alanı</p>
            <p className="text-xs text-muted">
              İsterseniz buraya harita entegrasyonu ekleyebilirsiniz.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

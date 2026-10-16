import React, { useState, useEffect } from "react";

function Home() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const [bmi, setBmi] = useState(()=> {
    return localStorage.getItem('lastBMI') || null;
  });
  const [category, setCategory] = useState(() => {
    return localStorage.getItem('lastCategory') || "";
  });
  const [dietAdvice, setDietAdvice] = useState(() => {
    return localStorage.getItem('lastDietAdvice') || "";
  });

  useEffect(() => {
    if(bmi && category && dietAdvice) {
      localStorage.setItem('lastBMI', bmi)
      localStorage.setItem('lastCategory', category)
      localStorage.setItem('lastDietAdvice', dietAdvice)
    }
  }, [bmi, category, dietAdvice])

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert("Lütfen geçerli bir boy (cm) ve kilo (kg) değeri giriniz.");
      return;
    }

    const heightInM = h / 100;
    const bmiValue = w / (heightInM * heightInM);
    const roundedBmi = bmiValue.toFixed(1);

    let cat = "";
    let advice = "";
    if (roundedBmi < 18.5) {
      cat = "Zayıf";
      advice =
        `Amacı: Sağlıklı ve kas kütlesini artırarak kilo almak. Hacim olarak küçük ama kalori ve besin değeri yüksek gıdalar seçilmelidir.

        • Kahvaltı: 2 adet yumurta (zeytinyağında), 2 dilim tam tahıllı ekmek, 1 avuç içi kadar tam yağlı peynir, 5-6 adet ceviz, 1 yemek kaşığı pekmez veya bal.
        • Öğle Yemeği: 150g ızgara tavuk veya et, 1 büyük kase bol zeytinyağlı pirinç pilavı veya makarna, 1 kase tam yağlı yoğurt.
        • Ara Öğün (Yüksek Kalorili Shake): 1 bardak tam yağlı süt, 1 adet muz, 2 yemek kaşığı yulaf ezmesi, 1 yemek kaşığı fıstık ezmesi ve 1 tatlı kaşığı balı blenderdan geçirin.
        • Akşam Yemeği: 1 tabak kıymalı mercimek veya baklagil yemeği, 1 kase bulgur pilavı, mevsim salatası (bol zeytinyağlı ve avokadolu).
        `;
    } else if (roundedBmi < 25) {
      cat = "Normal";
      advice =
        `Amacı: Mevcut kiloyu korumak, enerji seviyesini yüksek tutmak ve dengeli beslenmek.

        • Kahvaltı: 1 adet haşlanmış yumurta, 1-2 dilim süzme peynir, 2 dilim tam buğday ekmeği, bol yeşillik ve 5 adet zeytin.
        • Öğle Yemeği: 1 porsiyon zeytinyağlı sebze yemeği, 1 kase cacık, 1 dilim çavdar ekmeği veya 3-4 yemek kaşığı karabuğday/bulgur.
        • Ara Öğün: 1 porsiyon mevsim meyvesi (örn: 1 adet elma) ve 10 adet çiğ badem.
        • Akşam Yemeği: 150g ızgara balık veya hindi göğsü, fırınlanmış sebzeler (kabak, brokoli, havuç), büyük bir kase yeşil salata.
        `;
    } else if (roundedBmi < 30) {
      cat = "Kilolu";
      advice =
        `Amacı: Yağ yakımını başlatmak, porsiyon kontrolü sağlamak ve hafif bir kalori açığı yaratmak.

        • Kahvaltı: 2 yumurtadan bol maydanozlu ve lor peynirli omlet, 1 dilim tam tahıllı ekmek, domates, salatalık.
        • Öğle Yemeği: Bol yeşillikli ton balıklı veya tavuklu salata (1 tatlı kaşığı zeytinyağı ve limon ile), 1 adet etimek veya 2 yemek kaşığı haşlanmış kinoa.
        • Ara Öğün: 1 çay bardağı kefir veya 3 yemek kaşığı yoğurt içine 1 tatlı kaşığı keten tohumu.
        • Akşam Yemeği: 8-10 yemek kaşığı susuz etsiz sebze yemeği (taze fasulye, ıspanak vb.), 1 kase yağsız yoğurt.
        `;
    } else {
      cat = "Obez";
      advice =
        `Amacı: İnsülin direncini kırmak, inflamasyonu azaltmak, kontrollü ve sürdürülebilir kilo kaybı sağlamak. Bu grupta karbonhidrat kaynağı olarak sadece düşük glisemik indeksli besinler seçilmelidir.
        
        • Kahvaltı: 2 adet haşlanmış yumurta, 2 parmak genişliğinde dil peyniri veya lor peyniri, bolca mevsim yeşilliği (ekmek yerine bol lifli sebzeler tercih edilir).
        • Öğle Yemeği: 1 porsiyon (120-150g) ızgara/fırın kırmızı et veya tavuk, bol sirkeli ve az yağlı mevsim salatası.
        • Ara Öğün: 1 fincan sade filtre kahve veya yeşil çay, 2-3 adet bütün ceviz içi.
        • Akşam Yemeği: 1 kase mercimek veya sebze çorbası (unsuz), 1 porsiyon zeytinyağlı kabak veya kereviz yemeği, 3 yemek kaşığı yoğurt.
      `;
    }

    setBmi(roundedBmi);
    setCategory(cat);
    setDietAdvice(advice);
  };

    const markerPosition = () => {
    if (bmi === null) return 0;
    let value = Math.max(0, Math.min(bmi, 40));

    const ranges = [
      { min: 0,   max: 18.5, index: 0 },
      { min: 18.5, max: 25,   index: 1 },
      { min: 25,  max: 30,   index: 2 },
      { min: 30,  max: 40,   index: 3 },
    ];

    const cat = ranges.find(r => value >= r.min && value <= r.max);
    if (!cat) return 0;

    const relative = (value - cat.min) / (cat.max - cat.min);
    const blockStart = cat.index * 25;
    return blockStart + relative * 25;
  };

  return (
    <div className="container mx-auto min-h-auto bg-gray-50 p-4 ">
      {/* Başlık - Üstte */}
      <div className="mb-8 text-start">
        <h1 className="text-3xl font-bold mb-2">Vücut Kitle İndeksi</h1>
        <p className="text-gray-600">
          Sağlıklı bir yaşam için temel metriklerinizi takip edin.
        </p>
      </div>

      {/* Alttaki kutucuklar - Responsive Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Soldaki kutucuk - Boy ve Kilo Girişi */}
        <div className=" lg:w-2/5 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Değerlerinizi Girin</h2>
          <div className="">
            <div>
              <h3 className="text-sm font-medium mb-4">Boy (cm)</h3>
              <input
                type="number"
                placeholder="175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mt-4 mb-4">Kilo (kg)</h3>
              <input
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button
            onClick={calculateBMI}
            className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Hesapla
          </button>
        </div>

        {/* Sağdaki kutucuklar - VKI Skoru, VKI Ölçeği ve Diyet Önerisi */}
        <div className="flex flex-col lg:justify-between gap-2 lg:w-3/5">
          <div className="bg-white rounded-lg shadow-md p-6" style={{height:"164px"}}>
            <h3 className="text-lg font-semibold mb-4">VKI Skorunuz</h3>
            <p className="text-4xl font-bold text-blue-500">
              {bmi !== null ? bmi : "0"}
            </p>
            <p className="text-gray-600 mt-2">{category}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">VKI Ölçeği</h3>
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span>Zayıf</span>
              <span>Normal</span>
              <span>Kilolu</span>
              <span>Obez</span>
            </div>
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="w-1/4 bg-blue-500"></div>
              <div className="w-1/4 bg-green-500"></div>
              <div className="w-1/4 bg-orange-500"></div>
              <div className="w-1/4 bg-red-600"></div>
            </div>

            <div className="relative -top-2">
              <div
                className="absolute left-[calc(var(--pos)*1%)] -translate-x-1/2 transition-left duration-500 ease-in-out"
                style={{ "--pos": markerPosition() }}
              >
                {/* Üçgen ok */}
                <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-t-transparent border-b-6 border-b-black"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Diyet listesi önerisi */}
      {dietAdvice && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h3 className="text-lg font-semibold mb-3">Diyet Önerisi</h3>
          <div className="text-gray-700" style={{whiteSpace: "pre-line"}}>{dietAdvice}</div>
        </div>
      )}
    </div>
  );
}

export default Home;

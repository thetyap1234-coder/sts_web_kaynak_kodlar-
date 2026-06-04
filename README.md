# 🌐 STS - Akıllı Stok Takip Sistemi (Web Arayüzü)

Bu depo, **Akıllı Stok Takip Sistemi (STS)** projesinin kullanıcı dostu, dinamik ve modern **Web Arayüzü** (Web Interface) kaynak kodlarını içermektedir. 

Web sitesi; depolardaki ürünlerin anlık ağırlık verilerini, mevcut stok adetlerini, kritik eşik uyarılarını ve geçmişe dönük stok loglarını kullanıcıya temiz, anlaşılır ve responsive (mobil uyumlu) bir panel üzerinden sunmak amacıyla geliştirilmiştir.

---

## 🚀 Öne Çıkan Özellikler

*   **Anlık Stok İzleme Paneli (Dashboard):** Sistemdeki tüm ürünlerin mevcut adetlerini ve ağırlık durumlarını canlı olarak listeler.
*   **Kritik Stok Uyarıları:** Belirlenen sınırın altına düşen ürünleri görsel olarak (örneğin kırmızı renkli uyarı kartlarıyla) vurgular.
*   **Duyarlı Tasarım (Responsive):** Hem masaüstü bilgisayarlarda hem de mobil cihazlarda/tabletlerde kusursuz çalışır.
*   **Temiz ve Scannable Kod Yapısı:** Kolayca geliştirilebilir, modern tasarım trendlerine uygun UI/UX elementleri.

---

## 🛠️ Kullanılan Teknolojiler

*   **HTML5:** Sayfa yapısı ve semantik içerik düzeni.
*   **CSS3 / Grid & Flexbox:** Modern, esnek ve şık arayüz tasarımı.
*   **JavaScript (Vanillajs / ES6+):** (Eğer kullandıysanız) Dinamik veri gösterimi, filtrelemeler ve arayüz etkileşimleri.

---

## 💻 Kurulum ve Tarayıcıda Çalıştırma

Projenin web arayüzünü yerel bilgisayarınızda görüntülemek oldukça basittir:

1.  **Depoyu bilgisayarınıza indirin veya klonlayın:**
```bash
    git clone [https://github.com/thetyap1234-coder/YOUR-REPOSITORY-NAME.git](https://github.com/thetyap1234-coder/YOUR-REPOSITORY-NAME.git)
    cd YOUR-REPOSITORY-NAME
    ```
2.  **Projeyi çalıştırın:**
    *   Herhangi bir yükleme yapmanıza gerek yoktur. Proje klasörünün içindeki `index.html` (veya ana sayfa dosyanız hangisiyse) dosyasına çift tıklayarak tarayıcınızda (Chrome, Edge, Safari vb.) doğrudan açabilirsiniz.
    *   Veya VS Code kullanıyorsanız, **Live Server** eklentisi ile sağ tıklayıp `Open with Live Server` diyerek canlı önizleme yapabilirsiniz.

---

## 📂 Proje Dizin Yapısı

```text
├── assets/
│   ├── css/
│   │   └── style.css          # Arayüzün tüm tasarım ve stil kodları
│   ├── js/
│   │   └── main.js            # Dinamik etkileşimler ve script dosyaları
│   └── images/
│       └── logo.png           # Projede kullanılan görseller ve logolar
├── index.html                 # Ana giriş sayfası (Dashboard / Panel)
├── urunler.html               # (Varsa) Ürün listeleme/yönetim sayfası
├── README.md                  # Proje dökümantasyonu
└── .gitignore                 # Takip edilmeyecek dosyalar listesi

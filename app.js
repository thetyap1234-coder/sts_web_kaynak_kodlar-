const API_URL = "https://dummyjson.com/products?limit=30";

/* ==========================
   STATE
========================== */

let products = [];
let filteredProducts = [];

/* ==========================
   ELEMENTS
========================== */

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

const modal = document.getElementById("productModal");
const addProductBtn = document.getElementById("addProductBtn");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");

const toast = document.getElementById("toast");

const totalProducts = document.getElementById("totalProducts");
const criticalProducts = document.getElementById("criticalProducts");
const totalValue = document.getElementById("totalValue");

const themeBtn = document.getElementById("themeBtn");

/* ==========================
   TOAST
========================== */

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* ==========================
   LOCAL STORAGE
========================== */

function saveLocal() {
  localStorage.setItem("stockflow_pro", JSON.stringify(products));
}

function loadLocal() {
  const data = localStorage.getItem("stockflow_pro");
  if (data) {
    products = JSON.parse(data);
    filteredProducts = [...products];
    render();
    stats();
    return true;
  }
  return false;
}

/* ==========================
   API
========================== */

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    products = data.products.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      stock: p.stock,
      category: p.category,
    }));

    filteredProducts = [...products];

    saveLocal();
    render();
    stats();
  } catch (err) {
    showToast("Veri alınamadı!");
  }
}

/* ==========================
   RENDER PRODUCTS (CARDS)
========================== */

function render() {
  productContainer.innerHTML = "";

  filteredProducts.forEach((p) => {
    let statusColor = "";
    let statusText = "";

    if (p.stock <= 10) {
      statusColor = "#ef4444";
      statusText = "Kritik";
    } else if (p.stock <= 30) {
      statusColor = "#f59e0b";
      statusText = "Düşük";
    } else {
      statusColor = "#22c55e";
      statusText = "Normal";
    }

    productContainer.innerHTML += `
        
        <div class="product-card">

            <h3>${p.title}</h3>

            <p><b>Fiyat:</b> ${p.price} ₺</p>

            <p><b>Stok:</b> ${p.stock}</p>

            <p><b>Kategori:</b> ${p.category}</p>

            <p style="color:${statusColor}; font-weight:600;">
                ${statusText}
            </p>

            <div class="card-actions">

                <button class="edit-btn"
                    onclick="editProduct(${p.id})">
                    Düzenle
                </button>

                <button class="delete-btn"
                    onclick="deleteProduct(${p.id})">
                    Sil
                </button>

            </div>

        </div>
        
        `;
  });
}

/* ==========================
   STATS
========================== */

function stats() {
  totalProducts.textContent = products.length;

  const critical = products.filter((p) => p.stock <= 10);
  criticalProducts.textContent = critical.length;

  const total = products.reduce((sum, p) => {
    return sum + p.price * p.stock;
  }, 0);

  totalValue.textContent = "₺" + total.toLocaleString("tr-TR");
}

/* ==========================
   ADD PRODUCT
========================== */

addProductBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modalTitle.textContent = "Yeni Ürün Ekle";
  productForm.reset();
  document.getElementById("productId").value = "";
});

/* ==========================
   CLOSE MODAL
========================== */

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

/* ==========================
   SAVE (ADD / EDIT)
========================== */

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("productId").value;
  const title = document.getElementById("productName").value;
  const price = Number(document.getElementById("productPrice").value);
  const stock = Number(document.getElementById("productStock").value);
  const category = document.getElementById("productCategory").value;

  if (id) {
    const item = products.find((p) => p.id == id);

    item.title = title;
    item.price = price;
    item.stock = stock;
    item.category = category;

    showToast("Ürün güncellendi");
  } else {
    const newProduct = {
      id: Date.now(),
      title,
      price,
      stock,
      category,
    };

    products.unshift(newProduct);

    showToast("Ürün eklendi");
  }

  filteredProducts = [...products];

  saveLocal();
  render();
  stats();

  modal.style.display = "none";
});

/* ==========================
   DELETE
========================== */

window.deleteProduct = function (id) {
  if (!confirm("Silmek istiyor musun?")) return;

  products = products.filter((p) => p.id !== id);

  filteredProducts = [...products];

  saveLocal();
  render();
  stats();

  showToast("Ürün silindi");
};

/* ==========================
   EDIT
========================== */

window.editProduct = function (id) {
  const p = products.find((x) => x.id === id);

  modal.style.display = "flex";
  modalTitle.textContent = "Ürün Düzenle";

  document.getElementById("productId").value = p.id;
  document.getElementById("productName").value = p.title;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productStock").value = p.stock;
  document.getElementById("productCategory").value = p.category;
};

/* ==========================
   SEARCH
========================== */

searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();

  filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(val),
  );

  render();
});

/* ==========================
   FILTER
========================== */

filterSelect.addEventListener("change", () => {
  if (filterSelect.value === "critical") {
    filteredProducts = products.filter((p) => p.stock <= 10);
  } else {
    filteredProducts = [...products];
  }

  render();
});

/* ==========================
   DARK MODE
========================== */

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
});

/* ==========================
   LOAD THEME
========================== */

(function () {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
  }
})();

/* ==========================
   INIT
========================== */

(function init() {
  const localData = loadLocal();

  if (!localData) {
    fetchProducts();
  }
})();

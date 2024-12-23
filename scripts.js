// Inicializar productos desde localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];
let nextId =
  products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

// Funciones de utilidad
function showSection(section) {
  document.getElementById("list-section").style.display =
    section === "list" ? "block" : "none";
  document.getElementById("add-section").style.display =
    section === "add" ? "block" : "none";
}

function saveProductsToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

async function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Manejadores de eventos
document
  .getElementById("product-image")
  .addEventListener("change", async function (e) {
    const file = e.target.files[0];
    if (file) {
      try {
        const imagePreview = document.getElementById("image-preview");
        const base64Image = await convertImageToBase64(file);
        imagePreview.style.backgroundImage = `url(${base64Image})`;
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
        alert("Error al cargar la imagen. Por favor, intenta con otra imagen.");
      }
    }
  });

document
  .getElementById("add-product-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const code = document.getElementById("product-code").value;
      const name = document.getElementById("product-name").value;
      const type = document.getElementById("product-type").value;
      const price = parseFloat(document.getElementById("product-price").value);
      const cost = parseFloat(document.getElementById("product-cost").value);
      const stock = parseInt(document.getElementById("product-stock").value);

      let image = null;
      const imageFile = document.getElementById("product-image").files[0];
      if (imageFile) {
        image = await convertImageToBase64(imageFile);
      }

      const product = {
        id: nextId++,
        code,
        name,
        type,
        price,
        cost,
        stock,
        image,
      };

      products.push(product);
      saveProductsToLocalStorage();

      // Limpiar formulario
      document.getElementById("add-product-form").reset();
      document.getElementById("image-preview").style.backgroundImage = "";

      refreshProductList();
      showSection("list");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert(
        "Error al agregar el producto. Por favor, verifica los datos e intenta nuevamente."
      );
    }
  });

// Funciones CRUD
function refreshProductList() {
  const tableBody = document.querySelector("#product-table tbody");
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                ${
                  product.image
                    ? `<img src="${product.image}" class="product-image" alt="${product.name}">`
                    : "<span>No image</span>"
                }
            </td>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.type}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>$${product.cost.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${
                  product.id
                })">Edit</button>
                <button class="delete-btn" onclick="confirmDelete(${
                  product.id
                })">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

async function editProduct(id) {
  const product = products.find((p) => p.id === id);

  try {
    const code = prompt("Edit Product Code:", product.code);
    if (!code) return;

    const name = prompt("Edit Product Name:", product.name);
    if (!name) return;

    const type = prompt(
      "Edit Product Type (Electronics, Clothing, Food, Books, Home, Sports, Other):",
      product.type
    );
    if (!type) return;

    const price = parseFloat(prompt("Edit Product Price:", product.price));
    if (isNaN(price)) return;

    const cost = parseFloat(prompt("Edit Product Cost:", product.cost));
    if (isNaN(cost)) return;

    const stock = parseInt(prompt("Edit Product Stock:", product.stock));
    if (isNaN(stock)) return;

    product.code = code;
    product.name = name;
    product.type = type;
    product.price = price;
    product.cost = cost;
    product.stock = stock;

    saveProductsToLocalStorage();
    refreshProductList();
  } catch (error) {
    console.error("Error al editar producto:", error);
    alert(
      "Error al editar el producto. Por favor, verifica los datos e intenta nuevamente."
    );
  }
}

function deleteProduct(id) {
  try {
    products = products.filter((p) => p.id !== id);
    saveProductsToLocalStorage();
    refreshProductList();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Error al eliminar el producto. Por favor, intenta nuevamente.");
  }
}

function confirmDelete(id) {
  const product = products.find((p) => p.id === id);
  const confirmation = confirm(
    `¿Estás seguro que deseas eliminar el producto "${product.name}"?`
  );
  if (confirmation) {
    deleteProduct(id);
  }
}

// Inicializar la aplicación
refreshProductList();

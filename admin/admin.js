const apiUrl = "https://67bdd695321b883e790e2939.mockapi.io/Products"; // Thay thế bằng API thực tế

// DOM Elements
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const productModal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const saveProductBtn = document.getElementById("saveProductBtn");
const cancelBtn = document.getElementById("cancelBtn");
const sortPriceBtn = document.getElementById("sortPrice");

// Inputs trong modal
const productName = document.getElementById("productName");
const productImageUrl = document.getElementById("productImageUrl");
const productImageFile = document.getElementById("productImageFile");
const productType = document.getElementById("productType");
const productDescription = document.getElementById("productDescription");
const productScreen = document.getElementById("productScreen");
const productFrontCamera = document.getElementById("productFrontCamera");
const productBackCamera = document.getElementById("productBackCamera");
const productPrice = document.getElementById("productPrice");

let isEditing = false;
let editProductId = null;

// Lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        const response = await axios.get(apiUrl);
        renderProducts(response.data);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm", error);
    }
}

// Hiển thị danh sách sản phẩm
function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach(product => {
        productList.innerHTML += `
            <tr>
                <td class="border p-2">${product.name}</td>
                <td class="border p-2"><img src="${product.image}" class="w-16"></td>
                <td class="border p-2">${product.type}</td>
                <td class="border p-2">${product.description}</td>
                <td class="border p-2">${product.screen}</td>
                <td class="border p-2">${product.frontCamera}</td>
                <td class="border p-2">${product.backCamera}</td>
                <td class="border p-2">${product.price} VND</td>
                <td class="border p-2">
                    <button onclick="editProduct('${product.id}')" class="bg-yellow-500 text-white p-1">Sửa</button>
                    <button onclick="deleteProduct('${product.id}')" class="bg-red-500 text-white p-1">Xóa</button>
                </td>
            </tr>`;
    });
}

// Hiển thị modal
function showModal(edit = false) {
    isEditing = edit;
    productModal.classList.remove("hidden");
}

// Ẩn modal
function hideModal() {
    productModal.classList.add("hidden");
}

// Thêm sản phẩm
async function addProduct() {
    const newProduct = {
        name: productName.value,
        image: productImageUrl.value,
        type: productType.value,
        description: productDescription.value,
        screen: productScreen.value,
        frontCamera: productFrontCamera.value,
        backCamera: productBackCamera.value,
        price: productPrice.value
    };
    try {
        await axios.post(apiUrl, newProduct);
        hideModal();
        fetchProducts();
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm", error);
    }
}

// Sửa sản phẩm
function editProduct(id) {
    editProductId = id;
    modalTitle.innerText = "Chỉnh sửa sản phẩm";
    showModal(true);
}

// Xóa sản phẩm
async function deleteProduct(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchProducts();
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm", error);
    }
}

// Tìm kiếm sản phẩm
searchBtn.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase();
    fetchProducts(searchValue);
});

// Sắp xếp sản phẩm theo giá
let sortAscending = true;
sortPriceBtn.addEventListener("click", () => {
    sortAscending = !sortAscending;
    fetchProducts();
});

// Khởi chạy
fetchProducts();

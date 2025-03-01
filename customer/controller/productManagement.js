import { Cart } from "../model/Cart.js";
import { Product } from "../model/Product.js";
import { productService } from "../services/api.js";

const init = async () => {
  try {
    productService.clearCache();
    await productService.getAllProducts();
    renderProduct(productService.getCachedProducts());
  } catch (error) {
    console.error("Lỗi khi khởi tạo:", error);
  }
};

init();

// setInterval(async () => {
//   init();
// }, 3000);

const renderProduct = (products) => {
  let htmlContent = "";

  products.forEach((product) => {
    htmlContent += `
            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-between">
                <div>
                    <div class="h-56 w-full">
                        <a href="#">
                            <img class="mx-auto h-full" src="${
                              product.img
                            }" alt="Image Product" />
                        </a>
                    </div>
                    <div class="pt-6">
                        <div class="mb-4 flex items-center justify-between gap-4">
                            <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                Up to 35% off
                            </span>
                            <div class="flex items-center justify-end gap-1">
                                <button type="button" data-tooltip-target="tooltip-quick-look" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Quick look</span>
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <div id="tooltip-quick-look" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Quick look
                                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                                </div>
                                <button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Add to Favorites</span>
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                                <div id="tooltip-add-to-favorites" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Add to favorites
                                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                                </div>
                            </div>
                        </div>
                        <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">${
                          product.name
                        }</a>
                        <div class="mt-2 flex items-center gap-2">
                            <div class="flex items-center">
                                <i class="fa-solid fa-star text-sm text-yellow-400"></i>
                                <i class="fa-solid fa-star text-sm text-yellow-400"></i>
                                <i class="fa-solid fa-star text-sm text-yellow-400"></i>
                                <i class="fa-solid fa-star text-sm text-yellow-400"></i>
                                <i class="fa-solid fa-star text-sm text-yellow-400"></i>
                            </div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
                        </div>
                        <ul class="mt-2 flex items-center gap-4">
                            <li class="flex items-center gap-2">
                                <i class="fa-solid fa-truck text-sm text-gray-500 dark:text-gray-400"></i>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                            </li>
                            <li class="flex items-center gap-2">
                                <i class="fa-solid fa-money-check-dollar text-sm text-gray-500 dark:text-gray-400"></i>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                            </li>
                        </ul>
                        <div class="specifications mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                            <p><span class="font-medium">Loại sản phẩm:</span> ${
                              product.type
                            }</p>
                            <p><span class="font-medium">Mô tả:</span> ${
                              product.desc
                            }</p>
                            <p><span class="font-medium">Màn hình:</span> ${
                              product.screen || product.desc
                            }</p>
                            <p><span class="font-medium">Camera trước:</span> ${
                              product.frontCamera
                            }</p>
                            <p><span class="font-medium">Camera sau:</span> ${
                              product.backCamera
                            }</p>
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex items-center justify-between gap-4">
                    <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">$${
                      product.price
                    }</p>
                    <button type="button" class="addProductCart inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick="handleAddProductToCart('${
                      product.id
                    }')">
                        <i class="fa-solid fa-cart-plus -ms-2 me-2"></i>
                        Add to cart
                    </button>
                </div>
            </div>`;
  });

  document.getElementById("productContent").innerHTML = htmlContent;
};

//Xử lý filter type product
document.getElementById("sortDropdownButton1").onclick = () => {
  const dropdownItems = document.querySelectorAll("#dropdownSort1 a");

  dropdownItems.forEach((item) => {
    item.onclick = (e) => {
      e.preventDefault();

      const selectedValue = item.textContent.trim();
      const products = productService.getCachedProducts();
      const filteredProducts = Product.filterProduct(products, selectedValue);

      renderProduct(filteredProducts.length > 0 ? filteredProducts : products);
    };
  });
};

let cart = null;

window.handleAddProductToCart = (id) => {
  if (!cart) {
    cart = new Cart([], productService.getCachedProducts());
  }
  cart.addProductToCart(id);
};

document.getElementById("buttonShowCart").onclick = (e) => {
  document.getElementById("showProduct").style.display = "none";
  document.getElementById("showCart").style.display = "block";
  e.preventDefault();
  renderCartTable();
};

function renderCartTable() {
  if (!cart) {
    cart = new Cart([], productService.getCachedProducts());
  }
  let htmlContent = "";
  cart.showCart().forEach(
    (item) =>
      (htmlContent += `
          <tr class="border-b hover:bg-gray-100">
                    <th
                      scope="row"
                      class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src="${item.img}"
                        alt="iMac Front Image"
                        class="w-auto h-8 mr-3"
                      />
                      Apple iMac 27&#34;
                    </th>
                    <td class="px-4 py-2">
                      <span
                        class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded"
                        >${item.price}</span
                      >
                    </td>
                    <td
                      class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div class="flex items-center">
                        <button
                          type="button"
                          class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                          onClick="handleIncreaseItemInTable('${item.id}')"
                        >
                          <i class="fa-solid fa-plus text-sm"></i>
                        </button>
                        <div
                          class="text-gray-900 border border-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-default"
                        >
                          ${item.quantity}
                        </div>
                        <button
                          type="button"
                          class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                          onClick="handleDecreaseItemInTable('${item.id}')"
                        >
                          <i class="fa-solid fa-minus text-sm"></i>
                        </button>
                      </div>
                    </td>
                    <td
                      class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      ${item.total}
                        </div>
                    </td>
                    <td
                      class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <button
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onClick="handleDeleteItemInTable('${item.id}')"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
  `)
  );
  document.getElementById("productTable").innerHTML = htmlContent;
}
window.handleIncreaseItemInTable = (id) => {
  cart.increaseQuantity(id);
  renderCartTable();
};

window.handleDecreaseItemInTable = (id) => {
  cart.decreaseQuantity(id);
  renderCartTable();
};

window.handleDeleteItemInTable = (id) => {
  cart.removeItem(id);
  renderCartTable();
};

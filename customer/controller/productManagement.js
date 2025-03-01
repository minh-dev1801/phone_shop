import { formatVND } from "../../asset/utils/utils.js";
import { Cart } from "../model/Cart.js";
import { Product } from "../model/Product.js";
import { productService } from "../services/api.js";

const init = async () => {
  try {
    productService.clearCache();
    await productService.getAllProducts();

    Cart.setInstance(productService.getCachedProducts());
    renderProduct(productService.getCachedProducts());
  } catch (error) {
    console.error("Lỗi khi khởi tạo:", error);
    renderProduct([]);
  }
};

init();

setInterval(async () => {
  init();
}, 3000);

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
            <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
              ${product.name}
            </a>
            <div class="specifications mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <p>
                <span class="font-medium">Loại sản phẩm:</span> ${product.type}
              </p>
              <p>
                <span class="font-medium">Mô tả:</span> ${product.desc}
              </p>
              <p>
                <span class="font-medium">Màn hình:</span> ${
                  product.screen || product.desc
                }
              </p>
              <p>
                <span class="font-medium">Camera trước:</span> ${
                  product.frontCamera
                }
              </p>
              <p>
                <span class="font-medium">Camera sau:</span> ${
                  product.backCamera
                }
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between gap-4">
          <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
            $${product.price}
          </p>
          <button
            type="button"
            class="addProductCart inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick="handleAddProductToCart('${product.id}')"
          >
            <i class="fa-solid fa-cart-plus -ms-2 me-2"></i>
            Add to cart
          </button>
        </div>
      </div>
    `;
  });

  document.getElementById("productContent").innerHTML = htmlContent;
};

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

window.handleAddProductToCart = (id) => {
  Cart.getInstance().addProductToCart(id);
};

document.getElementById("buttonShowCart").onclick = (e) => {
  e.preventDefault();
  document.getElementById("showProduct").style.display = "none";
  document.getElementById("showHero").style.display = "none";
  document.getElementById("showCart").style.display = "block";
  renderCartTable();
};

function renderCartTable() {
  let htmlContent = "";

  if (Cart.getInstance().items.length === 0) {
    htmlContent = `
      <tr>
        <td class="text-2xl text-center py-10 text-black" colspan="5">
          Giỏ hàng trống
        </td>
      </tr>
    `;
  } else {
    Cart.getInstance()
      .showCart()
      .forEach((item) => {
        htmlContent += `
          <tr class="border-b hover:bg-gray-100">
            <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <img src="${item.img}" alt="${item.name}" class="w-auto h-8 mr-3" />
              ${item.name}
            </th>
            <td class="px-4 py-2">
              <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
                ${item.price}
              </span>
            </td>
            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="flex items-center">
                <button
                  type="button"
                  class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                  onClick="handleIncreaseItemInTable('${item.id}')"
                >
                  <i class="fa-solid fa-plus text-sm"></i>
                </button>
                <div class="text-gray-900 border border-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-default">
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
            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              ${item.total}
            </td>
            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick="handleDeleteItemInTable('${item.id}')"
              >
                Xóa
              </button>
            </td>
          </tr>
        `;
      });
  }

  document.getElementById("productTable").innerHTML = htmlContent;
  document.getElementById("grandTotal").innerHTML = formatVND(
    Cart.getInstance().grandTotal()
  );
}
window.handleIncreaseItemInTable = (id) => {
  Cart.getInstance().increaseQuantity(id);
  renderCartTable();
};

window.handleDecreaseItemInTable = (id) => {
  Cart.getInstance().decreaseQuantity(id);
  renderCartTable();
};

window.handleDeleteItemInTable = (id) => {
  Cart.getInstance().removeItem(id);
  renderCartTable();
};

document.getElementById("checkout").onclick = () => {
  Cart.getInstance().clearCart();
  renderCartTable();
  console.log("Thanh toán thành công, giỏ hàng đã được xóa!");
};

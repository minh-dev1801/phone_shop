import { getDataProduct } from "../services/fetchProductApi.js";

let products = [];
let cart = [];

const init = async () => {
  try {
    products = await getDataProduct();
    renderProduct(products);
  } catch (error) {
    console.error("Lỗi khi khởi tạo:", error);
  }
};

init();

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
                    <button type="button" class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
  const dropdown = document.getElementById("dropdownSort1");
  const dropdownItems = document.querySelectorAll("#dropdownSort1 a");

  dropdownItems.forEach((item) => {
    item.onclick = (e) => {
      e.preventDefault();
      const selectedValue = item.textContent.trim();
      const filteredProducts = products.filter(
        (product) => product.type.toLowerCase() === selectedValue.toLowerCase()
      );
      renderProduct(filteredProducts.length > 0 ? filteredProducts : products);
    };
  });
};

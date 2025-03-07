document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const productName = document.getElementById('productName');
    const productImageUrl = document.getElementById('productImageUrl');
    const productImageFile = document.getElementById('productImageFile');
    const productType = document.getElementById('productType');
    const productDescription = document.getElementById('productDescription');
    const productScreen = document.getElementById('productScreen');
    const productFrontCamera = document.getElementById('productFrontCamera');
    const productBackCamera = document.getElementById('productBackCamera');
    const productPrice = document.getElementById('productPrice');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveProductBtn = document.getElementById('saveProductBtn');
    const sortPriceBtn = document.getElementById('sortPrice');
  
    let products = [];
    let isEditing = false;
    let editingProductId = null;
  
    // Fetch products from API
    function fetchProducts() {
      axios.get('https://67bdd695321b883e790e2939.mockapi.io/Products')
        .then(response => {
          products = response.data;
          renderProducts(products);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  
    // Render products to the table
    function renderProducts(products) {
      productList.innerHTML = '';
      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="border p-2">${product.name}</td>
          <td class="border p-2"><img src="${product.img}" alt="${product.name}" class="w-6 h-6 object-cover"></td>
          <td class="border p-2">${product.type}</td>
          <td class="border p-2">${product.desc}</td>
          <td class="border p-2">${product.screen}</td>
          <td class="border p-2">${product.frontCamera}</td>
          <td class="border p-2">${product.backCamera}</td>
          <td class="border p-2">${product.price}</td>
          <td class="border p-2">
            <button class="editBtn" data-id="${product.id}">✏️</button>
            <button class="deleteBtn" data-id="${product.id}">❌</button>
          </td>
        `;
        productList.appendChild(row);
      });
    }
  
    // Show the modal
    function showModal() {
      productModal.style.display = 'flex';
    }
  
    // Hide the modal
    function hideModal() {
      productModal.style.display = 'none';
    }
  
    // Clear the form
    function clearForm() {
      productName.value = '';
      productImageUrl.value = '';
      productImageFile.value = '';
      productType.value = 'iPhone';
      productDescription.value = '';
      productScreen.value = '';
      productFrontCamera.value = '';
      productBackCamera.value = '';
      productPrice.value = '';
    }
  
    // Add or update product
    function saveProduct() {
      const productData = {
        name: productName.value,
        image: productImageUrl.value || URL.createObjectURL(productImageFile.files[0]),
        type: productType.value,
        description: productDescription.value,
        screen: productScreen.value,
        frontCamera: productFrontCamera.value,
        backCamera: productBackCamera.value,
        price: productPrice.value
      };
  
      if (isEditing) {
        // Update product
        axios.put(`https://67bdd695321b883e790e2939.mockapi.io/Products/${editingProductId}`, productData)
          .then(response => {
            fetchProducts();
            hideModal();
            clearForm();
            isEditing = false;
            editingProductId = null;
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });
      } else {
        // Add product
        axios.post('https://67bdd695321b883e790e2939.mockapi.io/Products', productData)
          .then(response => {
            fetchProducts();
            hideModal();
            clearForm();
          })
          .catch(error => {
            console.error('Error adding product:', error);
          });
      }
    }
  
    // Delete product
    function deleteProduct(productId) {
      axios.delete(`https://67bdd695321b883e790e2939.mockapi.io/Products/${productId}`)
        .then(response => {
          fetchProducts();
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  
    // Search products
    function searchProducts() {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
      renderProducts(filteredProducts);
    }
  
    // Sort products by price
    let sortAscending = true;
    function sortProductsByPrice() {
      products.sort((a, b) => sortAscending ? a.price - b.price : b.price - a.price);
      sortAscending = !sortAscending;
      renderProducts(products);
    }
  
    // Event listeners
    searchBtn.addEventListener('click', searchProducts);
    searchInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        searchProducts();
      } else if (searchInput.value === '') {
        renderProducts(products);
      }
    });
    addProductBtn.addEventListener('click', function () {
      modalTitle.textContent = 'Thêm sản phẩm';
      showModal();
    });
    cancelBtn.addEventListener('click', function () {
      hideModal();
      clearForm();
    });
    saveProductBtn.addEventListener('click', saveProduct);
    sortPriceBtn.addEventListener('click', sortProductsByPrice);
    productList.addEventListener('click', function (event) {
      if (event.target.classList.contains('editBtn')) {
        const productId = event.target.getAttribute('data-id');
        const product = products.find(p => p.id === productId);
        modalTitle.textContent = 'Cập nhật sản phẩm';
        productName.value = product.name;
        productImageUrl.value = product.img;
        productType.value = product.type;
        productDescription.value = product.desc;
        productScreen.value = product.screen;
        productFrontCamera.value = product.frontCamera;
        productBackCamera.value = product.backCamera;
        productPrice.value = product.price;
        isEditing = true;
        editingProductId = productId;
        showModal();
      } else if (event.target.classList.contains('deleteBtn')) {
        const productId = event.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this product?')) {
          deleteProduct(productId);
        }
      }
    });
  
    // Initial fetch of products
    fetchProducts();
  });
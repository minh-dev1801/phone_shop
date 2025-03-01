export class Cart {
  constructor(items = [], products = []) {
    this.items = this.loadFromLocalStorage() || items;
    this.products = products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getItemById(productId) {
    return this.items.find((item) => item.productId === productId);
  }

  getItems() {
    return this.items;
  }

  addProductToCart(id) {
    const product = this.getProductById(id);
    const item = this.getItemById(id);

    if (item) {
      item.quantity = item.quantity + 1;
    } else if (product) {
      this.items.push({ productId: product.id, quantity: 1 });
    } else {
      console.error(`Sản phẩm với ID ${id} không tồn tại!`);
    }

    this.saveToLocalStorage();
  }

  increaseQuantity(id) {
    const item = this.getItemById(id);
    if (item) {
      item.quantity += 1;
      this.saveToLocalStorage();
    }
  }

  decreaseQuantity(id) {
    const item = this.getItemById(id);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(id);
      return;
    }
    this.saveToLocalStorage();
  }

  showCart() {
    return this.items.length === 0
      ? []
      : this.items.map((item) => {
          const product = this.getProductById(item.productId) || {
            name: "Sản phẩm không tìm thấy",
            img: null,
            price: 0,
          };
          return {
            id: item.productId,
            name: product.name,
            img: product.img,
            price: product.price,
            quantity: item.quantity,
            total: item.quantity * product.price,
          };
        });
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.productId !== id);
    this.saveToLocalStorage();
  }
  
  loadFromLocalStorage() {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  }

  saveToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(this.items));
  }
}

export class Cart {
  constructor(items, products) {
    this.items = items;
    this.products = products;
  }

  getItems() {
    return this.items;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getItemById(productId) {
    return this.items.find((item) => item.productId === productId);
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
  }

  increaseQuantity(id) {
    const increaseQuantityItems = this.items.map((item) =>
      item.productId === id ? { ...item, quantity: (item.quantity += 1) } : item
    );
    return (this.items =
      increaseQuantityItems.length === 0 ? [] : increaseQuantityItems);
  }

  decreaseQuantity(id) {
    const decreaseQuantityItems = this.items.map((item) =>
      item.productId === id
        ? { ...item, quantity: item.quantity <= 0 ? 0 : (item.quantity -= 1) }
        : item
    );
    return (this.items =
      decreaseQuantityItems.length === 0 ? [] : decreaseQuantityItems);
  }

  getCart() {
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

  removeItemInCart(id) {
    const filteredItems = this.items.filter((item) => item.productId !== id);
    return (this.items = filteredItems.length === 0 ? [] : filteredItems);
  }
}

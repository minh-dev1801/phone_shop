import { Product } from "../model/Product.js";

export const productService = {
  _products: [],
  async getAllProducts() {
    try {
      if (this._products.length === 0) {
        const response = await axios.get(
          "https://67bdd695321b883e790e2939.mockapi.io/Products"
        );

        const products = response.data;

        this._products = products.map(
          (product) =>
            new Product(
              product.id,
              product.name,
              product.price,
              product.screen,
              product.backCamera,
              product.frontCamera,
              product.img,
              product.desc,
              product.type
            )
        );

        return this._products;
      }
    } catch (error) {
      console.error("Lỗi khi tải products: ", error);
    }
  },
  getCachedProducts() {
    return this._products;
  },
  clearCache() {
    return (this._products = []);
  },
};

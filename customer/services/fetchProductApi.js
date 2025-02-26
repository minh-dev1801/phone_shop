export const getDataProduct = async () => {
  try {
    const response = await axios.get(
      "https://67bdd695321b883e790e2939.mockapi.io/Products"
    );
    const products = response.data;
    return products;
  } catch (error) {
    console.error("Lỗi khi tải products: ", error);
  }
};

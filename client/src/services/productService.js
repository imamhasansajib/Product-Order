import axios from "axios";

class Product {
  create(formData) {
    const url = "http://127.0.0.1:8000/api/create-product";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(url, formData, config);
  }

  products() {
    const url = "http://127.0.0.1:8000/api/all-products";

    return axios.get(url);
  }

  deleteProduct(formData) {
    const url = "http://127.0.0.1:8000/api/delete-product";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.post(url, formData, config);
  }
}

export default new Product();

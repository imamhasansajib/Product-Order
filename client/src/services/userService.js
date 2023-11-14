import axios from "axios";

class User {
  create(formData) {
    const url = "http://127.0.0.1:8000/api/create-user";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(url, formData, config);
  }
}

export default new User();

import LayoutComponet from "../LayoutComponent";
import { useState, useEffect } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import UserService from "../../services/userService";
import ProductService from "../../services/productService";

function ProductComponent() {
  const [createShow, createInvokeModal] = useState(false); //create modal

  const createModal = () => {
    return createInvokeModal(!createShow);
  };

  //get all users data
  const [users, setUsers] = useState({});

  const fetchUsers = async () => {
    setUsers(await UserService.getUsers());
  };

  //create product
  const [user_id, setUser_id] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");

  const createFormSubmit = async (event) => {
    event.preventDefault();

    if (images.length > 5) {
      alert("Only 5 Product Images are allowed for one product!");
      return false;
    }

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("name", name);
    formData.append("price", price);

    if (images !== "" && images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const response = await ProductService.create(formData);

    if (response.data.success) {
      alert("Product succesfully added!");
    } else {
      alert(response.data.msg);
    }

    createModal();
    fetchProducts();
  };

  // All proudcts
  const [products, setProducts] = useState({});

  const fetchProducts = async () => {
    setProducts(await ProductService.products());
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    // console.log(products.data.data.map((product) => product.name));
  }, []);

  //product images
  const [productImageShow, setProductImageShow] = useState(false);
  const [productImages, setProductImages] = useState([]);

  const productIamgeModal = () => {
    return setProductImageShow(!productImageShow);
  };

  const productImagesStore = (images) => {
    setProductImages(images);
    productIamgeModal();
  };

  //delete product
  const deleteProduct = async (product_id) => {
    const formData = new FormData();

    formData.append("product_id", product_id);

    const response = await ProductService.deleteProduct(formData);
    if (response.success) {
      alert(response.data.msg);
    } else {
      alert(response.data.msg);
    }
    fetchProducts();
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      <LayoutComponet />
      <div id="content" className="p-4 p-md-5 pt-5">
        <h2 className="mb-4">Products</h2>

        <Button className="mb-3" variant="success" onClick={createModal}>
          Add Product
        </Button>

        <Modal show={createShow}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
            <CloseButton onClick={createModal}>X</CloseButton>
          </Modal.Header>

          <form onSubmit={createFormSubmit}>
            <Modal.Body>
              <select
                name="user_id"
                required
                className="w-100 mb-3"
                onChange={(event) => setUser_id(event.target.value)}
              >
                <option value="">Select User</option>
                {users.data !== undefined &&
                  users.data.data.length > 0 &&
                  users.data.data.map((user) => (
                    <option key={user.name} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </select>

              <input
                type="text"
                name="name"
                required
                className="w-100 mb-3"
                placeholder="Enter product name"
                onChange={(event) => setName(event.target.value)}
              />
              <input
                type="number"
                name="price"
                required
                className="w-100 mb-3"
                placeholder="Enter product price"
                onChange={(event) => setPrice(event.target.value)}
              />
              <input
                type="file"
                name="images"
                required
                multiple
                className="w-100 mb-3"
                onChange={(event) => setImages(event.target.files)}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={createModal}>
                Cancel
              </Button>

              <Button type="submit" variant="primary">
                Add
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* All Products */}
        <table className="table">
          <thead>
            <tr key={"table header"}>
              <th>Product Name</th>
              <th>User Name</th>
              <th>Price</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          {products.data !== undefined && products.data.data.length > 0 && (
            <tbody>
              {products.data.data.map((product) => (
                <tr key={product.name}>
                  <td>{product.name}</td>
                  <td>{product.user[0]["name"]}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      //   href="#"
                      onClick={(event) => productImagesStore(product.images)}
                    >
                      Images
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(event) => deleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* Product images show modal */}
        <Modal show={productImageShow}>
          <Modal.Header>
            <Modal.Title>Product Images</Modal.Title>
            <CloseButton onClick={productIamgeModal}>X</CloseButton>
          </Modal.Header>

          <Modal.Body>
            {productImages.map((image) => (
              <img
                key={image}
                className="mr-2"
                src={"http://127.0.0.1:8000/api/" + image}
                alt="product images"
                width="150px"
                height="150px"
              />
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="dark" onClick={productIamgeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ProductComponent;

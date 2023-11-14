import LayoutComponet from "../LayoutComponent";
import { useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import UserService from "../../services/userService";

function UserComponent() {
  const [createShow, createInvokeModal] = useState(false);

  const createModal = () => {
    return createInvokeModal(!createShow);
  };

  //create user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [image, setImage] = useState("");

  const createFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileno", mobileno);

    if (image !== "" && image.length !== 0) {
      formData.append("image", image);
    }

    const response = await UserService.create(formData);
    if (response.data.success === true) {
      alert("User succesfully created!");
    } else {
      alert(response.data.msg);
    }

    createModal();
  };

  return (
    <div class="wrapper d-flex align-items-stretch">
      <LayoutComponet />
      <div id="content" class="p-4 p-md-5 pt-5">
        <h2 class="mb-4">Users</h2>

        <Button variant="success" onClick={createModal}>
          Create User
        </Button>

        <Modal show={createShow}>
          <Modal.Header>
            <Modal.Title>Create User</Modal.Title>
            <CloseButton onClick={createModal}>X</CloseButton>
          </Modal.Header>

          <form onSubmit={createFormSubmit}>
            <Modal.Body>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                class="w-100 mb-3"
                onChange={(event) => setName(event.target.value)}
                required
              ></input>
              <input
                type="email"
                name="email"
                placeholder="user@mail.com"
                class="w-100 mb-3"
                onChange={(event) => setEmail(event.target.value)}
                required
              ></input>
              <input
                type="number"
                name="mobileno"
                placeholder="Enter your mobile no"
                class="w-100 mb-3"
                onChange={(event) => setMobileno(event.target.value)}
                required
              ></input>
              <input
                type="file"
                name="image"
                class="w-100 mb-3"
                onChange={(event) => setImage(event.target.files[0])}
                required
              ></input>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={createModal}>
                close
              </Button>

              <Button type="submit" variant="primary">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default UserComponent;

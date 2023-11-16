import LayoutComponet from "../LayoutComponent";
import { useState, useEffect } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import UserService from "../../services/userService";

function UserComponent() {
  const [createShow, createInvokeModal] = useState(false); //create modal
  const [updateShow, updateInvokeModal] = useState(false); //update modal

  const createModal = () => {
    return createInvokeModal(!createShow);
  };

  const updateModal = () => {
    return updateInvokeModal(!updateShow);
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
    fetchUsers();
  };

  //get all users data
  const [users, setUsers] = useState({});

  const fetchUsers = async () => {
    setUsers(await UserService.getUsers());
  };

  useEffect(() => {
    console.log("Hi");
    fetchUsers();
  }, []);

  // delete user functionality
  const deleteUser = async (user_id) => {
    const formData = new FormData();
    formData.append("user_id", user_id);

    const response = await UserService.deleteUser(formData);

    if (response.data.success === true) {
      alert(response.data.msg);
    } else {
      alert(response.data.msg);
    }

    fetchUsers();
  };

  //update user data
  const [user_id, setUser_id] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateMobileno, setUpdateMobileno] = useState("");
  const [updateImage, setUpdateImage] = useState("");

  const editUser = (user_id, name, email, mobileno) => {
    setUser_id(user_id);
    setUpdateName(name);
    setUpdateEmail(email);
    setUpdateMobileno(mobileno);
    updateModal();
  };

  const updateFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("name", updateName);
    formData.append("email", updateEmail);
    formData.append("mobileno", updateMobileno);

    if (updateImage !== "" && updateImage.length !== 0) {
      formData.append("image", updateImage);
    }

    const response = await UserService.update(formData);
    if (response.data.success === true) {
      alert(response.data.msg);
    } else {
      alert(response.data.msg);
    }

    updateModal();
    fetchUsers();
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      <LayoutComponet />
      <div id="content" className="p-4 p-md-5 pt-5">
        <h2 className="mb-4">Users</h2>

        <Button className="mb-3" variant="success" onClick={createModal}>
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
                className="w-100 mb-3"
                onChange={(event) => setName(event.target.value)}
                required
              ></input>
              <input
                type="email"
                name="email"
                placeholder="user@mail.com"
                className="w-100 mb-3"
                onChange={(event) => setEmail(event.target.value)}
                required
              ></input>
              <input
                type="number"
                name="mobileno"
                placeholder="Enter your mobile no"
                className="w-100 mb-3"
                onChange={(event) => setMobileno(event.target.value)}
                required
              ></input>
              <input
                type="file"
                name="image"
                className="w-100 mb-3"
                onChange={(event) => setImage(event.target.files[0])}
                required
              ></input>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={createModal}>
                Cancel
              </Button>

              <Button type="submit" variant="primary">
                Create
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* {show users data in table} */}
        <table className="table">
          <thead>
            <tr key={"header"}>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {users.data !== undefined && users.data.data.length > 0 && (
            <tbody>
              {users.data.data.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileno}</td>
                  <td>
                    <img
                      alt={user.name + "'s image"}
                      src={"http://127.0.0.1:8000/api/" + user.image}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={(event) =>
                        editUser(user._id, user.name, user.email, user.mobileno)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="ml-3"
                      variant="danger"
                      onClick={(event) => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* update user modal */}
        <Modal show={updateShow}>
          <Modal.Header>
            <Modal.Title>Update User</Modal.Title>
            <CloseButton onClick={updateModal}>X</CloseButton>
          </Modal.Header>

          <form onSubmit={updateFormSubmit}>
            <Modal.Body>
              <input
                type="text"
                name="name"
                className="w-100 mb-3"
                value={updateName}
                onChange={(event) => setUpdateName(event.target.value)}
                required
              ></input>
              <input
                type="email"
                name="email"
                className="w-100 mb-3"
                value={updateEmail}
                onChange={(event) => setUpdateEmail(event.target.value)}
                required
              ></input>
              <input
                type="number"
                name="mobileno"
                className="w-100 mb-3"
                value={updateMobileno}
                onChange={(event) => setUpdateMobileno(event.target.value)}
                required
              ></input>
              <input
                type="file"
                name="image"
                className="w-100 mb-3"
                onChange={(event) => setUpdateImage(event.target.files[0])}
              ></input>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={updateModal}>
                Cancel
              </Button>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default UserComponent;

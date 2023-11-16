import { Button } from "react-bootstrap";

function LayoutComponet() {
  return (
    <nav id="sidebar">
      <div className="custom-menu">
        <Button type="button" id="sidebarCollapse" variant="primary">
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>
      <h1>
        <a href="#" className="logo">
          Order Product
        </a>
      </h1>
      <ul className="list-unstyled components mb-5">
        <li className="active">
          <a href="#">
            <span className="fa fa-user mr-3"></span>Users
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default LayoutComponet;

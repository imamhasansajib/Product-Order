import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LayoutComponet() {
  return (
    <nav id="sidebar">
      <div className="custom-menu">
        <Button id="sidebarCollapse">
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>
      <h1>
        <Link to="/" className="logo">
          Order Product
        </Link>
      </h1>
      <ul className="list-unstyled components mb-5">
        <li className="active">
          <Link to="/">
            <span className="fa fa-user mr-3"></span>Users
          </Link>
        </li>
        <li className="active">
          <Link to="/products">
            <span className="fa fa-product-hunt mr-3"></span>Products
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default LayoutComponet;

import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { Logout } from "../../components";
import imgLogo from "../../Images/logo.png";
import "./style.css";

const BrandExample = () => {
  return (
    <>
      <>
        {localStorage.getItem("token") ? (
          <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark">
            <Container fluid>
              <Navbar.Brand href="/" className="brand">
                <img src={imgLogo} alt="Foodieasy" style={{ maxWidth: "30px" }} /> FoodFire
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" className="offcanvas-title">
                    foodieasy
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
                  <Nav className="navbar-font">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/favorites">Favorites</Nav.Link>
                    <Nav.Link href="/about">About Us</Nav.Link>
                    {localStorage.getItem("role") === "admin" ? <Nav.Link href="/addfood">Add Food</Nav.Link> : null}
                    <Nav.Link href="/foodlist">Food List</Nav.Link>
                    <NavDropdown align="end" title={localStorage.getItem("name")} id="collasible-nav-dropdown" className="nav-dropdown">
                      <NavDropdown.Item href="/profile">Edit Profile</NavDropdown.Item>
                      {localStorage.getItem("role") === "admin" ? <NavDropdown.Item href="/allusers">All Users</NavDropdown.Item> : null}
                      <NavDropdown.Item href="#">Contact Us</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Logout />
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ) : null}
      </>
    </>
  );
};

export default BrandExample;

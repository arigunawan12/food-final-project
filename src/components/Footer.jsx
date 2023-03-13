import { Container, Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <>
      {localStorage.getItem("token") ? (
        <Container fluid>
          <Row className="row-cols-lg-4 row-cols-md-2 row-cols-1 bg-dark text-light mt-3">
            <Col className="footer">
              <h3 className="mx-auto">
                <span className="text-light">Food</span>
                <span className="text-danger">Recipe</span>
              </h3>
              <ul className="list-group list-group-horizontal d-flex justify-content-center w-100">
                <li className="list-group-item list-group-item-success">
                  <i className="bi bi-facebook"></i>
                </li>
                <li className="list-group-item">
                  <i className="bi bi-twitter"></i>
                </li>
                <li className="list-group-item">
                  <i className="bi bi-instagram"></i>
                </li>
                <li className="list-group-item">
                  <i className="bi bi-github"></i>
                </li>
              </ul>
            </Col>
            <div className="footer">
              <ul className="list-group list-group-flush">
                <h4>Support</h4>

                <li>Contact Us</li>
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Careers</li>
              </ul>
            </div>

            <Col className="footer">
              <div className="footer-col">
                <h4>Get Help</h4>
                <ul className="list-group list-group-flush">
                  <li>FAQ</li>
                  <li>Subscriptions</li>
                  <li>How Works</li>
                  <li>Cookie Preferences</li>
                </ul>
              </div>
            </Col>

            <Col className="footer">
              <div className="footer-col">
                <h4>Stay up to date the latest from us</h4>
                <Form>
                  <Form.Control type="email" placeholder="Enter your email address" />
                </Form>
                <Button variant="danger" className="mt-3">
                  Sign Up
                </Button>
              </div>
            </Col>
          </Row>

          <div className="h4 text-dark text-center mt-2">
            © All Rights Reserved <span>{year}</span>. Created by <b>Wahyu Ari Gunawan</b>.
          </div>
        </Container>
      ) : null}
    </>
  );
}

export default Footer;

import { Card, Container, CardGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Footer() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <Container>
          <CardGroup>
            <Card className="footer">
              <h4>Food Fire</h4>
              <ul className="list-group list-group-horizontal d-flex justify-content-center">
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
            </Card>
            <Card className="footer">
              <ul className="list-group list-group-flush">
                <h4>Support</h4>

                <li>Contact Us</li>
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Careers</li>
              </ul>
            </Card>

            <Card className="footer">
              <div className="footer-col">
                <h4>Get Help</h4>
                <ul className="list-group list-group-flush">
                  <li>FAQ</li>
                  <li>Subscriptions</li>
                  <li>How Works</li>
                  <li>Cookie Preferences</li>
                </ul>
              </div>
            </Card>

            <Card className="footer">
              <div className="footer-col">
                <h4>Stay up to date the latest from us</h4>
                <Form>
                  <Form.Control type="email" placeholder="Enter your email address" />
                </Form>
                <Button variant="danger" className="mt-3">
                  Sign Up
                </Button>
              </div>
            </Card>
          </CardGroup>

          <div className="h5 text-secondary">
            © All Rights Reserved 2023. Created by <b>Wahyu Ari Gunawan</b>.
          </div>
        </Container>
      ) : null}
    </>
  );
}

export default Footer;

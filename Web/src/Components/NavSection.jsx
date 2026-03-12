import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../CSS/RegisteredUsersCss/navSection.css";
import Button from "react-bootstrap/Button";

function NavSection() {
  return (
    <div className="navbar-container">
      <Navbar expand="lg" className="navbar-section">
        <Container>
          <Navbar.Brand href="#"><span>X-</span>Plore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft:90}}>
            <Nav className="me-auto">
              <Nav.Link href="#home" className="nav_link">Home</Nav.Link>
              <Nav.Link href="#link" className="nav_link">Challenges</Nav.Link>
              <Nav.Link href="#link" className="nav_link">Rare places</Nav.Link>
              <Nav.Link href="#link" className="nav_link">Contact</Nav.Link>
            </Nav>
            <div className="nav-icons">
              <div className="notification-profile-icons">
                <i className="bi bi-bell-fill"></i>
                <i className="bi bi-person-fill" style={{fontSize:22,marginLeft:20}}></i>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavSection;
            {/* <div className="bg-icons">
                <span><i class="bi bi-tree-fill"></i></span>
                <span><i class="bi bi-moon-fill"></i></span>
                <span><i class="bi bi-cloud-fill"></i></span>
              </div> */}
                            {/* <button class="btn-53">
                <div class="original">LogIn</div>
                <div class="letters">
                  <span>L</span>
                  <span>o</span>
                  <span>g</span>
                  <span>I</span>
                  <span>n</span>
                </div>
              </button> */}
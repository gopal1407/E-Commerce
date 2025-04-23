import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart{' '}
              {cartCount > 0 && (
                <span className="badge bg-danger rounded-pill">{cartCount}</span>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>

      {/* Toast notification container */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Router>
  );
}

export default App;

import React from "react";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { user, logout, cart } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const handleProfile = () => {
    if (user?.userType === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/orders');
    }
  };

  return (
    <nav className="navbar" style={{backgroundColor: '#6f42c1', padding: '10px 20px'}}>
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold" href="/" style={{fontSize: '24px'}}>ShopEZ</a>
        <form className="d-flex align-items-center" role="search">
          <input 
            className="form-control me-3" 
            type="search" 
            placeholder="Search Electronics, Fashion, mobiles, etc..." 
            aria-label="Search"
            style={{width: '400px'}}
          />
          <button className="btn btn-light me-3" type="button">🔍</button>
          
          {user ? (
            <div className="d-flex align-items-center">
              <button className="btn btn-light me-2" onClick={handleCart}>
                🛒 {cart.length > 0 && <span className="badge bg-danger">{cart.length}</span>}
              </button>
              <button className="btn btn-light me-2" onClick={handleProfile}>
                👤 {user.username}
              </button>
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="btn btn-outline-light" onClick={handleLogin}>Login</button>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
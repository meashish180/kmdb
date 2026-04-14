import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">KMDB</Link>

                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    {user && <Link to="/favorites">Favorites</Link>}
                    {user ? (
                        <>
                            <span className="navbar-user">{user.name}</span>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

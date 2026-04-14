import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MovieDetails from '../pages/MovieDetails';
import Favorites from '../pages/Favorites';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './page/UserPage';
import LoginPage from './page/LoginPage';
import AdminPage from "./page/AdminPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import CustomerPage from "./page/CustomerPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/user/:userId" element={<UserPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customer" element={<ProtectedRoute component={CustomerPage} />} />
                <Route path="/admin" element={<ProtectedRoute component={AdminPage} />} />

            </Routes>
        </BrowserRouter>
    );
}

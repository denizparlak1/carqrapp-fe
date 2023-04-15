import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import UserPage from './page/UserPage';
import LoginPage from './page/LoginPage';
import AdminPage from "./page/AdminPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import CustomerPage from "./page/CustomerPage";
import FirstLoginPage from "./page/FirstLoginPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import ReportPage from "./page/ReportPage";
import CorporationAdminPage from "./page/CorporationAdminPage";
import {CorpQrCodesPage} from "./page/CorpQrCodesPage";
import {SampleQrPage} from "./page/SampleQrPage";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/user/:userId" element={<UserPage />} />
                <Route path="/reports" element={<ReportPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customer" element={<ProtectedRoute component={CustomerPage} />} />
                <Route path="/admin" element={<ProtectedRoute component={AdminPage} />} />
                <Route path="/sample-qr" element={<ProtectedRoute component={SampleQrPage} />} />


                <Route path="/corp-admin" element={<ProtectedRoute component={CorporationAdminPage} />} />
                <Route path="/corp-qrcodes" element={<CorpQrCodesPage />} />

                <Route path="/register" element={<FirstLoginPage />} />
                <Route path="/password-reset" element={<ResetPasswordPage />} />

            </Routes>
        </BrowserRouter>
    );
}

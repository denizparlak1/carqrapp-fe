import {signOut} from "../auth/auth";
import {useNavigate} from "react-router-dom";

export const handleLogout = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    try {
        await signOut();
        navigate('/login');
    } catch (error) {
        console.error('Logout error:', error);
    }
};
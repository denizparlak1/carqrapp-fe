import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "./AuthProvider";


const ProtectedRoute = ({ component: Component }) => {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Component />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;

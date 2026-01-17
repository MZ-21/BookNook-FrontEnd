import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "react-bootstrap";

// Signout component to log out the user and redirect to login page
const Signout = () => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
        navigate("/login");
    },  [logoutUser, navigate]);

    return <Spinner animation="border" role="status" />;

};

export default Signout;
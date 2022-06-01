import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

const ProtectedRoute = () => {
	const [user] = useContext(UserContext);
	const congrats = localStorage.getItem("congrats");

	if (user.loading) return <div>Spining...</div>;
	if (congrats) {
		return <Navigate to="/congrats" />;
	} else {
		return user.data ? <Outlet /> : <Navigate to="/login" />;
	}
};

export default ProtectedRoute;

//This component helps redirect non authenticated users to the login page.

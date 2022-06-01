import { Navigate, Outlet } from "react-router-dom";

const CongratsRoute = () => {
	const congrats = localStorage.getItem("congrats");

	return congrats ? <Outlet /> : <Navigate to="/login" />;
};

export default CongratsRoute;

//This component helps redirect non authenticated users to the login page.

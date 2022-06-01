import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

const RestrictedRoute = () => {
	const [user] = useContext(UserContext);

	return user.data ? <Navigate to="/" /> : <Outlet />;
};

export default RestrictedRoute;

//This component redirects authenticated users to the home page.

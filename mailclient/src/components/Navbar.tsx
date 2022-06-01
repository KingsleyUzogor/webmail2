import React, { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

const Navbar: React.FC = () => {
	const [user, setUser] = useContext(UserContext);

	const LogoutHandler = () => {
		localStorage.clear();
		localStorage.setItem("congrats", "true");
		setUser({
			data: null,
			congrats: false,
			loading: false,
		});
	};
	return (
		<div className="sticky top-0 z-10 flex flex-row items-center justify-between px-4 bg-white drop-shadow-md sm:px-2 md:px-4 xl:px-20 ">
			<div className="flex flex-row py-3">
				<img
					src="assets/imgs/mailbird.jpg"
					alt="mailbird logo"
					className="h-auto w-28 sm:w-52"
				/>
				<span className="hidden pt-0.5 mt-6 text-xs text-gray-500 sm:inline-block">
					...how email is done
				</span>
			</div>
			{user.data && (
				<div className="text-xl text-white">
					<button
						className={`bg-mail-blue py-1 px-4 sm:text-xl shadow-md text-sm text-white rounded border border-mail-blue hover:bg-mail-blue focus:outline-none w-fit`}
						onClick={LogoutHandler}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;

//This is basically the Nav component of the app that stays on top and houses the logo and the logout button.

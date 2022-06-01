import React, { createContext, useEffect, useState } from "react";

export interface User {
	data: {
		email: string;
		password: string;
		server: string;
		serverType: string;
		port: string;
		encryption: string;
		total: number | null;
	} | null;
	congrats: boolean;
	loading: boolean;
}

const UserContext = createContext<
	[User, React.Dispatch<React.SetStateAction<User>>]
>([
	{
		data: null,
		congrats: false,
		loading: true,
	},
	() => {},
]);
const email = localStorage.getItem("email");
const password = localStorage.getItem("password");
const server = localStorage.getItem("server");
const serverType = localStorage.getItem("serverType");
const port = localStorage.getItem("port");
const encryption = localStorage.getItem("encryption");
const totalInbox = localStorage.getItem("total");
if (totalInbox) {
	var total = parseInt(totalInbox);
}

const UserProvider = ({ children }: any) => {
	const [user, setUser] = useState<User>({
		data: null,
		congrats: false,
		loading: false,
	});

	useEffect(() => {
		if (email && password && server && serverType && port && encryption) {
			setUser({
				data: {
					email: email,
					password: password,
					server: server,
					serverType: serverType,
					port: port,
					encryption: encryption,
					total: total,
				},
				congrats: false,
				loading: false,
			});
		}
	}, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };

//This is where the data stored by the login page is recieved (if available) for use upon rerendering and reload.
//It wraps all the other components of this app, so as to make the user data available to all components. This is achieved with the
//useContext react hook, of course.
//That's about all for this file.

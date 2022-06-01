import { useNavigate } from "react-router-dom";
import axios from "axios";

import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";

const Login = () => {
	const [, setUser] = useContext(UserContext);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [server, setServer] = useState<string>("");
	const [serverType, setServerType] = useState<string>("");
	const [port, setPort] = useState<string>("");
	const [encryption, setEncryption] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [errorEmail, setErrorEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleFormSubmit = async (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg("");
		setErrorEmail("");
		var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
		if (!email.match(validRegex)) {
			setLoading(false);
			return setErrorEmail("Invalid Email! Kindly fix that.");
		}

		console.log(email);
		const response = await axios
			.post("http://localhost:4000/verify/", {
				email,
				password,
				server,
				serverType,
				port,
				encryption,
			})
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
					setErrorMsg(
						"Error occurred while connecting to server. \n Kindly verify credentials and try again."
					);
					setLoading(false);
				}
			});
		console.log(response?.data.ok);
		const total = response?.data.total;

		if (response?.data.ok) {
			if (total) {
				localStorage.setItem("email", email);
				localStorage.setItem("password", password);
				localStorage.setItem("server", server);
				localStorage.setItem("serverType", serverType);
				localStorage.setItem("port", port);
				localStorage.setItem("encryption", encryption);
				localStorage.setItem("total", total);

				setUser({
					data: {
						email: email,
						password: password,
						server: server,
						serverType: serverType,
						port: port,
						encryption: encryption,
						total: response?.data.total,
					},
					congrats: false,
					loading: false,
				});

				navigate("/");
			} else {
				setErrorMsg(`No ${serverType} Messages found in inbox!`);
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	};
	return (
		<div className="flex h-fit">
			<div className="w-full max-w-md px-16 py-10 m-auto mt-2 bg-white border rounded-lg lg:mt-12 border-primaryBorder shadow-default">
				<div className="mx-auto w-fit">
					<img
						src="assets/imgs/mailbird.jpg"
						alt="mailbird logo"
						height={80}
						width={150}
					/>
				</div>

				<h1 className="mt-1 mb-5 text-2xl font-semibold text-center text-primary">
					Sign in to your inbox
				</h1>

				<form onSubmit={handleFormSubmit}>
					{errorMsg && (
						<p className="mb-1 text-center text-red-600 text-md text-primary">
							{errorMsg}
						</p>
					)}
					{errorEmail && (
						<p className="mb-1 text-center text-red-600 text-md text-primary">
							{errorEmail}
						</p>
					)}

					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-3 ${
								errorEmail ? "border-red-600 text-red-600" : ""
							}`}
							id="email"
							placeholder="e.g example@domain.com"
							required
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading === true}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-3`}
							id="password"
							placeholder="Your Password"
							required
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading === true}
						/>
					</div>
					<div>
						<label htmlFor="server">Server</label>
						<input
							type="text"
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-3`}
							id="text"
							placeholder="e.g imap.gmix.com"
							required
							onChange={(e) => setServer(e.target.value)}
							disabled={loading === true}
						/>
					</div>
					<div>
						<label htmlFor="servertype">Server Type</label>

						<select
							name="servertype"
							id="servertype"
							required
							className={`w-full p-2 text-primary border bg-white rounded-md outline-none text-sm transition duration-150 ease-in-out mb-3`}
							onChange={(e) => setServerType(e.target.value)}
							disabled={loading === true}
						>
							<option value="">--choose protocol--</option>
							<option value="imap">IMAP</option>
							<option value="pop3">POP3</option>
						</select>
					</div>

					<div>
						<label htmlFor="port">Port</label>
						<input
							type="number"
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-3`}
							id="port"
							placeholder="e.g 993"
							required
							onChange={(e) => setPort(e.target.value)}
							disabled={loading === true}
						/>
					</div>
					<div>
						<label htmlFor="encryption">Encryption</label>

						<select
							name="encryption"
							id="encryption"
							required
							className={`w-full p-2 text-primary border bg-white rounded-md outline-none text-sm transition duration-150 ease-in-out mb-3`}
							onChange={(e) => setEncryption(e.target.value)}
							disabled={loading === true}
						>
							<option value="">--choose security type--</option>
							<option value="unencrypted">Unencrypted</option>
							<option value="ssl/tls">SSL/TLS</option>
							<option value="starttls">STARTTLS</option>
						</select>
					</div>

					<div className="relative flex items-center justify-center mt-6">
						{loading ? (
							<div className="text-[#2C6094]">
								<div className="flex items-center mx-auto w-fit">
									<span>Connecting to server</span>{" "}
									<span className="inline-block">
										<img
											src="assets/imgs/loadinggif.gif"
											alt="mailbird logo"
											height={40}
											width={60}
										/>
									</span>
								</div>
								<div className="flex items-center mx-auto w-fit">
									<span>Verifying credentials</span>
									<span className="inline-block">
										<img
											src="assets/imgs/loadinggif.gif"
											alt="mailbird logo"
											height={40}
											width={60}
										/>
									</span>
								</div>
							</div>
						) : (
							<button
								className={`bg-[#0054A8] py-2 px-4 text-xl text-white rounded border focus:outline-none w-1/2`}
							>
								Start
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

//Welcome to the Login page!
//This page is receives the most frequnt visits on this app as every user is directed to this page for validation before taken to the inbox/index
//page when server connection is successful.
//The page displays a form to recieve the user's credentials and sends a request to the api endpoint to validate the user.
//It throws errors if: the user email address is invalid, the connection to the server is not successful (whether due to invalid details aor server error),
// and if the user's inbox is empty.
//Upon succesful login attempt, it stores the user's data in the localstorage for access by the UserProvider.tsx file upon the first redirection and
//rerendering of the app.
//Thanks for visiting this page.

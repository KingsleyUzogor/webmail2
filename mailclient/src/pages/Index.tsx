import React, { useCallback, useContext, useState, useRef } from "react";
import Footer from "../components/Footer";
import MessageBoxHead from "../components/messagebox/MessageBoxHead";
import MessageHead from "../components/messagelist/MessageHead";
import MessageItem from "../components/messagelist/MessageItem";
import MessageModal from "../components/modal/MessageModal";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserProvider";
import axios from "axios";

const Index = () => {
	const [user] = useContext(UserContext);
	const email = user.data?.email;
	const password = user.data?.password;
	const server = user.data?.server;
	const serverType = user.data?.serverType;
	const port = user.data?.port;
	const encryption = user.data?.encryption;
	const total = user.data?.total;
	// // const [inboxes, setInboxes] = useState<any[]>([]);
	const [activeData, setActiveData] = useState<any[]>([]);
	const [reloader, setReloader] = useState<number>(1);
	const fetchedInboxes = useRef<any[]>([]);
	// const inboxes: any[] = array.uniqWith(fetchedInboxes.current, array.isEqual);
	const { current: inboxes } = fetchedInboxes;

	console.log(activeData);
	console.log(inboxes);

	const fetchMessage = (e: React.MouseEvent<Element, MouseEvent>) => {
		if (serverType === "imap") {
			const x = (e.target as HTMLElement).id;
			console.log(x);
			let fetchedData;
			const fetchMessages = async () => {
				const response = await axios
					.post("http://localhost:4000/fetchbody/", {
						email,
						password,
						server,
						serverType,
						port,
						encryption,
						x,
					})
					.catch(function (error) {
						if (error.response) {
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);

							// setMessagesLoading(false);
							alert(
								"Unable to fetch message. \n This is likely due to a server error or rarely, protocol error. \n You can try again or refresh the page to start all over"
							);
							setReloader(0);
						}
					});
				fetchedData = await response?.data;
				console.log(x);
				console.log(fetchedData);
				setActiveData(fetchedData);
			};
			fetchMessages();
		} else {
			const { current: allInboxes } = fetchedInboxes;
			const toFetch = (e.target as HTMLElement).id;
			const fetchedData = allInboxes.find((inbox) => inbox[0] === toFetch);
			setActiveData(fetchedData);
		}
	};

	const createMarkup = useCallback((htmlText: string) => {
		return {
			__html: htmlText,
		};
	}, []);

	if (total && reloader) {
		let inboxData;
		const fetchMessages = async () => {
			const response = await axios
				.post("http://localhost:4000/fetchhead/", {
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

						// setMessagesLoading(false);
						alert(
							"Unable to fetch more messages. \n\n This is likely due to a server error or rarely, protocol error. \n\n Kindly refresh the page to restart."
						);
						setReloader(0);
					}
				});
			inboxData = await response?.data;
			fetchedInboxes.current = inboxData;
			setReloader(0);
		};
		fetchMessages();
	}

	return (
		<div>
			<Navbar />
			<MessageModal activeData={activeData} />

			{/* <TestModal /> */}
			<div className="grid grid-cols-12 gap-1  my-0.5 lg:my-2 mx-2 sm:mx-2 md:mx-4  lg:mx-12 xl:mx-20  bg-[#f7f7f7]">
				{/* hidden md:block */}
				<div className="col-span-12 p-2 pt-0 bg-white rounded-lg sm:col-span-4 sm:mx-0 md:mx-0">
					<MessageHead total={total} />
					<div className="min-h-[90vh] sm:min-h-[80vh] bg-gray-50">
						{reloader > 0 && (
							<div className="flex items-center justify-center mx-auto align-middle md:text-sm lg:text-base w-fit h-fit">
								<span className="">Fetching {total} messages</span>
								<span className="mt-1 ml-0.5">
									<img
										src="assets/imgs/loadinggif.gif"
										alt="loading logo"
										height={50}
										width={75}
									/>
								</span>
							</div>
						)}
						{inboxes.length > 0 && (
							<div className="bg-gray-50 overflow-y-scroll max-h-[90vh] sm:max-h-[80vh]">
								{inboxes.map((inbox) => (
									<div key={inbox[0]} onClick={fetchMessage}>
										<MessageItem
											messageData={inbox}
											activeDataID={activeData[0]}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className="hidden col-span-12 overflow-hidden bg-white rounded-lg sm:flex sm:col-span-8 ">
					{activeData.length > 0 ? (
						<div className="w-full">
							<MessageBoxHead activeData={activeData} />
							<div className="h-[75vh] overflow-y-scroll w-full px-4 ">
								<div>
									<div
										dangerouslySetInnerHTML={createMarkup(activeData[5])}
										className=""
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="w-full">
							<div className="items-center justify-center mx-auto mt-32 lg:mt-44 w-fit">
								<img
									src="assets/imgs/Envelope.webp"
									alt="envelope logo"
									height={60}
									width={200}
									className="opacity-30"
								/>
								<div className="py-2">
									<div className="mx-auto text-gray-500 w-fit">
										Nothing to read
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Index;

//Welcome to the index page!
//The logic here is just to grab the user's data from the UserContext (set up in the src/contexts/UserProvider.tsx file) and send
//them to the api endpoint with help of the axios library.
//Once the date return, they are stored in the fetchedInboxes variable which is an immutable object (to prevent re renders until the
// the function completes). The art employed here is that the setReloader action variable would be able to trigger rerenders and therefore helps
//components update their respective data.
//The block of code below resulted from the efforts to display and fetch data simultaneously but for some reasons beyond control, the data were
//duplicates and some time returned tens of same data. That was the reason, fetching all data at once was later employed.
//And this is goodbye from the Index page!

// if (reloader > 0) {
// 	if (total && total > reloader && total - reloader > 50) {
// 		const imapStart = reloader;
// 		const imapEnd = imapStart + 49;
// 		const popRange = 50;
// 		let inboxData;
// 		const fetchMessages = async () => {
// 			const response = await axios
// 				.post("http://localhost:8080/fetchhead/", {
// 					email,
// 					password,
// 					server,
// 					serverType,
// 					port,
// 					encryption,
// 					imapStart,
// 					imapEnd,
// 					popRange,
// 				})
// 				.catch(function (error) {
// 					if (error.response) {
// 						console.log(error.response.data);
// 						console.log(error.response.status);
// 						console.log(error.response.headers);
// 						setReloader(0);
// 						// setMessagesLoading(false);
// 						alert(
// 							"Error occurred while connecting to server. Kindly verify credentials and try again."
// 						);
// 					}
// 				});
// 			inboxData = await response?.data[0];
// 			console.log(inboxData);
// 			fetchedInboxes.current = [inboxData, ...fetchedInboxes.current];
// 			setReloader(reloader + 50);
// 		};
// 		fetchMessages();
// 		// setTimeout(() => {
// 		// 	setReloader(reloader + 1);
// 		// }, 3000);
// 		// setReloader(0);
// 	} else if (total && total - reloader <= 50) {
// 		const imapStart = reloader;
// 		const imapEnd = total;
// 		console.log(imapEnd);
// 		const popRange = total - reloader;
// 		let inboxData;
// 		const fetchMessages = async () => {
// 			const response = await axios
// 				.post("http://localhost:8080/fetchhead/", {
// 					email,
// 					password,
// 					server,
// 					serverType,
// 					port,
// 					encryption,
// 					imapStart,
// 					imapEnd,
// 					popRange,
// 				})
// 				.catch(function (error) {
// 					if (error.response) {
// 						console.log(error.response.data);
// 						console.log(error.response.status);
// 						console.log(error.response.headers);
// 						setReloader(0);
// 						// setMessagesLoading(false);
// 						alert(
// 							"Error occurred while connecting to server. Kindly verify credentials and try again."
// 						);
// 					}
// 				});
// 			inboxData = await response?.data[0];
// 			console.log(inboxData);
// 			fetchedInboxes.current = [inboxData, ...fetchedInboxes.current];
// 			setReloader(0);
// 		};
// 		fetchMessages();
// 		// setTimeout(() => {
// 		// 	setReloader(reloader + 1);
// 		// }, 3000);
// 		// setReloader(0);
// 	} else {
// 		setReloader(0);
// 	}
// }

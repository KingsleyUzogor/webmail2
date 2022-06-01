import React, { useEffect, useState } from "react";
interface Props {
	messageData: any[];
	activeDataID: any;
}

const MessageItem: React.FC<Props> = ({ messageData, activeDataID }) => {
	const [mobile, setMobile] = useState<boolean>(false);
	const getSender = messageData[2].match(/.*?(?=<|$)/i)[0];
	const sender = getSender.replace(/['"]+/g, "");
	var emailDate;
	var emailTime;
	const dateTime = messageData[4].split("T");
	const rawDate = dateTime[0].split("-");
	const mydate = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
	const fullDate = mydate.toDateString();
	emailDate = fullDate.slice(fullDate.length - 11);
	emailTime = dateTime[1].substring(0, 5);
	var isActive = false;
	if (messageData[0] === activeDataID) {
		isActive = true;
	}
	const checkViewport = () => {
		if (window.innerWidth < 640) {
			setMobile(true);
		} else {
			setMobile(false);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", checkViewport);
		return () => window.removeEventListener("resize", checkViewport);
	}, []);

	return (
		<>
			<div
				className={`mx-1 my-0.5 px-2 hover:bg-gray-50  rounded-md cursor-pointer ${
					isActive ? "bg-gray-100" : "bg-white"
				}`}
				data-bs-toggle={mobile ? "modal" : ""}
				data-bs-target={mobile ? "#exampleModalScrollable" : ""}
				id={messageData[0]}
			>
				<div
					className={`grid grid-cols-12 gap-0 py-3 hover:bg-gray-50 ${
						isActive ? "bg-gray-100" : "bg-white"
					}`}
					id={messageData[0]}
				>
					<div className="flex w-full h-full mx-auto" id={messageData[0]}>
						<div className="flex col-span-1 mx-auto " id={messageData[0]}>
							<div
								className="mx-auto text-xl md:text-lg lg:text-xl text-white rounded-full uppercase bg-[#0054A8] w-7 h-7 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 mt-1 flex items-center justify-center"
								id={messageData[0]}
							>
								{sender[0]}
							</div>
						</div>
					</div>

					<div className="col-span-8 px-1 ml-1 " id={messageData[0]}>
						<p
							className="overflow-hidden text-lg font-semibold truncate sm:text-base lg:text-lg text-ellipsis"
							id={messageData[0]}
						>
							{sender}
						</p>
						<div className="flex w-full" id={messageData[0]}>
							<div
								className="truncate w-7/10 text-sm text-[#666]"
								id={messageData[0]}
							>
								{messageData[1]}
							</div>
						</div>
					</div>
					<div className="justify-end col-span-3" id={messageData[0]}>
						<div className="text-[#777]" id={messageData[0]}>
							<div className="" id={messageData[0]}>
								<div className="flex justify-end " id={messageData[0]}>
									<div
										className="relative mr-0 text-xs w-fit"
										id={messageData[0]}
									>
										{emailTime}
									</div>
								</div>
							</div>
							<div>
								<div className="flex justify-end mt-3.5" id={messageData[0]}>
									<div className="text-xs truncate w-fit" id={messageData[0]}>
										{emailDate}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MessageItem;

//This component is used to display the headers of every fetched message from the user's inbox.

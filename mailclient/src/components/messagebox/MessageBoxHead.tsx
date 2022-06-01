import React, { useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
	MdStarOutline,
} from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface Props {
	activeData: any[];
}

const MessageBoxHead: React.FC<Props> = ({ activeData }) => {
	console.log(activeData[4]);
	console.log(activeData);
	console.log(activeData[4]);

	const [showDetails, setShowDetails] = useState<boolean>(false);
	var emailDate;
	var emailTime;
	const dateTime = activeData[4].split("T");
	const rawDate = dateTime[0].split("-");
	const mydate = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
	const fullDate = mydate.toDateString();
	emailDate = fullDate.slice(fullDate.length - 11);
	emailTime = dateTime[1].substring(0, 5);

	return (
		<div>
			<div>
				<div className="flex flex-row items-start justify-between md:py-1 md:px-2 md:mx-2 mt-1 h-8 rounded-t-lg bg-[#fafafa]">
					<div className="text-lg truncate font-semibold sm:text-xl pl-2 max-w-[70%]">
						{activeData[1]}
					</div>

					<div className="text-[#666] grow-0 flex">
						<div className="flex items-center justify-end text-lg ">
							<span className="inline-block p-1 ml-1 rounded-sm cursor-pointer hover:bg-gray-200">
								<MdStarOutline />
							</span>

							<span className="inline-block p-1 ml-1 rounded-sm cursor-pointer hover:bg-gray-200">
								<TiArrowBackOutline />
							</span>
							<span className="inline-block p-1 ml-1 rounded-sm cursor-pointer hover:bg-gray-200">
								<HiOutlineDotsVertical />
							</span>
						</div>
					</div>
				</div>
				<div className="relative mt-0">
					<div className="flex flex-row  justify-between md:py-2 md:px-2 md:mx-2  rounded-b-lg bg-[#fafafa]">
						<div>
							<div className="flex items-center justify-start pl-2">
								<span className="text-sm ">to me</span>

								<span className="inline-block p-1 ml-1 text-sm rounded-sm cursor-pointer hover:bg-gray-200">
									{!showDetails ? (
										<MdOutlineKeyboardArrowDown
											onClick={() => setShowDetails(true)}
										/>
									) : (
										<MdOutlineKeyboardArrowUp
											onClick={() => setShowDetails(false)}
										/>
									)}
								</span>
							</div>
						</div>

						<div className="text-[#666]">
							<div>
								<div className="pr-2">
									<div className="text-xs">
										<span className="">{emailTime} </span>{" "}
										<span> {emailDate}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{showDetails && (
						<div className="relative sm:absolute sm:left-2 z-1000 ">
							<div className="flex ml-3">
								<div className="text-sm rounded-b-lg bg-[#fafafa] py-2 shadow-[0_5px_10px_0px_rgba(0,0,0,0.3)] w-fit">
									<div className="grid grid-cols-12 gap-0">
										<div className="col-span-2">
											<div className="flex justify-end">
												<div className=" w-fit">from: </div>
											</div>
										</div>

										<div className="col-span-10 pl-3 font-semibold">
											{activeData[2]}
										</div>
									</div>

									<div className="grid grid-cols-12 gap-0">
										<div className="col-span-2">
											<div className="flex justify-end">
												<div className=" w-fit">to: </div>
											</div>
										</div>
										<div className="col-span-10 pl-3 font-semibold">
											{activeData[3]}
										</div>
									</div>
									<div className="grid grid-cols-12 gap-0">
										<div className="col-span-2">
											<div className="flex justify-end">
												<div className=" w-fit">subject: </div>
											</div>
										</div>
										<div className="col-span-10 pl-3 max-w-[95%] font-semibold">
											{activeData[1]}
										</div>
									</div>
									<div className="grid grid-cols-12 gap-0">
										<div className="col-span-2">
											<div className="flex justify-end">
												<div className=" w-fit">date: </div>
											</div>
										</div>
										<div className="col-span-10 pl-3 font-semibold">
											{activeData[4]}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MessageBoxHead;

//This compononent houses the user's message headers upon the user's interest to open any message from the list of
//fetched messages.

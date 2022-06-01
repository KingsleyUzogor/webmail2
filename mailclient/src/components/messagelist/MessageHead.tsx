import React from "react";
interface Props {
	total: number | null | undefined;
}

const MessageHead: React.FC<Props> = ({ total }) => {
	return (
		<div className="flex flex-row items-center justify-between px-3 py-3">
			<div className="text-xl font-semibold">My Inbox</div>
			{total && (
				<div className="bg-[#eee] rounded-md px-2 py-1">
					<div className="text-xs font-semibold">{total}</div>
				</div>
			)}
		</div>
	);
};

export default MessageHead;

//This component houses the first part of the inbox list items.

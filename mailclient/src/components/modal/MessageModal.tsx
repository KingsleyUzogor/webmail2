import React from "react";
import MessageBoxHead from "../messagebox/MessageBoxHead";

interface DataProps {
	activeData: any[];
}

const MessageModal: React.FC<DataProps> = ({ activeData }) => {
	const createMarkup = (htmlText: string) => {
		return {
			__html: htmlText,
		};
	};

	return (
		<div>
			<div
				className="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto outline-none modal fade"
				id="exampleModalScrollable"
				tabIndex={-1}
				aria-labelledby="exampleModalScrollableLabel"
				aria-hidden="true"
			>
				<div className="relative w-auto pointer-events-none modal-dialog modal-dialog-scrollable">
					<div className="relative flex flex-col w-full text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto modal-content bg-clip-padding">
						<div className="items-center p-1 border-b border-gray-200 modal-header rounded-t-md">
							{activeData.length > 0 && (
								<MessageBoxHead activeData={activeData} />
							)}
						</div>
						<div className="relative p-4 modal-body">
							<div className="">
								<div
									dangerouslySetInnerHTML={createMarkup(activeData[5])}
									className=""
								/>
							</div>
						</div>
						<div className="flex flex-wrap items-center justify-end flex-shrink-0 p-1 border-t border-gray-200 modal-footer rounded-b-md">
							<button
								type="button"
								className="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageModal;

//This is a modal component that helps to achieve better user interface and experience.
//It is made to displayed selected data/message by the user, only on mobile, everything working well.

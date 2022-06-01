import React, { useEffect } from "react";

import { Link } from "react-router-dom";

// interface HomeProps {
// 	urlData: string;
// }
const Congrats: React.FC = () => {
	useEffect(() => {
		localStorage.clear();
	}, []);
	return (
		<div>
			<div className="relative w-screen h-screen bg-[#f7f7f7]">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-md bg-white max-w-[400px] h-fit px-12 pb-3 ">
					<div className="mx-auto ">
						<div>
							<div className="font-semibold text-5xl mt-2 text-mail-blue">
								Congrats!
							</div>
						</div>
						<div className="mx-auto mt-3 w-fit">
							<div className="mx-auto my-2 text-lg w-fit">
								You just did{" "}
								<span className="font-semibold text-black">email</span>
							</div>
							<div className="mx-auto text-lg w-fit">
								how <span className="font-semibold text-black">email</span> is
								done.
							</div>
							<div className="mt-12 ">
								<div className="mx-auto w-fit my-7 underline text-mail-blue">
									<Link to="/" className="nav-link">
										Let&apos;s go again
									</Link>
								</div>
								<div className="mt-4 text-gray-300">
									powered by <i>mailbird</i>{" "}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Congrats;

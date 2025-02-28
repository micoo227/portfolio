import { useState } from "react";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="fixed top-[3vw] inset-x-[3vw] mx-auto font-medusa-gothic">
			<div className="flex flex-col gap-[3vw]">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl xl:text-7xl text-nowrap font-bold">
						Michael Renda
					</h1>

					<div className="hidden md:block xl:hidden">
						<ul className="flex gap-x-10">
							<NavbarLinks />
						</ul>
					</div>

					<div className="flex md:hidden">
						<button
							onClick={() => {
								setIsMenuOpen(!isMenuOpen);
							}}
						>
							{isMenuOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-10"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18 18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-10"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				<div className="hidden xl:block">
					<ul className="flex flex-col gap-[2vw] text-5xl">
						<NavbarLinks />
					</ul>
				</div>

				{isMenuOpen && (
					<div className="md:hidden">
						<ul className="flex flex-col gap-6 text-2xl">
							<NavbarLinks />
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;

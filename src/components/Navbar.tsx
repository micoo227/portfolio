import NavbarLinks from "./NavbarLinks";

interface NavbarProps {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isMenuOpen, setIsMenuOpen }: NavbarProps) => {
	return (
		<nav className="z-10">
			<ul className="hidden md:flex justify-between flex-row xl:flex-col gap-x-10 xl:gap-[2vw] xl:text-2xl 2xl:text-4xl">
				<NavbarLinks />
			</ul>

			<button
				className="flex md:hidden"
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
		</nav>
	);
};

export default Navbar;

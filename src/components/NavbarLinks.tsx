import { Link, useLocation } from "react-router";

interface NavbarLinksProps {
	setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarLinks = ({ setIsMenuOpen }: NavbarLinksProps) => {
	const setMenuClosed = () => {
		if (setIsMenuOpen) setIsMenuOpen(false);
	};
	const location = useLocation();

	return (
		<>
			<li
				className={`animate-fade-in-0-to-70 transition hover:text-white ease-out ${
					location.pathname === "/tech" && "text-white"
				}`}
			>
				<Link to="/tech" onClick={setMenuClosed}>
					Tech
				</Link>
			</li>
			<li
				className={`animate-fade-in-10-to-80 transition hover:text-white ease-out ${
					location.pathname === "/art" && "text-white"
				}`}
			>
				<Link to="/art" onClick={setMenuClosed}>
					Art
				</Link>
			</li>
			<li
				className={`animate-fade-in-20-to-90 transition hover:text-white ease-out ${
					location.pathname === "/info" && "text-white"
				}`}
			>
				<Link to="/info" onClick={setMenuClosed}>
					Info
				</Link>
			</li>
			<li
				className={`animate-fade-in-30-to-100 transition hover:text-white ease-out ${
					location.pathname === "/contact" && "text-white"
				}`}
			>
				<Link to="/contact" onClick={setMenuClosed}>
					Contact
				</Link>
			</li>
		</>
	);
};

export default NavbarLinks;

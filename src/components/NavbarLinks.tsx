import { Link } from "react-router";

interface NavbarLinksProps {
	setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarLinks = ({ setIsMenuOpen }: NavbarLinksProps) => {
	const setMenuClosed = () => {
		if (setIsMenuOpen) setIsMenuOpen(false);
	};

	return (
		<>
			<li className="animate-fade-in-0-to-70">
				<Link to="/tech" onClick={setMenuClosed}>
					Tech
				</Link>
			</li>
			<li className="animate-fade-in-10-to-80">
				<Link to="/art" onClick={setMenuClosed}>
					Art
				</Link>
			</li>
			<li className="animate-fade-in-20-to-90">
				<Link to="/info" onClick={setMenuClosed}>
					Info
				</Link>
			</li>
			<li className="animate-fade-in-30-to-100">
				<Link to="/contact" onClick={setMenuClosed}>
					Contact
				</Link>
			</li>
		</>
	);
};

export default NavbarLinks;

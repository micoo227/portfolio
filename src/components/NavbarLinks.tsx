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
			<li>
				<Link to="/tech" onClick={setMenuClosed}>
					Tech
				</Link>
			</li>
			<li>
				<Link to="/art" onClick={setMenuClosed}>
					Art
				</Link>
			</li>
			<li>
				<Link to="/info" onClick={setMenuClosed}>
					Info
				</Link>
			</li>
			<li>
				<Link to="/contact" onClick={setMenuClosed}>
					Contact
				</Link>
			</li>
		</>
	);
};

export default NavbarLinks;

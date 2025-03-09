import { Link } from "react-router";

const NavbarLinks = () => {
	return (
		<>
			<li>
				<Link to="/tech">Tech</Link>
			</li>
			<li>
				<Link to="/art">Art</Link>
			</li>
			<li>
				<Link to="/info">Info</Link>
			</li>
			<li>
				<Link to="/contact">Contact</Link>
			</li>
		</>
	);
};

export default NavbarLinks;

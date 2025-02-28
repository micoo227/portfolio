const NavbarLinks = () => {
	const onLinkClick = (path: string, e: React.MouseEvent) => {
		window.history.pushState(null, "", path);
		e.preventDefault();
	};

	return (
		<>
			<li>
				<a
					href="/tech"
					onClick={(e) => {
						onLinkClick("/tech", e);
					}}
				>
					Tech
				</a>
			</li>
			<li>
				<a
					href="/art"
					onClick={(e) => {
						onLinkClick("/art", e);
					}}
				>
					Art
				</a>
			</li>
			<li>
				<a
					href="/info"
					onClick={(e) => {
						onLinkClick("/info", e);
					}}
				>
					Info
				</a>
			</li>
			<li>
				<a
					href="/contact"
					onClick={(e) => {
						onLinkClick("/contact", e);
					}}
				>
					Contact
				</a>
			</li>
		</>
	);
};

export default NavbarLinks;

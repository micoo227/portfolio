const Navbar = () => {
  const onLinkClick = (path: string, e: React.MouseEvent) => {
    window.history.pushState(null, "", path);
    e.preventDefault();
  }

  return (
    <header className="absolute left-[2.5vw] top-[2.5vh] z-10">
        <h1 className="md:text-8xl text-4xl pb-2 text-nowrap">michael renda</h1>
        <nav>
          <ul className="md:text-3xl">
            <li>
              <a href="/tech" onClick={(e) => {onLinkClick("/tech", e)}}>tech</a>
            </li>
            <li>
              <a href="/art" onClick={(e) => {onLinkClick("/art", e)}}>art</a>
            </li>
            <li>
              <a href="/info" onClick={(e) => {onLinkClick("/info", e)}}>info</a>
            </li>
            <li>
              <a href="/contact" onClick={(e) => {onLinkClick("/contact", e)}}>contact</a>
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Navbar
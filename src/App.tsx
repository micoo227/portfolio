import { Route, Routes } from "react-router";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import { useState } from "react";
import NavbarLinks from "./components/NavbarLinks";
import { createBreakpoint } from "react-use";
import TechPage from "./components/TechPage";
import ArtPage from "./components/ArtPage";
import InfoPage from "./components/InfoPage";
import ContactPage from "./components/ContactPage";

const useBreakpoint = createBreakpoint({ mobile: 0, md: 768 });

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const breakpoint = useBreakpoint();

	return (
		<>
			<Background />
			<div className="fixed inset-[3vw]">
				<div className="flex flex-col gap-[3vw] size-full font-medusa-gothic">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl xl:text-4xl 2xl:text-6xl text-nowrap font-bold z-10">
							Michael Renda
						</h1>
						<div className="xl:hidden z-10">
							<Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
						</div>
					</div>
					<div className="flex justify-between size-full">
						<div className="hidden xl:block z-10">
							<Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
						</div>
						<div className="size-full xl:w-[50rem]">
							{isMenuOpen && breakpoint == "mobile" ? (
								<ul className="flex md:hidden flex-col gap-6 text-2xl z-10">
									<NavbarLinks setIsMenuOpen={setIsMenuOpen} />
								</ul>
							) : (
								<Routes>
									<Route path="tech" element={<TechPage />} />
									<Route path="art" element={<ArtPage />} />
									<Route path="info" element={<InfoPage />} />
									<Route path="contact" element={<ContactPage />} />
								</Routes>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;

import { Route, Routes } from "react-router";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";
import { useState } from "react";
import NavbarLinks from "./components/NavbarLinks";
import { createBreakpoint } from "react-use";

const useBreakpoint = createBreakpoint({ mobile: 0, md: 768 });

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const breakpoint = useBreakpoint();

	return (
		<>
			<Background />
			<div className="fixed inset-[3vw]">
				<div className="grid justify-between grid-cols-[auto_min-content] xl:grid-cols-[auto_50rem] grid-rows-[min-content_1fr] gap-y-[3vw] content-start size-full font-medusa-gothic">
					<h1 className="text-2xl xl:text-4xl 2xl:text-6xl text-nowrap font-bold z-10">
						Michael Renda
					</h1>
					<div className="self-center xl:self-start col-start-2 xl:col-start-1 z-10">
						<Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
					</div>
					<div className="col-start-1 col-span-full xl:col-start-2 row-start-2 row-span-full">
						{isMenuOpen && breakpoint == "mobile" ? (
							<ul className="flex md:hidden flex-col gap-6 text-2xl z-10">
								<NavbarLinks setIsMenuOpen={setIsMenuOpen} />
							</ul>
						) : (
							<Routes>
								<Route path="tech" element={<PageContent />} />
								<Route path="art" element={<PageContent />} />
								<Route path="info" element={<PageContent />} />
								<Route path="contact" element={<PageContent />} />
							</Routes>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;

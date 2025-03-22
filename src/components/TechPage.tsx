import PageContent from "./PageContent";
import Project from "./Project";

export default function TechPage() {
	return (
		<PageContent>
			<div className="flex flex-col gap-5 h-full">
				<Project
					imgPath="./NGR_Level.png"
					title="Newton's Gumball Rally"
					description={
						<p>
							An educational STEM game that I along with 3 other team members
							completed for children in grades 2-5. I worked on the music, code,
							levels, and business plan for the game, and we developed it in one
							semester for our{" "}
							<em>Computational Media: Videogame Development</em> class at
							Wesleyan University, which is taught by the founder of Bethesda
							Softworks, Christopher Weaver.
						</p>
					}
					github="https://github.com/micoo227/newtons-gumball-ralley"
					itchio="https://cellardoor2147.itch.io/newtons-gumball-ralley"
					technologies={["C#", "Unity"]}
				/>
				<Project
					imgPath="./Dread_Game.png"
					title='"Dread" - Game Jam Submission'
					description={
						<p>
							My group's submission for the{" "}
							<em>Computational Media: Videogame Development</em> class
							Hackathon. I worked with 4 other people to complete this game in
							roughly 72 hours, and received first place by a panel of judges.
							Additionally, we were required to fit our game into the theme of
							being “stuck in a loop,” so we decided on a 2D infinite
							side-scroller where the player runs away from demons and dodges
							obstacles for as long as possible.
						</p>
					}
					youtube="https://youtu.be/lQdEzZ6Il5w?si=mt-z_NQBziQHrK4g"
					technologies={["C#", "Unity"]}
				/>
				<Project
					title="Wescam.xyz"
					description={
						<p>
							1:1 social chat platform for Wesleyan students. Implemented
							real-time messaging, message encryption, and cookies to preserve
							chat room information. Handled viral growth -- onboarded 700+
							users in 4 days while supporting 1200+ messages and 200+ new chat
							rooms daily.
						</p>
					}
					technologies={["TypeScript", "Next.js", "MongoDB"]}
				/>
				<Project
					title="Robin Hood Hashing"
					description={
						<p>
							Open addressing implementation of a hash map, based on the 1986
							thesis from Pedro Celis. Improves upon standard open addressing by
							ensuring that entries with longer probe sequences can "steal"
							slots from those with shorter ones, hence the name. This reduces
							the variance of probe sequence lengths and leads to a more uniform
							distribution of lookup times.
						</p>
					}
					github="https://github.com/micoo227/robin-hood-hashing/tree/main"
					technologies={["Go"]}
				/>
			</div>
		</PageContent>
	);
}

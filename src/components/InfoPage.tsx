import PageContent from "./PageContent";
import WorkExperience from "./WorkExperience";

export default function InfoPage() {
	return (
		<PageContent>
			<div className="flex flex-col text-slate-400 gap-5">
				<h2 className="m-auto text-4xl font-semibold text-slate-300">
					About Me
				</h2>
				<p className="text-justify px-2 sm:px-10">
					I am a Wesleyan University graduate with dual degrees in Computer
					Science and Economics, which have fueled my passion for innovative
					software engineering and analytical problem-solving. Beyond my
					professional pursuits, I thrive on creativity and personal growth —
					whether I'm mastering complex code, practicing guitar, pushing my
					limits in fitness, or diving into new learning adventures. This blend
					of technical knowledge and diverse interests inspires me to
					continuously explore, adapt, and drive meaningful progress in every
					aspect of my life.
				</p>
				<h2 className="m-auto text-4xl font-semibold text-slate-300">
					Experience
				</h2>
				<div className="flex flex-col gap-10 px-2 sm:px-10">
					<WorkExperience
						title="Software Engineer II"
						company="Qualtech Systems, Inc."
						location="Rocky Hill, CT"
						date="June 2023 - Present"
						bullets={[
							`Spearheading the development of a web application using the MEAN stack 
							and A-Frame, empowering Marine Corps instructors to craft immersive XR 
							experiences for enhanced training`,
							`Engineered an iOS app leveraging photogrammetry to transform real-world 
							objects into high-fidelity 3D models, streamlining digital asset creation`,
							`Implement customer-driven enhancements to systems modeling and troubleshooting 
							software (C++/Java), significantly improving performance and user satisfaction`,
							`Represent the company at client sites and technical conferences, delivering 
							targeted software training and driving product adoption through strategic 
							marketing initiatives`,
						]}
						technologies={[
							"TypeScript",
							"JavaScript",
							"Angular",
							"Nest.js",
							"MongoDB",
							"A-Frame",
							"Python",
							"Java",
							"C",
							"C++",
							"Swift",
						]}
					/>
					<WorkExperience
						title="Course Assistant, Information Security and Privacy"
						company="Computer Science Department"
						location="Wesleyan University"
						date="Spring 2023"
						bullets={[
							`Served as an ancillary classroom resource through in-person and virtual
                            instruction/grading`,
						]}
						technologies={["Web Development", "Android Studio"]}
					/>
					<WorkExperience
						title="Deans' Peer Tutor & Course Assistant, Artificial Intelligence"
						company="Computer Science Department"
						location="Wesleyan University"
						date="Fall 2022"
						bullets={[
							`Served as an ancillary classroom resource through in-person and virtual
                            instruction/grading`,
						]}
						technologies={["Python", "Reinforcement Learning"]}
					/>
					<WorkExperience
						title="Tech Operations Intern, Global Technology"
						company="Universal Music Group"
						location="Nashville, TN"
						date="Summer 2022"
						bullets={[
							`Collaborated to support global tech initiatives, artist promotion, and
                            concert planning`,
							`Participated in varied corporate, industry, informational, and job shadowing
                            meetings/experiences`,
							`Developed valuable insight through project planning/presentation and exposure
                            to company dynamics`,
							`Initiated resourceful support such as acquisition of AWS Cloud Practitioner
                            certification`,
						]}
						technologies={["Network Monitoring", "Amazon Web Services"]}
					/>
					<WorkExperience
						title="Private Online Instructor"
						company="iD Tech"
						location="Campbell, CA"
						date="April 2021 - September 2021"
						bullets={[
							`Planned diverse lessons for K-12 STEAM topics of Roblox Studio, Blender,
                            Rocket League, and Unity with C#`,
							`Multitasked with meticulous detail to meet corporate standards and achieve
                            professional goals`,
							`Adapted to a dynamic work environment through written/oral communication
                            and problem solving skills`,
						]}
						technologies={["Roblox Studio", "Lua", "Blender", "Unity", "C#"]}
					/>
				</div>
			</div>
		</PageContent>
	);
}

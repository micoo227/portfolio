import Technology from "./Technology";

interface WorkExperienceProps {
	title: string;
	company: string;
	location: string;
	date: string;
	bullets: string[];
	technologies: string[];
}

export default function WorkExperience({
	title,
	company,
	location,
	date,
	bullets,
	technologies,
}: WorkExperienceProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col-reverse md:flex-row md:gap-16 justify-between">
				<span>
					<em className="md:text-nowrap">{title}</em>,{" "}
					<b className="md:text-nowrap">{company}</b>,{" "}
					<span className="md:text-nowrap">{location}</span>
				</span>
				<span className="text-xs md:text-base text-nowrap">{date}</span>
			</div>
			<hr></hr>
			<ul className="list-disc pl-5">
				{bullets.map((bullet, i) => {
					return <li key={i}>{bullet}</li>;
				})}
			</ul>
			{technologies.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-1">
					{technologies.map((name, i) => {
						return <Technology name={name} key={i} />;
					})}
				</div>
			)}
		</div>
	);
}

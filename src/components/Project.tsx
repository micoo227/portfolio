import { FaGithub, FaItchIo } from "react-icons/fa";
import Technology from "./Technology";
import { ImYoutube } from "react-icons/im";

interface ProjectProps {
	imgPath?: string;
	title: string;
	description: React.ReactNode;
	github?: string;
	itchio?: string;
	youtube?: string;
	technologies: string[];
}

export default function Project({
	imgPath,
	title,
	description,
	github,
	itchio,
	youtube,
	technologies = [],
}: ProjectProps) {
	return (
		<div className="mx-4 h-30 text-slate-400 rounded-3xl">
			<div className="flex flex-col items-start sm:flex-row gap-10 p-5">
				{imgPath && (
					<div>
						<img className="rounded" src={imgPath}></img>
					</div>
				)}
				<div
					className={`flex flex-col gap-2 ${
						imgPath && "sm:max-w-[60%] sm:min-w-[60%]"
					}`}
				>
					<div className="flex items-center gap-4">
						<h3 className="font-semibold text-slate-300">{title}</h3>
						{github && (
							<a target="_blank" href={github}>
								<FaGithub className="size-6" />
							</a>
						)}
						{itchio && (
							<a target="_blank" href={itchio}>
								<FaItchIo className="size-6" />
							</a>
						)}
						{youtube && (
							<a target="_blank" href={youtube}>
								<ImYoutube className="size-6" />
							</a>
						)}
					</div>
					{description}
					{technologies.length > 0 && (
						<div className="flex gap-2 mt-1">
							{technologies.map((name, i) => {
								return <Technology name={name} key={i} />;
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

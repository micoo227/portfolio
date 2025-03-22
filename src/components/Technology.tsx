interface TechnologyProps {
	name: string;
}

export default function Technology({ name }: TechnologyProps) {
	return (
		<div className="rounded-full bg-cyan-600 text-cyan-200 px-3 py-0.5 text-nowrap">
			{name}
		</div>
	);
}

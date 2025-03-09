interface PageContentProps {
	children?: React.ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
	return (
		<div className="relative size-full">
			<div className="absolute blur-3xl rounded-3xl bg-black/50 size-full"></div>
			<div className="size-full p-10">{children}</div>
		</div>
	);
}

interface PageContentProps {
	children?: React.ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
	return (
		<div className="relative size-full animate-fade-in">
			<div className="absolute inset-0 blur-3xl rounded-3xl bg-black/70"></div>
			<div className="absolute inset-0 overflow-y-auto [scrollbar-width:_none;] [mask-image:_linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
				<div className="my-10 px-5 font-sans">{children}</div>
			</div>
		</div>
	);
}

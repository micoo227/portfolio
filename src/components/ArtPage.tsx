import PageContent from "./PageContent";

export default function ArtPage() {
	return (
		<PageContent>
			<div className="flex flex-col gap-5 px-5 md:px-20">
				<img className="rounded-3xl" src="./geralt_head.png"></img>
				<img className="rounded-3xl" src="./blender_sword.png"></img>
				<embed
					className="rounded-3xl h-[50vw] xl:h-[380px]"
					src="https://open.spotify.com/embed/track/45K6fniOQlPi2b3QaEXvej?utm_source=generator"
				></embed>
			</div>
		</PageContent>
	);
}

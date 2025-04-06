import PageContent from "./PageContent";
import { MemoizedEmbed, MemoizedImage } from "./MemoizedAssets";

export default function ArtPage() {
	return (
		<PageContent>
			<div className="flex flex-col gap-5 px-5 md:px-20">
				<MemoizedImage src="./geralt_head.png" styling="rounded-3xl" />
				<MemoizedImage src="./blender_sword.png" styling="rounded-3xl" />
				<MemoizedEmbed
					src="https://open.spotify.com/embed/track/45K6fniOQlPi2b3QaEXvej?utm_source=generator"
					styling="rounded-3xl h-[50vw] xl:h-[380px]"
				/>
			</div>
		</PageContent>
	);
}

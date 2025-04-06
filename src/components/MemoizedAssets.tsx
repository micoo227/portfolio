import { memo } from "react";

interface MemoizedAssetProps {
	src: string;
	styling: string;
}

export const MemoizedImage = memo(function MemoizedImage({
	src,
	styling,
}: MemoizedAssetProps) {
	return <img className={styling} src={src}></img>;
});

export const MemoizedEmbed = memo(function MemoizedEmbed({
	src,
	styling,
}: MemoizedAssetProps) {
	return <embed className={styling} src={src}></embed>;
});

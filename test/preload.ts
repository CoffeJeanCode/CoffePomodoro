import { plugin } from "bun";

// Stub static asset imports (audio, fonts, images) so modules that pull them in
// transitively — e.g. stores/constants importing the alarm sounds — can be
// unit-tested without a bundler.
plugin({
	name: "stub-static-assets",
	setup(build) {
		build.onLoad(
			{
				filter:
					/\.(mp3|aac|wav|ogg|m4a|svg|png|jpe?g|webp|gif|woff2?|ttf|eot)$/,
			},
			() => ({ contents: 'export default "";', loader: "js" }),
		);
	},
});

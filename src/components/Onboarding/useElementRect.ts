import { useLayoutEffect, useState } from "react";

/**
 * Tracks the live viewport rect of the first element matching `selector`,
 * recomputing on resize, scroll, and element size changes. Returns `null` while
 * the target is absent so callers can fall back to a centered layout.
 */
export const useElementRect = (selector: string | null): DOMRect | null => {
	const [rect, setRect] = useState<DOMRect | null>(null);

	useLayoutEffect(() => {
		if (!selector) {
			setRect(null);
			return;
		}

		const element = document.querySelector(selector);
		if (!element) {
			setRect(null);
			return;
		}

		const measure = () => setRect(element.getBoundingClientRect());
		measure();

		const observer = new ResizeObserver(measure);
		observer.observe(element);
		window.addEventListener("resize", measure);
		window.addEventListener("scroll", measure, true);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", measure, true);
		};
	}, [selector]);

	return rect;
};

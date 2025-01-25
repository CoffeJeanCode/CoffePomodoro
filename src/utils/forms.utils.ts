export const withPreventDefault =
	(callback: () => void) => (evt: KeyboardEvent) => {
		evt.preventDefault();
		callback();
	};

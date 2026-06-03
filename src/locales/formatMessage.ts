export function formatMessage(
	template: string,
	vars: Record<string, string | number>,
): string {
	return Object.entries(vars).reduce(
		(str, [key, val]) => str.replaceAll(`{{${key}}}`, String(val)),
		template,
	);
}

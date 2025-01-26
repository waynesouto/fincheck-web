export const mountUrlSearchParams = <T>(data: T) => {
	if (typeof data !== "object" || data === null) return "";
	const url = new URLSearchParams();
	Object.keys(data).forEach((key: string) => {
		const value = data[key as keyof T];
		if (value) {
			if (Array.isArray(value)) {
				value.forEach((e) => url.append(String(key), String(e)));
			} else {
				url.append(String(key), String(value));
			}
		}
	});
	return url.toString();
};

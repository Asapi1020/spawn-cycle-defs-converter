export function generateUCFile(
	defs: string[],
	className: string,
	date?: string,
	author?: string,
): string {
	const publishedDate = date || getTodayString();
	const lines = [
		`class ${className} extends CD_SpawnCycle_PresetBase`,
		"\timplements (CD_SpawnCycle_Preset);",
		"",
		"function GetLongSpawnCycleDefs( out array<string> sink ){",
		"\tlocal int i;",
		"",
		"\ti = 0;",
		"\tsink.length = 0;",
		`\tsink.length = ${defs.length};`,
		"",
		...defs.map((item) => `\tsink[i++] = "${item}";`),
		"}",
		"",
		"function string GetDate(){",
		`\treturn "${publishedDate}";`,
		"}",
		"",
		"function string GetAuthor(){",
		`\treturn "${author || "Unknown"}";`,
		"}",
		"",
	];
	return lines.join("\n");
}

export function generateTXTFile(defs: string[]): string {
	const lines = defs.map((d) => `SpawnCycleDefs=${d}`);
	return `${lines.join("\n")}\n`;
}

function getTodayString(): string {
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0");
	const dd = String(today.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}

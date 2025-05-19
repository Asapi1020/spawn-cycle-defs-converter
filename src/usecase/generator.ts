import { GameLength } from "../domain/GameLength";

export function generateUCFile(defs: string[], className: string, date?: string, author?: string): string {
	const publishedDate = date || getTodayString();
	const functionName = decideFunctionName(defs.length);
	const lines = [
		`class ${className} extends CD_SpawnCycle_PresetBase`,
		"\timplements (CD_SpawnCycle_Preset);",
		"",
		`function ${functionName}( out array<string> sink ){`,
		"\tlocal int i;",
		"",
		"\ti = 0;",
		"\tsink.length = 0;",
		`\tsink.length = ${defs.length};`,
		"",
		...convertDefsToSinkAssignments(defs),
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

function splitLiteral(value: string, maxLength = 1000): string[] {
	const split: string[] = [];
	for (let i = 0; i < value.length; i += maxLength) {
		split.push(value.substring(i, i + maxLength));
	}
	return split;
}

function convertDefsToSinkAssignments(defs: string[]): string[] {
	return defs.map((def) => {
		const chunks = splitLiteral(def);
		const joinedChunks = chunks
			.map((chunk) => {
				return `"${chunk}"`;
			})
			.join(" $ ");
		return `\tsink[i++] = ${joinedChunks};`;
	});
}

export function decideFunctionName(length: number): string {
	switch (length) {
		case GameLength.Long: {
			return "GetLongSpawnCycleDefs";
		}
		case GameLength.Medium: {
			return "GetMediumSpawnCycleDefs";
		}
		case GameLength.Short: {
			return "GetShortSpawnCycleDefs";
		}
		default: {
			throw new Error(`Invalid length: ${length}`);
		}
	}
}

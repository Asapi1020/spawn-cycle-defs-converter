export function parseSpawnCycleDefsFromTXTFile(content: string): string[] {
	return content
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.startsWith("SpawnCycleDefs="))
		.map((line) => line.split("=")[1]);
}

export function parseSpawnCycleDefsFromUCFile(content: string): string[] {
	return [...content.matchAll(/sink\[i\+\+\]\s*=\s*"([^"]+)"/g)].map(
		(m) => m[1],
	);
}

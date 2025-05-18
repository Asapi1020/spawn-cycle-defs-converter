export function parseSpawnCycleDefsFromTXTFile(content: string): string[] {
	return content
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.startsWith("SpawnCycleDefs="))
		.map((line) => line.split("=")[1]);
}

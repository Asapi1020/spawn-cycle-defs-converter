export function parseSpawnCycleDefsFromTXTFile(content: string): string[] {
	return content
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.startsWith("SpawnCycleDefs="))
		.map((line) => line.split("=")[1]);
}

export function parseSpawnCycleDefsFromUCFile(content: string): string[] {
	const lines = content.split(/\r?\n/);
	const defs: string[] = [];

	let collecting = false;
	let buffer = "";

	for (const line of lines) {
		const trimmed = line.trim();

		if (!collecting && trimmed.startsWith("sink[i++]")) {
			buffer = trimmed;
			collecting = !trimmed.endsWith(";");
		} else if (collecting) {
			buffer += trimmed;
			collecting = !trimmed.endsWith(";");
		}

		if (!collecting && buffer !== "") {
			// definition is sometimes split into multiple literal like `"1CY_2AL*," $ "2FP_2HU"`
			// because of the limit of the length for unreal script
			const def =
				buffer
					.match(/"([^"]*)"/g)
					?.map((s) => s.slice(1, -1))
					.join("") ?? "";
			defs.push(def);
			buffer = "";
		}
	}
	return defs;
}

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { isObject, toString as toStr } from "@asp1020/type-utils";
import type { Config } from "../domain/Config";
import { throwInvalidParameterError } from "../domain/errorHandler";
import { generateUCFile } from "./generator";
import { parseSpawnCycleDefsFromTXTFile } from "./parser";

export function loadConfig(): Config {
	const config: unknown = JSON.parse(readFileSync("config.json", "utf8"));
	if (!isObject(config)) {
		return throwInvalidParameterError("config");
	}
	return {
		inputDir: toStr(config.inputDir) ?? throwInvalidParameterError("inputDir"),
		outputDir:
			toStr(config.outputDir) ?? throwInvalidParameterError("outputDir"),
	};
}

export function convertTXTToUC(
	inputPath: string,
	outputPath: string,
	className: string,
	date?: string,
	author?: string,
): void {
	const txt = readFileSync(inputPath, "utf8");
	const defs = parseSpawnCycleDefsFromTXTFile(txt);
	const uc = generateUCFile(defs, className, date, author);

	const dir = dirname(outputPath);
	mkdirSync(dir, { recursive: true });
	writeFileSync(outputPath, uc, "utf8");
}

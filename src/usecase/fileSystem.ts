import { type WriteFileOptions, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { isObject, toBoolean, toString as toStr } from "@asp1020/type-utils";
import type { Config } from "../domain/Config";
import { GameLength } from "../domain/GameLength";
import { throwInvalidParameterError } from "../domain/errorHandler";
import { generateTXTFile, generateUCFile } from "./generator";
import { parseSpawnCycleDefsFromTXTFile, parseSpawnCycleDefsFromUCFile } from "./parser";

export function loadConfig(): Config {
	const config: unknown = JSON.parse(readFileSync("sccConfig.json", "utf8"));
	if (!isObject(config)) {
		return throwInvalidParameterError("config");
	}
	return {
		txtDir: toStr(config.txtDir) ?? throwInvalidParameterError("txtDir"),
		ucDir: toStr(config.ucDir) ?? throwInvalidParameterError("ucDir"),
		combinedClassNameStyle: toBoolean(config.combinedClassNameStyle) ?? false,
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
	if (!isValidDefsLength(defs)) {
		console.error(`Invalid number of definitions: ${defs.length}`);
		return;
	}
	const uc = generateUCFile(defs, className, date, author);
	safeWriteFileSync(outputPath, uc, "utf8");
}

export function convertUCToTXT(inputPath: string, outputPath: string): void {
	const uc = readFileSync(inputPath, "utf8");
	const defs = parseSpawnCycleDefsFromUCFile(uc);
	if (!isValidDefsLength(defs)) {
		console.error(`Invalid number of definitions: ${defs.length}`);
		return;
	}
	const txt = generateTXTFile(defs);
	safeWriteFileSync(outputPath, txt, "utf8");
}

function safeWriteFileSync(path: string, data: string, options?: WriteFileOptions) {
	try {
		const dir = dirname(path);
		mkdirSync(dir, { recursive: true });
		writeFileSync(path, data, options);
	} catch (error) {
		console.error(`Error writing file ${path}:`, error);
	}
}

function isValidDefsLength(defs: string[]): boolean {
	return defs.length === GameLength.Long || defs.length === GameLength.Medium || defs.length === GameLength.Short;
}

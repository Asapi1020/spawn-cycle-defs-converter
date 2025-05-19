#!/usr/bin/env node
import { Command } from "commander";
import type { Options } from "../domain/Options";
import { convertTXTToUC, loadConfig } from "../usecase/fileSystem";

const config = loadConfig();
const program = new Command();

program
	.name("txt2uc")
	.description("Convert Spawn Cycle definitions from txt to uc")
	.argument("<cycleName>", "Cycle name")
	.option("--date <yyyy-mm-dd>", "Date for GetDate()")
	.option("--author <name>", "Author for GetAuthor()")
	.action((cycleName: string, options: Options) => {
		const className = config.combinedClassNameStyle ? cycleName : `CD_SpawnCycle_Preset_${cycleName}`;
		const txtPath = `${config.txtDir}/${cycleName}.txt`;
		const ucPath = `${config.ucDir}/${className}.uc`;
		convertTXTToUC(txtPath, ucPath, className, options.date, options.author);
		console.log(`Converted ${txtPath} to ${ucPath}`);
	});

program.parse(process.argv);

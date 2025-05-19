#!/usr/bin/env node
import { Command } from "commander";
import { convertUCToTXT, loadConfig } from "../usecase/fileSystem";

const config = loadConfig();
const program = new Command();

program
	.name("uc2txt")
	.description("Convert Spawn Cycle definitions from uc to txt")
	.argument("<cycleName>", "Cycle name")
	.action((cycleName: string) => {
		const className = config.combinedClassNameStyle ? cycleName : `CD_SpawnCycle_Preset_${cycleName}`;
		const ucPath = `${config.ucDir}/${cycleName}.uc`;
		const txtPath = `${config.txtDir}/${className}.txt`;
		convertUCToTXT(ucPath, txtPath);
		console.log(`Converted ${ucPath} to ${txtPath}`);
	});

program.parse(process.argv);

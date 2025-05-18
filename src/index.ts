import { Command } from "commander";
import type { Options } from "./domain/Options";
import {
	convertTXTToUC,
	convertUCToTXT,
	loadConfig,
} from "./usecase/fileSystem";

const config = loadConfig();
const program = new Command();

program
	.name("spawn-cycle-converter")
	.description("Convert Spawn Cycle definitions between txt and uc formats");

program
	.command("txt2uc")
	.description("Convert Spawn Cycle definitions from txt to uc")
	.argument("<cycleName>", "Cycle name")
	.option("--date <yyyy-mm-dd>", "Date for GetDate()")
	.option("--author <name>", "Author for GetAuthor()")
	.action((cycleName: string, options: Options) => {
		const className = config.combinedClassNameStyle
			? cycleName
			: `CD_SpawnCycle_Preset_${cycleName}`;
		const txtPath = `${config.txtDir}/${cycleName}.txt`;
		const ucPath = `${config.ucDir}/${className}.uc`;
		convertTXTToUC(txtPath, ucPath, className, options.date, options.author);
		console.log(`Converted ${txtPath} to ${ucPath}`);
	});

program
	.command("uc2txt")
	.description("Convert Spawn Cycle definitions from uc to txt")
	.argument("<cycleName>", "Cycle name")
	.action((cycleName: string) => {
		const className = config.combinedClassNameStyle
			? cycleName
			: `CD_SpawnCycle_Preset_${cycleName}`;
		const ucPath = `${config.ucDir}/${cycleName}.uc`;
		const txtPath = `${config.txtDir}/${className}.txt`;
		convertUCToTXT(ucPath, txtPath);
		console.log(`Converted ${ucPath} to ${txtPath}`);
	});

program.parse(process.argv);

import { Command } from "commander";
import type { Options } from "./domain/Options";
import { convertTXTToUC, loadConfig } from "./usecase/fileSystem";

const config = loadConfig();
const program = new Command();

program
	.name("spawn-cycle-converter")
	.description("Convert Spawn Cycle definitions from one format to another")
	.argument("<className>", "Class name")
	.option("--date <yyyy-mm-dd>", "Date for GetDate()")
	.option("--author <name>", "Author for GetAuthor()")
	.action((className: string, options: Options) => {
		const inputPath = `${config.inputDir}/${className}.txt`;
		const outputPath = `${config.outputDir}/${className}.uc`;
		convertTXTToUC(
			inputPath,
			outputPath,
			className,
			options.date,
			options.author,
		);
		console.log(`Converted ${inputPath} to ${outputPath}`);
	});

program.parse(process.argv);

import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [dts()],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "spawn-cycle-converter",
			fileName: (format) => `index.${format === "cjs" ? "cjs" : "mjs"}`,
			formats: ["cjs", "es"],
		},
		outDir: "dist",
		minify: true,
	},
});

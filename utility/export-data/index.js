"use strict";

const fs = require("fs-extra");
const parseVariantsData = require("./parse-variants-data");
const parseLigationData = require("./ligation-data");
const getCharMapAndSupportedLanguageList = require("./supported-languages");
const execMain = require("../shared/execMain");

const version = require("../../package.json").version;

const charMapPath = process.argv[2];
const charMapItalicPath = process.argv[3];
const charMapObliquePath = process.argv[4];
const exportPath = process.argv[5];

execMain(main);

/////////////////////////////////////////////////////////////////////////////////////////////////////
async function main() {
	const variantsData = await parseVariantsData();
	const ligationData = await parseLigationData();
	const cl = await getCharMapAndSupportedLanguageList(
		charMapPath,
		charMapItalicPath,
		charMapObliquePath
	);
	await fs.writeJson(exportPath, { version, variantsData, ligationData, ...cl }, { spaces: 2 });
}

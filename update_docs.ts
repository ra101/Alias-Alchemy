import { join as joinPath } from '@std/path';

import aliasData from './data.json' with { type: 'json' };

type AliasDetails = typeof aliasData.aliasDetails;
type NetworkTools = typeof aliasData.tools;

type AliasCategory = keyof AliasDetails;
type NetworkTool = keyof NetworkTools;

const aliasCategories: AliasDetails = aliasData.aliasDetails;
const networkTools: NetworkTools = aliasData.tools;
const aliasCategoryKeys = Object.keys(aliasCategories) as AliasCategory[];
const networkToolKeys = Object.keys(networkTools) as NetworkTool[];

async function createAliasText(): Promise<string> {
	let aliasText = '';

	for (const cat of aliasCategoryKeys) {
		const linuxAliases = new TextDecoder().decode(
			await Deno.readFile(joinPath('aliases', `.${cat}.alias.sh`)),
		);

		const { link, display, shorthand } = aliasCategories[cat];

		aliasText += `<details>\n\t<summary> `;
		aliasText +=
			`<h4 style="display:inline-block;">〉<a href="${link}"> ${display} </a>`;
		aliasText += ` (${shorthand})`;
		aliasText += ' Aliases </h4> </summary>';
		aliasText += `\n\n\`\`\`bash\n${linuxAliases}\n\`\`\`\n\n</details>\n\n`;
	}

	return aliasText;
}

function createToolTable(): string {
	let toolTable = '\n<table><tbody>\n';

	for (const tool of networkToolKeys) {
		if (tool === 'curl' || tool === 'wget') {
			continue;
		}

		const { link, display, command } = networkTools[tool];

		let toolRow = '<tr><td> ';

		if (link) {
			toolRow += `<a href="${link}"> ${display} </a>`;
		} else {
			toolRow += display;
		}

		toolRow += ` </td> <td> <code> ${command} </code> </td>`;
		toolRow += '</tr>\n';
		toolTable += toolRow;
	}
	toolTable += '</tbody></table>\n';
	return toolTable;
}

// Replace old data in `tag` with new `data` in `text` file-data
function populateTag(tag: string, data: string, text: string): string {
	const openTag = `<${tag}>`;
	const closeTag = `</${tag}>`;
	const tagStart = text.substring(0, text.indexOf(openTag) + openTag.length);
	const tagEnd = text.substring(text.indexOf(closeTag), text.length);
	return `${tagStart}\n${data}\n${tagEnd}`;
}

async function updateReadme(): Promise<void> {
	// read readme file
	const fileName = 'README.md';
	const readmeFile = await Deno.readFile(fileName);
	let readmeText = new TextDecoder().decode(readmeFile);
	readmeText = readmeText.replaceAll('\r', ''); // remove `\r` (enter) char

	// populate alias details
	const aliasText = await createAliasText();
	readmeText = populateTag('aliasText', aliasText, readmeText);

	// populate network tools
	const toolTable = createToolTable();
	readmeText = populateTag('tools', toolTable, readmeText);

	// write readme file
	await Deno.writeTextFile(fileName, readmeText);
}

async function updateIndex(): Promise<void> {
	// read readme file
	let readmeText = new TextDecoder().decode(await Deno.readFile('README.md'));
	readmeText = readmeText.replaceAll('\r', ''); // remove `\r` (enter) char

	// Get `<indexMarkdown> ... </indexMarkdown>`
	readmeText = readmeText.substring(
		readmeText.indexOf('<indexMarkdown>') + '<indexMarkdown>'.length,
		readmeText.indexOf('</indexMarkdown>'),
	);

	// Replace ```lang``` with Highlight.js syntax
	readmeText = readmeText.replaceAll(
		'```bash\n',
		'<pre style="overflow: hidden"><code class="language-bash">',
	);
	readmeText = readmeText.replaceAll('\n```', '</code></pre>');

	// 2 br tags are required in some places to look nice
	readmeText = readmeText.replaceAll('<be times="2" />', '<br/><br/>');

	// read index file
	let indexText = new TextDecoder().decode(await Deno.readFile('index.md'));

	// populate index file in indexMarkdown tag
	indexText = populateTag('indexMarkdown', readmeText, indexText);

	// write index file
	await Deno.writeTextFile('index.md', indexText);
}

async function updateVersion(): Promise<void> {
	// read version file
	const fileName = '.version';

	// RegEx to fetch major, minor and patch version
	const match = new TextDecoder()
		.decode(await Deno.readFile(fileName))
		.replaceAll('\r', '')
		.replaceAll('\n', '')
		.match(/^v?(\d+)\.(\d+)\.(\d+)$/);

	if (!match) {
		throw new Error('Invalid version format.');
	}

	const oldVersion = {
		major: parseInt(match[1]),
		minor: parseInt(match[2]),
		patch: parseInt(match[3]),
	};

	const numAliasCat = Object.keys(aliasCategories).length;

	// If no new category is created then increment minor version
	// else increment major version and reset minor version.
	if (numAliasCat != oldVersion.minor) {
		oldVersion.patch = 0;
		oldVersion.minor = numAliasCat;
	} else {
		oldVersion.patch += 1;
	}

	const newVersion =
		`v${oldVersion.major}.${oldVersion.minor}.${oldVersion.patch}\n`;

	await Deno.writeTextFile(fileName, newVersion);
}

await updateReadme();
await updateIndex();
await updateVersion();

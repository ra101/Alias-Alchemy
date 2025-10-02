import { join as joinPath } from '@std/path';

import aliasData from './data.json' with { type: 'json' };

// Deno Can't deploy text file type yet.
const helpText = await Deno.readTextFile(
	new URL('./help.txt', import.meta.url),
);

// These represent the file name for aliases
const aliasCategories = Object.keys(aliasData.aliasDetails);

// These represent the User-Agent String
const networkTools = Object.keys(aliasData.tools);

// Alias File Map {<language>: {<platform>: <file-data>}, ...}
const aliasFiles = {};
for await (const cat of aliasCategories) {
	aliasFiles[cat] = await Deno.readFile(
		joinPath('aliases', `.${cat}.alias.sh`),
	);
}

// Short Hand Map {<language>: <short-hand>}
const shortMap = {};
for await (const cat of aliasCategories) {
	shortMap[aliasData.aliasDetails[cat]['shorthand']] = cat;
}

// newline for composite file
const newline = new TextEncoder().encode('\n');

// Server!
async function requestHandler(request: Request): Response {
	const url = new URL(request.url);

	// Remove trailing '/'.
	const pathName = url.pathname.replace(/\/$/, '');

	// Return "Hello World" for pinger; https://github.com/ra101/pinger
	if (pathName == '/home.html') {
		return new Response('Hello World\n');
	} else if (pathName == '/help') {
		return new Response(helpText);
	} else if (pathName) {
		return new Response(
			`Invalid ${url.pathname} path.\n\n${helpText}`,
			{ status: 400 },
		);
	}

	// Return composite Alias file for cURL and other tools
	const userAgent = request.headers.get('user-agent');
	if (userAgent && isCliRequest(userAgent)) {
		return await aliasFileResponse(url.searchParams);
	}

	// Return fetched page from https://ra101.dev/Alias-Alchemy
	return indexPageResponse();
}

async function indexPageResponse(): Promise<Response> {
	// We fetch webpage on the fly, so that Deploy
	// minutes are not wasted on README changes
	const webpage = await fetch('https://alias-alchemy-web.ra101.dev');

	let webpageHTML = await webpage.text();
	webpageHTML = webpageHTML.replaceAll('alias-alchemy-web', 'alias-alchemy');
	webpageHTML = webpageHTML.replaceAll('deno.dev', 'ra101.dev');
	webpageHTML = webpageHTML.replaceAll(
		'/assets/',
		'https://alias-alchemy-web.ra101.dev/assets/',
	);

	const headers = new Headers(webpage.headers);
	const init: ResponseInit = { headers };

	return new Response(webpageHTML, init);
}

function isCliRequest(userAgent: string): boolean {
	// return true, if User Agent value is one of the tools.
	for (const tool of networkTools) {
		if (userAgent.toLowerCase().includes(tool)) {
			return true;
		}
	}
	return false;
}

function aliasFileResponse(searchParams: URLSearchParams) {
	let query = searchParams.get('q') || '';
	query = query
		.toLowerCase()
		.replaceAll(' ', '')
		.replace(/(^,+)|(,+$)/g, '');

	let qAliasCat: Array<string> = [];

	// if no `q` is sent, all languages are selected.
	if (query == '') {
		qAliasCat = [...aliasCategories];
	} // else validate each provided language.
	else {
		const qList = query.split(',');
		for (const cat of qList) {
			// tmpCat is initialized with actual name,
			// even if the shorthand is provided.
			const tmpCat: string = shortMap[cat] || cat;

			// Validate each `q`
			if (!aliasCategories.includes(tmpCat)) {
				return new Response(
					`Invalid Alias Category '${cat}'!\n\n${helpText}`,
					{ status: 400 },
				);
			}
			qAliasCat.push(tmpCat);
		}
	}

	// create composite alias file
	const aliasFile = createAliasFile(qAliasCat);

	// create headers for file response
	const headers = new Headers();
	headers.set('Content-Type', 'text/plain');
	headers.set('Content-Disposition', `attachment; filename=".alias.sh"`);
	const init: ResponseInit = { headers };

	return new Response(aliasFile, init);
}

// Create Composite Alias File
function createAliasFile(qAliasCat: Array<string>) {
	// Calculate the total size of the composite alias file.
	let aliasFileSize = 0;
	for (const cat of qAliasCat) {
		aliasFileSize += aliasFiles[cat].length + newline.length;
	}

	let sizeOffset = 0;
	const aliasFile = new Uint8Array(aliasFileSize);

	for (const cat of qAliasCat) {
		// Add file data and newline to composite file.
		aliasFile.set(aliasFiles[cat], sizeOffset);
		sizeOffset += aliasFiles[cat].length;
		aliasFile.set(newline, sizeOffset);
		sizeOffset += newline.length;
	}

	return aliasFile;
}

let port = 80;
if (Deno.args.find((e) => e == '--debug')) {
	port = 8080;
}

Deno.serve({ port: port }, requestHandler);

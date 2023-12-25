import { serve } from 'https://deno.land/std/http/server.ts';
import aliasData from './data.json' assert { type: "json" };


// These represent the file name for aliases
const aliasCategories = Object.keys(aliasData.aliasDetails)

// These represent the User-Agent String
const networkTools = Object.keys(aliasData.tools)

// Alias File Map {<language>: {<platform>: <file-data>}, ...}
const aliasFiles = {}
for await (const cat of aliasCategories) {
  aliasFiles[cat] = {}
  aliasFiles[cat]["linux"] = await Deno.readFile(`.${cat}.alias.sh`);
  aliasFiles[cat]["win"] = await Deno.readFile(`.${cat}.alias.cmd`);
}

// Short Hand Map {<language>: <short-hand>}
const shortMap = {}
for await (const cat of aliasCategories) {
  shortMap[
    aliasData.aliasDetails[cat]['shorthand']
  ] = cat 
}

// Bad Request String for platform related errors
const sys400Str = 'Valid Options are [linux, win]'

// Bad Request String for category (lang) related errors
let q400Str = `Valid Options are [  (null)`
for (const shorthand in shortMap) {
  const cat = shortMap[shorthand]
  q400Str += `, ${cat} (${shorthand})`
}
q400Str += ']'

// newline for composite file
const newline = new TextEncoder().encode('\n')


// Server!
async function requestHandler (request: Request): Response {

  // Return "Hello World" for pinger; https://github.com/ra101/pinger
  if (request.url.endsWith('/home.html')) {
    return new Response("Hello World", {})
  }

  // Return composite Alias file for cURL and other tools
  const userAgent = request.headers.get('user-agent')
  if (userAgent && isCliRequest(userAgent)){
      return await aliasFileResponse(request);
  }

  // Return fetched page from https://ra101.dev/Alias-Alchemy
  return indexPageResponse();
}

async function indexPageResponse(): Response{

  // We fetch webpage on the fly, so that Deploy 
  // minutes are not wasted on README changes
  const webpage = await fetch('https://ra101.dev/Alias-Alchemy')

  let webpageHTML = await webpage.text();
  webpageHTML = webpageHTML.replaceAll("\"\/", "\"https://ra101.dev/")  

  const headers = new Headers(webpage.headers);
  const init: ResponseInit = {headers};

  return new Response(webpageHTML, init);
}


function isCliRequest(userAgent: string): Boolean{

  // return true, if User Agent value is one of the tools.
  for (const tool of networkTools) {
    if (userAgent.toLowerCase().includes(tool)) {
      return true;
    }
  }
  return false;
}


async function aliasFileResponse(request: Request){

    // get `q` and `sys` from url params and clean them up.
    let searchParams = (new URL(request.url)).searchParams

    let query = searchParams.get('q') || '';
    query = query.toLowerCase().replaceAll(' ', '').replace(/(^,+)|(,+$)/g, '')

    let platform = searchParams.get('sys') || 'linux';
    platform = platform.toLowerCase().replaceAll(' ', '')
    const filetype = {'linux': 'sh', 'win': 'cmd'}[platform]

    // Validate `sys`
    if (!["linux", "win"].includes(platform)){
      return new Response(
        `Invalid System '${platform}'! ${sys400Str}`, { status: 400 }
      );
    }

    let qAliasCat:Array<string> = []

    // if no `q` is sent, all languages are selected. 
    if (query == '') {
      qAliasCat = [...aliasCategories]
    }
    // else validate each provided language.
    else {
      const qList = query.split(',')
      for (const cat of qList) {

        // tmpCat is initialized with actual name,
        // even if the shorthand is provided.
        const tmpCat:string = shortMap[cat] || cat 

        // Validate each `q`
        if (! aliasCategories.includes(tmpCat)) {
          return new Response(
            `Invalid Alias Category '${cat}'! ${q400Str}`, { status: 400 }
          );
        }
        qAliasCat.push(tmpCat)
      }
    }

    // create composite alias file
    const aliasFile = createAliasFile(qAliasCat, platform)

    // create headers for file response
    const headers = new Headers();
    headers.set('Content-Type', 'text/plain');
    headers.set(
      'Content-Disposition',
      `attachment; filename=".alias.${filetype}"`
    )
    const init: ResponseInit = {headers};

    return new Response(aliasFile, init)
  }


// Create Composite Alias File
function createAliasFile(qAliasCat: Array<string>, platform: string){
  
  // Calculate the total size of the composite alias file.
  let aliasFileSize = 0  
  for (const cat of qAliasCat) {
    aliasFileSize += (aliasFiles[cat][platform].length + newline.length)
  }
  aliasFileSize -= newline.length // removing last newline
  
  let sizeOffset = 0
  const aliasFile = new Uint8Array(aliasFileSize)
  const lastCategory = qAliasCat[qAliasCat.length - 1] 

  for (const cat of qAliasCat) {

    // Add file data to composite file.
    aliasFile.set(aliasFiles[cat][platform], sizeOffset)

    // Add `\n`, if not the last file
    if (cat != lastCategory){
      sizeOffset += aliasFiles[cat][platform].length
      aliasFile.set(newline, sizeOffset)
      sizeOffset += newline.length
    }
  }

  return aliasFile
}


serve(requestHandler, { port: 80 });


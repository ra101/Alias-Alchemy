import { serve } from 'https://deno.land/std/http/server.ts';
import aliasData from './data.json' assert { type: "json" };


const aliasCategories = Object.keys(aliasData.aliasDetails)
const networkTools = Object.keys(aliasData.tools)

const aliasFiles = {}
for await (const cat of aliasCategories) {
  aliasFiles[cat] = {}
  aliasFiles[cat]["linux"] = await Deno.readFile(`.${cat}.alias.sh`);
  aliasFiles[cat]["win"] = await Deno.readFile(`.${cat}.alias.cmd`);
}

const shortMap = {}
for await (const cat of aliasCategories) {
  shortMap[
    aliasData.aliasDetails[cat]['shorthand']
  ] = cat 
}

const sys400Str = 'Valid Options are [linux, win]'
let q400Str = `Valid Options are [  (null)`
for (const shorthand in shortMap) {
  const cat = shortMap[shorthand]
  q400Str += `, ${cat} (${shorthand})`
}
q400Str += ']'

async function requestHandler (request: Request): Response {
  const userAgent = request.headers.get('user-agent')
  if (userAgent && isCliRequest(userAgent)){
      return await aliasFileResponse(request);
  }

  const webpage = await fetch('https://ra101.dev/Alias-Alchemy')
  let webpageHTML = await webpage.text();
  webpageHTML = webpageHTML.replaceAll("\"\/", "\"https://ra101.dev/")  
  const headers = new Headers(webpage.headers);
  const init: ResponseInit = {headers};
  return new Response(webpageHTML, init);
}


function isCliRequest(userAgent: string): Boolean{
  for (const tool of networkTools) {
    if (userAgent.toLowerCase().includes(tool)) {
      return true;
    }
  }
  return false;
}




async function aliasFileResponse(request: Request){
    let searchParams = (new URL(request.url)).searchParams
    let query = searchParams.get('q') || '';
    query = query.toLowerCase().replaceAll(' ', '').replace(/(^,+)|(,+$)/g, '')

    let qAliasCat:Array<string> = []

    if (query == '') {
      qAliasCat = [...aliasCategories]
    }
    else {
      const qList = query.split(',')
      for (const cat of qList) {
        let tmpCat:string = shortMap[cat] || cat 
        if (! aliasCategories.includes(tmpCat)) {
          return new Response(
            `Invalid Alias Category '${cat}'! ${q400Str}`, { status: 400 }
          );
        }
        qAliasCat.push(tmpCat)
      }
    }

    let platform = searchParams.get('sys') || 'linux';
    platform = platform.toLowerCase().replaceAll(' ', '')

    if (!["linux", "win"].includes(platform)){
      return new Response(
        `Invalid System '${platform}'! ${sys400Str}`, { status: 400 }
      );
    }

    const filetype = {'linux': 'sh', 'win': 'cmd'}[platform]
    const aliasFile = createAliasFile(qAliasCat, platform)

    const headers = new Headers();
    headers.set('Content-Type', 'text/plain');
    headers.set(
      'Content-Disposition',
      `attachment; filename=".alias.${filetype}"`
    )
    const init: ResponseInit = {headers};

    return new Response(aliasFile, init)
  }


function createAliasFile(qAliasCat: Array<string>, platform: string){
  let aliasFileSize = 0
  const newline = new TextEncoder().encode('\n')
  
  for (const cat of qAliasCat) {
    aliasFileSize += (aliasFiles[cat][platform].length + newline.length)
  }
  aliasFileSize -= newline.length

  let sizeOffset = 0
  const aliasFile = new Uint8Array(aliasFileSize)
  const lastCategory = qAliasCat[qAliasCat.length - 1] 

  for (const cat of qAliasCat) {
    aliasFile.set(aliasFiles[cat][platform], sizeOffset)
    if (cat != lastCategory){
      sizeOffset += aliasFiles[cat][platform].length
      aliasFile.set(newline, sizeOffset)
      sizeOffset += newline.length
    }
  }
  return aliasFile
}


serve(requestHandler, { port: 80 });


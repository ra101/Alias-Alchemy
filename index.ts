import { serve } from 'https://deno.land/std/http/server.ts';
import tools from './tools.json' assert { type: "json" };


const aliasData = {}
for await (const file of Deno.readDir()) {
  if (file.name.includes('.alias.sh')){
    aliasData[file.name.split('.')[1]] = await Deno.readFile(file.name);
  }
}
const alias_categories = Object.keys(aliasData)


async function requestHandler (request: Request): Response {
  const userAgent = request.headers.get('user-agent')
  if (userAgent && isCliRequest(userAgent)){
      return await aliasFileResponse(request);
  }

  const webpage = await fetch('https://ra101.dev/alias-alchemy')
  let webpageHTML = await webpage.text();
  webpageHTML = webpageHTML.replaceAll("\"\/", "\"https://ra101.dev/")  
  const headers = new Headers(webpage.headers);
  const init: ResponseInit = {headers};
  return new Response(webpageHTML, init);
}


function isCliRequest(userAgent: string): Boolean{
  for (const tool of tools) {
    if (userAgent.toLowerCase().includes(tool)) {
      return true;
    }
  }
  return false;
}




async function aliasFileResponse(request: Request){
    let query = (new URL(request.url)).searchParams.get('q') || '';
    query = query.toLowerCase().replaceAll(' ', '').replace(/(^,+)|(,+$)/g, '')
    
    let q_alias_cat = [...alias_categories]

    if (query != '') {
      q_alias_cat = query.split(',')

      for (const cat of q_alias_cat) {
        if (! alias_categories.includes(cat)) {
          return new Response(
            `Invalid Alias Category '${cat}'! Valid Categories` + 
            ` are [ ,${alias_categories}]`, { status: 400 }
          );
        }
      }
    }

    const aliasFile = createAliasFile(q_alias_cat)
    const headers = new Headers();
    headers.set('Content-Type', 'text/plain');
    headers.set('Content-Disposition', 'attachment; filename="alias.sh"')
    const init: ResponseInit = {headers};

    return new Response(aliasFile, init)
  }


function createAliasFile(q_alias_cat: Array<string>){
  let aliasFileSize = 0
  const newline = new TextEncoder().encode('\n')
  
  for (const cat of q_alias_cat) {
    aliasFileSize += (aliasData[cat].length + newline.length)
  }
  aliasFileSize -= newline.length

  let sizeOffset = 0
  const aliasFile = new Uint8Array(aliasFileSize)
  const lastCategory = q_alias_cat[q_alias_cat.length - 1] 

  for (const cat of q_alias_cat) {
    aliasFile.set(aliasData[cat], sizeOffset)
    if (cat != lastCategory){
      sizeOffset += aliasData[cat].length
      aliasFile.set(newline, sizeOffset)
      sizeOffset += newline.length
    }
  }
  return aliasFile
}


serve(requestHandler, { port: 80 });


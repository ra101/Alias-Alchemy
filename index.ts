import { serve } from 'https://deno.land/std/http/server.ts';
import aliasJSON from 'https://raw.githubusercontent.com/ra101/alias/core/alias.json' assert { type: "json" };


async function requestHandler (request: Request): Response {
  const userAgent = request.headers.get('user-agent')
  if (userAgent && isCliRequest(userAgent)){
      return aliasFileResponse(request);
  }
  const webpage = await fetch('https://ra101.dev/alias')
  let webpageHTML = await webpage.text();
  webpageHTML = webpageHTML.replaceAll("\"\/", "\"https://ra101.dev/")  
  const headers = new Headers(webpage.headers);
  const init: ResponseInit = {headers};
  return new Response(webpageHTML, init);
}


function isCliRequest(userAgent: string): Boolean{
  for (const tool of aliasJSON.tools) {
    if (userAgent.toLowerCase().includes(tool)) {
      return true;
    }
  }
  return false;
}


function aliasFileResponse(request: Request){
    let query = (new URL(request.url)).searchParams.get('q') || '';
    query = query.toLowerCase().replaceAll(' ', '').replace(/(^,+)|(,+$)/g, '')
    
    const all_alias_cats = Object.keys(aliasJSON.category)
    if (query == '') {
      const alias_cat = all_alias_cats
    }
    else {
      const alias_cat = query.split(',')

      for (const cat of alias_cat) {
        if (! all_alias_cats.includes(cat)) {
          return new Response(
            `Invalid Alias Category '${cat}'! Valid Categories` + 
            ` are [ ,${all_alias_cats}]`, { status: 400 }
          );
        }
      }
    }

    aliasFile = createAliasFile(alias_cat)


    return new Response(null, { status: 200 });
}


function createAliasFile(alias_cat: Array<string>){
  for (const cat of alias_cat) {
    const catObj = aliasJSON.category[cat]
    for (const command in catObj){
      switch (command['type']) {
        case 'alias':
          day = "Sunday";
          break;
        case 'cmd':
          day = "Monday";
          break;
        case 'env':
           day = "Tuesday";
      }
    }
  }
}


serve(requestHandler, { port: 80 });


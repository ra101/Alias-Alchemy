import aliasData from './data.json' assert { type: "json" };




async function createAliasText (aliasCategories) {    
  let aliasText = ''

  for await (const cat of Object.keys(aliasCategories)) {
    const linuxAliases = new TextDecoder().decode(
      await Deno.readFile(`.${cat}.alias.sh`)
    );
    const winAliases = new TextDecoder().decode(
      await Deno.readFile(`.${cat}.alias.cmd`)
    );

    const link = aliasCategories[cat]['link']
    aliasText += `<details>\n\t<summary> `
    aliasText += `<h4 style="display:inline-block;"> <a href="${link}"> ${aliasCategories[cat]['display']} </a>`
    aliasText += ` (${aliasCategories[cat]['shorthand']})`
    aliasText += ' Aliases </h4> </summary>'
    
    aliasText += '\n<ul><details open class="linux-details">\n\t<summary>'
    aliasText += `Linux Aliases (<code>.${cat}.alias.sh</code>)</summary> <br/>`
    aliasText += `\n\n\`\`\`bash\n${linuxAliases}\n\`\`\`\n\n</details></ul>`

    aliasText += '\n<ul><details class="win-details">\n\t<summary>'
    aliasText += `Windows Aliases (<code>.${cat}.alias.cmd</code>)</summary> <br/>`
    aliasText += `\n\n\`\`\`bash\n${winAliases}\n\`\`\`\n\n</details></ul>`

    aliasText += '\n</details>\n\n'
  }
  return aliasText
}


function populateTag(tag: string, data: string, text: string){
  const openTag = `<${tag}>`
  const closeTag = `</${tag}>`
  const tagStart = text.substring(
    0, text.indexOf(openTag) + openTag.length
  );
  const tagEnd = text.substring(
    text.indexOf(closeTag), text.length
  );
  return `${tagStart}\n${data}\n${tagEnd}`
}

async function updateReadme(){

  // read readme file
  const fileName = 'README.md'
  const readmeFile = await Deno.readFile(fileName);
  let readmeText = new TextDecoder().decode(readmeFile)
  readmeText = readmeText.replaceAll('\r', '')

  // populate alias details
  const aliasText = await createAliasText(aliasCategories)
  readmeText = populateTag(
    'aliasText', aliasText, readmeText
  )

  // populate network tools

  // write readme file
  await Deno.writeTextFile(fileName, readmeText);
}

async function updateIndex(){

  let readmeText = new TextDecoder().decode(
    await Deno.readFile('README.md')
  )
  readmeText = readmeText.replaceAll('\r', '')

  readmeText = readmeText.substring(
    readmeText.indexOf('<indexMarkdown>') + '<indexMarkdown>'.length,
    readmeText.indexOf('</indexMarkdown>')
  )


  readmeText = readmeText.replaceAll(
    '\`\`\`bash\n', '<pre><code class="language-bash">'
  )
  readmeText = readmeText.replaceAll('\n\`\`\`', '</code></pre>')


  let indexText = new TextDecoder().decode(
    await Deno.readFile('index.md')
  )

  indexText = populateTag(
    'indexMarkdown', readmeText, indexText
  )
  
  await Deno.writeTextFile('index.md', indexText);
}

const aliasCategories = aliasData.aliasDetails
await updateReadme()
await updateIndex()
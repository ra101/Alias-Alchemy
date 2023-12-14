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


async function updateReadme(aliasText){
  const fileName = 'README.md'
  const readmeFile = await Deno.readFile(fileName);
  let readmeText = new TextDecoder().decode(readmeFile)

  const readmeCLIStart = readmeText.substring(
    0, readmeText.indexOf('<aliasText>') + '<aliasText>'.length
  );
  
  const readmeCLIEnd = readmeText.substring(
    readmeText.indexOf('</aliasText>'), readmeText.length
  );
  
  readmeText = `${readmeCLIStart}\n${aliasText}\n${readmeCLIEnd}`
  await Deno.writeTextFile(fileName, readmeText);
}

async function updateIndex(aliasText){
const fileName = 'index.md'
  const indexFile = await Deno.readFile(fileName);
  let indexText = new TextDecoder().decode(indexFile)

  const indexCLIStart = indexText.substring(
    0, indexText.indexOf('<aliasText>') + '<aliasText>'.length
  );
  
  const indexCLIEnd = indexText.substring(
    indexText.indexOf('</aliasText>'), indexText.length
  );

  aliasText = aliasText.replaceAll(
    '\`\`\`bash\n', '<pre><code class="language-bash">'
  )

  aliasText = aliasText.replaceAll('\n\`\`\`', '</code></pre>')

  
  indexText = `${indexCLIStart}\n${aliasText}\n${indexCLIEnd}`
  await Deno.writeTextFile(fileName, indexText);
}

const aliasCategories = aliasData.aliasDetails
const aliasText = await createAliasText(aliasCategories)
await updateReadme(aliasText)
await updateIndex(aliasText)
# Alias Alchemy

<indexMarkdown>

The best way to download alias for fast setup.


<h2> Usage </h2>

<b>Step 1</b>: Using any of the following tools, send a <code>GET</code> request to alias alchemy domain with/without <code>q (default all)</code> and <code>sys (default: linux)</code> query parameters to <b>download the composite alias file</b>.

<be times="2" />

<ul>
	<li> Linux Path: <code>~/.alias.sh</code> </li>
	<li> Windows Path: <code>%USERPROFILE%\\.alias.cmd</code> </li>
</ul>

<ul>
<details open>
	<summary> Using <a href="https://curl.se/"> cURL </a> </summary> <br/>

```bash
curl -L "alias-alchemy.ra101.dev?q=py,dj,docker&sys=linux" > ~/.alias.sh
```

</details>
</ul>

<ul>
<details>
	<summary> Using <a href="https://www.gnu.org/software/wget/"> Wget </a> </summary> <br/>

```bash
wget "alias-alchemy.ra101.dev?q=py,dj,docker&sys=win" -O %USERPROFILE%\.alias.cmd
```

</details>
</ul>

<ul>
<details>
	<summary> Other supported tools </summary> <br/>

<tools>

<table><tbody>
<tr><td> <a href="https://httpie.io/"> HTTPie </a> </td> <td> <code> http -d [url] > [filepath] </code> </td></tr>
<tr><td> <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest/"> Invoke-WebRequest </a> </td> <td> <code> Invoke-WebRequest [url] -O [filepath] </code> </td></tr>
<tr><td> <a href="https://aria2.github.io/"> aria2 </a> </td> <td> <code> aria2c -c [url] > [filepath] </code> </td></tr>
<tr><td> <a href="https://www.postman.com/"> Postman </a> </td> <td> <code> GET [url] | Save to File </code> </td></tr>
<tr><td> Any Tool </td> <td> <code> [tool] [header: {'User-Agent': 'alal'}] [url] > [filepath] </code> </td></tr>
</tbody></table>

</tools>

</details>
</ul>

<b>Mirrors</b>:
<ul> <li> <a href="https://alias-alchemy.ra101.dev?q="> alias-alchemy.ra101.dev </a> </li>
<li> <a href="https://alal.deno.dev?q="> alal.deno.dev </a> </li> </ul>

<br/>

<b>Step 2</b>: Configure our system to auto-run the alias file whenever a terminal is launched. <b>(This is just a first-time setup)</b>

<be times="2" />

<ul>
<details open class="linux-details">
	<summary> Linux Setup </summary> <br/>

 Assuming we saved the file at <code>~/.alias.sh</code>, run the following command 

<be times="2" />

```bash
# Append `Executing Command (source)` in the shell's configuration profile.
## Bash 
grep -qxF 'source ~/.alias.sh' ~/.bashrc || echo 'source ~/.alias.sh' >> ~/.bashrc

## ZSH 
grep -qxF 'source ~/.alias.sh' ~/.zshrc || echo 'source ~/.alias.sh' >> ~/.zshrc
```

</details>
</ul>

<ul>
<details class="win-details">
	<summary> Windows Setup </summary> <br/>

 Assuming we saved the file at <code>%USERPROFILE%\\.alias.cmd</code>, run the following command in <b>Administrator Mode</b>

<be times="2" />

```batch
REM Adding `AutoRun` key (string) in Windows registry and setting the value to the file path. 
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor" /f /v "AutoRun" /t REG_SZ /d "%USERPROFILE%\.alias.cmd"
```

</details>
</ul>

<br/>

<b>Step 3</b>: After creating the alias file and configuring our system, another operation that can be performed is <b>appending the alias file</b> using the <code>>></code> operator. <i> It is perhaps the reason why this project exists. </i>

<be times="2" />
<ul>

```bash
# Using Direct Command
curl -L "alias-alchemy.ra101.dev?q=kubernetes" >> ~/.alias.sh

# Using Alias
fetch-alias kubernetes >> ~/.alias.sh
```

</ul>

<br/>

<h2> Alias Details </h2>

<aliasText>
<details>
	<summary> <h4 style="display:inline-block;"> <a href="https://www.python.org/"> Python </a> (py) Aliases </h4> </summary>
<ul><details open class="linux-details">
	<summary>Linux Aliases (<code>.python.alias.sh</code>)</summary> <br/>

```bash
# Python Aliases

```

</details></ul>
<ul><details class="win-details">
	<summary>Windows Aliases (<code>.python.alias.cmd</code>)</summary> <br/>

```bash
# Python Aliases

```

</details></ul>
</details>

<details>
	<summary> <h4 style="display:inline-block;"> <a href="https://www.docker.com/"> Docker </a> (dc) Aliases </h4> </summary>
<ul><details open class="linux-details">
	<summary>Linux Aliases (<code>.docker.alias.sh</code>)</summary> <br/>

```bash
# Docker Aliases

```

</details></ul>
<ul><details class="win-details">
	<summary>Windows Aliases (<code>.docker.alias.cmd</code>)</summary> <br/>

```bash
# Docker Aliases

```

</details></ul>
</details>

<details>
	<summary> <h4 style="display:inline-block;"> <a href="https://www.djangoproject.com/"> Django </a> (dj) Aliases </h4> </summary>
<ul><details open class="linux-details">
	<summary>Linux Aliases (<code>.django.alias.sh</code>)</summary> <br/>

```bash
# Django Aliases

```

</details></ul>
<ul><details class="win-details">
	<summary>Windows Aliases (<code>.django.alias.cmd</code>)</summary> <br/>

```bash
# Django Aliases

```

</details></ul>
</details>


</aliasText>


<div align="center">
  <h3> Built with <b>❤️</b> by<b>〈 RA 〉</b></h3>

</div>

</indexMarkdown>

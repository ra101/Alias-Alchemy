<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">

<indexMarkdown>


The best way to download alias for fast setup.


<h2> Usage </h2>

<b>Step 1</b>: Using any of the following tools, send a <code>GET</code> request to alias alchemy domain with/without <code>q (default all)</code> and <code>sys (default: linux)</code> query parameters to <b>download the composite alias file</b>.

<br/><br/>

<ul>
	<li> Linux Path: <code>~/.alias.sh</code> </li>
	<li> Windows Path: <code>%USERPROFILE%\.alias.cmd</code> </li>
</ul>

<br/>

<ul>
<details open>
	<summary> Using <a href="https://curl.se/"> cURL </a> </summary> <br/>

<pre><code class="language-bash">curl -L "alias-alchemy.ra101.dev?q=py,dj,docker&sys=linux" > ~/.alias.sh</code></pre>

</details>
</ul>

<ul>
<details>
	<summary> Using <a href="https://www.gnu.org/software/wget/"> Wget </a> </summary> <br/>

<pre><code class="language-bash">wget "alias-alchemy.ra101.dev?q=py,dj,docker&sys=win" -O %USERPROFILE%\.alias.cmd</code></pre>

</details>
</ul>

<ul>
<details>
	<summary> Other supported tools </summary> <br/>

<tools>

<table><tbody>
<tr><td> <a href="https://httpie.io/"> HTTPie </a> </td> <td> <code> http -d [url] > [filepath] </code> </td></tr>
<tr><td> <a href="https://www.postman.com/"> aria2 </a> </td> <td> <code> aria2c -c [url] > [filepath] </code> </td></tr>
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

<br/><br/>

<ul>
<details open class="linux-details">
	<summary> Linux Setup </summary> <br/>

 Assuming we saved the file at <code>~/.alias.sh</code>, run the following command 

<br/><br/>

<pre><code class="language-bash"># Append `Executing Command (source)` in the shell's configuration profile.
## Bash 
grep -qxF 'source ~/.alias.sh' ~/.bashrc || echo 'source ~/.alias.sh' >> ~/.bashrc

## ZSH 
grep -qxF 'source ~/.alias.sh' ~/.zshrc || echo 'source ~/.alias.sh' >> ~/.zshrc</code></pre>

</details>
</ul>

<ul>
<details class="win-details">
	<summary> Windows Setup </summary> <br/>

 Assuming we saved the file at <code>%USERPROFILE%\.alias.cmd</code>, run the following command in <b>Administrator Mode</b>

<br/><br/>

<pre><code class="language-batch">:: Adding Auto-Run key (string) in Windows registry and setting the value to the file path. 
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor" /f /v "AutoRun" /t REG_SZ /d "%USERPROFILE%\.alias.cmd"</code></pre>

</details>
</ul>


<h2> Alias Details </h2>

<aliasText>
<details>
	<summary> <h4 style="display:inline-block;"> <a href="https://www.python.org/"> Python </a> (py) Aliases </h4> </summary>
<ul><details open class="linux-details">
	<summary>Linux Aliases (<code>.python.alias.sh</code>)</summary> <br/>

<pre><code class="language-bash"># Python Aliases
</code></pre>

</details></ul>
<ul><details class="win-details">
	<summary>Windows Aliases (<code>.python.alias.cmd</code>)</summary> <br/>

<pre><code class="language-bash"># Python Aliases
</code></pre>

</details></ul>
</details>

<details>
	<summary> <h4 style="display:inline-block;"> <a href="https://www.docker.com/"> Docker </a> (dc) Aliases </h4> </summary>
<ul><details open class="linux-details">
	<summary>Linux Aliases (<code>.docker.alias.sh</code>)</summary> <br/>

<pre><code class="language-bash"># Docker Aliases
</code></pre>

</details></ul>
<ul><details class="win-details">
	<summary>Windows Aliases (<code>.docker.alias.cmd</code>)</summary> <br/>

<pre><code class="language-bash"># Docker Aliases
</code></pre>

</details></ul>
</details>

<details>
	<summary> <h4 style="display:inline-block;"> <a href="https://www.djangoproject.com/"> Django </a> (dj) Aliases </h4> </summary>
<ul><details open class="linux-details">
	<summary>Linux Aliases (<code>.django.alias.sh</code>)</summary> <br/>

<pre><code class="language-bash"># Django Aliases
</code></pre>

</details></ul>
<ul><details class="win-details">
	<summary>Windows Aliases (<code>.django.alias.cmd</code>)</summary> <br/>

<pre><code class="language-bash"># Django Aliases
</code></pre>

</details></ul>
</details>


</aliasText>


<div align="center">
  <h3> Built with <b>❤️</b> by<b>〈 RA 〉</b></h3>

</div>


</indexMarkdown>

<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<!-- and it's easy to individually load additional languages -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/bash.min.js"></script>

<script>

	hljs.highlightAll();

	window.onload = function() {
		const platform = window.navigator.platform.toLowerCase();
		const winDetails = document.getElementsByClassName('win-details')
		const linuxDetails = document.getElementsByClassName('linux-details')

		if (platform.includes('win')) {
			Array.from(winDetails).forEach(function(detailsElement) {
				detailsElement.open = true;
			});
			Array.from(linuxDetails).forEach(function(detailsElement) {
				detailsElement.open = false;
			});
		}
	};

</script>



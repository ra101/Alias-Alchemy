<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-light.min.css"><link rel="stylesheet" href="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css"/>

<style>
.hljs-copy-button {transform: None; filter:invert(1)}
.hljs {color: purple}
</style>

<indexMarkdown>


The best way to download alias for fast setup.


<h2> Usage </h2>

<b>Step 1</b>: Using any of the following tools, send a <code>GET</code> request to alias alchemy domain with/without <code>q (default all)</code> query parameter to <b>download the composite alias file</b> and the finally save this file at the <b><code>~/.alias.sh</code></b>.

<br/><br/>

<ul>
<details open>
	<summary> Using <a href="https://curl.se/"> cURL </a> </summary> <br/>

<pre><code class="language-bash">curl -L "alal.deno.dev" > ~/.alias.sh

curl -L "alias-alchemy.ra101.dev?q=py,dj,docker" > ~/.alias.sh</code></pre>

</details>
</ul>

<ul>
<details>
	<summary> Using <a href="https://www.gnu.org/software/wget/"> Wget </a> </summary> <br/>

<pre><code class="language-bash">wget "alias-alchemy.ra101.dev?q=py,dj,docker" -O ~/.alias.sh</code></pre>

</details>
</ul>

<ul>
<details>
	<summary> Other supported tools </summary> <br/>

<tools>

<table><tbody>
<tr><td> <a href="https://httpie.io/"> HTTPie </a> </td> <td> <code> http -d [url] > [filepath] </code> </td></tr>
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

<br/><br/>

Assuming we saved the file at <code>~/.alias.sh</code>, run the following command:

<pre><code class="language-bash"># Append `Executing Command (source)` in the shell's configuration profile.
## Bash 
grep -qxF 'source ~/.alias.sh' ~/.bashrc || echo 'source ~/.alias.sh' >> ~/.bashrc

## ZSH 
grep -qxF 'source ~/.alias.sh' ~/.zshrc || echo 'source ~/.alias.sh' >> ~/.zshrc</code></pre>

<br/>

<b>Step 3</b>: After creating the alias file and configuring our system, another operation that can be performed is <b>appending the alias file</b> using the <code>>></code> operator. <i> It is perhaps the reason why this project exists. </i>

<br/><br/>
<ul>

<pre><code class="language-bash"># Using Direct Command
curl -L "alias-alchemy.ra101.dev?q=kubernetes" >> ~/.alias.sh

# Using Alias
fetch-alias kubernetes >> ~/.alias.sh</code></pre>

</ul>

<br/>

<h2> Alias Details </h2>

<aliasText>
<details>
	<summary> <h4 style="display:inline-block;">〉<a href="null"> Shell </a> (sh) Aliases </h4> </summary>

<pre><code class="language-bash"># Shell Aliases
</code></pre>

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.python.org/"> Python </a> (py) Aliases </h4> </summary>

<pre><code class="language-bash"># Python Aliases
</code></pre>

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.djangoproject.com/"> Django </a> (dj) Aliases </h4> </summary>

<pre><code class="language-bash"># Django Aliases
</code></pre>

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.docker.com/"> Docker </a> (dc) Aliases </h4> </summary>

<pre><code class="language-bash"># Docker Aliases
</code></pre>

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://kubernetes.io/"> Kubernetes </a> (k) Aliases </h4> </summary>

<pre><code class="language-bash"># Kubernetes Aliases
</code></pre>

</details>


</aliasText>


<div align="center">
  <h3> Built with <b>❤️</b> by<b>〈 RA 〉</b></h3>

</div>


</indexMarkdown>

<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/bash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/dos.min.js"></script>
<script src="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js"></script>


<script>
	hljs.addPlugin(new CopyButtonPlugin());
	hljs.highlightAll();
</script>



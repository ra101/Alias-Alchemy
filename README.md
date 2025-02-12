# Alias Alchemy

<indexMarkdown>

The best way to download alias for fast setup.


<h2> Usage </h2>

<b>Step 1</b>: Using any of the following tools, send a <code>GET</code> request to alias alchemy domain with/without <code>q (default all)</code> query parameter to <b>download the composite alias file</b> and the finally save this file at the <b><code>~/.alias.sh</code></b>.

<be times="2" />

<ul>
<details open>
	<summary> Using <a href="https://curl.se/"> cURL </a> </summary> <br/>

```bash
# Fetch all aliases at once.
curl -L "alal.deno.dev" > ~/.alias.sh

# Fetch aliases based on query param.
curl -L "alias-alchemy.ra101.dev?q=py,dj,docker" > ~/.alias.sh

# /help endpoint to get usage.
curl -L "alal.deno.dev/help"
```

</details>
</ul>

<ul>
<details>
	<summary> Using <a href="https://www.gnu.org/software/wget/"> Wget </a> </summary> <br/>

```bash
wget "alias-alchemy.ra101.dev?q=py,dj,docker" -O ~/.alias.sh
```

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

<be times="2" />

Assuming we saved the file at <code>~/.alias.sh</code>, run the following command:

<be times="2" />

```bash
# Append `Executing Command (source)` in the shell's configuration profile.
## Bash 
grep -qxF 'source ~/.alias.sh' ~/.bashrc || echo 'source ~/.alias.sh' >> ~/.bashrc

## ZSH 
grep -qxF 'source ~/.alias.sh' ~/.zshrc || echo 'source ~/.alias.sh' >> ~/.zshrc
```

<br/>

<b>Step 3</b>: After creating the alias file and configuring our system, another operation that can be performed is <b>appending the alias file</b> using the <code>>></code> operator. <i> It is perhaps the reason why this project exists. </i>

<be times="2" />
<ul>

```bash
curl -L "alias-alchemy.ra101.dev?q=kubernetes" >> ~/.alias.sh
```

</ul>

<br/>

<h2> Alias Details </h2>

<aliasText>
<details>
	<summary> <h4 style="display:inline-block;">〉<a href="null"> Shell </a> (sh) Aliases </h4> </summary>

```bash
# Shell Aliases

```

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.python.org/"> Python </a> (py) Aliases </h4> </summary>

```bash
# Python Aliases

```

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.djangoproject.com/"> Django </a> (dj) Aliases </h4> </summary>

```bash
# Django Aliases

```

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.docker.com/"> Docker </a> (dc) Aliases </h4> </summary>

```bash
# Docker Aliases

```

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://kubernetes.io/"> Kubernetes </a> (k) Aliases </h4> </summary>

```bash
# Kubernetes Aliases

```

</details>


</aliasText>


<div align="center">
  <h3> Built with <b>❤️</b> by<b>〈 RA 〉</b></h3>

</div>

</indexMarkdown>

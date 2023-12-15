# Alias Alchemy

<indexMarkdown>

The best way to download alias for fast setup.


<h2> Usage </h2>

<b>Step 1</b>: Using any of the following tools, send a <code>GET</code> request to alias alchemy domain with/without <code>q (default all)</code> and <code>sys (default: linux)</code> query parameters to <b>download the composite alias file</b>.
<br>
<ul>
<details open>
	<summary> Using <a href="https://curl.se/"> cURL </a> </summary> <br/>

```bash
curl -LOJ "alias-alchemy.ra101.dev?q=py,dj,docker&sys=linux"
```

(Instead of using <code>-OJ</code> you can use <code> > alias.sh</code> to directly write output to the file)
</details>
</ul>

<ul>
<details>
	<summary> Using <a href="https://www.gnu.org/software/wget/"> Wget </a> </summary> <br/>

```bash
wget --content-disposition "alias-alchemy.ra101.dev?q=py,dj,docker&sys=win"
```

(Instead of using `--content-disposition` you can use ` -O - > alias.cmd` to directly write output to the file)
</details>
</ul>

<ul>
<details>
	<summary> Other supported tools </summary> <br/>

<tools>

<table><tbody>
<tr><td> <a href="https://httpie.io/"> HTTPie </a> </td> <td> <code> http -d [url] </code> </td></tr>
<tr><td> <a href="https://www.postman.com/"> aria2 </a> </td> <td> <code> aria2c -c [url] </code> </td></tr>
<tr><td> <a href="https://www.postman.com/"> Postman </a> </td> <td> <code> GET [url] | Save to File </code> </td></tr>
<tr><td> Any Tool </td> <td> <code> [tool] [header: {'User-Agent': 'alal'}] [url] </code> </td></tr>
</tbody></table>

</tools>

</details>
</ul>

<b>Mirrors</b>:
<ul> <li> <a href="https://alias-alchemy.ra101.dev?q="> alias-alchemy.ra101.dev </a> </li>
<li> <a href="https://alal.deno.dev?q="> alal.deno.dev </a> </li> </ul>

<br/>

<b>Step 2</b>: Using any of the following tools, send a <code>GET</code> request to alias alchemy domain with/without <code>q (default all)</code> and <code>sys (default: linux)</code> query parameters to download the composite alias file.
<br>
<ul>
<details open>
	<summary> Linux Setup </summary> <br/>

```bash
curl -LOJ "alias-alchemy.ra101.dev?q=py,dj,docker&sys=linux"
```

(Instead of using <code>-OJ</code> you can use <code> > alias.sh</code> to directly write output to the file)
</details>
</ul>

<ul>
<details>
	<summary> Windows Setup </a> </summary> <br/>

```bash
wget --content-disposition "alias-alchemy.ra101.dev?q=py,dj,docker&sys=win"
```

(Instead of using <code>--content-disposition</code> you can use <code> -O - > alias.cmd</code> to directly write output to the file)
</details>
</ul>


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

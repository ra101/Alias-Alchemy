# Alias Alchemy

<indexMarkdown>

The best way to download alias for fast setup.

## Usage
**Step 1**: Using any of the following supported tools, send a `GET` request to alias alchemy domain with/without `q (default all)` and `sys (default: linux)` query parameters to **download the composite alias file**.
<ul>
<details open>
	<summary> Using <a href="https://curl.se/"> cURL </a> </summary> <br/>

```bash
curl -LOJ "alias-alchemy.ra101.dev?q=py,dj,docker&sys=linux"
```

(Instead of using `-OJ` you can use ` > alias.sh` to direct write output to the file)
</details>
</ul>

<ul>
<details>
	<summary> Using <a href="https://www.gnu.org/software/wget/"> Wget </a> </summary> <br/>

```bash
wget --content-disposition "alias-alchemy.ra101.dev?q=py,dj,docker&sys=win"
```

(Instead of using `--content-disposition` you can use ` -O - > alias.cmd` to direct write output to the file)
</details>
</ul>

<ul>
<details>
	<summary> Other supported tools </summary> <br/>

<tools>

|||
|-|-|
| httpie | `httpie` |

</tools>

</details>
</ul>

**Mirrors**:
- [alias-alchemy.ra101.dev](https://alias-alchemy.ra101.dev?q=)
- [alal.deno.dev](https://alal.deno.dev?q=)

<br/>

**Step 2**: Using any of the following tools, send a `GET` request to alias alchemy domain with/without `q (default all)` and `sys (default: linux)` query parameters to download the composite alias file.

<ul>
<details open>
	<summary> Linux Setup </summary> <br/>

```bash
curl -LOJ "alias-alchemy.ra101.dev?q=py,dj,docker&sys=linux"
```

(Instead of using `-OJ` you can use ` > alias.sh` to direct write output to the file)
</details>
</ul>

<ul>
<details>
	<summary> Windows Setup </a> </summary> <br/>

```bash
wget --content-disposition "alias-alchemy.ra101.dev?q=py,dj,docker&sys=win"
```

(Instead of using `--content-disposition` you can use ` -O - > alias.cmd` to direct write output to the file)
</details>
</ul>


## Alias Details

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

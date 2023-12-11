<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">

The best way to download alias for fast setup.

### Usage
<pre><code class="language-bash">
curl -L "alias-alchemy.ra101.dev?=dj,python,docker"
</code></pre>

<pre><code class="language-bash">curl -L "alias-alchemy.ra101.dev?=dj,python,docker"</code></pre>




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



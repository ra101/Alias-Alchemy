<link rel="stylesheet" href="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-light.min.css">

<style>
.hljs {color: purple; font-weight: bold;}
.hljs-comment {font-weight: normal;}
</style>

<indexMarkdown>


The best way to download alias for fast setup.

<h2> Usage </h2>

<b>Step 1</b>: Using any of the following tools, send a <code>GET</code> request
to alias alchemy domain with/without <code>q (default all)</code> query
parameter to <b>download the composite alias file</b> and the finally save this
file at the <b><code>~/.alias.sh</code></b>.

<br/><br/>

<ul>
<details open>
	<summary> Using <a href="https://curl.se/"> cURL </a> </summary> <br/>

<pre style="overflow: hidden"><code class="language-bash"># Fetch all aliases at once.
curl -L "alal.deno.dev" > ~/.alias.sh

# Fetch aliases based on query param.
curl -L "alias-alchemy.ra101.dev?q=py,dj,docker" > ~/.alias.sh

# /help endpoint to get usage.
curl -L "alal.deno.dev/help"</code></pre>

</details>
</ul>

<ul>
<details>
	<summary> Using <a href="https://www.gnu.org/software/wget/"> Wget </a> </summary> <br/>

<pre style="overflow: hidden"><code class="language-bash">wget "alias-alchemy.ra101.dev?q=py,dj,docker" -O ~/.alias.sh</code></pre>

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

<b>Step 2</b>: Configure our system to auto-run the alias file whenever a
terminal is launched. <b>(This is just a first-time setup)</b>

<br/><br/>

Assuming we saved the file at <code>~/.alias.sh</code>, run the following
command:

<br/><br/>

<pre style="overflow: hidden"><code class="language-bash"># Append `Executing Command (source)` in the shell's configuration profile.
## Bash 
grep -qxF 'source ~/.alias.sh' ~/.bashrc || echo 'source ~/.alias.sh' >> ~/.bashrc

## ZSH 
grep -qxF 'source ~/.alias.sh' ~/.zshrc || echo 'source ~/.alias.sh' >> ~/.zshrc</code></pre>

<br/>

<b>Step 3</b>: After creating the alias file and configuring our system, another
operation that can be performed is <b>appending the alias file</b> using the
<code>>></code> operator. <i> It is perhaps the reason why this project exists.
</i>

<br/><br/>
<ul>

<pre style="overflow: hidden"><code class="language-bash">curl -L "alias-alchemy.ra101.dev?q=kubernetes" >> ~/.alias.sh</code></pre>

</ul>

<br/>

<h2> Alias Details </h2>

<aliasText>
<details>
	<summary> <h4 style="display:inline-block;">〉<a href="null"> Shell </a> (sh) Aliases </h4> </summary>

<pre style="overflow: hidden"><code class="language-bash"># Shell Aliases

alias '$ '=''
alias sudo='sudo '
alias 'cd..'='cd ..'
alias ls='ls -CFG'
alias ll='ls -alFG'
alias la='ls -ACFG'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias vgrep='grep -v grep | grep --color=auto'
alias bc='bc -l'
alias ipi='ipconfig getifaddr en0'
alias ipe='curl ipinfo.io/ip && printf "\n"'
alias cls='clear'
alias dir='ls'
alias pping='prettyping --nolegend'
alias ':q'='exit'

alias sag='sudo apt-get'
alias sai='sudo apt install'
alias sau='sudo apt update'
alias sauu='sudo apt upgrade'
alias sadu='sudo apt dist-upgrade'
alias sar='sudo apt autoremove'

function long_clear() {
    len=${1:-10}
    for ((i=1; i <= len; i++)) do
        printf '\n'
    done
}

alias lcls='long_clear'

cat() {
    for file in "$@"; do
        ext="${file##*.}"
        case "$ext" in
            json)
                if command -v python &> /dev/null && command -v pygmentize &> /dev/null; then
                    command python -m json.tool "$file" | pygmentize -l json
                else
                    command cat "$file"
                fi
                ;;
            yaml|yml)
                if command -v pygmentize &> /dev/null; then
                    command cat "$file" | pygmentize -l yaml
                else
                    command cat "$file"
                fi
                ;;
            toml)
                if command -v pygmentize &> /dev/null; then
                    command cat "$file" | pygmentize -l toml
                else
                    command cat "$file"
                fi
                ;;
            md)
                if command -v glow &> /dev/null; then
                    command glow "$file"
                else
                    command cat "$file"
                fi
                ;;
            *) command cat "$file";;
        esac
    done
}

alias 'kore_nani?'='if [[ $((KORE_NANI_COUNT+=1)) -ge 6 ]]; then nyancat; KORE_NANI_COUNT=0; fi;'

## Git Aliases
parse_git_branch2() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ \1/'
}
alias gbr='git branch'
alias gps='git push'
alias gpl='git pull'
alias gch='git checkout'
alias gco='git commit -m'
alias gca='git commit --amend --no-edit'
alias gs='git status'
alias gsb='git status -sb'
alias ga='git add'
alias gus='git restore --staged'
alias gr='git reset'
alias grs='git reset --soft'
alias grh='git reset --hard'
alias grb='git rebase --autostash'
alias grbm='git rebase $(git symbolic-ref refs/remotes/origin/HEAD | sed "s@^refs/remotes/origin/@@") --autostash'
alias gf='git fetch'
alias gd='git diff'
alias gup="git push --set-upstream origin \$(parse_git_branch2)"
alias gw='git whatchanged'
alias glg="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

gac() {
    ## The Idea is to create a commit message from the branch name
    ## For Example:
    ##    if branch name is `feature/jira-123-this-is-issue-desc`
    ##    then commit would be `[Enhancement JIRA-123] This Is Issue Desc`

    # Exit, if there is nothing to commit!
    if [[ $(git diff --staged) == "" ]]; then
        echo "Nothing to Commit! " && return 1
    fi


    # Fetch Details
    # ----------------
    local current_branch
    local issue_type
    local issue_no
    local issue_desc

    ## `feature/jira-123-this-is-issue-desc`, all in lower case
    current_branch=$(git rev-parse --abbrev-ref HEAD | tr '[:upper:]' '[:lower:]')

    ## `feature`
    issue_type=$(echo "$current_branch" | cut -d '/' -f 1)

    ## `jira-123`
    issue_no=$(echo "$current_branch" | cut -d '/' -f 2- | cut -d '-' -f -2)

    ## `this-is-issue-desc`
    issue_desc=$(echo "$current_branch" | cut -d '/' -f 2- | cut -d '-' -f 3- )

    # Format Details
    # ----------------

    ## We will use this map to get issue_type out of branch name
    declare -A branch_map; branch_map["feature"]="Enhancement";
    branch_map["bugfix"]="Patch"; branch_map["version"]="Upgrade";

    ## `feature` -> `Enhancement`; `random` -> `Random`
    issue_type=${branch_map[$issue_type]-${issue_type^}}

    ## `jira-123` -> `JIRA-123`
    issue_no=$(echo "$issue_no" | tr '[:lower:]' '[:upper:]')

    ## `this-is-issue-desc` -> `This Is Issue Desc`
    issue_desc=$(echo "$issue_desc" | sed 's/-/ /g' | awk '{for (i=1; i<=NF; i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')

    ## `[Enhancement JIRA-123] This Is Issue Desc`
    local commit_msg="[$issue_type $issue_no] $issue_desc"

    # Commit!
    # ----------------

    ## Along with this message, I have added $@, So that all the
    ## flags and arguments of `git commit` can be passed in this command.
    git commit -m \""$commit_msg"\" "$@"
}
</code></pre>

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.python.org/"> Python </a> (py) Aliases </h4> </summary>

<pre style="overflow: hidden"><code class="language-bash"># Python Aliases

DEFAULT_VENV_DIR='./venv'
alias actenv='source $DEFAULT_VENV_DIR/bin/activate'

alias py='python'
alias py2='python2'
alias bpy='bpython'
alias ptpy='ptpython'
alias ipy='ipython'

alias jn='jupyter notebook'
alias crtenv='python -m venv $DEFAULT_VENV_DIR'

alias pi='pip install'
alias pir='pip install -r requirements.txt'
alias pirc='pip install -r requirements.txt -c constraints.txt'
alias pui='pip uninstall'
alias pf='pip freeze | sort'
alias pfr='pip freeze | sort > requirements.txt'

if command -v uv &> /dev/null; then
  alias upy='uv python'
  alias crtenv='uv python venv $DEFAULT_VENV_DIR'

  alias pi='uv pip install'
  alias pir='uv pip install -r requirements.txt'
  alias pirc='uv pip install -r requirements.txt -c constraints.txt'
  alias pui='uv pip uninstall'
  alias pf='uv pip freeze | sort'
  alias pfr='uv pip freeze | sort > requirements.txt'
fi

alias pyserve="python3 -m http.server"

pyclean () {
    find . -type f -name '*.py[co]' -delete -o -type d -name __pycache__ -delete
}

## Alembic Aliases
alias alex='alembic'
alias alre='alembic revision'
alias alup='alembic upgrade'
alias aldn='alembic downgrade'


## Django Aliases
# ${PWD##*/} returns current directory
alias wsgi='gunicorn ${PWD##*/}.wsgi:application'
alias asgi='daphne ${PWD##*/}.asgi:application'

alias dj='python manage.py'
alias djr='python manage.py runserver'
alias djr+='python manage.py runserver_plus'
alias djmm='python manage.py makemigrations'
alias djm='python manage.py migrate'
alias djmmm='python manage.py makemigrations && python manage.py migrate'
alias djs='python manage.py shell'
alias djs+='python manage.py shell_plus'
alias djdb='python manage.py dbshell'
alias djdb+='python manage.py dbshell_plus'
alias djcs='python manage.py collectstatic --noinput --clear'
alias djt='python manage.py test'
alias djdd="python manage.py dumpdata"
alias djld="python manage.py loaddata"

### Celery Aliases
alias clb='celery -A ${PWD##*/} beat -l info'
alias clw='celery -A ${PWD##*/} worker -l info'
alias clf='celery -A ${PWD##*/} flower'
</code></pre>

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://www.docker.com/"> Docker </a> (dc) Aliases </h4> </summary>

<pre style="overflow: hidden"><code class="language-bash"># Docker Aliases
</code></pre>

</details>

<details>
	<summary> <h4 style="display:inline-block;">〉<a href="https://kubernetes.io/"> Kubernetes </a> (k) Aliases </h4> </summary>

<pre style="overflow: hidden"><code class="language-bash"># Kubernetes Aliases
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

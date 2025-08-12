#!/bin/bash

# Shell Aliases (debian, git)

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

if echo "$SHELL" | grep -q "bash"; then
    alias rerc='source ~/.bashrc'
elif echo "$SHELL" | grep -q "zsh"; then
    alias rerc='source ~/.zshrc'
fi

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
alias gchb='git checkout -B'
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

#!/bin/bash

# Podman Aliases (podman, compose, pods)

alias pd='podman'
alias pdpl='podman pull'
alias pdpu='podman push'
alias pdcp='podman cp'
alias pdps='podman ps'
alias pdcls='podman ps'
alias pdi='podman images'
alias pdils='podman images ps'
alias pdtop='podman stats'
alias pdv='podman volume'
alias pdvls='podman volume ls'

function pdls(){
    printf 'Containers:\n\n' && podman ps -a
    printf '\n\nImages:\n\n' && podman images -a
    printf '\n\nVolumes:\n\n' && podman volume ls -a
    printf '\n\nPods:\n\n' && podman pod ls -a
}

alias pdr='podman run'
function pdrt(){
    podman run -it "$1" "${2:-bash}"
}

function pdlc(){
    podman ps -lq
}

function pdex(){
    podman exec -it "${1:-$(pdlc)}" "${2:-bash}"
}

function pda(){
    podman attach "${1:-$(pdlc)}"
}

function pdin(){
    podman inspect "${1:-$(pdlc)}"
}

function pdl(){
    podman logs "${1:-$(pdlc)}"
}

function pdlf(){
    podman logs -f "${1:-$(pdlc)}"
}

alias pds='podman stop -t 1'
alias pdsl='pdlc | xargs podman stop -t 1' # stop latest container
alias pdsa='podman stop -t 1 $(podman ps -q)' # Podman stop all containers

alias pdk='podman kill'
alias pdkl='pdlc | xargs podman kill' # kill latest container
alias pdka='podman kill $(podman ps -q)' # kill all containers

alias pdrm='podman rm'
alias pdrma='podman rm $(podman ps -q -a)' # remove all containers
function pdsrm {
    podman stop -t 1 "$1"; podman rm "$1"
}
alias pdsrml='pdlc | xargs pdsrm'
function pdkrm {
    podman kill "$1"; podman rm "$1"
}
alias pdkrml='pdlc | xargs pdkrm'

alias pdrmi='podman rmi'
alias pdrmia='podman rmi $(podman images -q -f dangling=true --no-trunc)' #remove all images

alias pdrmv='podman volume rm'
alias pdrmva='podman volume rm $(podman volume ls -q -f dangling=true)' #remove all volumes

function pdclean(){
    podman rm "$(podman ps -a -q)"
    podman rmi "$(podman images -q -f dangling=true)"
    podman volume rm "$(podman volume ls -q -f dangling=true)"
}
alias pdprune='podman system prune --all'

pdtags() {
    curl -s -S "https://registry.hub.docker.com/v2/repositories/library/${1}/tags/" \
    | jq '."results"[]["name"]' \
    | sort
}

# Podman Compose Aliases
alias pdc='podman-compose'
alias pdccp='podman-compose cp'
alias pdcb="podman-compose build"
alias pdcr="podman-compose run"
alias pdcup="podman-compose up"
alias pdcupf="podman-compose up --force-recreate"
alias pdcdn="podman-compose down"
alias pdcdna="podman-compose down --remove-orphans -v --rmi all"
alias pdcpl="podman-compose pull"
alias pdca="podman-compose attach"
alias pdcps="podman-compose ps"
alias pdctop="podman-compose top"
alias pdcex='podman-compose exec'
alias pdcl='podman-compose logs'

# Podman Pod Aliases
alias pdpo='podman pod'
alias pdpols='podman pod ls'
alias pdpops='podman pod ps'
alias pdpocr='podman pod create'
alias pdpoin='podman pod inspect'
alias pdpost='podman pod start'
alias pdposp='podman pod stop'
alias pdpospa='podman pod stop -a'
alias pdporm='podman pod rm'
alias pdporma='podman pod rm -a'
alias pdpors='podman pod restart'
alias pdpop='podman pod pause'
alias pdpoun='podman pod unpause'
alias pdpok='podman pod kill'
alias pdpotop='podman pod top'
alias pdpostats='podman pod stats'

function pdpols(){
    printf 'Pods:\n\n' && podman pod ls
    printf '\n\nPod processes:\n\n' && podman pod ps
}

# Generate systemd files for containers/pods
alias pdgen='podman generate systemd'
alias pdgenkube='podman generate kube'

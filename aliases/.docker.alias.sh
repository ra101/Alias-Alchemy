# Docker Aliases (docker, compose, swarm)

alias dk='docker'
alias dkpl='docker pull'
alias dkpu='docker push'
alias dkcp='docker cp'
alias dkps='docker ps'
alias dkcls='docker ps'
alias dki='docker images'
alias dkils='docker images ps'
alias dktop='docker stats'
alias dkv='docker volume'
alias dkvls='docker volume ls'

function dkls(){
    printf 'Containers:\n\n' && docker ps
    printf '\n\nImages:\n\n' && docker images
    printf '\n\nVolumes:\n\n' && docker volume ps
}


alias dkr='docker run'
function dkrt(){
    docker run -it "$1" "${2:-bash}"
}

function dklc(){
    docker ps -lq
}

function dkex(){
    docker exec -it "${1:-$(dklc)}" "${2:-bash}"
}

function dka(){
    docker attach "${1:-$(dklc)}"
}

function dkin(){
    docker inspect "${1:-$(dklc)}"
}

function dkl(){
    docker logs "${1:-$(dklc)}"
}

function dklf(){
    docker logs -f "${1:-$(dklc)}"
}


alias dks='docker stop -t 1'
alias dksl='dklc | xargs docker stop -t 1' # stop latest container
alias dksa='docker stop -t 1 $(docker ps -q)' # Docker stop all containers

alias dkk='docker kill'
alias dkkl='dklc | xargs docker kill' # kill latest container
alias dkka='docker kill $(docker ps -q)' # kill all containers

alias dkrm='docker rm'
alias dkrm='docker rm'
alias dkrma='docker rm $(docker ps -q -a)' # remove all containers
function dksrm {
    docker stop -t 1 "$1"; docker rm "$1"
}
alias dksrml='dklc | xargs dksrm'
function dkkrm {
    docker kill "$1"; docker rm "$1"
}
alias dkkrml='dklc | xargs dkkrm'


alias dkrmi='docker rmi'
alias dkrmia='docker rmi $(docker images -q -f dangling=true --no-trunc)' #remove all images
alias dkkrml='dklc | xargs dkkrm'


alias dkrmv='docker volume rm'
alias dkrmva='docker rmi $(docker volume ls -q -f dangling=true)' #remove all images


function dkclean(){
    docker rm "$(docker ps -a -q)"
    docker rmi "$(docker images -q -f dangling=true)"
    docker volume rmi "$(docker volume ls -q -f dangling=true)"

}
alias dkprune='docker system prune --all'


dktags() {
    curl -s -S "https://registry.hub.docker.com/v2/repositories/library/${1}/tags/" \
    | jq '."results"[]["name"]' \
    | sort
}

# Docker Compose Aliases
alias dc='docker compose'
alias dccp='docker compose cp'
alias dcb="docker compose build"
alias dcr="docker compose run"
alias dcup="docker compose up"
alias dcupf="docker compose up --force-recreate"
alias dcdn="docker compose down"
alias dcdna="docker compose down --remove-orphans -v -rmi all"
alias dcpl="docker compose pull"
alias dcdn="docker compose attach"
alias dcps="docker compose ps"
alias dctop="docker compose top"
alias dcex='docker compose exec'
alias dcl='docker compose logs'


# Docker Swarm Aliases
alias ds='docker swarm'
alias dsca='docker swarm ca'
alias dsi='docker swarm init'
alias dstm='docker swarm join-token manager'
alias dstw='docker swarm join-token worker'
alias dsj='docker swarm join'
alias dsl='docker swarm leave'
alias dsl='docker swarm leave --force'
alias dsup='docker swarm update'

alias dsconf='docker config'
alias dsconfls='docker config ls'
alias dsconfcr='docker config create'
alias dsconfin='docker config inspect'
alias dsconfrm='docker config rm'

# Similar K8s, We use cm (config map)
alias dscm='docker config'
alias dscmls='docker config ls'
alias dscmcr='docker config create'
alias dscmin='docker config inspect'
alias dscmrm='docker config rm'

alias dsno='docker node'
alias dsnols='docker node ls'
alias dsnops='docker node ps'
alias dsnoip='docker node inspect'
alias dsnoup='docker node update'
alias dsnopm='docker node promote'
alias dsnodm='docker node demote'

alias dssec='docker secret'
alias dssecls='docker secret ls'
alias dsseccr='docker secret create'
alias dssecin='docker secret inspect'
alias dssecrm='docker secret rm'

alias dssvc='docker service'
alias dssvcls='docker service ls'
alias dssvcps='docker service ps'
alias dssvccr='docker service create'
alias dssvcin='docker service inspect'
alias dssvcl='docker service logs'
alias dssvcrb='docker service rollback'
alias dssvcs='docker service scale'
alias dssvcrm='docker service rm'
alias dssvcup='docker service update'

function dsls(){
    printf 'Nodes:\n\n' && docker node ls
    printf '\n\nConfigs:\n\n' && docker config ls
    printf '\n\nSecrets:\n\n' && docker secret ls
    printf '\n\nServices:\n\n' && docker services ls
}

function dsps(){
    printf 'Nodes:\n\n' && docker node ps
    printf '\n\nServices:\n\n' && docker services ps
}

alias dsl='docker service logs'

# Python Aliases

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

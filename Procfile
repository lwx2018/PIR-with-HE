web: gunicorn privacy_computing_demo.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=privacy_computing_demo worker --loglevel=info
beat: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=privacy_computing_demo beat -S redbeat.RedBeatScheduler --loglevel=info

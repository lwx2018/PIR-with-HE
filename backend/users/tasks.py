from django.core import management

<<<<<<< HEAD
from {{project_name}} import celery_app
=======
from privacy_computing_demo import celery_app
>>>>>>> b8f188b (增加PIR相关应用)


@celery_app.task
def clearsessions():
<<<<<<< HEAD
    management.call_command("clearsessions")
=======
    management.call_command('clearsessions')
>>>>>>> b8f188b (增加PIR相关应用)

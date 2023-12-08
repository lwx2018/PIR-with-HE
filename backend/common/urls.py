from django.urls import path

from . import views

<<<<<<< HEAD
app_name = "common"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
]
=======
app_name = 'common'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('model_input', views.ModelInputView.as_view(), name='model_input'),
    path('model_manage', views.ModelManageView.as_view(), name='model_manage'),
    path('pir_server', views.PirServerView.as_view(), name='pir_server'),
    path('pir_client', views.PirClientView.as_view(), name='pir_client'),
]
>>>>>>> b8f188b (增加PIR相关应用)

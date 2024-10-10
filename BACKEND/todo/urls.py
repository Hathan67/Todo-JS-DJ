from django.urls import path 
from todo import views

urlpatterns = [path('csrf', views.get_csrf),
    path("getdata",views.index, name="index"),
    path("new",views.newForm),
    path('session', views.session_view),
    path("update/<int:task_id>/<str:new_status>",
        views.update_task_status,
        name="update_status",
    ),
    path("delete/<int:task_id>", views.delete_task, name="delete"),
               ]
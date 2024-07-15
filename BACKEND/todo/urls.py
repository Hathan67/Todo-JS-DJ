from django.urls import path 
from todo import views

urlpatterns = [path('csrf', views.get_csrf),
    path("getdata",views.index, name="index"),
               path("new",views.newForm),
               path('session', views.session_view),
               ]
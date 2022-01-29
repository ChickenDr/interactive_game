from django.urls import path

from . import views

urlpatterns = [
    path('', views.index_page, name = 'index_page'),
    # path("web_cam/", views.get_web_cam, name = "web_cam_page")
]

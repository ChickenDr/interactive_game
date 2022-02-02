from django.urls import path

from . import views

urlpatterns = [
    path('home/signup/', views.signup, name = 'signup'),
    path('home/signin/', views.signin, name = 'signin'),
    path('home/logout/', views.logout, name = 'logout'),
    path('home', views.home, name = 'home')
]

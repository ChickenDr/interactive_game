from django.urls import path
from django.conf.urls import include

from . import views

urlpatterns = [
    path('game/', views.game_page, name = 'game_page'),
    path('game/logout/', views.logout, name="log_out"),
    path('game/profile/', views.user_profile, name='profile'),
]

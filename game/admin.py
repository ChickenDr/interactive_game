from csv import list_dialects
from django.contrib import admin

from .models import GameHistory

@admin.register(GameHistory)
class GameAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'score', 'date']
    list_filter = ['user', 'date']
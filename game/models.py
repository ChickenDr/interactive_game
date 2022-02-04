from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

class GameHistory(models.Model):
    score = models.CharField(max_length=30)
    date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)

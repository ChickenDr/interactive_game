from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User

class GameHistory(models.Model):
    score = models.IntegerField()
    date = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)

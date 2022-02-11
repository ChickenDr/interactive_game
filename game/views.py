from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Max, Avg
from django.contrib import auth

import json

from django.test import RequestFactory
from .models import *

# 메인 페이지
@login_required
def game_page(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        GameHistory.objects.create(score = data['score'], user = request.user)
    
    return render(request, 'game_page.html')

# 유저 프로필
def user_profile(request):
    topScore = GameHistory.objects.filter(user = request.user).aggregate(Max('score'))
    avgScore = GameHistory.objects.filter(user = request.user).aggregate(Avg('score'))
    gameHistory = GameHistory.objects.filter(user = request.user)
    return render(request, 'profile.html', {'top_score' : topScore, 'avg_score' : avgScore, 'gameHistory' : gameHistory})

def board(request):
    ranking = GameHistory.objects.all().order_by('-score')
    return render(request, 'board.html', {'rank' : ranking})

# 로그아웃
def logout(request):
    auth.logout(request)
    return redirect('home')
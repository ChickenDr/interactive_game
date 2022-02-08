import re
from time import timezone
from turtle import pos
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import auth

import json
from .models import *

# 메인 페이지
@login_required
def game_page(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        GameHistory.objects.create(score = data['score'], user_name = request.user)
            
        print(data['score'])

    return render(request, 'game_page.html')

def user_profile(request):
    return render(request, 'profile.html');

# 로그아웃
def logout(request):
    auth.logout(request)
    return redirect('home')
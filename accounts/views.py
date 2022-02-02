from django.contrib import auth 
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect
from django.views import View 


class Accounts(View):
    def __init__(self):
# 회원가입 
def signup(request): 
    if request.method == 'POST': 
        if request.POST['password1'] == request.POST['password2']: 
            user = User.objects.create_user( username=request.POST['username'], password=request.POST['password1']) 
            auth.login(request, user) 
            return redirect('home')
        return render(request, 'signup.html') 
    
    else: 
        form = UserCreationForm 
        return render(request, 'signup.html', {'form':form})
    
# 로그인
def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('game_page')
        else:
            return render(request, 'signin.html', {'error': 'username or password is incorrect.'})
    else:
        return render(request, 'signin.html')


# 로그아웃
def logout(request):
    auth.logout(request)
    return redirect('home')

# home
def home(request):
    return render(request, 'home.html')
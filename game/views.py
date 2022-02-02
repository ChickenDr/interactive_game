from django.shortcuts import render, redirect

# 메인 페이지
def game_page(request):
    return render(request, 'game_page.html')
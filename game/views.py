from os import stat
from sys import flags
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest, HttpResponse, StreamingHttpResponse

import json
import threading
import cv2

# 메인 페이지
def index_page(request):
    return render(request, 'index.html')

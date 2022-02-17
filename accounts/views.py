from django.contrib import auth 
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect

# import threading
# import cv2

# 회원가입 
def signup(request): 
    if(request.user.is_authenticated):
        return redirect('game_page')

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
    if(request.user.is_authenticated):
        return redirect('game_page')
   
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

# 메인 페이지
def index_page(request):
    return render(request, 'index.html')

# class VideoCamera(object):
#     def __init__(self):
#         self.video = cv2.VideoCapture(0)
#         (self.grabbed, self.frame) = self.video.read()
#         threading.Thread(target = self.update, args=()).start()

#     def __del__(self):
#         self.video.release()

#     def get_frame(self):
#         image = self.img_processing(self.frame, debug=False)
#         ret, jpeg = cv2.imencode('.jpg', image)
#         return jpeg.tobytes()

#     def update(self):
#         while True:
#             (self.grabbed, self.frame) = self.video.read()

#     def make_mask_image(img_bgr):
#         img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_RGB2HSV)
#         low = (0, 30, 0)
#         high = (15, 255, 255)
#         img_mask = cv2.inRange(img_hsv, low, high)
#         return img_mask

#     def img_processing(self, img_bgr, debug):
#         # STEP 1
#         img_binary = self.make_mask_image(img_bgr)

#         # STEP 2
#         kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
#         img_binary = cv2.morphologyEx(img_binary, cv2.MORPH_CLOSE, kernel, 1)

#         contours, hierarchy = cv2.findContours(img_binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#         return img_binary

# def gen(camera):
#     while True:
#         frame = camera.get_frame()
#         yield(b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

# def get_web_cam(request):
#     try:      
#         cam = VideoCamera()
#         return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
#     except:  
#         print("Erro")
#         pass
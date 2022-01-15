from os import stat
from django.shortcuts import render
from django.http import StreamingHttpResponse

import threading
import cv2

# 메인 페이지
def index_page(request):
    return render(request, 'index.html')

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target = self.update, args=()).start()

    def __del__(self):
        self.video.release()

    def get_frame(self):
        image = img_processing(self.frame, debug=False)
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()

def make_mask_image(img_bgr):
    img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_RGB2HSV)
    low = (0, 30, 0)
    high = (15, 255, 255)
    img_mask = cv2.inRange(img_hsv, low, high)
    return img_mask

def img_processing(img_bgr, debug):
  # STEP 1
  img_binary = make_mask_image(img_bgr)

  # STEP 2
  kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
  img_binary = cv2.morphologyEx(img_binary, cv2.MORPH_CLOSE, kernel, 1)

  return img_binary

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield(b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def get_web_cam(request):
    try:      
        cam = VideoCamera()
        return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  
        print("Erro")
        pass
import cv2
import numpy as np

import requests
import object_detection as ob
import encode_stream_base64 as encode_base64
import firebase_connection as fb_conn
import time
# ESP32 URL
URL = "http://192.168.1.8"
AWB = True

# Face recognition and opencv setup
cap = cv2.VideoCapture(URL + ":81/stream")
# face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml') # insert the full path to haarcascade file if you encounter any problem


def set_resolution(url: str, index: int = 1, verbose: bool = False):
    try:
        if verbose:
            resolutions = "10: UXGA(1600x1200)\n9: SXGA(1280x1024)\n8: XGA(1024x768)\n7: SVGA(800x600)\n6: VGA(640x480)\n5: CIF(400x296)\n4: QVGA(320x240)\n3: HQVGA(240x176)\n0: QQVGA(160x120)"
            print("available resolutions\n{}".format(resolutions))

        if index in [10, 9, 8, 7, 6, 5, 4, 3, 0]:
            requests.get(url + "/control?var=framesize&val={}".format(index))
        else:
            print("Wrong index")
    except:
        print("SET_RESOLUTION: something went wrong")


def set_quality(url: str, value: int = 1, verbose: bool = False):
    try:
        if value >= 10 and value <= 63:
            requests.get(url + "/control?var=quality&val={}".format(value))
    except:
        print("SET_QUALITY: something went wrong")


def set_awb(url: str, awb: int = 1):
    try:
        awb = not awb
        requests.get(url + "/control?var=awb&val={}".format(1 if awb else 0))
    except:
        print("SET_QUALITY: something went wrong")
    return awb


if __name__ == '__main__':
    set_resolution(URL, index=8)

    while True:
        if cap.isOpened():
            ret, frame = cap.read()
            detected_ob = ob.detection_stream(frame)
            img_encoded = encode_base64.encode_frame_to_base64(detected_ob[0])
            is_cat_show = detected_ob[1]
            count_detected = detected_ob[2]
            time_set_eat = fb_conn.get_value_time_set_eat()
            time_after_set = fb_conn.get_time_after_eat()
            is_cat_come_eat = ob.get_frame_cat_time_eat(time_set_eat,time_after_set,is_cat_show)
            # cv2.imshow("frame", ob.detection_stream(frame)[0])
            fb_conn.upload_string_base64_to_firebase(img_encoded, is_cat_show, count_detected)
            fb_conn.upload_cat_come_to_eat(is_cat_come_eat)
            time.sleep(2)

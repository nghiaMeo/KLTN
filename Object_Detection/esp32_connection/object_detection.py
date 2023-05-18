import cv2
import numpy as np
from ultralytics import YOLO
from datetime import datetime, timedelta
import firebase_connection as fb_conn


def detection_stream(frame_iamge):
    count = 0
    model = YOLO("KLTN/Object_Detection/best.pt", "v8")
    detect_params = model.predict(
        source=[frame_iamge], conf=0.6)
    # Generate random colors for class list
    detected_result = detect_params[0]
    plotted = detected_result.plot()
    if len(detected_result.boxes) > 0:
        count = count + 1
        return [plotted, "Yes", count]
    return [plotted, "No", count]


def get_frame_cat_time_eat(time_set_eat, time_set_after_eat, frame_object_detected):
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    time_set = time_set_eat
    time_close = time_set_after_eat
    for time in range(0, 3):
        if(current_time >= time_set[time] and current_time <= time_close[time]):
            if (frame_object_detected[1] == "Yes"):
                return [current_time, "yes", False]
    return [current_time, "no cat", True]

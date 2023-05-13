import cv2
import numpy as np
from ultralytics import YOLO


def detection_stream(frame_iamge):
    model = YOLO("KLTN/Object_Detection/best.pt", "v8")
    detect_params = model.predict(
        source=[frame_iamge], conf=0.6)
    # Generate random colors for class list
    detected_result = detect_params[0]
    plotted = detected_result.plot()
    if len(detected_result.boxes) > 0:
        return [plotted, "Yes"]
    return [plotted, "No"]


import cv2
import numpy as np
from datetime import datetime, timedelta
import firebase_connection as fb_conn


def count_red_lines_in_bbox_first(image_path, time_take_picture):
    # Load ảnh và bounding box
    now = datetime.datetime.now()

    current_time = now.strftime("%H:%M")
    if(current_time == time_take_picture):

        img = cv2.imread(image_path)
        # Cắt ảnh theo bounding box
        x, y, w, h = (10, 20, 200, 900)
        img_roi = img[y:y+h, x:x+w]

        # Chuyển ảnh sang không gian màu HSV
        img_hsv = cv2.cvtColor(img_roi, cv2.COLOR_BGR2HSV)

        # Đặt ngưỡng màu đỏ
        lower_red = np.array([0, 50, 50])
        upper_red = np.array([10, 255, 255])
        mask_red1 = cv2.inRange(img_hsv, lower_red, upper_red)

        lower_red = np.array([170, 50, 50])
        upper_red = np.array([180, 255, 255])
        mask_red2 = cv2.inRange(img_hsv, lower_red, upper_red)

        mask_red = mask_red1 + mask_red2

        # Đếm số lượng vạch màu đỏ
        contours, hierarchy = cv2.findContours(
            mask_red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        count_red = len(contours)
    else:
        return "not yet"
    return count_red


def count_red_lines_in_bbox_last(img_path, time_cat_eat, time_take_picture):

    if(time_take_picture > time_cat_eat):
        img = cv2.imread(img_path)
        # Cắt ảnh theo bounding box
        x, y, w, h = (10, 20, 200, 900)
        img_roi = img[y:y+h, x:x+w]

        # Chuyển ảnh sang không gian màu HSV
        img_hsv = cv2.cvtColor(img_roi, cv2.COLOR_BGR2HSV)

        # Đặt ngưỡng màu đỏ
        lower_red = np.array([0, 50, 50])
        upper_red = np.array([10, 255, 255])
        mask_red1 = cv2.inRange(img_hsv, lower_red, upper_red)

        lower_red = np.array([170, 50, 50])
        upper_red = np.array([180, 255, 255])
        mask_red2 = cv2.inRange(img_hsv, lower_red, upper_red)

        mask_red = mask_red1 + mask_red2

        # Đếm số lượng vạch màu đỏ
        contours, hierarchy = cv2.findContours(
            mask_red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        count_red = len(contours)
    else:
        return "not yet"
    return count_red


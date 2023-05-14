import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from datetime import datetime, timedelta
import numpy as np

# Fetch the service account key JSON file contents
cred = credentials.Certificate(
    'KLTN\Object_Detection\esp32_connection\demo1-213d4-firebase-adminsdk-l0sim-120c9fbe5b.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://esp-32-connection-89b83-default-rtdb.firebaseio.com/'
})

path_time_hour = ['/HenGio/GioSang', '/HenGio/GioTrua', '/HenGio/GioChieu']
path_time_min = ['/HenGio/PhutSang', '/HenGio/PhutTrua', '/HenGio/PhutChieu']


def upload_string_base64_to_firebase(encoded_img_base64, is_cat_show, count_detected):
    ref = db.reference('/camera_stream')
    ref.set({"stream": encoded_img_base64,
            "object": is_cat_show, "count": count_detected})
    # print(ref.get())


def get_value_time_set_eat():
    time_arr = []
    for time in range(0, 3):
        ref = db.reference(path_time_hour[time])
        ref1 = db.reference(path_time_min[time])
        string_time = str(ref.get()) + ":" + str(ref1.get())
        time_obj = datetime.strptime(string_time, '%H:%M')
        formatted_time = time_obj.strftime('%H:%M')
        time_arr.append(formatted_time)
    return time_arr


def get_time_after_eat():
    time_arr = []
    for time in range(0, 3):
        new_time = (datetime.combine(datetime.min, datetime.strptime(
            get_value_time_set_eat()[time], '%H:%M').time()) + timedelta(minutes=10)).time()
        time_str_new = new_time.strftime('%H:%M')
        time_arr.append(time_str_new)
    return time_arr


def upload_cat_come_to_eat(is_cat_come_eat):
    value = is_cat_come_eat[1]
    path = is_cat_come_eat[0]
    ref = db.reference('/cat_eat/' + path)
    if(value == "cat come to eat"):
        ref.set({"come": value})

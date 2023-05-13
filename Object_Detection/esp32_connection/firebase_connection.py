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


def upload_string_base64_to_firebase(encoded_img_base64, is_cat_show):
    ref = db.reference('/camera_stream')
    ref.set({"stream": encoded_img_base64, "object": is_cat_show})
    print(ref.get())


def get_value_time_set_eat():
    ref = db.reference('/HenGio/Gio')
    ref1 = db.reference('/HenGio/Phut')
    string_time = str(ref.get()) + ":" + str(ref1.get())
    return string_time


def get_time_after_eat():
    new_time = (datetime.combine(datetime.min, datetime.strptime(get_value_time_set_eat(), '%H:%M').time()) + timedelta(minutes=10)).time()
    time_str_new = new_time.strftime('%H:%M')
    return time_str_new



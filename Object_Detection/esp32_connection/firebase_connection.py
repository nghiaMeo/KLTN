import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import numpy as np
# Fetch the service account key JSON file contents
cred = credentials.Certificate(
    'KLTN\Object_Detection\esp32_connection\demo1-213d4-firebase-adminsdk-l0sim-120c9fbe5b.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://test1111-78acb-default-rtdb.firebaseio.com/'
})


def upload_string_base64_to_firebase(encoded_img_base64, is_cat_show):
    ref = db.reference('/camera_stream')
    ref.set({"stream": encoded_img_base64, "object": is_cat_show})
    print(ref.get())


def get_value_time():
    ref = db.reference('/setTime')
    return ref.get()    
    

# my_dict = get_value_time().
# my_array = np.array(list(my_dict.values()))
# print(type(get_value_time()))
import cv2
import time
import os
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

# Initialize Firebase app and storage
cred = credentials.Certificate("Key.json")
firebase_admin.initialize_app(cred, {"storageBucket": "demo1-213d4.appspot.com"})
bucket = storage.bucket()

class Camera:
    def __init__(self, camera_id=0):
        self.camera = cv2.VideoCapture(camera_id)

    def capture_images(self, duration=10, interval=5, folder_name=datetime.datetime.now().strftime('%Y-%m-%d-%H-%M')):
        # Create folder in Firebase Storage
        folder_blob = bucket.blob(folder_name + "/")
        folder_blob.upload_from_string("")

        # Capture images for specified duration and interval
        start_time = time.time()
        while (time.time() - start_time) < duration:
            # Capture image
            ret, frame = self.camera.read()

            # Create file name
            current_time = time.strftime("%H-%M-%S")
            file_name = current_time + ".jpg"
            x = file_name
            # Save image temporarily
            cv2.imwrite(file_name, frame)

            # Upload image to Firebase Storage
            blob = bucket.blob(folder_name + "/" + file_name)
            blob.upload_from_filename(file_name)

            # Delete temporary image file
            os.remove(x)

            # Wait for specified interval before capturing next image
            time.sleep(interval)

        # Release camera
        self.camera.release()

cam = Camera()
cam.capture_images()

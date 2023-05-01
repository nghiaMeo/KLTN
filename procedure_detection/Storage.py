import os
from datetime import datetime
from firebase_admin import credentials, storage, initialize_app
from Camera import Camera

class Storage:
    
    def __init__(self, cred_path="Key.json"):
        self.cred = credentials.Certificate(cred_path)
        self.app = initialize_app(self.cred, {"storageBucket": "demo1-213d4.appspot.com"})
        self.bucket = storage.bucket(app=self.app)
    
    def upload_photo_from_camera(self):
        # Create a Camera object and call the capture_images method
        camera = Camera()
        folder_path = camera.capture_images()
        # Get base folder name and current date
        base_folder_name = os.path.basename(folder_path)
        current_date = datetime.now().strftime("%Y-%m-%d")
        storage_folder_name = f"{base_folder_name}_{current_date}"

        # Create a blob for the folder with the specified name
        folder_blob = self.bucket.blob(storage_folder_name + "/")

        # Upload each file in the folder
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                blob = folder_blob.child(file)
                blob.upload_from_filename(file_path)

        # Delete the local folder
        os.system(f"rm -r {folder_path}")

storage = Storage()
storage.upload_photo_from_camera()

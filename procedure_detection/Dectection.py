from firebase_admin import credentials, storage
from datetime import datetime
import numpy as np
from ultralytics import YOLO
import firebase_admin
from firebase_admin import credentials, storage
import os
import cv2


cred = credentials.Certificate("Key.json")
firebase_admin.initialize_app(cred, {"storageBucket": "demo1-213d4.appspot.com"})
bucket = storage.bucket()

class Detection:
    
    def __init__(self):
        self.model = YOLO("root.pt", "v8")
        self.detection_colors = []
        for i in range(len(self.model.names)):
            r = np.random.randint(0, 255)
            g = np.random.randint(0, 255)
            b = np.random.randint(0, 255)
            self.detection_colors.append((b, g, r))
            
    def download_folder_from_firebase(self):     
        # Lấy danh sách tất cả các folder trong bucket
        blobs = bucket.list_blobs(prefix='', delimiter=None)
        # Tạo một danh sách các folder và thời gian tương ứng

        folders = []
        for blob in blobs:
            if blob.name.endswith('/'):
                folder_name = blob.name[:-1]  # Bỏ đi ký tự '/'
                try:
                    folder_datetime = datetime.strptime(folder_name,'%Y-%m-%d-%H-%M')
                    folders.append((folder_datetime, folder_name))
                except ValueError:
                    pass  # Nếu folder_name không phải là ngày giờ, bỏ qua nó

        # Sắp xếp danh sách các folder theo thứ tự giảm dần
        folders.sort(reverse=True)

        # Nếu danh sách folder không rỗng, lấy folder đầu tiên trong danh sách (tức là folder có thời gian lớn nhất)
        if len(folders) > 0:
            latest_folder = folders[0][1]

            # Kiểm tra xem thư mục đã tồn tại chưa
            if not os.path.exists(latest_folder):
                # Nếu chưa, tạo thư mục mới
                os.makedirs(latest_folder)

            # Tải xuống tất cả các tệp tin trong thư mục
            blobs = bucket.list_blobs(prefix=latest_folder)
            for blob in blobs:
                if not blob.name.endswith('/'):  # chỉ tải về các tệp tin trong thư mục
                    blob.download_to_filename(os.path.join(latest_folder, os.path.basename(blob.name)))
        return latest_folder    
    
    def object_detection_img_from_folder(self):

        frame = cv2.imread('temp.jpg')

        # Predict on image
        detect_params = self.model.predict(source=[frame], conf=0.45, save=False)

        # Convert tensor array to numpy
        DP = detect_params[0].numpy()
        if len(DP) != 0:
            for i in range(len(detect_params[0])):
                boxes = detect_params[0].boxes
                box = boxes[i]
                clsID = box.cls.numpy()[0]
                conf = box.conf.numpy()[0]
                bb = box.xyxy.numpy()[0]

                if self.model.names[int(clsID)] == 'cat':
                    cv2.rectangle(
                        frame,
                        (int(bb[0]), int(bb[1])),
                        (int(bb[2]), int(bb[3])),
                        self.detection_colors[int(clsID)],
                        3,
                    )

                    # Display class name and confidence
                    font = cv2.FONT_HERSHEY_COMPLEX
                    cv2.putText(
                        frame,
                        self.model.names[int(clsID)] + " " + str(round(conf, 3)) + "%",
                        (int(bb[0]), int(bb[1]) - 10),
                        font,
                        1,
                        (255, 255, 255),
                        2,
                    )

                    return "YES"
        return "NO"
            


    




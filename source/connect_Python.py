import firebase_admin
from firebase_admin import credentials, storage
import cv2
import numpy as np
import os
from ultralytics import YOLO

# Initialize Firebase app
cred = credentials.Certificate("Key.json")
firebase_admin.initialize_app(cred, {"storageBucket": "demo1-213d4.appspot.com"})
bucket = storage.bucket()

# Download all images from Firebase Storage with the same name
def download_images_from_storage(image_dir):
    blobs = bucket.list_blobs(prefix=image_dir)
    for blob in blobs:
        if blob.name.lower().endswith((".jpg", ".png",".jpeg")):
            blob.download_to_filename(blob.name)

# Run detection on image
def detection_img(image_path):
    model = YOLO("root.pt", "v8")

    # Generate random colors for class list
    detection_colors = []
    for i in range(len(model.names)):
        r = np.random.randint(0, 255)
        g = np.random.randint(0, 255)
        b = np.random.randint(0, 255)
        detection_colors.append((b, g, r))

    # Load image
    frame = cv2.imread(image_path)

    # Predict on image
    detect_params = model.predict(source=[frame], conf=0.45, save=False)

    # Convert tensor array to numpy
    DP = detect_params[0].numpy()

    if len(DP) != 0:
        for i in range(len(detect_params[0])):
            boxes = detect_params[0].boxes
            box = boxes[i]
            clsID = box.cls.numpy()[0]
            conf = box.conf.numpy()[0]
            bb = box.xyxy.numpy()[0]

            if model.names[int(clsID)] == 'cat':
                cv2.rectangle(
                    frame,
                    (int(bb[0]), int(bb[1])),
                    (int(bb[2]), int(bb[3])),
                    detection_colors[int(clsID)],
                    3,
                )

                # Display class name and confidence
                font = cv2.FONT_HERSHEY_COMPLEX
                cv2.putText(
                    frame,
                    model.names[int(clsID)] + " " + str(round(conf, 3)) + "%",
                    (int(bb[0]), int(bb[1]) - 10),
                    font,
                    1,
                    (255, 255, 255),
                    2,
                )   

                print("Có mèo trong ảnh.")
    else:
        print("Không có mèo trong ảnh.")

    # Save image with bounding boxes and labels
    cv2.imwrite("weights/" + os.path.basename(image_path), frame)

# Download all images in the "Camera" directory from Firebase Storage
image_dir = "Camera"
download_images_from_storage(image_dir)
for image_file in os.listdir(image_dir):
    if image_file.endswith(".jpg") or image_file.endswith(".JPG") or image_file.endswith(".png"):
        image_path = os.path.join(image_dir, image_file)
        detection_img(image_path)
import cv2
import numpy as np
import os
from ultralytics import YOLO

def detection_img(image_path):
    model = YOLO("../weights200/best.pt", "v8")

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

            if model.names[int(clsID)] == 'Cats':
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
    cv2.imwrite("images/" + os.path.basename(image_path), frame)

# Loop through all images in the directory
image_dir = "Camera/"
for file_name in os.listdir(image_dir):
    if blob.name.lower().endswith((".jpg", ".png",".jpeg")):
        image_path = os.path.join(image_dir, file_name)
        detection_img(image_path)


import cv2
import numpy as np
import os
from ultralytics import YOLO


model = YOLO("KLTN/Object_Detection/best.pt", "v8")

# Generate random colors for class list
detection_colors = []
for i in range(len(model.names)):
    r = np.random.randint(0, 255)
    g = np.random.randint(0, 255)
    b = np.random.randint(0, 255)
    detection_colors.append((b, g, r))

# Define directory path containing images
image_dir = "KLTN/image"
# Get list of all image files in the directory
image_files = os.listdir(image_dir)

for image_file in image_files:
    # Load image
    image_path = os.path.join(image_dir, image_file)
    frame = cv2.imread(image_path)

    # Predict on image
    detect_params = model.predict(source=[frame], conf=0.45, save=False)

    # Convert tensor array to numpy
    DP = detect_params[0].numpy()

    if len(DP) != 0:
        found_cat = False
        for i in range(len(detect_params[0])):
            boxes = detect_params[0].boxes
            box = boxes[i]
            clsID = box.cls.numpy()[0]
            conf = box.conf.numpy()[0]
            bb = box.xyxy.numpy()[0]

            if model.names[int(clsID)] == "Cats":
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

                found_cat = True

        # Display the resulting frame
        frame = cv2.resize(frame, (640, 640))
        cv2.imshow("ObjectDetection", frame)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        if found_cat:
            print(f"{image_file}: Found cat!")
        else:
            print(f"{image_file}: No cat detected.")
    else:
        print(f"{image_file}: No objects detected.")

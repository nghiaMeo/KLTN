import cv2
import numpy as np
from ultralytics import YOLO

# opening the file in read mode
my_file = open("./coco.txt", "r")
# reading the file
data = my_file.read()
# replacing end splitting the text | when newline ('\n') is seen.
class_list = data.split("\n")
my_file.close()

# print(class_list)

# Generate random colors for class list
detection_colors = []
for i in range(len(class_list)):
    r = np.random.randint(0, 255)
    g = np.random.randint(0, 255)
    b = np.random.randint(0, 255)
    detection_colors.append((b, g, r))

model = YOLO("./weights200/best.pt", "v8")

# Load image
frame = cv2.imread('./Test/tes.png')

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
            class_list[int(clsID)] + " " + str(round(conf, 3)) + "%",
            (int(bb[0]), int(bb[1]) - 10),
            font,
            1,
            (255, 255, 255),
            2,
        )

# Display the resulting frame
frame = cv2.resize(frame, (1400, 800))
cv2.imshow("ObjectDetection", frame)
cv2.waitKey(0)
cv2.destroyAllWindows()

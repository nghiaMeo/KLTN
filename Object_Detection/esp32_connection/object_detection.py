import cv2
import numpy as np
from ultralytics import YOLO


def detection_stream(frame_iamge):
    model = YOLO("Object_Detection/best.pt", "v8")

    # Generate random colors for class list
    detection_colors = []
    for i in range(len(model.names)):
        r = np.random.randint(0, 255)
        g = np.random.randint(0, 255)
        b = np.random.randint(0, 255)
        detection_colors.append((b, g, r))
        detect_params = model.predict(
            source=[frame_iamge], conf=0.45, save=False)

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
                        frame_iamge,
                        (int(bb[0]), int(bb[1])),
                        (int(bb[2]), int(bb[3])),
                        detection_colors[int(clsID)],
                        3,
                    )

                    # Display class name and confidence
                    font = cv2.FONT_HERSHEY_COMPLEX
                    cv2.putText(
                        frame_iamge,
                        model.names[int(clsID)] + " " +
                        str(round(conf, 3)) + "%",
                        (int(bb[0]), int(bb[1]) - 10),
                        font,
                        1,
                        (255, 255, 255),
                        2,
                    )
        return frame_iamge

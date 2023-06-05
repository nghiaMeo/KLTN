import cv2
import numpy as np
import os
from ultralytics import YOLO


model = YOLO("KLTN/Object_Detection/best.pt", "v8")


# Define directory path containing images
image_dir = "KLTN\image"
# Get list of all image files in the directory
image_files = os.listdir(image_dir)


    # Predict on image
detect_params = model.predict(
        source="KLTN\image\s.jpg", conf=0.6, save=True)
    # Generate random colors for class list
detected_result = detect_params[0]
plotted = detected_result.plot()
    # Convert tensor array to numpy

plotted = cv2.resize(plotted, (800, 800))
cv2.imshow("ObjectDetection", plotted)
cv2.waitKey(0)
cv2.destroyAllWindows()
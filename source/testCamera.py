from ultralytics import YOLO
from ultralytics.yolo.v8.detect.predict import DetectionPredictor
import cv2



model = YOLO('Object_Detection/weights-250ep/last.pt')
results = model.predict(source='0', show=True)
print(results)

cv2.destroyWindow('preview')

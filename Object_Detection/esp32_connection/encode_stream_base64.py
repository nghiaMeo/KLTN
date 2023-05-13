import cv2
import base64
from PIL import Image


def encode_frame_to_base64(frame):
    # Encode frame as JPEG i
    jpg_img = cv2.imencode('.jpg', frame)
    b64_string = base64.b64encode(jpg_img[1]).decode('utf-8')
    return b64_string


import cv2
import base64


def encode_frame_to_base64(frame):
    # Encode frame as JPEG image
    success, buffer = cv2.imencode('.jpg', frame)
    if not success:
        return ""

    # Encode JPEG image as base64 string
    frame_base64 = base64.b64encode(buffer).decode('utf-8')

    return frame_base64

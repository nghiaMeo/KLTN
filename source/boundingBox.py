import cv2

# Load ảnh vào biến img
img = cv2.imread('./Inkedhinhtru.jpg')

# Vị trí của bounding box
x = 130
y = 110
w = 80
h = 190

# Cắt ảnh để lấy bounding box
roi = img[y:y+h, x:x+w]

# Chuyển đổi ảnh sang ảnh xám và áp dụng threshold để tìm vạch đen
gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
_, thresholded_roi = cv2.threshold(gray_roi, 0, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)

# Tìm contours
contours, _ = cv2.findContours(thresholded_roi, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Lấy contour có diện tích lớn nhất
largest_contour = max(contours, key=cv2.contourArea)

# Tính tọa độ y của điểm trung tâm của contour
M = cv2.moments(largest_contour)
center_y = int(M['m01'] / M['m00'])

# Tính khoảng cách từ tọa độ y này đến đáy của bounding box
distance_to_base = h - center_y

print('Khoảng cách từ đáy bounding box đến vạch đen:', distance_to_base)
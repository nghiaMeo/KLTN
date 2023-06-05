import os
import numpy as np

# Truyền đường dẫn thư mục chứa nhãn thực tế và dự đoán
predicted_folder = "/content/drive/MyDrive/KLTN_Detecting_Tomato/yolov8/runs/detect/predict3/labels"
true_folder = "/content/drive/MyDrive/KLTN_Detecting_Tomato/Data/tomato_data_3O/test/labels"

iou_threshold = 0.5

def count_tp_tn_fp_fn(gt_folder, pred_folder, iou_threshold):
    tp = 0
    tn = 0
    fp = 0
    fn = 0

    gt_files = os.listdir(gt_folder)
    pred_files = os.listdir(pred_folder)
    count =0
    count1= 0
    for gt_file in gt_files:
        print(gt_file)
        if gt_file.endswith(".txt"):
            pred_file = os.path.join(pred_folder, gt_file)
            if os.path.exists(pred_file):
                with open(os.path.join(gt_folder, gt_file), "r") as f1, open(pred_file, "r") as f2:
                    gt_lines = f1.readlines()
                    pred_lines = f2.readlines()
                    gt_boxes = [line.strip().split() for line in gt_lines]
                    pred_boxes = [line.strip().split() for line in pred_lines]
                    count1+=len(pred_boxes)
                    count+=len(gt_boxes)
                    
                    gt_matched = [False] * len(gt_boxes)
                    pred_matched = [False] * len(pred_boxes)

                    for i, gt_box in enumerate(gt_boxes):
                        
                        for j, pred_box in enumerate(pred_boxes):
                            iou = calculate_iou(gt_box, pred_box)
                            if iou >= iou_threshold:
                                tp += 1
                                gt_matched[i] = True 
                                pred_matched[j] = True
                                break
                        else:
                            fn += 1

                    for i, pred_box in enumerate(pred_boxes):
                        if not pred_matched[i]:
                            fp += 1

                    # for i, gt_box in enumerate(gt_boxes):
                    #     if not gt_matched[i]:
                    #         tn += 1

            else:
                fn += len(gt_boxes)

    return tp, fp, fn, count, count1

def calculate_iou(box1, box2):
    a, x1, y1, w1, h1 = map(float, box1)
    b, x2, y2, w2, h2 = map(float, box2)

    area1 = w1 * h1
    area2 = w2 * h2

    intersection_x1 = max(x1 - w1 / 2, x2 - w2 / 2)
    intersection_y1 = max(y1 - h1 / 2, y2 - h2 / 2)
    intersection_x2 = min(x1 + w1 / 2, x2 + w2 / 2)
    intersection_y2 = min(y1 + h1 / 2, y2 + h2 / 2)

    intersection_w = max(0.0, intersection_x2 - intersection_x1)
    intersection_h = max(0.0, intersection_y2 - intersection_y1)

    intersection_area = intersection_w * intersection_h

    union_area = area1 + area2 - intersection_area

    iou = intersection_area / union_area if union_area > 0 else 0

    return iou


tp, fp, fn, count, b = count_tp_tn_fp_fn(true_folder, predicted_folder, iou_threshold)

print('total:', count)
print('predict', b)
print('True Position: ', tp)
print('False Position: ', fp)
print('False Nagative', fn)
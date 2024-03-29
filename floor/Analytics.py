import json
import cv2
import base64


def HeatMap(invoice_file = None, SKU_Storage_file = None, Floor_Map_Path = None):
   invoice_data = invoice_file
   SKU_Storage_file = open(SKU_Storage_file)
   SKU_storage_data = json.load(SKU_Storage_file)
   image = cv2.imread(Floor_Map_Path)
   originalH, originalW, _ = image.shape
   canvasH, canvasW =  SKU_storage_data['canvasDimensions']['height'], SKU_storage_data['canvasDimensions']['width']
   ratioH, ratioW  = (originalH / canvasH) , (originalW / canvasW)
   # image = cv2.resize(image, (SKU_storage_data['canvasDimensions']['width'], SKU_storage_data['canvasDimensions']['height']))
   # # Saving and sending heatmap data in JSON format
   # if invoice_data:
   #  Output_JSON = invoice_data

   for idx, (IV, SKU) in enumerate(zip(invoice_data['details'], SKU_storage_data['details'])):
      if IV['areaNumber'] == SKU['areaNumber']:
         if 'quantityR' in IV.keys():
            HM_Ratio = int(IV['quantityR']) / int(SKU['quantity'])
         else:
            HM_Ratio = 0
         x1, y1, w, h = int(SKU['x0']), int(SKU['y0']), int(SKU['x1']), int(SKU['y1'])
         x1, y1, x2, y2 = int(x1 * ratioW), int(y1 * ratioH), int((x1 + w) * ratioW), int((y1 + h) * ratioH)
         cv2.rectangle(image, (x1, y1), (x2, y2), (0,255, 255), 2)

         # Getting Mid-Point of a rectangle
         CX, CY = int((x1 + x2) / 2), int((y1 + y2) / 2)
         # Getting Perimeter of Rectangle
         P = y2 - CY
         print()
         if HM_Ratio:
            cv2.circle(image, (CX, CY), int(P * HM_Ratio), (255, 0, 255), -1)
            cv2.putText(image, "Category: %s " % IV['areaNumber'],
                     (x2, CY), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 0, 255), thickness=1)
            # cv2.putText(image,
                        # "Quantity Selected: %s (percentage)" % str(int(HM_Ratio * 100)),
                        # (x2, y1 + 35), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 0, 255), thickness=1)
         else:
            cv2.circle(image, (CX, CY), int(P * HM_Ratio), (255, 0, 255), -1)
            cv2.putText(image, "Category: %s " % IV['areaNumber'],
                        (x2, CY), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 0, 255), thickness=1)
            # cv2.putText(image,
            #             "Quantity Selected: %s (percentage)" % str(int(HM_Ratio * 100)),
            #             (x2, y1 + 35), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 0, 255), thickness=1)
      else:
         continue

   cv2.imwrite("Output.jpeg", image)
   with open("Output.jpeg", "rb") as image2string:
      encoded_image = base64.b64encode(image2string.read())
   # cv2.imshow("result", image)
   # cv2.waitKey(0)
   return encoded_image

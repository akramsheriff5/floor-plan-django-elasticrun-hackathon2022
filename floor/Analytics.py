import json
import cv2

def HeatMap(invoice_file = None, SKU_Storage_file = None, Floor_Map_Path = None):
   invoice_data = json.load(invoice_file)
   SKU_storage_data = json.load(SKU_Storage_file)
   image = cv2.imread(Floor_Map_Path)
   assert image, "Floor Plan Loading Failed"

   # # Saving and sending heatmap data in JSON format
   # if invoice_data:
   #  Output_JSON = invoice_data

   for idx, (IV, SKU) in enumerate(zip(invoice_data['details'], SKU_storage_data['details'])):
      if IV['Category'] == SKU['Category']:
         HM_Ratio = int(IV['Quantity']) / int(SKU['Quantity'])
         x1, y1, x2, y2 = SKU['X0'], SKU['Y0'], SKU['X1'], SKU['Y1']
         # Getting Mid-Point of a rectangle
         CX, CY = int((x1 + x2) / 2), int((y1 + y2) / 2)
         # Getting Perimeter of Rectangle
         P = y2 - CY
         if HM_Ratio:
            cv2.circle(image, (CX, CY), int(P * HM_Ratio), (255, 0, 255), -1)
            cv2.putText(image, "Category: %s, Quantity Selected: %s (percentage)" % (IV['Category'], str(HM_Ratio * 100)),
                     (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), thickness=3)
         else:
            cv2.circle(image, (CX, CY), int(P * HM_Ratio), (255, 0, 255), -1)
            cv2.putText(image,
                     "Category: %s, Quantity Selected: %s (percentage)" % (IV['Category'], str(HM_Ratio * 100)),
                     (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), thickness=3)
      else:
         continue

   #
   # json_object = json.dumps(Output_JSON, indent=4)
   #
   # with open("output.json", "w") as f:
   #  f.write(json_object)
   return image
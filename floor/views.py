from functools import total_ordering
from django.shortcuts import render
import json , os

from django.http.response import JsonResponse
import glob

from django.core.files.storage import FileSystemStorage
from .Analytics import HeatMap

# Create your views here.

def index(request):
    return render(request,'index.html')

def blog(request):
    return render (request, 'blog.html')

def blog_single (request):
    return render(request,'blog-single.html')

def portfolio (request):
    return render(request, 'portfolio-details.html')

def upload (request):
    return render(request, 'upload.html')

def invoice (request):
    return render(request, 'invoice.html')

import base64

def jsonWriter(request):
    # print(request.POST,":::::::::::::")
    floorname = request.POST['floorname']
    totalJSON = json.loads(request.POST['json'])
    img_data = request.POST['img']
    decodeit = open(os.getcwd()+ '/floor/floor-image/{}.jpeg'.format(floorname), 'wb')
    decodeit.write(base64.b64decode(img_data))

    # with open(os.getcwd()+ '/floor/floor-image/{}.png'.format(floorname), "wb") as fh:
    #     fh.write(base64.b64encode(img_data.encode('utf-8')))
    with open(os.getcwd()+ '/floor/floor-data/{}.json'.format(floorname), 'w') as outfile:
        json.dump(totalJSON, outfile)

    return JsonResponse(totalJSON)


# print(os.getcwd()+ '/floor/floor-data/',"::::::::")
def table (request):
    return render(request, 'table.html')


def readFloor(request):
    result = []
    if  glob.glob(os.getcwd()+ "/floor/floor-data/*.json"):
        for json_file in glob.glob(os.getcwd()+ "/floor/floor-data/*.json"):
            print(json_file,"?>>>>")
            if "\\"  in json_file:
                json_file = json_file.replace("\\", "/")
                json_file = json_file.replace("\\", "/")
            extension = json_file.split("/")[-1]
            print(extension,"::::::::::::::::::")
            file_name = extension.split(".")[0]
            #Reading Json file
            file = open(json_file)
            data = json.load(file)
            result.append({file_name:data})
    else:
        result= []
    return JsonResponse(result,safe=False)
  
# print(glob.glob(os.getcwd()+ "/floor/floor-data/*.json"))

def uploadInvoice(request):
    invoiceQuantity = json.loads(request.POST['invoice'])
    floor_name =request.POST['floorname']
    # for loading json
    SKU_Json_Path = None
    image_path = None
    for file in glob.glob(os.getcwd()+ "/floor/floor-data/*.json"):
        if "\\" in file:
            file = file.replace("\\", "/")
            file = file.replace("\\", "/")
        ext = file.split('/')[-1]
        nameOfFile = ext.split('.')[0]
        if nameOfFile == floor_name:
            SKU_Json_Path = file
        else:
            continue
    for image in glob.glob(os.getcwd()+"/floor/floor-image/*.jpeg"):
        if "\\" in image:
            image = image.replace("\\", "/")
            image = image.replace("\\", "/")
        img_ext = image.split('/')[-1]
        nameOfimage = img_ext.split('.')[0]
        if nameOfimage == floor_name:
            image_path = image
        else:
            continue
    res = HeatMap(invoiceQuantity, SKU_Json_Path, image_path)
    return JsonResponse({'res':res.decode("utf-8")},safe=False)



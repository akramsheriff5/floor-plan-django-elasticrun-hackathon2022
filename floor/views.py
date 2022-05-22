from functools import total_ordering
from django.shortcuts import render
import json , os

from django.http.response import JsonResponse
import glob

from django.core.files.storage import FileSystemStorage
from .Analytics import hetmap

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
            # if "//" in json_file:
            #     extension = json_file.split("//")[-1]
            # else:
            #     extension = json_file.split("\\")[-1]
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
    print(invoiceQuantity)
    hetmap()

    return JsonResponse(invoiceQuantity,safe=False)
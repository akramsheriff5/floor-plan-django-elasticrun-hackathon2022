from functools import total_ordering
from django.shortcuts import render
import json , os

from django.http.response import JsonResponse


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


def jsonWriter(request):
    print(request.POST,":::::::::::::")
    floorname = request.POST['floorname']
    totalJSON = json.loads(request.POST['json'])
    print(floorname,totalJSON,)
    with open(os.getcwd()+ '/floor/floor-data/{}.json'.format(floorname), 'w') as outfile:
        json.dump(totalJSON, outfile)

    return JsonResponse(totalJSON)


print(os.getcwd()+ '/floor/floor-data/',"::::::::")
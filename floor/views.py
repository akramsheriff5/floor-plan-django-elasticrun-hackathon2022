from django.shortcuts import render


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
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('blog', views.blog, name='blog'),
    path('blog_single', views.blog_single, name='blog_single'),
    path('portfolio', views.portfolio, name='portfolio'),
    path('upload', views.upload, name='upload'),
    path('invoice', views.invoice, name='invoice'),
    path('table', views.table, name='table')

]


from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('feed/', views.getFeed, name="feed"),
    path('feed/<str:pk>', views.getTrxn, name="trxn"),

]
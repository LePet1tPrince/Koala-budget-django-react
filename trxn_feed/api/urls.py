from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('feed/', views.getFeed, name="feed"),
    # path('feed/create', views.createTrxn, name="post-trxn"),
    path('feed/<str:pk>/update', views.updateTrxn, name="update-trxn"),
    path('feed/<str:pk>/delete', views.deleteTrxn, name="delete-trxn"),

    path('feed/<str:pk>', views.getTrxn, name="trxn"),

    path('accounts/', views.getAccounts, name="accounts"),
    path('accounts/<str:pk>', views.getAccount, name="account"),
    path('accounts/<str:pk>/update', views.updateAccount, name="update-account"),

    path('goals/', views.getGoals, name="goals"),
    path('dashboard/', views.getDashboard, name="dashboard"),
    path('test/', views.test, name="test"),




]
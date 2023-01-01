from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trxn, Account, Goal, Budget
from .serializers import TrxnSerializer, AccountSerializer, GoalSerializer, BudgetSerializer
from .dashboard import calculate
# from api import serializers


@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/feed/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of transactions'
        },
        {
            'Endpoint': '/feed/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single transaction object'
        },
        {
            'Endpoint': '/feed/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new transaction with data sent in post request'
        },
        {
            'Endpoint': '/feed/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing transaction with data sent in post request'
        },
        {
            'Endpoint': '/feed/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and existing transaction'
        },
    ]
    return Response(routes)

#transaction feed
@api_view(['GET'])
def getFeed(request):
    feed = Trxn.objects.all() 
    serializer = TrxnSerializer(feed, many=True)
    return Response(serializer.data)

#single transaction
@api_view(['GET'])
def getTrxn(request, pk):
    trxn = Trxn.objects.get(id=pk) 
    serializer = TrxnSerializer(trxn, many=False)
    return Response(serializer.data)

#Accounts feed
@api_view(['GET'])
def getAccounts(request):
    feed = Account.objects.all() 
    serializer = AccountSerializer(feed, many=True)
    return Response(serializer.data)

#single account
@api_view(['GET'])
def getAccount(request, pk):
    account = Account.objects.get(id=pk) 
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)

#Goals View
@api_view(['GET'])
def getGoals(request):
    goals = Goal.objects.all() 
    serializer = GoalSerializer(goals, many=True)
    return Response(serializer.data)

#update transaction
@api_view(['PUT'])
def updateTrxn(request, pk):
    data = request.data
    trxn = Trxn.objects.get(id=pk)
    serlializer = TrxnSerializer(instance=trxn, data=data)
    if serlializer.is_valid():
        serlializer.save()
    
    return Response(serlializer.data)


#update transaction
@api_view(['POST'])
def CreateTrxn(request):
    data = request.data
    trxn = Trxn.objects.create(
        date = data['date'],
        account = data['account'],
        amount = data['amount'],
        category = data['category'],
        notes = data['notes'],
    )
    serlializer = TrxnSerializer(trxn, data=data)
    return Response(serlializer.data)


@api_view(['GET'])
def getDashboard(request):
    return Response(calculate())

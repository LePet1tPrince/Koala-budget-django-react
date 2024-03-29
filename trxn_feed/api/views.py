from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from .models import Trxn, Account, Goal, Budget
from .serializers import TrxnSerializer, AccountSerializer, GoalSerializer, BudgetSerializer
from .dashboard import DashboardAPI
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
        {
            'Endpoint': '/accounts/',
            'method': 'GET',
            'body': None,
            'description': 'Retrieve list of accounts'
        },
        {
            'Endpoint': '/accounts/id',
            'method': 'accounts',
            'body': None,
            'description': 'Retreives single account for viewing'
        },
        {
            'Endpoint': '/accounts/id/update',
            'method': 'PUT',
            'body': None,
            'description': 'Update Account'
        },
        {
            'Endpoint': '/accounts/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and existing transaction'
        },
        {
            'Endpoint': '/goals/',
            'method': 'GET',
            'body': None,
            'description': 'Fetch list of goal transactions'
        },
        {
            'Endpoint': '/dashboard/startdate_enddate',
            'method': 'GET',
            'body': None,
            'description': 'Returns data to populate chart data based on start date and end date'
        },
        {
            'Endpoint': '/budget/',
            'method': 'GET',
            'body': None,
            'description': 'Return budget data'
        },
        {
            'Endpoint': '/budget/year',
            'method': 'GET',
            'body': None,
            'description': 'Return budget data for a specific year'
        },
        {
            'Endpoint': '/budget/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'Delete a budget (I dont think this is still active, it will just update to 0)'
        },
        {
            'Endpoint': '/budget/id/update',
            'method': 'PUT',
            'body': None,
            'description': 'Update a budget'
        }


    ]
    return Response(routes)


##TRXNS
#transaction feed
@api_view(['GET', 'POST'])
def getTrxns(request):
    if request.method == "GET":
        trxns = Trxn.objects.all() 
        serializer = TrxnSerializer(trxns, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        data = request.data
        trxn = Trxn.objects.create(
            id=data['id'],
            date=data['date'],
            toAccount=Account.objects.get(pk=int(data['toAccount'])),
            # toAccount=data['toAccount'],
            amount=data['amount'],
            fromAccount=Account.objects.get(pk=int(data['fromAccount'])),
            # fromAccount=data['fromAccount'],

            notes=data['notes'],
        )
        serializer = TrxnSerializer(trxn, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#filtered list
@api_view(['GET'])
def getFilteredTrxns(request, id):
    if request.method == "GET":
        trxns = Trxn.objects.filter(toAccount=id) | Trxn.objects.filter(fromAccount=id)
        serializer = TrxnSerializer(trxns, many=True)
        return Response(serializer.data)

#single transaction
@api_view(['GET'])
def getTrxn(request, pk):
    trxn = Trxn.objects.get(id=pk) 
    serializer = TrxnSerializer(trxn, many=False)
    return Response(serializer.data)

#update transaction
@api_view(['PUT'])
# @csrf_protect
def updateTrxn(request, pk):
    trxn = get_object_or_404(Trxn, pk=pk)
    data = request.data
    trxn.date = data['date']
    # trxn.toAccount = Account.objects.get(pk=int(data['toAccount']))
    trxn.toAccount = Account.objects.get(name=data['toAccount'])
    trxn.amount = data['amount']
    # trxn.fromAccount = Account.objects.get(pk=int(data['fromAccount']))
    trxn.fromAccount = Account.objects.get(name=data['fromAccount'])
    trxn.notes = data['notes']
    trxn.save()
    serializer = TrxnSerializer(instance=trxn, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

@api_view(['DELETE'])
def deleteTrxn(request, pk):
    trxn = get_object_or_404(Trxn, pk=pk)
    trxn.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

##ACCOUNTS

#Accounts feed
@api_view(['GET', 'POST'])
def getAccounts(request):
    if request.method == "GET":
        feed = Account.objects.all() 
        serializer = AccountSerializer(feed, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
# @csrf_protect
def updateAccount(request, pk):
    data = request.data
    account = Account.objects.get(id=pk)
    serliazer = AccountSerializer(instance=account, data=data)
    if serliazer.is_valid():
        serliazer.save()
    return Response(serliazer.data)

@api_view(['DELETE'])
def deleteAccount(request, pk):
    account = get_object_or_404(Account, pk=pk)
    account.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


#single account
@api_view(['GET'])
def getAccount(request, pk):
    account = Account.objects.get(id=pk) 
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)


##GOALS###

#Goals View
@api_view(['GET'])
def getGoals(request):
    goals = Goal.objects.all() 
    serializer = GoalSerializer(goals, many=True)
    return Response(serializer.data)



## BUDGET##

@api_view(['GET', 'POST'])
def getBudget(request):
    if request.method == "GET":
        budgets = Budget.objects.all()
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        data = request.data
        budget = Budget.objects.create(
            id=data['id'],
            month=data['month'],
            year=data['year'],
            target=data['target'],
            category=Account.objects.get(pk=int(data['category']))
        )
        serializer = BudgetSerializer(budget, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET'])
def getBudgetByYear(request, yr):
    budgets = Budget.objects.filter(year = yr)
    serializer = BudgetSerializer(budgets, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def updateBudget(request, pk):
    budget = get_object_or_404(Budget, pk=pk)
    data = request.data
    budget.target=float(data['target'])
    budget.save()
    serializer = BudgetSerializer(budget, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteBudget(request, pk):
    budget = get_object_or_404(Budget, pk=pk)
    budget.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


##DASHBOARD###

@api_view(['GET'])
def getDashboard(request, st_dt, end_dt):
    return Response(DashboardAPI(st_dt, end_dt))

@api_view(['GET'])
def test(request):
    trxn = get_object_or_404(Trxn, pk=3)
    acc1 = Account.objects.get(pk=trxn.toAccount)
    return Response(str(acc1))

# #update transaction
# @api_view(['PUT'])
# @csrf_protect
# def updateTrxn(request, pk):
#     data = request.data
#     trxn = Trxn.objects.get(id=pk)
#     serlializer = TrxnSerializer(instance=trxn, data=data)
#     if serlializer.is_valid():
#         serlializer.save()
    
#     return Response(serlializer.data)



# @api_view(['POST'])
# def createTrxn(request):
#     serializer = TrxnSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def createTrxn(request):
#     data = request.data
#     trxn = Trxn.objects.create(
#         id=data['id'],
#         date=data['date'],
#         toAccount=Account.objects.get(pk=int(data['toAccount'])),
#         amount=data['amount'],
#         fromAccount=Account.objects.get(pk=int(data['fromAccount'])),
#         notes=data['notes'],
#     )
#     serializer = TrxnSerializer(trxn, data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)








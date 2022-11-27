from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/trxns/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of transactions'
        },
        {
            'Endpoint': '/trxns/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single transaction object'
        },
        {
            'Endpoint': '/trxns/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new transaction with data sent in post request'
        },
        {
            'Endpoint': '/trxns/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing transaction with data sent in post request'
        },
        {
            'Endpoint': '/trxns/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and existing transaction'
        },
    ]
    return Response(routes)
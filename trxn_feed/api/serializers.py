from rest_framework import serializers
from .models import Trxn, Account, Goal, Budget

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class TrxnSerializer(serializers.ModelSerializer):
    fromAccount = serializers.StringRelatedField()
    toAccount = serializers.StringRelatedField() 
        
    class Meta:
        model = Trxn
        fields = ('id', 'date', 'amount', 'notes', 'toAccount', 'fromAccount')

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class BudgetSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Budget
        fields = ('id','month','year','target','category')
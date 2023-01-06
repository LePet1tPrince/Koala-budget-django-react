from rest_framework import serializers
from .models import Trxn, Account, Goal, Budget

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class TrxnSerializer(serializers.ModelSerializer):
    # toAccount = serializers.CharField(source='toAccount.name')
    # fromAccount = serializers.CharField(source='fromAccount.name')

    # def update(self, instance, validated_data):
    #     instance.toAccount = validated_data.get('toAccount', instance.toAccount)
    #     instance.fromAccount = validated_data.get('fromAccount',instance.fromAccount)
    #     instance.save()
    #     return instance
    
    # fromAccount = AccountSerializer(read_only=True)
    # toAccount = AccountSerializer(read_only=True)
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
    class Meta:
        model = Budget
        fields = '__all__'
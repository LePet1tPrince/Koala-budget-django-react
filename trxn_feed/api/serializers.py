from rest_framework import serializers
from .models import Trxn, Account, Goal, Budget

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class TrxnSerializer(serializers.ModelSerializer):
    fromAccount = AccountSerializer()
    toAccount = AccountSerializer()
        
    class Meta:
        model = Trxn
        fields = ['id', 'date', 'amount', 'notes', 'toAccount', 'fromAccount']
    
    def update(self, instance, validated_data):
        fromName = validated_data.pop('fromAccount').get('name')
        toName = validated_data.pop('toAccount').get('name')
        from_account = Account.objects.get(name=fromName)
        to_account = Account.objects.get(name=toName)
        instance.fromAccount = from_account
        instance.toAccount = to_account
        instance.amount = validated_data.get('amount', instance.amount)
        instance.date = validated_data.get('date', instance.date)
        instance.notes = validated_data.get('instance',instance.notes)
        instance.save()
        return instance

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class BudgetSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Budget
        fields = ('id','month','year','target','category')
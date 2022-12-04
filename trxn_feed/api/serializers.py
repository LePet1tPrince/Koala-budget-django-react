from rest_framework.serializers import ModelSerializer
from .models import Trxn, Account, Goal, Budget

class TrxnSerializer(ModelSerializer):
    class Meta:
        model = Trxn
        fields = '__all__'

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class GoalSerializer(ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class BudgetSerializer(ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'
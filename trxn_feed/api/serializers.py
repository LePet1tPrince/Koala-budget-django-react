from rest_framework.serializers import ModelSerializer
from .models import Trxn, Account

class TrxnSerializer(ModelSerializer):
    class Meta:
        model = Trxn
        fields = '__all__'

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
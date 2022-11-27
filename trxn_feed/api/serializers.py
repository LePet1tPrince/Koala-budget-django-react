from rest_framework.serializers import ModelSerializer
from .models import Trxn

class TrxnSerializer(ModelSerializer):
    class Meta:
        model = Trxn
        fields = '__all__'
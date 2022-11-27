from django.contrib import admin
from .models import Trxn

class TrxnAdmin(admin.ModelAdmin):
    pass

admin.site.register(Trxn, TrxnAdmin)

from django.contrib import admin
from .models import Trxn, Account

class TrxnAdmin(admin.ModelAdmin):
    pass

admin.site.register(Trxn, TrxnAdmin)

class AccountAdmin(admin.ModelAdmin):
    pass

admin.site.register(Account, AccountAdmin)

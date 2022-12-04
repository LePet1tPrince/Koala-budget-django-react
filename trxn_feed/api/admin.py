from django.contrib import admin
from .models import Trxn, Account, Goal, Budget

class TrxnAdmin(admin.ModelAdmin):
    pass

class AccountAdmin(admin.ModelAdmin):
    pass

class GoalAdmin(admin.ModelAdmin):
    pass

class BudgetAdmin(admin.ModelAdmin):
    pass

admin.site.register(Account, AccountAdmin)
admin.site.register(Trxn, TrxnAdmin)
admin.site.register(Goal, GoalAdmin)
admin.site.register(Budget, BudgetAdmin)


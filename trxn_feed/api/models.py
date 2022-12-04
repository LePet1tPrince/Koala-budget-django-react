from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import datetime
from django.db.models import Q

#Accounts and categories
class Account(models.Model):
    class AccountTypes(models.TextChoices):
        Own = 'Own'
        Flow = 'Flow'
        Save = 'Save'
    
    class AccountSubTypes(models.TextChoices):
        Ass = 'Asset'
        Lia = 'Liability'
        Inc = 'Income'
        Exp = 'Expense'

    name = models.CharField(max_length=50)
    num = models.IntegerField()
    type = models.CharField(max_length=10, choices=AccountTypes.choices)
    subType = models.CharField(max_length=10, choices=AccountSubTypes.choices)

    def __str__(self):
        return self.name

#transactions
class Trxn(models.Model):
    date = models.DateField(auto_now_add=False)
    updated = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    account = models.ForeignKey(Account,
        blank=False, #change to false
        null=False,#change to false
        on_delete=models.CASCADE,
        limit_choices_to=Q(type='Own'),
        related_name='account',
        )

    category = models.ForeignKey(Account,
        blank=False,#change to false
        null=False,#change to false
        on_delete=models.CASCADE,
        limit_choices_to=Q(type='Flow'),
        related_name='category',

    )

    notes = models.CharField(
        max_length=240,
        null=True
    )

    def __str__(self):
        return self.date.strftime("%d %b, %Y") + " - " + str(self.amount) + " - " + str(self.category) + " - " + self.notes


#Savings goals

class Goal(models.Model):
    name = models.CharField(
        max_length=240,
        null=True
    )
    goal =  models.DecimalField(max_digits=10,decimal_places=2)
    date = models.DateField(auto_now_add=False)
    raised =  models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return self.name

#Budget 
class Budget(models.Model):
    category = models.ForeignKey(Account,
        blank=False,#change to false
        null=False,#change to false
        on_delete=models.CASCADE,
        limit_choices_to=Q(type='Flow'),
        related_name='budget_category',

    )
    month = models.DateField(auto_now_add=False)

    budget =  models.DecimalField(max_digits=10,decimal_places=2)
    
    def __str__(self):
        return str(self.category) + " - " + self.month.strftime("%b %Y")
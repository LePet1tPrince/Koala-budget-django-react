from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import datetime
from django.db.models import Q

class Account(models.Model):
    class AccountTypes(models.TextChoices):
        Asset = 'Asset'
        Liability = 'Liability'
        Equity = 'Equity'
        Income = 'Income'
        Expense = 'Expense'

    accName = models.CharField(max_length=50)
    accNum = models.IntegerField()
    accType = models.CharField(max_length=10, choices=AccountTypes.choices)

    def __str__(self):
        return self.accName

class Trxn(models.Model):
    
    
    class CategoryChoices(models.TextChoices):
        Rent = 'RT', _('Rent')
        Groceries = 'GC', _('Groceries')

    date = models.DateField(auto_now_add=False)
    updated = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    account = models.ForeignKey(Account,
        blank=True, #change to false
        null=True,#change to false
        on_delete=models.CASCADE,
        limit_choices_to=Q(accType='Asset') | Q(accType='Liability') | Q(accType='Equity'),
        related_name='account',
        )

    category = models.ForeignKey(Account,
        blank=True,#change to false
        null=True,#change to false
        on_delete=models.CASCADE,
        limit_choices_to=Q(accType='Expense') | Q(accType='Income'),
        related_name='category',

    )

    notes = models.CharField(
        max_length=240,
        null=True
    )

    def __str__(self):
        return self.date.strftime("%d %b, %Y") + " - " + str(self.amount) + " - " + str(self.category) + " - " + self.notes
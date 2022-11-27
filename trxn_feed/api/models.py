from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import datetime

class Trxn(models.Model):
    
    class AccountChoices(models.TextChoices):
        CreditCard = 'CC', _('Credit Card')
        Chequing = 'CQ', _('Chequing')
    
    class CategoryChoices(models.TextChoices):
        Rent = 'RT', _('Rent')
        Groceries = 'GC', _('Groceries')

    date = models.DateField(auto_now_add=False)
    updated = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    account = models.CharField(
        max_length=2,
        choices=AccountChoices.choices,
        default=AccountChoices.CreditCard,
        )

    category = models.CharField(
        max_length=2,
        choices=CategoryChoices.choices,
        default=None,
    )

    notes = models.CharField(
        max_length=240,
        null=True
    )

    def __str__(self):
        return self.date.strftime("%d %b, %Y") + " - " + str(self.amount) + " - " + self.category + " - " + self.notes
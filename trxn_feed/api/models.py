from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import datetime
from django.db.models import Q
from django.core.validators import MaxValueValidator, MinValueValidator

#Accounts and categories
class Account(models.Model):
    class AccountTypes(models.TextChoices):
        Own = 'Own'
        Flow = 'Flow'
        Save = 'Save'
        Equity = 'Equity'
    
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
    fromAccount = models.ForeignKey(Account,
        blank=False, #change to false
        null=False,#change to false
        on_delete=models.CASCADE,
        related_name='fromAccount',
        )

    toAccount = models.ForeignKey(Account,
        blank=False,#change to false
        null=False,#change to false
        on_delete=models.CASCADE,
        related_name='toAccount',

    )

    notes = models.CharField(
        max_length=240,
        null=True
    )

    def __str__(self):
        return self.date.strftime("%d %b, %Y") + " - " + str(self.amount) + " - " + str(self.fromAccount) + " -> " + str(self.toAccount) + " - " + self.notes


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
        blank=True,#change to false
        null=True,#change to false
        on_delete=models.CASCADE,
        limit_choices_to=Q(type='Flow'),
        related_name='budget_category',

    )

    class BudgetMonths(models.TextChoices):
        Jan = 'Jan', _('January')
        Feb = 'Feb', _('February')
        Mar = 'Mar', _('March')
        Apr = 'Apr', _('April')
        May = 'May', _('May')
        Jun = 'Jun', _('June')
        Jul = 'Jul', _('July')
        Aug = 'Aug', _('August')
        Sep = 'Sep', _('September')
        Oct = 'Oct', _('October')
        Nov = 'Nov', _('November')
        Dec = 'Dec', _('December')
    


    month = models.CharField(max_length=30, choices=BudgetMonths.choices)
    year = models.IntegerField(validators=[MaxValueValidator(2100), MinValueValidator(2000)])

    target =  models.DecimalField(max_digits=10,decimal_places=2)
    
    def __str__(self):
        return str(self.category) + " - " + self.month + " - " + str(self.year)
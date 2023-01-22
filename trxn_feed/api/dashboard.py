from django.db.models import Sum
from .models import Trxn, Account, Budget
from .serializers import AccountSerializer, TrxnSerializer, BudgetSerializer
import pandas as pd
import json



def DashboardAPI(start_date, end_date):

    #function to get the account balance between certain times of a specific account.
    def get_balance(start_date, end_date, accountName):
        account = Account.objects.filter(name=accountName).first()
        if account is None:
            return 'No account with that name'        
        # account = Account.objects.first()
        toTrxns = account.toAccount.all().filter(date__gte=start_date, date__lte=end_date)
        fromTrxns = account.fromAccount.all().filter(date__gte=start_date, date__lte=end_date)
        category_balance = 0
        if len(toTrxns) > 0:
            category_balance += toTrxns.aggregate(Sum('amount'))['amount__sum']  
        if len(fromTrxns) >0:
            category_balance -= fromTrxns.aggregate(Sum('amount'))['amount__sum']
        
        
        return category_balance

    accounts = Account.objects.all()
    account_balance_dict = {}
    #create a list of actual balances.
    for acc in accounts:
        account_balance_dict[acc.name] = get_balance(start_date, end_date, acc.name)


    
    def createBarChartJSON(balance_dict):
        data = []
        for k in balance_dict:
            entry = {}
            entry['x'] = k
            entry['y'] = balance_dict[k]
            entry['goals'] = {}
            entry['goals']['name'] = 'Budget'
            try:
                entry['goals']['value'] = Budget.objects.filter(category__exact='Income')
            except:
                entry['goals']['value'] = 0
            entry['goals']['strokeColor'] = '#775DD0'
            entry['goals'] = [entry['goals']]

            data.append(entry)
        return [{'data': data}]
        


    return (createBarChartJSON(account_balance_dict))
    # return (account_balance_dict)


   
   #pull models
    # trxns = pd.DataFrame(Trxn.objects.all().values())
    # budget = pd.DataFrame(Budget.objects.all().values())
    # accounts = Account.objects.all().values()

    # account = Account.objects.first()
    # fromTrxns = account.fromAccount.all()
    # toTrxns = account.toAccount.all()
   

    # transactions = fromTrxns | toTrxns
    # print(type(fromTrxns))
    
    # budget.fillna(0, inplace=True)
    # budget.to_csv('./calculations/budget.csv')
    # trxns.to_csv('./calculations/transactions.csv')
    # accounts.to_csv('./calculations/accounts.csv')
    # df = pd.DataFrame(trxns)

    #calculate month number and month
    # trxns['monthnum'] = trxns['date'].apply(lambda x: x.month)
    # months = {1: "Jan", 2: "Feb", 3: "Mar",4: "Apr",5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11:"Nov", 12:"Dec"}
    # trxns['month'] = trxns['monthnum'].apply(lambda y: months[y])

    # Turn account Id and category ID into account names
    # trxns['account'] = trxns['account_id'].apply(lambda x: accounts.name[x-1])
    # trxns['category'] = trxns['category_id'].apply(lambda x: accounts.name[x-1])

    #adjust amount to be a number that django can work with
    # trxns['amount'] = trxns['amount'].apply(lambda x: float(x))



    # #group into months and categories
    # trxns_group = trxns.groupby(by=["month", "category"])
    # trxns_sum = trxns_group.sum().reset_index().drop(columns = ['monthnum', 'category_id','account_id','id'])
    # # add = df.groupby(by="category_id").sum()

    # return(trxns_sum)
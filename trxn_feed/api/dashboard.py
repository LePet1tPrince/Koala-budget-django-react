from django.db.models import Sum, Q
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


    def get_budget_from_month(month, year, category):
        account_num = Account.objects.filter(name=category).first().id
        # print(account_num)
        budget_object = Budget.objects.filter(month=month, year=year, category=account_num)
        if len(budget_object) > 1:
            print(f'Error: multiple budgets fit this criteria, {month} - {year} - {category}')
            target = 9999
        elif len(budget_object) == 0:
            target = 0
        else:
            target = budget_object.first().target
        # print(target)

        return target

    #this function takes in start and end date and cateogory, gets the months in the date range, and sums the budgets for those months
    def get_budget_from_date_range(start_date,end_date, category):
        month_list = pd.period_range(start=start_date, end=end_date, freq='M')
        month_list = [[month.strftime("%b"), month.strftime("%Y")] for month in month_list]
        total_budget = 0
        for e in month_list:
            total_budget += get_budget_from_month(e[0],e[1],category)
        # print(total_budget)
        return total_budget
    


    def get_balance_dict(subType):
        account_balance_dict = {}
        account_accounts = Account.objects.filter(subType=subType)
        for acc in account_accounts:
            account_balance_dict[acc.name] = get_balance(start_date, end_date, acc.name)
        return account_balance_dict
    


    
    def createBarChartJSON(balance_dict, actualColor, budgetColor):
        data = []
        print(Budget._meta.get_fields())

        for k in balance_dict:
            entry = {}
            entry['x'] = k
            entry['y'] = balance_dict[k]
            entry['fillColor'] = actualColor
            entry['goals'] = {}
            entry['goals']['name'] = 'Budget'
            # accountName = Account.objects.get(name=k)
            try:
                entry['goals']['value'] = get_budget_from_date_range(start_date,end_date,k)
            except:
                entry['goals']['value'] = 0
            entry['goals']['strokeColor'] = budgetColor
            entry['goals'] = [entry['goals']]

            data.append(entry)
        return [{'data': data}]
        

    chartData = {"Income": createBarChartJSON(get_balance_dict('Income'),'#2E83B7' ,'#289A82'), "Expense":createBarChartJSON(get_balance_dict('Expense'),'#D25425' ,'#289A82')}
    return (chartData)
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
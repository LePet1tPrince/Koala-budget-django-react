from .models import Trxn, Account
import pandas as pd
import json


def calculate():


    #pull models
    accounts = pd.DataFrame(Account.objects.all().values())
    trxns = pd.DataFrame(Trxn.objects.all().values())
    # df = pd.DataFrame(trxns)

    #calculate month number and month
    trxns['monthnum'] = trxns['date'].apply(lambda x: x.month)
    months = {1: "Jan", 2: "Feb", 3: "Mar",4: "Apr",5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11:"Nov", 12:"Dec"}
    trxns['month'] = trxns['monthnum'].apply(lambda y: months[y])

    # Turn account Id and category ID into account names
    trxns['account'] = trxns['account_id'].apply(lambda x: accounts.name[x-1])
    trxns['category'] = trxns['category_id'].apply(lambda x: accounts.name[x-1])

    #adjust amount to be a number that django can work with
    trxns['amount'] = trxns['amount'].apply(lambda x: float(x))



    #group into months and categories
    trxns_group = trxns.groupby(by=["month", "category"])
    trxns_sum = trxns_group.sum().reset_index().drop(columns = ['monthnum', 'category_id','account_id','id'])
    # add = df.groupby(by="category_id").sum()

    return(trxns_sum)
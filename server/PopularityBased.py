#!/usr/bin/env python
# coding: utf-8

# In[49]:


def PopularityBased():
    import pandas as pd
    import numpy as np
    import random
    import sys
    from itertools import chain
    import re
    
    orders = pd.read_csv("Pakistan Largest Ecommerce Dataset - Copy.csv")

# Dropping unnecessary columns
    dataset = orders.drop(['sales_commission_code','discount_amount','increment_id','discount_amount','payment_method','Working Date','BI Status','MV','FY','created_at'],axis=1)

# Finding out number of missing enteries in each column
    missing = dataset.isna().sum()
    missing

# Dropping these enteries and again finding the number of missing columns which should be 0.
    dataset = dataset.dropna()
    missing = dataset.isna().sum()
    missing

# mMaking the dataset smaller
    dataset = dataset[:1000]
    dataset

# Finding number of customers
    unique = dataset['Customer ID'].nunique()
    unique

# Creating a list of users
    users = pd.DataFrame(dataset['Customer ID'])
    users

    unique = users['Customer ID'].nunique()
    unique

# Dataset after pre-processing
    dataset

# Creating a new dataset called "items" with columns 'item_id' and 'sku' and also adding random ratings to it.
    items = dataset.loc[:, ['item_id', 'sku']]
    items['rating'] = np.random.uniform(low=1.0, high=5.0, size=len(items))
    items

# Finding unique items in the dataset and adding to another dataframe object "unique_items" with number of sales
    unique_items = dataset.groupby('sku').size().reset_index(name='count')
    unique_items

    items

# Creating another dataframe object "categories"
    categories = pd.DataFrame(dataset['category_name_1'].unique(), columns=['Category'])

    categories

# Creating another dataframe object and listing all the items in the category
    category_items = pd.DataFrame(dataset.groupby('category_name_1')['item_id'].apply(list)).reset_index()
    category_items


# Listing top 5 items for all users
#     BestFive = dataset['item_id'].value_counts().head(5)
    top_items = dataset['item_id'].explode().value_counts().head(5).index.tolist()

    #print(top_items)
    return top_items
#     print(NewFive)
#     return NewFive


# In[50]:


res = PopularityBased()
print(res)


# In[ ]:





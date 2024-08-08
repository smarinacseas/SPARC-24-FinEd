from scraper import get_bankrate_data

url = 'https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/'
data = get_bankrate_data(url)
print(data)
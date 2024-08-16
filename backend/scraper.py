import requests
from bs4 import BeautifulSoup

def get_bankrate_data(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception('Failed to load page {}'.format(url))
    
    soup = BeautifulSoup(response.content, 'html.parser')

    accounts_data = []
    accounts_section = soup.find('div', {'id': 'accountTable'})
    if accounts_section:
        rows = accounts_section.find_all('tr', class_='rate-table-row')
        for row in rows:
            name = row.find('td', {'class': 'rate-table-name'}).text.strip()
            apy = row.find('td', {'class': 'rate-table-apr'}).text.strip()
            min_balance = row.find('td', {'class': 'rate-table-minbal'}).text.strip()
            accounts_data.append({'name': name, 'apy': apy, 'min_balance': min_balance})
    return accounts_data

url = 'https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/'
data = get_bankrate_data(url)
print(data)
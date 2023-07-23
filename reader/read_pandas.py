import pandas as pd
import json


file_to_read = pd.read_excel('sfe-excel.xlsx')

file_to_read.fillna(value="", inplace=True)

json_file_path = "test.json"


headers = file_to_read.columns.tolist()
headers = [header.replace(' ', '') for header in headers]
rows = file_to_read.values.tolist()
json_data = []
for row in rows:
    json_row = {}
    for i in range(len(headers)):
        json_row[headers[i]] = row[i]
    json_data.append(json_row)


with open(json_file_path, 'w') as json_file:
    json.dump(json_data, json_file)

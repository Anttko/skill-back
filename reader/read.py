import csv
import json
import codecs

csv_file_path = "resp.csv"
json_file_path = "resp.json"


with codecs.open(csv_file_path, 'r', encoding='unicode_escape') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    headers = next(csv_reader)
    headers = [header.replace(' ', '').replace('Id', 'skillId') for header in headers]
    json_data = []
    for row in csv_reader:
        json_row = {}
        for i in range(len(headers)):
            json_row[headers[i]] = row[i]
        print(json_row)
        json_data.append(json_row)


with open(json_file_path, 'w') as json_file:
    json.dump(json_data, json_file)

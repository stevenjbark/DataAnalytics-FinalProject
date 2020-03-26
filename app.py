from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd

app = Flask(__name__)

#Setup MongoDB connection as in scrape_mars.py. Conn = connection port info, 
#client is connection client.
app.config["MONGO_URI"] = "mongodb://localhost:27017/ACAData_DB"
mongo = PyMongo(app)

#Connect to db = Data databases.
aca_state_data = mongo.db.ACAStateData


state_abbr = {'Alaska': 'AK', 'Alabama': 'AL', 'Arkansas': 'AR', 'American Samoa': 'AS', 'Arizona': 'AZ', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'District of Columbia': 'DC', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Guam': 'GU', 'Hawaii': 'HI', 'Iowa': 'IA', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Massachusetts': 'MA', 'Maryland': 'MD', 'Maine': 'ME', 'Michigan': 'MI', 'Minnesota': 'MN', 'Missouri': 'MO', 'Northern Mariana Islands': 'MP', 'Mississippi': 'MS', 'Montana': 'MT', 'National': 'NA', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Nebraska': 'NE', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'Nevada': 'NV', 'New York': 'NY', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Puerto Rico': 'PR', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Virginia': 'VA', 'Virgin Islands': 'VI', 'Vermont': 'VT', 'Washington': 'WA', 'Wisconsin': 'WI', 'West Virginia': 'WV', 'Wyoming': 'WY'}

#Route to render the index.html page with data from the ACAData_DB database
@app.route("/")
def index():
    return render_template("index.html")

#Setup api for acquiring data from MongoDB. 
#The find({}, {"_id":0}) basically amends find() to select everything (first {} set), 
#then omits the "_id" ({"_id": 0}). This is CRITICAL because the ObjectId from MongoDB
#is NOT JSONIFIABLE!!!
@app.route("/API/Data/")
def data():
    aca_data = list(aca_state_data.find({}, {"_id": 0}))
    return jsonify(aca_data)

@app.route("/API/Data/MapData")
def MapData():
    # query for content
    content = list(aca_state_data.find({}, {"_id": 0}))

    # pull out the "Data" key into list for grouping and stuff
    result_list = [result['Data'] for result in content]
    result_df = pd.DataFrame(result_list)
    grouped_df = pd.DataFrame(result_df.groupby("Year"))

    output = []
    d = {}
    for index, row in grouped_df.iterrows():
        d[row[0]] = row[1].to_dict(orient="records")
    output.append(d)
    return jsonify(output)


@app.route("/API/Data/StateData")
def StateData():
    # query for content
    content = list(aca_state_data.find({}, {"_id": 0}))

    # pull out the "Data" key into list for grouping and stuff
    result_list = [result['Data'] for result in content]
    result_df = pd.DataFrame(result_list)
    grouped_df = pd.DataFrame(result_df.groupby("State"))

    output = []
    d = {}
    for index, row in grouped_df.iterrows():
        d[row[0]] = row[1].to_dict(orient="records")
    output.append(d)
    return jsonify(output)


@app.route("/About")
def about():
    return render_template("about.html")




if __name__ == "__main__":
    app.run(debug=True)
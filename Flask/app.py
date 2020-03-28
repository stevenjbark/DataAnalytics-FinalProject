from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd

app = Flask(__name__)

#Setup MongoDB connection as in scrape_mars.py. Conn = connection port info, 
#client is connection client.
app.config["MONGO_URI"] = "mongodb://localhost:27017/ProjectHealth_DB"
mongo = PyMongo(app)

#Connect to db = Data databases.
StateData = mongo.db.StateData
CountyData = mongo.db.CountyData


#Route to render the index.html page with data from the ACAData_DB database
@app.route("/")
def index():
    return render_template("index.html")

#Setup api for acquiring data from MongoDB. 
#The find({}, {"_id":0}) basically amends find() to select everything (first {} set), 
#then omits the "_id" ({"_id": 0}). This is CRITICAL because the ObjectId from MongoDB
#is NOT JSONIFIABLE!!!

@app.route("/API/Data/State")
def State():
    state_data = list(StateData.find({}, {"_id": 0}))
    return jsonify(state_data)

@app.route("/API/Data/County")
def County():
    county_data = list(CountyData.find({}, {"_id": 0}))
    return jsonify(county_data)




if __name__ == "__main__":
    app.run(debug=True)
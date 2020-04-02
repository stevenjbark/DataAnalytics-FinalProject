from flask import Flask, request, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd
import pickle

app = Flask(__name__)

#MONGODB CONNECTION AND ACCESS OF DATABASE COLLECTIONS
#Setup MongoDB connection as in scrape_mars.py. Conn = connection port info, 
#client is connection client. Note: Using flask_pymongo, so this code is different than pymongo.
app.config["MONGO_URI"] = "mongodb://localhost:27017/ProjectHealth_DB"
mongo = PyMongo(app)

#Connect to db = Data databases.
StateData = mongo.db.StateData
CountyData = mongo.db.CountyData


#SETUP API'S FOR ACCESSING DATA IN MongoDB. 
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


#LOAD OF RANDOM FOREST REGRESSOR MODEL (RF_Regressor.pkl)
def load_model():
    global RFmodel
    with open("./models/RF_Regressor.pkl", "rb") as rf:
        RFmodel = pickle.load(rf)
        print("RFmodel Loaded")


#TAKE INPUT AND PROCESS DATA FOR SUBMISSION TO RF_Regressor MODEL
def process_input(data):

    #Convert to dataframe for processing
    df = pd.DataFrame([data])

    #Convert each of the values from string to float.
    df["Mortality"] = df["Mortality"].astype(float)
    df["NoInsurance"] = df["NoInsurance"].astype(float)
    df["ChildPoverty"] = df["ChildPoverty"].astype(float)
    df["Graduation"] = df["Graduation"].astype(float)
    df["Demographics"] = df["Demographics"].astype(float)
    df["MHI"] = df["MHI"].astype(float)
    df["LowBirthweight"] = df["LowBirthweight"].astype(float)
    df["TeenBirth"] = df["TeenBirth"].astype(float)
    df["FoodAccess"] = df["FoodAccess"].astype(float)
    df["AdultSmokers"] = df["AdultSmokers"].astype(float)
    
    return df

#ROUTES FOR INDEX AND DATA URLS
#Route to render the index.html page with data from the ACAData_DB database
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/About")
def about():
    return render_template("about.html")

@app.route("/Explore")
def explore():
    return render_template("explore.html")


@app.route("/tableau")
def tableau():
    return render_template("tableau.html")

#SETUP MAIN INDEX PAGE TO INCLUDE REGRESSION MODEL
#This can be another route with index.html above ("/" and render_template("index.html") and 
#this route being "/other_route_name" and render_template("otherpage.html")
@app.route("/Models", methods=["GET", "POST"])
def models():
    if request.method == "POST":
        load_model()
        input_data = request.form.to_dict()
        newdata = process_input(input_data)
        value = RFmodel.predict(newdata)
        return render_template("models.html", result=value)

    return render_template("models.html")




if __name__ == "__main__":
    app.run(debug=True)
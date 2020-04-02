from flask import Flask, request, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd
import pickle

app = Flask(__name__)

#MONGODB CONNECTION AND ACCESS OF DATABASE COLLECTIONS
#Setup MongoDB connection as in scrape_mars.py. Conn = connection port info, 
#client is connection client.
app.config["MONGO_URI"] = "mongodb://localhost:27017/ProjectHealth_DB"
mongo = PyMongo(app)

#Connect to db = Data databases.
StateData = mongo.db.StateData
CountyData = mongo.db.CountyData


#ROUTES FOR INDEX AND DATA URLS
#Route to render the index.html page with data from the ACAData_DB database
# @app.route("/")
# def index():
#     return render_template("index.html")

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



# #LOAD OF RANDOM FOREST REGRESSOR MODEL (RF_Regressor.pkl)
# def load_model():
#     global RFmodel
#     with open("./models/RF_Regressor.pkl", "rb") as rf:
#         RFmodel = pickle.load(rf)
#         print("RFmodel Loaded")


# #TAKE INPUT AND PROCESS DATA FOR SUBMISSION TO RF_Regressor MODEL
# def process_input(data):

#     #Convert to dataframe for processing
#     df = pd.DataFrame([data])

#     #Convert each of the values from string to float.
#     df["Mortality"] = df["Mortality"].astype(float)
#     df["NoInsurance"] = df["NoInsurance"].astype(float)
#     df["ChildPoverty"] = df["ChildPoverty"].astype(float)
#     df["Graduation"] = df["Graduation"].astype(float)
#     df["Demographics"] = df["Demographics"].astype(float)
#     df["MHI"] = df["MHI"].astype(float)
#     df["LowBirthweight"] = df["LowBirthweight"].astype(float)
#     df["TeenBirth"] = df["TeenBirth"].astype(float)
#     df["FoodAccess"] = df["FoodAccess"].astype(float)
#     df["AdultSmokers"] = df["AdultSmokers"].astype(float)
    
#     return df

# #SETUP MAIN INDEX PAGE TO INCLUDE REGRESSION MODEL
# @app.route("/", methods=["GET", "POST"])
# def index():
#     if request.method == "POST":
#         load_model()
#         input_data = request.form.to_dict()
#         newdata = process_input(input_data)
#         value = RFmodel.predict(newdata)
#         return render_template("index.html", result=value)

#     return render_template("index.html")


#LOAD OF K Nearest Neighbors MODEL (KNNLocationType.pkl)
def load_model_KNN_locationtype():
    global KNNLocationType
    with open("./models/KNN_locationtype_model.pkl", "rb") as rf:
        KNNLocationType = pickle.load(rf)
        print("KNN Loaded")

def load_model_KNN_type():
    global KNNType
    with open("./models/KNN_type_model.pkl", "rb") as rf:
        KNNType = pickle.load(rf)
        print("KNN Loaded")

def load_model_KNN_location():
    global KNNLocation
    with open("./models/KNN_location_model.pkl", "rb") as rf:
        KNNLocation = pickle.load(rf)
        print("KNN Loaded")


#TAKE CONVERT VALUES FROM KNN MODEL TO TEXT
def process_locationtype(data):
    if data == 1:
        value1text = "Permanent"
    elif data == 2:
        value1text = "Seasonal"
    else:
        value1text="Mobile Van"
    
    return value1text

def process_type(data):
    if data == 1:
        value2text = "Service Delivery Site"
    elif data == 2:
        value2text = "Administrative"
    else:
        value2text="Administrative/Service Delivery Site"
    
    return value2text

def process_location(data):
    if data == 1:
        value3text = "Hospital"
    elif data == 2:
        value3text = "Nursing Home"
    elif data == 3:
        value3text = "School"
    elif data == 4:
        value3text = "Domestic Violence"
    elif data == 5:
        value3text = "Correctional Facility"
    elif data == 6:
        value3text = "All Other Clinic Types"                
    else:
        value3text="Unknown"
    
    return value3text

#TAKE INPUT AND PROCESS DATA FOR SUBMISSION TO KNN MODEL
def process_inputKNN(data):

    #Convert to dataframe for processing
    df = pd.DataFrame([data])

    #Convert each of the values from string to float.
    df["AdultSmokers"] = df["AdultSmokers"].astype(float)
    df["Mortality"] = df["Mortality"].astype(float)
    df["NoInsurance"] = df["NoInsurance"].astype(float)
    df["ChildPoverty"] = df["ChildPoverty"].astype(float)
    df["Demographics"] = df["Demographics"].astype(float)
    df["TeenBirth"] = df["TeenBirth"].astype(float)
    df["Graduation"] = df["Graduation"].astype(float)
    df["MHI"] = df["MHI"].astype(float)
    df["FoodAccess"] = df["FoodAccess"].astype(float)
    df["LowBirthweight"] = df["LowBirthweight"].astype(float)
    
    return df

#SETUP MAIN INDEX PAGE TO INCLUDE REGRESSION MODEL
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        load_model_KNN_locationtype()
        load_model_KNN_type()
        load_model_KNN_location()
        input_dataKNN = request.form.to_dict()
        newdataKNN = process_inputKNN(input_dataKNN)
        value1 = KNNLocationType.predict(newdataKNN)
        text1 = process_locationtype(value1)
        value2 = KNNType.predict(newdataKNN)
        text2 = process_type(value2)
        value3 = KNNLocation.predict(newdataKNN)
        text3 = process_location(value3)

        return render_template("index.html", result1=text1,result2=text2,result3=text3)

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import os
import pandas
import math
from twilio.rest import Client 
import random

from quotes import calmList

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import Location

@app.route('/')
def home():
    return render_template('test.html')

@app.route('/test')
def asd():
	return render_template('test1.html', content = "asd")

@app.route('/add/<latitude>/<longitude>/<heartbeats>')
def addLocation(latitude = None, longitude = None, heartbeats = None):
	if heartbeats > 95:
		try:
			location = Location(
				latitude = latitude,
				longitude = longitude,
				heartbeats = heartbeats
			)
			db.session.add(location)
			db.session.commit()
			return jsonify("Successfully added")
		except Exception as e:
			return(str(e))
	else:
		return jsonify("Heartbeats not high enough")

@app.route("/getall")
def getAll():
    try:
        locations = Location.query.all()
        return  jsonify([l.serialize() for l in locations])
    except Exception as e:
	    return(str(e))

@app.route("/get/<id_>")
def getById(id_):
    try:
        location = Location.query.filter_by(id = id_).first()
        return jsonify(location.serialize())
    except Exception as e:
	    return(str(e))

@app.route("/checkdanger/<latitude>/<longitude>")
def checkDanger(latitude, longitude):
	try:
		locations = Location.query.all()
		df = pandas.DataFrame([l.serialize() for l in locations])
		numClose = 0

		for index, row in df.iterrows():
			if math.sqrt((float(row['latitude']) - float(latitude)) ** 2 + (float(row['longitude']) - float(longitude)) ** 2) < 0.0005: #distance formula
				numClose += 1

		if numClose > 3: #hardcoded to 3 for demo purposes
			msg = random.choice(calmList)
 
			account_sid = os.environ['TWILIO_SID'] 
			auth_token = os.environ['TWILIO_AUTH_TOKEN']
			client = Client(account_sid, auth_token) 

			message = client.messages.create( 
				from_ = os.environ['PHONE_ONE'],  
				body = msg,      
				to = os.environ['PHONE_TWO']
			)
			return jsonify("true") #dangerous
		else:
			return jsonify("false") #safe


	except Exception as e:
		return (str(e))

@app.route("/sendsms/<msg>/<number>")
def sendSMS(msg, number): #msg is msg code, number is receiving phone number

	newMsg = None

	if msg == 'a':
		newMsg = "Please help, Cleo is injured and needs medical assistance"

	elif msg == 'b':
		newMsg = "Cleo could possibly be in danger, please check up on he
 
	account_sid = os.environ['TWILIO_SID'] 
	auth_token = os.environ['TWILIO_AUTH_TOKEN']
	client = Client(account_sid, auth_token) 

	message = client.messages.create( 
		from_= os.environ['PHONE_ONE'],  
		body= newMsg,      
		to= number
	) 

	return("Successfully sent")


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

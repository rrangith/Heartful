from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import os
import pandas
import math

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
		return (str(type(getAll()))
		df = pandas.DataFrame(getAll())
		numClose = 0

		for index, row in df.iterrows():
			if math.sqrt((row['latitude'] - latitude) ** 2 + (row['longitude'] - longitude) ** 2) < 0.0005: #distance formula
				numClose += 1

		if numClose > 3:
			return jsonify("true") #dangerous
		else:
			return jsonify("false") #safe


	except Exception as e:
		return (str(e))


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

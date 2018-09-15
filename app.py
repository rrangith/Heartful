from flask import Flask, request, json, render_template
from flask_sqlalchemy import SQLAlchemy
import os



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
def hello(latitude = None, longitude = None, heartbeats = None):
	try:
		location = Location(
			latitude = latitude,
			longitude = longitude,
			heartbeats = heartbeats
		)
		db.session.add(location)
		db.session.commit()
		return "Location added. location id={}".format(location.id)
	except Exception as e:
		return(str(e))


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

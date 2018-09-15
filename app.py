from flask import Flask, request, json, render_template
from flask_sqlalchemy import SQLAlchemy
import os

from models import Location

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/')
def home():
    return render_template('test.html')

@app.route('/test')
def asd():
	return render_template('test1.html', content = "asd")

@app.route('/asd/<latitude>/<longitude>/<heartbeats>')
def hello(latitude = None, longitude = None, heartbeats = None):
	if latitude == None or longitude == None or heartbeats == None:
		return render_template('test1.html', content = "FAIL")
	return render_template('test1.html', content = "latitude: " + latitude + " longitude: " + longitude + " heartbeats: " + heartbeats)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
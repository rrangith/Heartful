from flask import Flask, request, json, render_template
#from flask.ext.sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/locations'
#db = SQLAlchemy(app)

# Create database model
# class Location(db.Model):
#     __tablename__ = "locations"
#     id = db.Column(db.Integer, primary_key=True)
#     latitude = db.Column(db.String(120))
#     longitude = db.Column(db.String(120))
#     heartbeats = db.Column(db.Integer)

#     def __init__(self, latitude, longitude, heartbeats):
#         self.latitude = latitude
#         self.longitude = longitude
#         self.heartbeats = heartbeats

#     def __repr__(self):
#         return '<id {}>'.format(self.id)

#     def serialize(self):
#         return {
#             'id': self.id, 
#             'latitude': self.latitude,
#             'longitude': self.longitude,
#             'heartbeats':self.heartbeats
#      }

@app.route('/')
def home():
    return render_template('test.html')

@app.route('/test')
def test():
	return render_template('test1.html', content = "asd")

@app.route('/asd/<latitude>/<longitude>/<heartbeats>')
def test(latitude = None, longitude = None, heartbeats = None):
	if latitude == None or longitude == None or heartbeats == None:
		return render_template('test1.html', content = "FAIL")
	return render_template('test1.html', content = "latitude: " + latitude + " longitude: " + longitude + " heartbeats: " + heartbeats)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
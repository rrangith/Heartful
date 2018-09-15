from app import db

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.String())
    longitude = db.Column(db.String())
    heartbeats = db.Column(db.Integer)

    def __init__(self, latitude, longitude, heartbeats):
        self.latitude = latitude
        self.longitude = longitude
        self.heartbeats = heartbeats

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id, 
            'latitude': self.latitude,
            'longitude': self.longitude,
            'heartbeats': self.heartbeats


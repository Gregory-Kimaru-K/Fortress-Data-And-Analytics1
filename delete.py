from flask import Flask
from app import db, Client ,database_path


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + database_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Bind the app to the SQLAlchemy database
db.init_app(app)

# Run the app in a context
with app.app_context():
    # Delete all records from the Client table
    db.session.query(Client).delete()
    
    # Commit the changes
    db.session.commit()

print("All records from the Client table have been deleted.")
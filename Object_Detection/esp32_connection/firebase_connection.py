import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
# Fetch the service account key JSON file contents
cred = credentials.Certificate(
    'KLTN\Object_Detection\esp32_connection\demo1-213d4-firebase-adminsdk-l0sim-120c9fbe5b.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://test1111-78acb-default-rtdb.firebaseio.com/'
})

def upload_string_base64_to_firebase(base64):
    ref = db.reference('/camera_stream')
    ref.set({"stream": base64})
    print(ref.get())

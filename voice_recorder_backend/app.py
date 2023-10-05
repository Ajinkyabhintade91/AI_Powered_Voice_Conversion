from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {'wav', 'webm'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(message='No file part'), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(message='No selected file'), 400

    if file and allowed_file(file.filename):
        securename = secure_filename(file.filename)
        # Append current timestamp to filename to make it unique
        filename_without_ext, file_extension = os.path.splitext(securename)
        unique_filename = f"{filename_without_ext}_{datetime.now().strftime('%Y%m%d%H%M%S')}{file_extension}"
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        file.save(filepath)
        return jsonify(message='File successfully uploaded'), 200
    else:
        return jsonify(message='File type not allowed'), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from model import RecommendMovies

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST']) 
def foo():
    data = request.get_json()
    print(data['Title'])
    res = RecommendMovies(data['Title'])
    return {'response': res}

if __name__ == "__main__":
    app.run(debug=True)
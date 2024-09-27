from flask import Flask, render_template, request, jsonify
from dadata import Dadata
import json
app = Flask(__name__)


token = "5d821cbf037e717a89103108de89195b867b0508"


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search_address', methods=['GET'])
def search_address():
    query = request.args.get('q')
    if query:
        dadata = Dadata(token)
        result = dadata.suggest("fias", query)
        suggestions = [suggestion for suggestion in result]
        print(suggestions)
        return jsonify(suggestions)
    return jsonify([])


if __name__ == '__main__':
    app.run(debug=True)
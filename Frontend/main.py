from flask import Flask, jsonify, redirect, url_for, request, session, render_template
import requests


app = Flask(__name__)
app.secret_key = 'key'


@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/game')
def game():
    return render_template('main.html')


@app.route('/startGame', methods=['POST'])
def startGame():
    global res
    data = request.json
    response = requests.post("http://127.0.0.1:8000/startParam", json=data)

    res = response.json()

    return jsonify()


@app.route('/act', methods=['POST'])
def act():
    global res
    data = {'do':request.json}
    response = requests.post("http://127.0.0.1:8000/do", json=data)
    res = response.json()
    return jsonify()


@app.route('/data')
def get_data():
    return jsonify(res)



if __name__ == '__main__':
    app.run()



from flask import Flask, request, json, render_template
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('test.html')

@app.route('/test')
def test():
	return render_template('test1.html', content = "asd")


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
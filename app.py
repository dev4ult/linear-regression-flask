from flask import Flask, redirect, url_for, request, render_template

from source.regression import predict_discount

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        price = request.form["price"]
        if price != "":
            get_discount = predict_discount(price)
            return render_template("index.html", discount=get_discount, price=price)
        else:
            return redirect(url_for("index"))
    else:
        return render_template("index.html")


@app.route("/documentation")
def docs():
    return render_template("documentation.html")


if __name__ == "__main__":
    app.run(debug=True)

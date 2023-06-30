from flask import Flask, redirect, url_for, request, render_template

from source.regression import predict_discount
from source.handle_file import allowed_file, get_data, get_extensions


app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file-dataset"]

        if file.filename == "":
            return render_template("index.html")
        if file and allowed_file(file.filename):
            data = get_data(file, get_extensions(file.filename))
            return render_template("index.html", dataset=data)

    return render_template("index.html")


@app.route("/example", methods=["GET", "POST"])
def example():
    if request.method == "POST":
        price = request.form["price"]
        if price != "":
            get_discount = predict_discount(price)
            return render_template("example.html", discount=get_discount, price=price)
        else:
            return redirect(url_for("example"))
    else:
        return render_template("example.html")


@app.route("/documentation")
def docs():
    return render_template("documentation.html")


@app.route("/<not_found>")
def notfound(not_found):
    return render_template("notfound.html", page=not_found)


if __name__ == "__main__":
    app.run(debug=True)

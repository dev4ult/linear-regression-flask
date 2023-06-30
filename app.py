from flask import Flask, redirect, url_for, request, render_template, jsonify

from source.regression import predict_discount, predict_custom
from source.handle_file import allowed_file, get_data, get_extensions, data_length


app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file-dataset"]
        if file and allowed_file(file.filename):
            data = get_data(file, get_extensions(file.filename))
            file.save("./" + "ayam.xlsx")
            return jsonify(
                {
                    "html": render_template(
                        "tabledata.html", dataset=data, datalength=data_length(data)
                    )
                }
            )

    return render_template("index.html")


@app.route("/set_final_table", methods=["POST"])
def set_final_table():
    if request.method == "POST":
        predictand = request.form["predictand"]
        predictor = request.form["predictor"]

        switchLane = request.form["switch-lane"]

        file = request.files["file-dataset"]
        data = get_data(file, get_extensions(file.filename))

        if switchLane == "true":
            data = [data[1], data[0]]

        return jsonify(
            {
                "html": render_template(
                    "outputfinal.html",
                    dataset=data,
                    datalength=data_length(data),
                    predictand=predictand,
                    predictor=predictor,
                )
            }
        )


@app.route("/example", methods=["GET", "POST"])
def example():
    if request.method == "POST":
        price = request.form["price"]
        if price != "":
            get_discount = predict_discount(price)
            return jsonify({"discount": get_discount, "price": price})
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

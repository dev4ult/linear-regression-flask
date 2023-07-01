from flask import Flask, redirect, url_for, request, render_template, jsonify

from source.regression import (
    predict_discount,
    predict_custom,
    get_mae_discount,
    get_intercept_n_coef,
    read_discount_data,
)
from source.handle_file import (
    allowed_file,
    get_data,
    get_extensions,
    data_length,
    get_read_pd,
)


app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file-dataset"]
        if file and allowed_file(file.filename):
            data = get_data(file, get_extensions(file.filename))
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
                    switchrow=switchLane,
                )
            }
        )


@app.route("/predict_custom", methods=["POST"])
def get_predicted_value():
    if request.method == "POST":
        switchLane = request.form["switch-lane"]
        predictor = request.form["predictor-value"]

        file = request.files["file-dataset"]
        data = get_read_pd(file, get_extensions(file.filename))

        predicted_value = predict_custom(
            predictor, data.iloc[:, -1:].values, data.iloc[:, 0].values
        )

        if switchLane == "true":
            predicted_value = predict_custom(
                predictor, data.iloc[:, 0:1].values, data.iloc[:, 1].values
            )

        return jsonify({"predicted_value": predicted_value})


@app.route("/example", methods=["GET", "POST"])
def example():
    if request.method == "POST":
        price = request.form["price"]
        get_discount = predict_discount(price)
        return jsonify({"discount": round(get_discount, 2), "price": price})
    else:
        data = read_discount_data("Train")
        intercept, coef = get_intercept_n_coef(
            data.iloc[:, 0:1].values, data.iloc[:, 1]
        )
        mae = get_mae_discount()
        data = get_data("./source/dataset.xlsx", "xlsx")
        return render_template(
            "example.html",
            coef=round(coef[0], 5),
            intercept=round(intercept, 2),
            maepercent=int(round(mae, 2) * 100),
            mae=round(mae, 2),
            dataset=data,
            datalength=data_length(data),
        )


@app.route("/documentation")
def docs():
    return render_template("documentation.html")


@app.route("/<not_found>")
def notfound(not_found):
    return render_template("notfound.html", page=not_found)


if __name__ == "__main__":
    app.run(debug=True)

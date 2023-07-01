import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error as mae


def read_discount_data(page):
    return pd.read_excel("./source/dataset.xlsx", sheet_name=page)


def predict_discount(price):
    data_train = read_discount_data("Train")

    actual_price = data_train.iloc[:, 0:1].values
    actual_discount = data_train.iloc[:, 1].values

    regressor = LinearRegression()
    regressor.fit(actual_price, actual_discount)

    return regressor.predict(np.array([[price]], dtype=np.float64))[0]


def get_mae_discount():
    data_train = read_discount_data("Train")

    actual_price = data_train.iloc[:, 0:1].values
    actual_discount = data_train.iloc[:, 1].values

    regressor = LinearRegression()
    regressor.fit(actual_price, actual_discount)

    predict_discount = regressor.predict(actual_price)

    return mae(actual_discount, predict_discount)


def get_intercept_n_coef(predictor, predictand):
    regressor = LinearRegression()
    regressor.fit(predictor, predictand)

    return [regressor.intercept_, regressor.coef_]


def predict_custom(input_predictor, actual_predictor, actual_predictand):
    regressor = LinearRegression()
    regressor.fit(actual_predictor, actual_predictand)

    return regressor.predict(np.array([[input_predictor]], dtype=np.float64))[0]


def get_plot(
    predictor_name,
    actual_predictor,
    predictand_name,
    actual_predictand,
    regressor_predict,
):
    plt.scatter(actual_predictor, regressor_predict, color="red")
    plt.scatter(actual_predictor, actual_predictand, color="blue")

    plt.ylim(0, 1)
    plt.xlabel(predictor_name)
    plt.ylabel(predictand_name)

    plt.savefig(os.path.join("static", "image", "predict-discount-plot.png"))

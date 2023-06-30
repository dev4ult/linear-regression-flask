import pandas as pd
import numpy as np

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error as mae


def read_data(page):
    return pd.read_excel("./source/dataset.xlsx", sheet_name=page)


def predict_discount(price):
    data_train = read_data("Train")

    actual_price = data_train.iloc[:, 0:1].values
    actual_discount = data_train.iloc[:, 1].values

    regressor = LinearRegression()
    regressor.fit(actual_price, actual_discount)

    return regressor.predict(np.array([[price]], dtype=np.float64))[0]


def predict_custom(input_predictor, dataset):
    predictand = dataset[0]
    predictor = dataset[1]

    regressor = LinearRegression()
    regressor.fit(predictor, predictand)

    return regressor.predict(np.array([[input_predictor]], dtype=np.float64))[0]

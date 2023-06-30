import pandas as pd

ALLOWED_EXTENSIONS = {"xlsx", "csv"}


def get_extensions(filename):
    return filename.rsplit(".", 1)[1].lower()


def allowed_file(filename):
    return "." in filename and get_extensions(filename) in ALLOWED_EXTENSIONS


def get_data(file, file_format):
    if file_format == "xlsx":
        data = pd.read_excel(file)
    else:
        data = pd.read_csv(file)

    return [data.iloc[:, 0].values, data.iloc[:, 1].values]


def data_length(dataset):
    return len(dataset[0]) if len(dataset[0]) < len(dataset[1]) else len(dataset[1])

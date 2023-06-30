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

    return data.iloc[:, 0:1].values

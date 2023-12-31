### Clone the Application

```
git clone https://github.com/dev4ult/linear-regression-flask.git
```

## Activate the virtual environment

before create a virtual environment to run the app, you have to activate the local environment to run the virtualenv library

```
conda activate
pip install virtualenv
```

after installing/already installed the virtualenv, create venv as virtual environment

```
virtualenv venv
source venv/Scripts/activate
```

if it's not working, the folder name probably can be different in your local folder, you can fix it by changing the "Scripts" folder as the command you have (probably) run before into the one that has file called "activate" in it

```
source venv/{folder that has file called activate}/activate
```

## Install the Requirements

install the library required from requirements.txt

```
pip install -r requirements.txt
```

## Run the Application

you are ready to go to run the app

```
npm run app
```

## Development

for further development, you can run the dev if you want to change any tailwind code

```
npm install
npm run dev
```

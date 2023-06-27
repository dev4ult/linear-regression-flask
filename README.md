## Activate the virtual environment

before create a virtual environment to run the app, you have to activate the local environment to run the virtualenv library

```
conda activate
```

if you don't have virtualenv installed, you can type the command below after you activate the local environment

```
pip install virtualenv
```

after installing/already installed the virtualenv, create venv as virtual environment

```
virtualenv venv
```

activate the venv

```
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

## Run Application

you are ready to go and read to run the app

```
npm run app
```

## Development

for further development, you can run the dev if you want to change any tailwind code

```
npm install
npm run dev
```

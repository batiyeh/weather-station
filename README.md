# weather-station-site
Website to display the weather station data

## Endpoints
1. "" - Displays basic text index page
2. "/restUrl" - Displays basic json response
3. "/htmlTemplate" - Displays basic html template response
3. "/currentweather" - Displays temperature, wind speed, pressure, and humidity

## How to start development environment
1. If the env is not activated: . ./env/Scripts/activate
2. If there are new requirements: pip install -r requirements.txt
3. python manage.py runserver

## What to do when models are changed
1. manage.py makemigrations
2. manage.py migrate

## How to save newly installed requirements
pip freeze > requirements.txt

## Install 

### Mac OS:
This project requires the following dependencies before continuing the install:
1. Python 3.6 with venv (easily installed via [Homebrew](https://brew.sh))
```sh
brew install python3
```
2. MySQL

After you have the above dependencies:

1. Open up terminal and navigate to where you want to store this project
2. git clone https://github.com/batiyeh/weather-station-site
3. cd weather-station-site
4. python3 -m venv env
5. Activate the source files within your env:  
```sh
. ./env/bin/activate
```
6. Install the requirements that come with the project:
```sh
pip install -r requirements.txt
```
7. python3 manage.py migrate
8. python3 manage.py runserver

Windows: 

1. Open up git bash and cd into wherever you want to store this folder
2. git clone https://github.com/batiyeh/weather-station-site
3. cd weather-station-site
4. python -m venv env
5. . ./env/Scripts/activate
6. env/Scripts/pip install -r requirements.txt
7. python manage.py migrate
8. python manage.py runserver


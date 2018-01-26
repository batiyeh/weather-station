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
MacOS:

1. Open up git bash and cd into wherever you want to store this folder
2. git clone https://github.com/batiyeh/weather-station-site
3. cd weather-station-site
4. python3 -m venv env
5. . ./env/bin/activate
6. env/bin/pip install -r requirements.txt
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


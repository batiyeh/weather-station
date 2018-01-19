# weather-station-site
This is the website to display the weather station data

## Endpoints
1. ""  Displays basic text index page
2. "currentweather/restUrl" - Displays basic json response
3. "currentweather/htmlTemplate" - Displays basic html template response

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
6. env/Script/pip install -r requirements.txt
7. python manage.py migrate
8. python manage.py runserver


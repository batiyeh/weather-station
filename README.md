# weather-station-site
Website to display the weather station data

## Endpoints
1. "" - Displays basic text index page
2. "/restUrl" - Displays basic json response
3. "/htmlTemplate" - Displays basic html template response
3. "/currentweather" - Displays temperature, wind speed, pressure, and humidity

## How to start development environment if you have installed it previously
1. Navigate to the weather-station-site folder with your terminal.
2. Activate the source files in the env
```sh
# Mac
. ./env/bin/activate 
# Windows
. ./env/Scripts/activate 
```
3. If the requirements list has changed install the new ones: 
```sh
pip install -r requirements.txt
```
4. Run the server
```sh
python manage.py runserver
```

## What to do when any Django models are changed
```sh
manage.py makemigrations
manage.py migrate
```

## Saving newly installed requirements
```sh
pip freeze > requirements.txt
```

## Install 

### Mac OS:
This project requires the following dependencies before continuing the install:
1. Python 3.6 with venv (easily installed via [Homebrew](https://brew.sh))
```sh
brew install python3
```
2. MySQL (also easily installed via [Homebrew](https://brew.sh))
```sh
brew install mysql
brew services start mysql
```

After you have installed the above dependencies:

1. Create a MySQL user with the name "weatherstation" and password "ws1234".
```sh
# Log into your MySQL shell. If you have a password on your root account 
# also add -p onto the end of the following command. 
mysql -u root
# Once logged in, create the user
mysql > CREATE USER 'weatherstation'@'localhost' IDENTIFIED BY 'ws1234';
# Grant all privileges to the new user you have created
mysql > GRANT ALL PRIVILEGES ON * . * TO 'weatherstation'@'localhost';
mysql > FLUSH PRIVILEGES;
```
2. Create a database with the name weatherstation while logged into your MySQL shell.
```sh
mysql > CREATE DATABASE weatherstation;
```
3. Open up terminal and navigate to where you want to store this project
4. Clone the repository and navigate inside it.
```sh
git clone https://github.com/batiyeh/weather-station-site
cd weather-station-site
```
5. Create a virtual envelope folder where we will install this project's requirements 
```sh
python3 -m venv env
```
6. Activate the files within your env. After this step you should now have (env) listed on the left hand side of your terminal:  
```sh
. ./env/bin/activate
```
7. Install the requirements that come with the project:
```sh
pip install -r requirements.txt
```
8. Create the initial migration of the database: 
```sh
./manage.py makemigrations
./manage.py migrate
```
9. Run the server and navigate to the given IP address in your web browser (normally http://127.0.0.1:8000) 
```sh
python3 manage.py runserver
```

### Windows: 
This project requires the following dependencies before continuing the install:
1. Python 3.6 from https://www.python.org/downloads/
```
2. MySQL from https://dev.mysql.com/downloads/mysql/  (make sure it is the MySQL Community Server)
```
After you have installed the above dependencies:

1. Create a MySQL user with the name "weatherstation" and password "ws1234".
```sh
# Log into your MySQL shell. If you have a password on your root account 
# also add -p onto the end of the following command. 
mysql -u root
# Once logged in, create the user
mysql > CREATE USER 'weatherstation'@'localhost' IDENTIFIED BY 'ws1234';
# Grant all privileges to the new user you have created
mysql > GRANT ALL PRIVILEGES ON * . * TO 'weatherstation'@'localhost';
mysql > FLUSH PRIVILEGES;
```
2. Create a database with the name weatherstation while logged into your MySQL shell.
```sh
mysql > CREATE DATABASE weatherstation;
```
3. Open up terminal and navigate to where you want to store this project
4. Clone the repository and navigate inside it.
```sh
git clone https://github.com/batiyeh/weather-station-site
cd weather-station-site
```
5. Create a virtual envelope folder where we will install this project's requirements 
```sh
\weather-station-site\env\Scripts>python -m venv env
```
6. Activate the files within your env. After this step you should now have (env) listed on the left hand side of your terminal:  
```sh
. \weather-station-site\env\Scripts>activate
```
7. Install the requirements that come with the project:
```sh
pip install -r requirements.txt
```
8. Create the initial migration of the database: 
```sh
\weather-station-site>python manage.py makemigrations
\weather-station-site>python manage.py migrate
```
9. Run the server and navigate to the given IP address in your web browser (normally http://127.0.0.1:8000) 
```sh
python3 manage.py runserver
```


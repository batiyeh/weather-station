# Weather Station
Website to display the weather station data

## Endpoints
1. "" - Displays basic text index page

## How to Start the Development Server
1. Navigate into the root of the project directory with your terminal and run:
```sh
npm run dev
```

## File Structure
1. components/: Component classes which will be individually styled and placed into containers
2. containers/: Full page container (such as the "Connected Stations" page) which combines our components
3. styles/: All of our .css files are placed here
4. images/: All of our images are placed here
5. test/: React test files are placed here  

## Installing New Dependencies
1. If you want to install a new dependency to be used both in development and in production:
```sh
npm install packagename --save
```
2. If you want to install a new dependency only in development for testing purposes:
```sh
npm install packagename --save-dev
```

## Migrating Databases
1. Install knex, our query builder globally
```sh
npm install knex -g
```
2. Review the knex documentation for more information [here](http://knexjs.org/#Migrations)

## Install Node Server + Website
This project requires the following dependencies before continuing the install:
1. Node v9.5.0 - Install [here](https://nodejs.org/en/)
2. Yarn v1.3.2 - Install [here](https://yarnpkg.com/en/docs/install)
3. MySQL (On Mac OS, install via [homebrew](https://brew.sh). For Windows, go [here](https://dev.mysql.com/downloads/mysql/))
```sh
# Mac OS X only
brew install mysql
brew services start mysql
```

Database Setup:
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

After you have installed the above dependencies:
1. Using your terminal, cd into where you want to store your project directory.
2. Install nodemon globally and the server dependencies:
```sh
npm i nodemon -g
npm install
```
3. Clone the git repository 
```sh
git clone https://github.com/batiyeh/weather-station-site
```
4. Navigate inside the weather-station directory:
```sh
cd weather-station-site
```
5. Install all required dependencies for both the server and the website
```sh
npm install
cd website
npm install
```
6. Return to the root directory
```sh
cd ../
```
7. Create all necessary database tables
```sh
node schema.js
```
8. Run the development server
```sh
npm run dev
```


## Install Client Code on Raspberry Pi
This is meant to be used on a Raspberry Pi running Raspbian OS but can be installed for testing on Mac OS or Windows. We are officially supporting only Raspbian OS for now.

### Raspberry Pi
This project requires the following dependencies before continuing the install:
1. Python 3.5+

After you have installed the above dependencies:
1. Open up terminal and navigate to where you want to store this project
2. Clone the repository and navigate inside it.
```sh
git clone https://github.com/batiyeh/weather-station
cd weather-station/client
```
3. Create a virtual envelope folder where we will install this project's requirements 
```sh
python3 -m venv env
```
4. Activate the files within your env. After this step you should now have (env) listed on the left hand side of your terminal:  
```sh
. ./env/bin/activate
```
5. Install the requirements that come with the project:
```sh
pip install -r requirements.txt
```
6. Open up client.py in a text editor and ensure the websocket connection is going to the IP of your server. This will be changed in the future to be more automatic
```python
uri = 'ws://localhost:5000/weatherstations/'
# Change to be uri = 'ws://yourserverip:5000/weatherstations/'
```
7. Run the program
```sh
python3 client.py
```
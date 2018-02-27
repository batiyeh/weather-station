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
1. server
  * controllers/: Contains all routes for each controller type.
  * models/: Contains all bookshelf (our ORM) models for the database. Import these when accessing data.
  * migrations/: Contains all knex database migrations as well as our initial db setup file.
  * bookshelf.js & knex.js: Database configuration files
  * server.js: Starts our express server and maps controllers to urls
2. client/
  * client.py: Runs the client code meant to go on the Raspberry Pi
3. website/
  * components/: Component classes which will be individually styled and placed into containers
  * containers/: Full page container (such as the "Connected Stations" page) which combines our components
  * styles/: All of our .css files are placed here
  * images/: All of our images are placed here
  * test/: React test files are placed here  

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
2. Run latest migrations
```sh
npm run migrate
```
3. If you have any issues, rollback the database to the beginning
```sh
npm run rollback
```
4. Review the knex documentation for more information [here](http://knexjs.org/#Migrations)

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
npm install; cd website; npm install; cd ../
```
6. Create all necessary database tables
```sh
npm run migrate
```
7. Run the development server
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
git clone https://github.com/batiyeh/weather-station-site
cd weather-station/client
```
3. Install the requirements that come with the project:
```sh
sudo pip install -r pi-requirements.txt
```
4. Open up client.py in a text editor and ensure the websocket connection is going to the IP of your server. This will be changed in the future to be more automatic
```python
uri = 'ws://localhost:5000/weatherstations/'
# Change to be uri = 'ws://yourserverip:5000/weatherstations/'
```
5. Run the program with sudo
```sh
sudo python3 client.py
```

### Sensors
#### GPS
1. Ensure the GPS sensor and RPI is near a window or outside.

2. Install the necessary GPS libraries for data retrieval
```sh
sudo apt-get install gpsd gpsd-clients python-gps
```

3. Connect our device to the gpsd library socket
```sh
sudo gpsd /dev/ttyACM0 -F /var/run/gpsd.sock
```

4. Open the gpsd.sock file
```sh
sudo nano /etc/default/gpsd
```

5. Add the following lines to the bottom of the gpsd.sock file
```sh
# Other options you want to pass to gpsd
START_DAEMON="true"
GPSD_OPTIONS="/dev/ttyACM0"
DEVICE=""
USBAUTO="true"
GPSD_SOCKET="/var/run/gpsd.sock"
```

6. Reboot the Raspberry Pi.
```sh
sudo reboot
```

7. Test that it is working
```sh
cpgs -s
# Wait a minute or two for it to find a satellite
# If it is not working, try running step #2 again
```
#### Humidity and Temperature
1. Make sure that the sensor is open and not being covered by anything.

2. Connect the + wire to the 2 pin on the Pi which is for 5V of power.

3. Connect the - wire to the 6 pin on the Pi which is for Ground.

4. Connect the data wire to the 8 pin on the Pi which is for the GPIO 14.

For pin numbering check this website with the GPIO Pinout Diagram
https://www.jameco.com/Jameco/workshop/circuitnotes/raspberry-pi-circuit-note.html
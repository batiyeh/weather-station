# Weather Station
Website to display the weather station data

## Endpoints
1. "" - Displays basic text index page

## How to Start the Development Server
1. Navigate into the root of the project directory with your terminal and run:
```sh
yarn dev
```

## File Structure
1. components/: Component classes which will be individually styled and placed into containers
2. containers/: Full page container (such as the "Connected Stations" page) which combines our components
3. styles/: All of our .css files are placed here
4. images/: All of our images are placed here
5. test/: React test files are placed here  

## Install Node Server + Website
This project requires the following dependencies before continuing the install:
1. Node v9.5.0 - Install [here](https://nodejs.org/en/)

After you have installed the above dependencies:
1. Using your terminal, cd into where you want to store your project directory.
2. Install nodemon globally and the server dependencies:
```sh
npm i nodemon -g
yarn
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
yarn
cd website
yarn
```
6. Return to the root directory
```sh
cd ../
```
7. Run the development server
```sh
yarn dev
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
# Change to be ws.connect (("ws://yourip:8000/weatherstations/"))
```
7. Run the program
```sh
python3 client.py
```
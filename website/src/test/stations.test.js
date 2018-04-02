const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const loginPage = require('./pages/login.js')(driver);

describe('Station page selenium tests', () => {
    before(function(done) {
        this.timeout(10000); // Default timeout for mocha is too short for selenium
        driver.navigate().to('http://localhost:8000/')
        loginPage.enterUsername('test');
        loginPage.enterPassword('testing123');
        loginPage.login()
        .then(() => done())
    });

    it('List view', function(done) {
        driver.wait(until.elementLocated(By.id('list-content-id')), 10000);
        driver.findElement(By.id('list-content-id'))
        .then(() => done())
    });

    it('Grid view', function(done) {
        driver.findElement(By.css('#grid-view-btn')).click();
        driver.wait(until.elementLocated(By.id('grid-content-id')), 10000).then(()=>{
            driver.findElement(By.id('grid-content-id'))
        })
        .then(() => done())
    });

    it('Open station details', function(done) {
        driver.findElement(By.css('.station-card')).click();
        driver.wait(until.elementLocated(By.css('.station-detail-modal'))).then(()=>{
            driver.findElement(By.css('.station-detail-modal'))
        })
        .then(() => done())
    });

    after(function(done) {
        driver.quit().then(() => done())
    });
});

// describe('Testing stations endpoints', () => {
//     it('Getting all stations should return success', async () => {
//         const response = await request(app).get("/api/stations");
//         expect(response.statusCode).toBe(200);
//     });
// })
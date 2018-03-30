const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

module.exports = function(driver) {
    const elements = {
        usernameInput: By.css('#username'),
        passwordInput: By.css('#password'),
        loginButton: By.css('.login-btn'),
    };
    return {
        url:  'http://localhost:8000',
        elements: elements,
        waitUntilVisible: function() {
            return driver.wait(until.elementLocated(elements.usernameInput));
        },
        navigate: function() {
            driver.navigate().to(this.url);
            return this.waitUntilVisible();
        },
        enterUsername: function(value) {
            return driver.findElement(elements.usernameInput).sendKeys(value);
        },
        enterPassword: function(value){
            return driver.findElement(elements.passwordInput).sendKeys(value);
        },
        getUsername: function() {
            return driver.findElement(elements.usernameInput).getAttribute('value')
        },
        getPassword: function() {
            return driver.findElement(elements.passwordInput).getAttribute('value')
        },
        login: function() {
            return driver.findElement(elements.loginButton).click();
        },
    };
};
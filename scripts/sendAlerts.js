const knex = require('knex')(require('../knexfile'))

getAlerts = async () =>{
    var alerts = await knex('alerts')
    .select('alerts.alert_id', 'alerts.station_name', 'alerts.type', 'alerts.keyword', 'alerts.last_triggered', 'alertvalues.value', 'alertmethods.method', 'alerts.username')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .leftJoin('alertmethods', 'alerts.alert_id', '=', 'alertmethods.alert_id')

    return alerts;
}
getWeather = async () => {
    var weather = await knex('weather').select('w1.*', 'station_name', 'last_connected', 'connected').from('weather as w1').where('w1.created_at', function() {
        this.max('created_at').from('weather as w2').whereRaw('w2.apikey = w1.apikey')
    }).leftJoin('stations', 'stations.apikey', 'w1.apikey').orderBy('w1.created_at', 'desc')

    return weather;
}
comparison = async () => {
    var email = [];
    var sms = [];
    var webpage = [];
    var alerts = await getAlerts();
    var weather = await getWeather();
    console.log(weather);
    
    alerts.map(alerts =>{
        weather.map(weather =>{
            console.log(weather[alerts.type]);

        })
    })
}
above = async () =>{

}
comparison();




/*

1. Get all alerts + Values
2. Get all weather stations
3. 







*/
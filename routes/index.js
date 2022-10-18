var express = require('express');
var router = express.Router();
//const sql = require("msnodesqlv8");
//var database = require('../database');
//const sql = require('mssql/msnodesqlv8')
const database = require('../database')



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'AutoComplete Search in Node.js with MySQL' });
});

router.get('/get_data', function(request, response, next){

    var search_query = request.query.search_query;

    var query = `SELECT TOP 5 country_name FROM apps_countries WHERE country_name LIKE '%${search_query}%'`;

    database.query(query, function(error, data){
        console.log(data)
        response.json(data.recordset);

    });

});


module.exports = router;

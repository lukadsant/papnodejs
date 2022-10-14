var express = require('express');
var router = express.Router();
const sql = require("msnodesqlv8");
const database = require('../database');

/* GET users listing. */
//let database = null; 
//require('../database').then(pool => {
//    database = pool;
//});

router.get("/", function(request, response, next){

	var query = "SELECT * FROM PAP_CadernetaDadosSalvos_primary ORDER BY Data DESC";

	database.query(query, function(error, data){
		console.log(data)
		cafe=data
		//console.log('1',cafe.length)
		
		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Protocolo', {title:'PAP-Protocolo', action:'list', sampleData:data, message:request.flash('success')});
			console.log(data.length)
		}

	});

});

router.get("/:id/:data",function(request, response, next){
	var id = '2020202';
	var id = request.params.id;
	var datas = request.params.data;
	console.log(typeof(datas));
	var dateObject = new Date(datas);
	console.log('convetido',dateObject)
	datas=datas.split("-").reverse().join("-")
	datas = datas.replaceAll('-','/')
	//var datas = '12/09/2022';
	console.log(datas)

	var query = `SELECT * FROM PAP_CadernetaDadosSalvos_primary WHERE Matricula = ${id} AND Data LIKE '${datas}%'`;

	database.query(query, function(error, data){
		console.log(data)
		var objdata = data.recordset
		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Protocolo', {title:'PAP-Protocolo', action:'list', sampleData:objdata, message:request.flash('success')});
		}

	});

});

///############################## Adicionar Protocolo ############################## 

router.get("/add", function(request, response, next){

	response.render("Protocolo", {title:'PAP Protocolo-INSERIR DADOS', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = request.body.first_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	INSERT INTO sample_data 
	(first_name, last_name, age, gender) 
	VALUES ("${first_name}", "${last_name}", "${age}", "${gender}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{	
			request.flash('success','Dados da Rota adicionados')
			response.redirect("/Protocolo");
		}

	});

});


///############################## Editar Protocolo ############################## 

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('Protocolo', {title: 'PAP Protocolo - EDIT', action:'edit', sampleData:data[0]});

	});

});



router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var first_name = request.body.first_name;

	var last_name = request.body.first_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	UPDATE sample_data 
	SET first_name = "${first_name}", 
	last_name = "${last_name}", 
	age = "${age}", 
	gender = "${gender}" 
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success','Dados da Rota Atualizada')
			response.redirect('/Protocolo');
		}

	});

});

///############################## Remover Local ############################## 
router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM sample_data WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success','Dados da Rota Deletada')
			response.redirect("/Protocolo");
		}

	});

});

module.exports = router;

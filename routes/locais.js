var express = require('express');
var router = express.Router();

/* GET users listing. */
var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM PAP_Locais";

	database.query(query, function(error, data){
		console.log('------------------------- 1 ° console --- ',data)
		var cafe= 'asadasd'
		if(error)
		{
			throw error; 
		}
		else
		{
			var objdata = data.recordset
			//console.log('#############################',data)
			console.log("AKI AKI AKI AKI/*////////////////////////////////",typeof(objdata),objdata.length,"$$$$$$",objdata)
			response.render('locais', {title:'PAP-Locais zz', action:'list', sampleData:objdata, message:request.flash('success')});

		}

	});

});



///############################## Adicionar locais ############################## 

router.get("/add", function(request, response, next){

	response.render("locais", {title:'PAP Locais-INSERIR DADOS', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = request.body.first_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	INSERT INTO PAP_Locais 
	(Local, Rota, Em_Atividade)
	VALUES ('${first_name}', '${age}', '${gender}')
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{	
			request.flash('success','Dados da Rota adicionados')
			response.redirect("/locais");
		}

	});

});


///############################## Editar Locais ############################## 

router.get('/edit/:id', function(request, response, next){
	var id = request.params.id;

	var query = `SELECT * FROM PAP_Locais WHERE Local = '${id}'`;

	database.query(query, function(error, data){
		var objdata = data.recordset

		response.render('locais', {title: 'PAP LOCAIS - EDIT', action:'edit', sampleData:objdata[0]});

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
			response.redirect('/locais');
		}

	});

});

///############################## Remover Local ############################## 
router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM PAP_Locais WHERE Local = '${id}'
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success','Dados da Rota Deletada')
			response.redirect("/locais");
		}

	});

});

module.exports = router;

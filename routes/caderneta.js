var express = require('express');
var router = express.Router();

/* GET users listing. */
var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM PAP_DadosSalvos_primary ORDER BY id DESC";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{	
			var objdata = data.recordset
			response.render('caderneta', {title:'PAP-caderneta', action:'list', sampleData:objdata});
		}

	});

});



///############################## Adicionar locais ############################## 

router.get("/add", function(request, response, next){
	var id = 1

	var query = `SELECT * FROM PAP_CadernetaDadosSalvos_primary WHERE id = '${id}'`;

	database.query(query, function(error, data){
		var objdata = data.recordset

		response.render("caderneta", {title:'PAP-Caderneta', action:'add', sampleData:objdata[0]});
		//console.log(data)
	});
    

});

router.get("/add/:id", function(request, response, next){
	
	var id = request.params.id;
	var query = `SELECT * FROM PAP_CadernetaDadosSalvos_primary WHERE id = '${id}'`;

	console.log('add id',id)

	//console.log(request.body)


	database.query(query, function(error, data){
		//console.log(data.length===0,data.length)
		var objdata = data.recordset

		console.log(objdata.length==0,objdata.length)
		console.log('OBJDATA',objdata)

		if (objdata.length==0){

			response.redirect("/caderneta/add");

		}else{
			
			console.log('n deu bronca', objdata)
			response.render("caderneta", {title:'PAP-Caderneta', action:'add2',sampleData:objdata[0]});

		}
	});



});


router.post("/add_sample_data", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = "lucas"

	var age = request.body.age;

	var gender = request.body.autocomplete_searchzzz;

	var periodo = "2"
	var cur='MED'
	let date = new Date()
	console.log('card',date.toLocaleString())
	var rec = date.toLocaleString()

	var query = `
	INSERT INTO PAP_CadernetaDadosSalvos_primary 
	(Matricula, Estudante, Local, Periodo, Protocolo, Assinatura,Data) 
	VALUES ('${first_name}', '${last_name}', '${gender}','${cur}', '${periodo}', '${age}','${rec}') 
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{	
			request.flash('success','Dados da Rota adicionados')
			response.redirect("/caderneta/add");
		}

	});

});


///############################## Editar Locais ############################## 

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM PAP_DadosSalvos_primary WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('caderneta', {title: 'PAP-Caderneta', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var first_name = request.body.first_name;

	var last_name = request.body.first_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	UPDATE PAP_DadosSalvos_primary 
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
			response.redirect('/caderneta');
		}

	});

});

///############################## Remover Local ############################## 
router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM PAP_DadosSalvos_primary WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success','Dados da Rota Deletada')
			response.redirect("/caderneta");
		}

	});

});

module.exports = router;

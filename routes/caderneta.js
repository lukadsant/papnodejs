var express = require('express');
var router = express.Router();

/* GET users listing. */
var database = require('../database');
var database2 = require('../database2');

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
	var id = '2020202013'

	var query = `SELECT * FROM SEC0013_ALUNOS_MATRICULADOS_GERAL WHERE MATRÍCULA = '${id}'`;

	database2.query(query, function(error, data){
		console.log(data)

		var objdata = data.recordset

		response.render("caderneta", {title:'PAP-Caderneta', action:'add', sampleData:objdata[0]});
		//console.log(data)
	});
    

});

router.get("/add/:id", function(request, response, next){
	
	var id = request.params.id;
	var query = `SELECT * FROM SEC0013_ALUNOS_MATRICULADOS_GERAL WHERE MATRÍCULA = '${id}'`;

	console.log('add id',id)

	//console.log(request.body)


	database2.query(query, function(error, data){
		//console.log(data.length===0,data.length)
		var objdata = data.recordset

		console.log(objdata.length==0,objdata.length)
		console.log('OBJDATA',objdata)
		console.log('chegando 0',objdata[0])

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

	var last_name = request.body.namename;

	var age = request.body.age;

	var local = request.body.autocomplete_search_name;

	var periodo = request.body.pername;
	var cur=request.body.cursoname;
	let date = new Date()
	console.log('card',date.toLocaleString())
	var rec = date.toLocaleString()

	var query = `
	INSERT INTO PAP_CadernetaDadosSalvos_primary 
	(Matricula, Estudante, Local, Periodo, Protocolo, Assinatura,Data) 
	VALUES ('${first_name}', '${last_name}', '${local}','${periodo}', '${cur}', '${age}','${rec}') 
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

var express = require('express');
var router = express.Router();

/* GET users listing. */
var database = require('../database');

router.get("/", function(request, response, next){

	//var query = "SELECT * FROM PAP_Users";
    const query = "SELECT * FROM PAP_Locais";
    
    //database.connect().then((result) =>{
    //    if (result.connecting){
    //        console.log('con...')
    //    }
    //    if (result.connected){
    //        result.request().query(query,(err,result)=>{
    //            if (err){
    //                console.log('hata',err)
    //
    //            }
    //            console.log('result',result)
	//			response.render('presenca', {title:'PAP-presenca', action:'list', sampleData:data, message:request.flash('success')});
    //        })
    //        console.log('conected')
    //    }
    //})
	database.query(query, function(error, data){
		console.log('###############',data)
		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('presenca', {title:'PAP-presenca', action:'list', sampleData:data, message:request.flash('success')});
		}

	});

});



///############################## Adicionar locais ############################## 

router.get("/add", function(request, response, next){

	response.render("presenca", {title:'PAP-Presenças', action:'add'});
    

});


router.post("/add_sample_data", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = 'lucas'

	var age = request.body.age;

	var gender = request.body.autocomplete_searchzzz;

	var periodo = '2'
	var cur='MED'
	var rec = '27/09/2022'

	var query = `
	INSERT INTO PAP_DadosSalvos_primary 
	(Matricula, Estudante, Local, Curso, Periodo, Turno, Recebimento) 
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
			response.redirect("/presenca/add");
		}

	});

});


///############################## Editar Locais ############################## 

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM PAP_DadosSalvos_primary WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('presenca', {title: 'PAP presenca - EDIT', action:'edit', sampleData:data[0]});

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
			response.redirect('/presenca');
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
			response.redirect("/presenca");
		}

	});

});

module.exports = router;

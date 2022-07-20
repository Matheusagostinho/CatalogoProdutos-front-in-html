function loadTable() {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://localhost:7092/produtos");
	xhttp.send();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		console.log(this.responseText);
		var trHTML = ''; 
		const objects = JSON.parse(this.responseText);
		for (let object of objects) {
		  trHTML += '<tr>'; 
		  trHTML += '<td>'+object['id']+'</td>';
		  trHTML += '<td>'+object['nome']+'</td>';
		  trHTML += '<td>'+object['preco']+'</td>';
		  trHTML += '<td>'+object['descricao']+'</td>';
		  trHTML += '<td>'+object['url_imagem']+'</td>';
		  trHTML += '<td>'+object['categoria'].nome+'</td>';

		  trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showProdutoEditBox('+object['id']+')">Editar</button>';
		  trHTML += '<button type="button" class="btn btn-outline-danger" onclick="ProdutoDelete('+object['id']+')">Deletar</button></td>';
		  trHTML += "</tr>";
		}
		document.getElementById("mytable").innerHTML = trHTML;
	  }
	};
  }

  function loadCategorias() {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://localhost:7092/categorias");
	xhttp.send();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		console.log(this.responseText);
		var trHTML = '<select  style="display:block !important"  required   id="categoriaId" name="categoriaId">';
		trHTML += '<option value="">Escolha umca categoria</option>';
		const objects = JSON.parse(this.responseText);
		for (let object of objects) {
		  trHTML += '<option value="'+object['id']+'">'+object['nome']+'</option>';
		}
		trHTML += "</select>";
		document.getElementById("categoria_div").innerHTML = trHTML;
	  }else{

		var trHTML = '<select   style="display:block !important"  id="categoriaId" name="categoriaId">'; 
	
		 
		trHTML += "</select>";

		document.getElementById("categoria_div").innerHTML = trHTML;
		
	  }
	};
  }

  
  
  loadTable();



  function showProdutoCreateBox() {
	loadCategorias();
	Swal.fire({
	  title: 'Criar Produto',
	  html:
		'<input id="id" type="hidden">' +
		'<input id="nome" class="validate" placeholder="Nome">' +
		'<input id="preco" type="number" class="validate" placeholder="Preço">' +
		'<input id="descricao" class="validate" placeholder="Descrição">' +
		'<input id="url_imagem" class="validate" placeholder="URL Imagem">' +
		'<div id="categoria_div">',
	  focusConfirm: false,
	  preConfirm: () => {
		ProdutoCreate();
	  }
	})
  }
  
  function ProdutoCreate() {
	const nome = document.getElementById("nome").value;
	const preco = document.getElementById("preco").value;
	const descricao = document.getElementById("descricao").value;
	const url_imagem = document.getElementById("url_imagem").value;
	const categoriaId = document.getElementById("categoriaId").value;

	  
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://localhost:7092/produtos");
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({ 
	  "nome": nome, "preco": preco, "descricao": descricao, "url_imagem": url_imagem, 
	  "categoriaId": categoriaId
	}));
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && (this.status == 201 || this.status == 200) ) {
		const objects = JSON.parse(this.responseText);
		Swal.fire({
			icon: 'success',
			title: 'Criação...',
			text: 'Produto criado com sucesso !'
		  });
		loadTable();
	  }else{
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Um problema foi detectado !',
		  })
	  }
	};
  }



  function showProdutoEditBox(id) {
	loadCategorias();
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://localhost:7092/produtos/"+id);
	xhttp.send();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		const objects = JSON.parse(this.responseText);
		loadCategorias();
		Swal.fire({
		  title: 'Editar Produto',
		  html:
			'<input id="id" type="hidden" value='+objects['id']+'>' +
			'<input id="nome" class="validate" placeholder="Nome" value="'+objects['nome']+'">' +
			'<input id="preco" type="number" class="validate" placeholder="Preço" value="'+objects['preco']+'">' +
			'<input id="descricao" class="validate" placeholder="Descrição" value="'+objects['descricao']+'">' +
			'<input id="url_imagem" class="validate" placeholder="URL Imagem" value="'+objects['url_imagem']+'">' +
			'<div id="categoria_div">',
		  focusConfirm: false,
		  preConfirm: () => {
			ProdutoEdit();
			loadTable();

		  }
		})
	  }
	};
  }
  
  function ProdutoEdit() {
	const id = document.getElementById("id").value;
	const nome = document.getElementById("nome").value;
	const preco = document.getElementById("preco").value;
	const descricao = document.getElementById("descricao").value;
	const url_imagem = document.getElementById("url_imagem").value;
	const categoriaId =  document.getElementById("categoriaId").value;
	
	const xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "https://localhost:7092/produtos/"+id);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({ 
	   "nome": nome,"preco": preco,  "descricao": descricao, "url_imagem": url_imagem, "categoriaId": categoriaId
	}));
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		const objects = JSON.parse(this.responseText);
		Swal.fire({
			icon: 'success',
			title: 'Edição...',
			text: 'Produto editado com sucesso !'
		  });
		loadTable();
	  }else{
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Um problema foi detectado !',
		  })

	  }
	};
  }


  function ProdutoDelete(id) {

	Swal.fire({
		title: 'Apagar',
		text: "Você tem certeza ?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sim, deletar !'
	  }).then((result) => {
		if (result.isConfirmed) {

			const xhttp = new XMLHttpRequest();
			xhttp.open("DELETE", "https://localhost:7092/produtos/"+id);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send(JSON.stringify({ 
			  "id": id
			}));
			xhttp.onreadystatechange = function() {

				Swal.fire(
					'Deletado!',
					'O registro foi detaletado.',
					'success'
				  )


				loadTable();
			};


	
		}
	  })


  }


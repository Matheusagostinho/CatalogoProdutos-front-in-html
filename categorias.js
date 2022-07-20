function loadTable() {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://localhost:7092/categorias");
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
		  trHTML += '<td>'+object['descricao']+'</td>';
		 

		  trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCategoriaEditBox('+object['id']+')">Editar</button>';
		  trHTML += '<button type="button" class="btn btn-outline-danger" onclick="CategoriaDelete('+object['id']+')">Deletar</button></td>';
		  trHTML += "</tr>";
		}
		document.getElementById("mytable").innerHTML = trHTML;
	  }
	};
  }
  
  loadTable();



  function showCategoriaCreateBox() {
	Swal.fire({
	  title: 'Criar categoria',
	  html:
		'<input id="id" type="hidden">' +
		'<input id="nome" class="validate" placeholder="Nome">' +
		'<input id="descricao" class="validate" placeholder="Descrição">',
	  focusConfirm: false,
	  preConfirm: () => {
		CategoriaCreate();
	  }
	})
  }
  
  function CategoriaCreate() {
	const nome = document.getElementById("nome").value;
	const descricao = document.getElementById("descricao").value;
	
	  
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://localhost:7092/categorias");
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({ 
	  "nome": nome, "descricao": descricao
	}));
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && (this.status == 201 || this.status == 200) ) {
		const objects = JSON.parse(this.responseText);
		Swal.fire({
			icon: 'success',
			title: 'Criação...',
			text: 'Categoria criado com sucesso !'
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



  function showCategoriaEditBox(id) {
	console.log(id);
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://localhost:7092/categorias/"+id);
	xhttp.send();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		const objects = JSON.parse(this.responseText);
		console.log(objects)
		Swal.fire({
		  title: 'Editar Categoria',
		  html:
			'<input id="id" type="hidden" value='+objects['id']+'>' +
			'<input id="nome" class="validate" placeholder="Nome" value="'+objects['nome']+'">' +
			'<input id="descricao" class="validate" placeholder="Descrição" value="'+objects['descricao']+'">' ,
		  focusConfirm: false,
		  preConfirm: () => {
			CategoriaEdit();
		  }
		})
	  }
	};
  }
  
  function CategoriaEdit() {
	const id = document.getElementById("id").value;
	const descricao = document.getElementById("descricao").value;
	const nome = document.getElementById("nome").value;

	const xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "https://localhost:7092/categorias/"+id);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({ 
	  "id": id, "nome": nome,  "descricao": descricao
	}));
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		const objects = JSON.parse(this.responseText);
		Swal.fire({
			icon: 'success',
			title: 'Edição...',
			text: 'Categoria editado com sucesso !'
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


  function CategoriaDelete(id) {

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
			xhttp.open("DELETE", "https://localhost:7092/categorias/"+id);
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


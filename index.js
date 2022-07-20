function loadTable() {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://localhost:7092/usuarios");
	xhttp.send();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		console.log(this.responseText);
		var trHTML = ''; 
		const objects = JSON.parse(this.responseText);
		for (let object of objects) {
		  trHTML += '<tr>'; 
		  trHTML += '<td>'+object['id']+'</td>';
		  trHTML += '<td>'+object['name']+'</td>';
		  trHTML += '<td>'+object['phone']+'</td>';
		  trHTML += '<td>'+object['adress']+'</td>';
		  trHTML += '<td>'+object['email']+'</td>';
		  trHTML += '<td>'+object['password']+'</td>';
		  trHTML += '<td>'+object['type']+'</td>';

		  trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Editar</button>';
		  trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Deletar</button></td>';
		  trHTML += "</tr>";
		}
		document.getElementById("mytable").innerHTML = trHTML;
	  }
	};
  }
  
  loadTable();



  function showUserCreateBox() {
	Swal.fire({
	  title: 'Criar usuário',
	  html:
		'<input id="id" type="hidden">' +
		'<input id="name" class="swal2-input" placeholder="Nome">' +
		'<input id="phone" onkeydown="return mascaraTelefone(event)" class="swal2-input" placeholder="Telefone">' +
		'<input id="adress" class="swal2-input" placeholder="Endereço">' +
		'<input id="email" type="email" class="swal2-input" placeholder="Email">'+
		'<input id="password" type="password" class="swal2-input" placeholder="Senha">'+
		'<input id="type" class="swal2-input" placeholder="Tipo">',
	  focusConfirm: false,
	  preConfirm: () => {


		userCreate();
	  }
	})
  }
  
  function userCreate() {



	const name = document.getElementById("name").value;
	const phone = document.getElementById("phone").value;
	const adress = document.getElementById("adress").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const type = document.getElementById("type").value;
	  
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://localhost:7092/usuarios");
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({ 
	  "name": name, "phone": phone, "adress": adress, "email": email, 
	  "password": password,"type": type
	}));
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && (this.status == 201 || this.status == 200) ) {
		const objects = JSON.parse(this.responseText);
		Swal.fire({
			icon: 'success',
			title: 'Criação...',
			text: 'Usuário criado com sucesso !'
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



  function showUserEditBox(id) {
	console.log(id);
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://localhost:7092/usuarios/"+id);
	xhttp.send();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		const objects = JSON.parse(this.responseText);
		console.log(objects)
		Swal.fire({
		  title: 'Editar usuário',
		  html:
			'<input id="id" type="hidden" value='+objects['id']+'>' +
			'<input id="adress" class="swal2-input" placeholder="Endereço" value="'+objects['adress']+'">' +
			'<input id="name" class="swal2-input" placeholder="Nome" value="'+objects['name']+'">' +
			'<input id="password" type="password" class="swal2-input" placeholder="Senha" value="'+objects['password']+'">' +
			'<input id="phone" onkeydown="return mascaraTelefone(event)" class="swal2-input" placeholder="Telefone" value="'+objects['phone']+'">' +
			'<input id="type" class="swal2-input" placeholder="tipo" value="'+objects['type']+'">' +
			'<input id="email" type="email" class="swal2-input" placeholder="Email" value="'+objects['email']+'">',
		  focusConfirm: false,
		  preConfirm: () => {
			userEdit();
		  }
		})
	  }
	};
  }
  
  function userEdit() {
	const id = document.getElementById("id").value;
	const adress = document.getElementById("adress").value;
	const password = document.getElementById("password").value;
	const phone = document.getElementById("phone").value;
	const email = document.getElementById("email").value;
	const type = document.getElementById("type").value;
	const name = document.getElementById("name").value;

	const xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "https://localhost:7092/usuarios/"+id);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({ 
	  "id": id, "adress": adress,"name": name,  "password": password, "phone": phone, "email": email, "type": type
	}));
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		const objects = JSON.parse(this.responseText);
		Swal.fire({
			icon: 'success',
			title: 'Edição...',
			text: 'Usuário editado com sucesso !'
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


  function userDelete(id) {

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
			xhttp.open("DELETE", "https://localhost:7092/usuarios/"+id);
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


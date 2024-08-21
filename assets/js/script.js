const sobre = document.querySelector('#about')
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
const formulario = document.querySelector('#formulario')
//Consumir API do github para pegar informações de seguidores do github
async function getApiGithub(){
    try{
        const api = await fetch(`https://api.github.com/users/claramamute`) //Pegou dados
        const perfil = await api.json() // converter para JSON

        let conteudo = ` 
            <img src="${perfil.avatar_url}" alt="Foto do Perfil - ${perfil.name}" width="450px">
           
            <article id="sobre_texto">
                <h1>Sobre mim</h1>
                <p>
                    ${perfil.bio}  
                </p>

                <div id="sobre_github" class="flex sobre_github">

                    <a target="_blank" href="${perfil.html_url}" class="botao">Github</a>

                    <p>${perfil.followers} Seguidores</p>

                    <p>${perfil.public_repos}  Repositórios</p>
                </div>
            </article>`
        
        sobre.innerHTML = conteudo
    }catch(error){
        console.log(error)
    }
}

// Função de validação do formulário
formulario.addEventListener('submit', function(event) {
  
    // Impede o envio do Formulário
    event.preventDefault();
  
    const campoNome = document.querySelector('#name');
    const txtNome = document.querySelector('#textNome');
  
    // Valida o campo name
    if (campoNome.value.length < 3) {
      txtNome.innerHTML = 'O Nome deve ter no minimo 3 caracteres.';
      campoNome.focus();
      return;
    }else{
      txtNome.innerHTML = '';
    }
  
    const campoEmail = document.querySelector('#email');
    const txtEmail = document.querySelector('#textEmail');
  
     // Valida o campo e-mail
    if (!campoEmail.value.match(emailRegex)) {
      txtEmail.innerHTML = 'Digite um E-mail válido.';
      campoEmail.focus();
      return;
    }else{
      txtEmail.innerHTML = '';
    }
  
    const campoSubject = document.querySelector('#subject');
    const txtSubject = document.querySelector('#textSubject');
  
     // Valida o campo subject
    if (campoSubject.value.length < 5) {
      txtSubject.innerHTML = 'O Assunto deve ter no minimo 5 caracteres.';
      campoSubject.focus();
      return;
    }else{
      txtSubject.innerHTML = '';
    }

    // Se todas as validações forem concluídas com êxito, envia o formulário
    formulario.submit();
  
  });


getApiGithub()
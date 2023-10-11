const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

document.getElementById('formulario').addEventListener('submit', async (evento) =>{
    evento.preventDefault();

const url = 'http://localhost:8080/associados';
const nome = document.getElementById('nome').value;
const cpf = document.getElementById('cpf').value;

const data = {
    nome: nome,
    cpf: cpf
};

    try{

        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        // PAREI AQUI ESTAVA TENTANDO FAZER APRESENTAR O ERRO DE RESPOSTA DA API ABAIXO DO CAMPO DO CPF
        if(!response.ok){
            throw new Error('Erro na requisição');
        }

        const responseData = await response.json();
        console.log('Resposta da API:', responseData);
        setTimeout(() => {
            window.location.href = 'cadastro-finalizado.html';
          }, 2000);
        
    } catch(erro) {
        mensagemErro.innerHTML = `<p>CPF inválido ou já cadastrado. Tente novamente!</p>`
        console.log(erro)
    }
    
    posCadastroHandler(responseData);
});

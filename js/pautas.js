document.getElementById('formulario').addEventListener('submit', async (evento) =>{
    evento.preventDefault();

const url = 'http://localhost:8080/pautas';
const titulo = document.getElementById('titulo').value;
const descricao = document.getElementById('descricao').value;

const data = {
    titulo: titulo,
    descricao: descricao
};

    try{

        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log('Resposta da API:', responseData);
        setTimeout(() => {
            window.location.href = 'pauta-finalizado.html';
          }, 2000);
        
    } catch(erro) {
        console.log(erro)
    }
    
    posCadastroHandler(responseData);
});


document.getElementById('formulario').addEventListener('submit', async (evento) =>{
    evento.preventDefault();

    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    const url = 'http://localhost:8080/sessao';
    const NumeroPauta = document.getElementById('numeroPauta').value;
    const duracao = document.getElementById('duracao').value;

    const data = {
        idPauta: NumeroPauta,
        duracaoEmMinutos: duracao
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
                window.location.href = 'sessao-aberta.html';
              }, 2000);
            
        } catch(erro) {
            mensagemErro.innerHTML = `<p>Numero de pauta inválido ou já existente.</p>`
            console.log(erro)
        }
});


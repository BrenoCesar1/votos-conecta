const numeroSessaoInput = document.getElementById('numero_sessao');
const botaoLupa = document.getElementById('buscar_sessao');
const botaoSessao = document.getElementById('botaoSessaoVotar');
const numeroCadastroInput = document.getElementById('numeroCadastro');
const votoInput = document.getElementById('voto');

botaoLupa.addEventListener('click', () => {
    const numeroSessao = numeroSessaoInput.value;
    console.log(numeroSessao);
    obterDadosSessao(numeroSessao);
});

botaoSessao.addEventListener('click', () => {
    const numeroSessao = numeroSessaoInput.value;
    const numeroCadastro = numeroCadastroInput.value;
    console.log(numeroCadastro);
    const voto = votoInput.value;
    enviarVoto(numeroSessao, numeroCadastro, voto);
});

async function obterDadosSessao(numeroSessao) {
    try {
        const data = await fetchAPI(`http://localhost:8080/sessao/${numeroSessao}`);
        exibirDadosSessao(data.pauta);
    } catch (error) {
        console.error('Erro ao obter dados da sessão:', error);
        exibirMensagemErro('Número de sessão inválido.');
        document.getElementById('borda').style.display = 'none';
        document.getElementById('bordaDescricao').style.display = 'none';
        limparDadosSessao();
    }
}

async function enviarVoto(numeroSessao, numeroCadastro, voto) {
    try {
        await fetchAPI('http://localhost:8080/votos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf: numeroCadastro,
                numeroDaSessao: numeroSessao,
                voto: voto
            })
        });

        // Após o voto ser enviado com sucesso, atualize os dados da sessão
        obterDadosSessao(numeroSessao);

        exibirMensagemSucesso();
    } catch (error) {
        exibirMensagemErro('Erro ao enviar voto.');
    }
}

function fetchAPI(url, options = {}) {
    return fetch(url, options).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição à API.');
        }
        return response.json();
    });
}

function exibirDadosSessao(pauta) {
    document.getElementById('labelTitulo').innerText = 'Título:';
    document.getElementById('tituloPauta').innerText = pauta.titulo;
    document.getElementById('labelDescricao').innerText = 'Descrição:';
    document.getElementById('descricaoPauta').innerText = pauta.descricao;
    document.getElementById('separa_card').style.display = 'flex';
    document.getElementById('borda').style.opacity = '1';
    document.getElementById('bordaDescricao').style.opacity = '1';
    document.getElementById('qtdeSim').innerText = `Votos Sim: ${pauta.votosSim}`;
    document.getElementById('qtdeNao').innerText = `Votos Não: ${pauta.votosNao}`;
    document.getElementById('erroVoto').innerText = ''; // Limpa a mensagem de erro, caso exista
}

function limparDadosSessao() {
    const elementos = ['labelTitulo', 'tituloPauta', 'labelDescricao', 'descricaoPauta'];
    elementos.forEach(elementoId => {
        document.getElementById(elementoId).innerText = '';
    });
    document.getElementById('separa_card').style.display = 'none';
    document.getElementById('qtdeSim').innerText = '';
    document.getElementById('qtdeNao').innerText = '';
}

function exibirMensagemSucesso() {
    Swal.fire({
        title: 'Voto Cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }); 
    
      numeroCadastroInput="";
      const votoInput="";
}

function exibirMensagemErro(mensagem) {
    document.getElementById('erroVoto').innerText = mensagem;
    exibirMensagem('mensagemErro');
}

function exibirMensagem(id) {
    const mensagemElement = document.getElementById(id);
    mensagemElement.style.display = 'block';
    setTimeout(() => {
        mensagemElement.style.display = 'none';
    }, 3000);
}

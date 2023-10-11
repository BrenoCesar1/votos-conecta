document.addEventListener('DOMContentLoaded', async () => {
  try {
    const url = 'http://localhost:8080/sessao/ultimoCadastro';
    const response = await fetch(url);
    const responseData = await response.json();
    handleCadastro(responseData);
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
});

function handleCadastro(data) {
  if (!data) {
    console.error('Nenhum cadastro encontrado.');
    return;
  }

  const informacoes = document.getElementById('informacoes');
  const { id, pauta, tempoRestante } = data;
  console.log(data);
  const contadorElemento = document.getElementById('relogio');
  document.getElementById('borda').style.opacity = '1';
  document.getElementById('bordaTitulo').style.opacity = '1';
  document.getElementById('labelIdSessao').innerText = 'ID Sessao:'
  informacoes.querySelector('#idSessao').textContent = `${id}`;
  document.getElementById('labelId').innerText = 'ID Pauta:'
  informacoes.querySelector('#NumeroPauta').textContent = `${pauta.id}`;
  document.getElementById('labelTitulo').innerText = 'Título:';
  document.getElementById('tituloPauta').innerText = pauta.titulo;
  document.getElementById('labelDescricao').innerText = 'Descrição:';
  document.getElementById('descricaoPauta').innerText = pauta.descricao;
  document.getElementById('separa_card').style.display = 'flex';
  document.getElementById('qtdeSim').innerText = `Votos Sim: ${pauta.votosSim}`;
  document.getElementById('qtdeNao').innerText = `Votos Não: ${pauta.votosNao}`;

  iniciarContagemRegressiva(tempoRestante, contadorElemento);
}

function iniciarContagemRegressiva(temposRestante, contadorElemento) {
  const intervalo = setInterval(() => {
    if (temposRestante === "00:00:00") {
      clearInterval(intervalo);
      contadorElemento.textContent = 'tempo encerrado!';
      return;
    }  
    
    const partesTempo = temposRestante.split(":");
    let horas = parseInt(partesTempo[0], 10);
    let minutos = parseInt(partesTempo[1], 10);
    let segundos = parseInt(partesTempo[2], 10);
    
    if (segundos > 0) {
      segundos--;
    } else {
      if (minutos > 0) {
        minutos--;
        segundos = 59;
      } else {
        if (horas > 0) {
          horas--;
          minutos = 59;
          segundos = 59;
        }
      }
    }

    temposRestante = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    contadorElemento.textContent = temposRestante;
  }, 1000);
}

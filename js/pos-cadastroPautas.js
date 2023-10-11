
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const url = 'http://localhost:8080/pautas/ultimoCadastro';
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

      // Obtém as referências para as divs pelo ID
      const idPautaDiv = document.getElementById('pautaId');
      const tituloDiv = document.getElementById('pautaTitulo');
      const descricaoDiv = document.getElementById('pautaDescricao');
  
      console.log(data);
      // Atualiza o conteúdo das divs com os dados da resposta da API
      document.getElementById('labelId').innerText = 'ID:';
      idPautaDiv.innerText = `${data.id}`;
      document.getElementById('labelTitulo').innerText = 'Título:';
      tituloDiv.innerText = `${data.titulo}`;
      document.getElementById('labelDescricao').innerText = 'Descrição:';
      descricaoDiv.innerText = `${data.descricao}`;
      document.getElementById('borda').style.opacity = '1';
      document.getElementById('bordaDescricao').style.opacity = '1';
  
      console.log(idPautaDiv);
      console.log(tituloDiv);
      console.log(descricaoDiv);
  }
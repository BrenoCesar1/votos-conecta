
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const url = 'http://localhost:8080/associados';
    const response = await fetch(url);
    const responseData = await response.json();

    
    if(responseData && responseData.content && responseData.content.length > 0){
      const ultimoCadastro = responseData.content[responseData.content.length - 1];
      console.log('Ultimo cadastro:', ultimoCadastro);
      posCadastroHandler(responseData, ultimoCadastro);
      
      } else{
        console.error('Nenhum cadastro encontrado na resposta da API.');
      }  
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
});

function posCadastroHandler(responseData, ultimoCadastro) {
  if(ultimoCadastro){
    // Obtém as referências para as divs pelo ID
    const idAssociadoDiv = document.getElementById('id_associado');
    const nomeDiv = document.getElementById('nomeAssociado');
    const numeroCpfDiv = document.getElementById('numero_CPF');

    console.log(responseData);
    // Atualiza o conteúdo das divs com os dados da resposta da API
    document.getElementById('labelId').innerText = 'ID:';
    idAssociadoDiv.innerText = `${ultimoCadastro.id}`;
    document.getElementById('labelNome').innerText = 'Nome:';
    nomeDiv.innerText = `${ultimoCadastro.nome}`;
    document.getElementById('labelCpf').innerText = 'CPF:';
    numeroCpfDiv.innerText = `${ultimoCadastro.cpf}`;
    document.getElementById('borda').style.opacity = '1';
    document.getElementById('bordaDescricao').style.opacity = '1';

    
  } else {
    console.error('Nenhum cadastro encontrado.');
  } 
}
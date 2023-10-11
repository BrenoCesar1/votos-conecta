document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function () {
                // Obtém o índice do slide ativo
                var activeIndex = this.activeIndex;

                // Array de descrições correspondentes a cada imagem
                var descriptions = [
                    '1° Cadastre seu nome com CPF válido!',
                    '2° Cadastre uma pauta com título e descrição a ser votada!',
                    '3° Guarde o ID específico da sua pauta cadastrada!',
                    '4° Abra a sessão utilizando um ID de pauta válido, e defina o tempo de abertura em minutos.',
                    '5° Guarde o ID da sessão especifica para que outros associados possam votar na sua pauta.',
                    '6° Utilize o ID da sessão, e a suas informações cadastradas para realizar votações.',
                    // Adicione mais descrições conforme necessário
                ];

                // Seleciona o elemento de descrição e atualiza o conteúdo
                var etapasElement = document.getElementById('etapas');
                etapasElement.innerHTML = descriptions[activeIndex];
            },
        },
    });
});


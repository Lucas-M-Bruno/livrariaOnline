//PRIMEIRA PARTE PARA SOMAR O QUANTO TENHO DE ITENS NO CARRINHO
const buttons = document.querySelectorAll('.shop');
const shopCarQtd = document.getElementById('shopCarValue');
let shopCar = 0;
let valorTotal = 0;
const empty = document.getElementById('empty');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        shopCar++
        shopCarQtd.textContent = shopCar;
    })
});

//CONTEUDO ADICIONADO AO CARRINHO  
// Seleciona a lista do carrinho onde os itens serão adicionados
const lista = document.getElementById('cart-list');

// Percorre cada botão e adiciona um evento de clique
buttons.forEach(botoes => {
    botoes.addEventListener('click', (event) => {
        // Encontra o contêiner pai .img-container do botão clicado
        let imgContainer = event.target.closest('.img-container');

        // Dentro do contêiner, encontra a div .prod-info
        let conteudo = imgContainer.querySelector('.prod-info');

        // Cria um novos elementos para adicionar na lista
        let novoItem = document.createElement('li');
        novoItem.classList.add('list-itens');

        // Copia o conteúdo HTML da div.prod-info
        let conteudoHTML = conteudo.innerHTML;

        // Insere o conteúdo dentro do novo <li>
        novoItem.innerHTML = conteudoHTML;

        novoItem.innerHTML = `
            ${conteudo.innerHTML}
            <button class="remove">
                <i class="fa-solid fa-trash"></i>
            </button>`;

        // Adiciona o <li> na lista de carrinho
        lista.appendChild(novoItem);

        //REMOVER LINHA
        const removeBtn = novoItem.querySelector('.remove');
        removeBtn.addEventListener('click', () => {
            novoItem.remove();
            shopCar--;
            shopCarQtd.textContent = shopCar;

            const priceElement = novoItem.querySelector('.price');
            let valor = priceElement.innerText.replace("R$", "").replace(",", ".");
            valorTotal = Math.max(0, valorTotal - parseFloat(valor));



            const soma = document.getElementById('valorFinal');
            soma.textContent = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;

            if (lista.children.length === 0) {
                empty.style.display = 'block';
            };
        });


        if (lista.children.length > 0) {
            empty.style.display = 'none';
        };
    });

    //SOMA OS VALORES DOS LIVROS
    botoes.addEventListener('click', (event) => {
        const priceElement = event.target.closest('.img-container').querySelector('.price');
        console.log(priceElement);

        let valor = priceElement.innerText.replace("R$", "").replace(",", ".");
        console.log(valor);

        valorTotal += parseFloat(valor);

        const soma = document.getElementById('valorFinal');
        soma.textContent = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    });

    console.log(empty);
});

//PARTE DOS FILTROS ATUALIZANDO URL
const filterLinks = document.querySelectorAll('.filter');
const filterContent = document.querySelectorAll('.img-container');

filterLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const filter = link.getAttribute('href').split('=')[1]; // Obtém o filtro da URL

        // Mostra ou oculta os itens com base no filtro
        filterContent.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

//PARTE DA BARRA DE BUSCA
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const valueIn = formatString(event.target.value);

    const books = document.querySelectorAll('.img-container');
    const noResults = document.getElementById('noResults');

    let haveResult = false;

    books.forEach(item => {
        const bookName = item.querySelector('.bookName').textContent;

        if (formatString(bookName).indexOf(valueIn) !== -1) {
            item.style.display = 'block'

            haveResult = true;
        } else {
            item.style.display = 'none'
        }
    })

    if (haveResult) {
        noResults.style.direction = 'block';
    } else {
        noResults.style.direction = 'none';
    }
});

function formatString(valueIn) {
    return valueIn
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

//MUDAR DE PAGINA PRINCIPAL PARA FINALIZAR A COMPRA

const cartBtn = document.getElementById('shop-cart');
const section1 = document.getElementById('shop-page');
const section2 = document.getElementById('shop-ending');

cartBtn.addEventListener('click', () => {
    section1.style.display = 'none';
    section2.style.display = 'block';
});

//SAIR DA PAGINA DE FINALIZAR PARA COMPRAR MAIS

const goBack =  document.getElementById('goBack');
const home = document.getElementById('home');

goBack.addEventListener('click', () => {
    section2.style.display = 'none';
    section1.style.display = 'flex';
});

home.addEventListener('click', () => {
    section2.style.display = 'none';
    section1.style.display = 'flex';
});

//ACIONAR O FINALIZADOR DE COMPRA
const finish = document.getElementById('finish');
const wrapper = document.getElementById('wrapper');

finish.addEventListener('click', () => {
    wrapper.style.display = 'block'
});

//VALIDAÇOES DE DADOS






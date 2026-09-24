let categoriaSelecionada = "Todos";
let termoBusca = "";
const produtos = CATALOGO.map(
  (p) => new Produto(p.codigo, p.nome, p.categoria, p.preco, p.estoque, p.imagem)
);
const carrinho = new Carrinho();

const pegar = (id) => document.getElementById(id);
const moeda = (valor) => valor.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const formatarMoeda = moeda;

const elementos = {
  produtos: pegar("listaProdutos"),
  categorias: pegar("listaCategorias"),
  mensagem: pegar("mensagemBusca"),
  itens: pegar("itensCarrinho"),
  contador: pegar("contadorCarrinho"),
  painel: pegar("painelCarrinho"),
  fundo: pegar("fundoEscuro"),
  modal: pegar("modal"),
  modalTitulo: pegar("modalTitulo"),
  modalConteudo: pegar("modalConteudo"),
  confirmar: pegar("modalConfirmar"),
  cancelar: pegar("modalCancelar"),
};

function mostrarCategorias() {
  const categorias = ["Todos", ...new Set(produtos.map((p) => p.categoria))];
  elementos.categorias.innerHTML = categorias
    .map((categoria) => `<button class="categoria ${categoria === categoriaSelecionada ? "ativa" : ""}" data-categoria="${categoria}">${categoria}</button>`)
    .join("");
}

function produtosFiltrados() {
  return produtos.filter((produto) => {
    const mesmaCategoria = categoriaSelecionada === "Todos" || produto.categoria === categoriaSelecionada;
    const mesmoNome = produto.nome.toLowerCase().includes(termoBusca.toLowerCase());
    return mesmaCategoria && mesmoNome;
  });
}

function mostrarProdutos() {
  const lista = produtosFiltrados();
  elementos.produtos.innerHTML = lista.map((produto) => `
    <article class="card">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="card-corpo">
        <span class="categoria-tag">${produto.categoria}</span>
        <h3>${produto.nome}</h3>
        <p class="preco">${produto.precoFormatado()}</p>
        <p class="estoque ${produto.temEstoque() ? "" : "indisponivel"}">${produto.situacao()}</p>
        <button class="botao-principal" data-adicionar="${produto.codigo}" ${produto.temEstoque() ? "" : "disabled"}>
          ${produto.temEstoque() ? "Adicionar ao carrinho" : "Indisponível"}
        </button>
      </div>
    </article>`).join("");

  elementos.mensagem.textContent = lista.length ? "" : "Nenhuma camisa encontrada. Tente outro nome ou categoria.";
  elementos.mensagem.classList.toggle("oculto", lista.length > 0);
}

function mostrarCarrinho() {
  elementos.itens.innerHTML = carrinho.estaVazio()
    ? '<p class="mensagem">Seu carrinho está vazio. Escolha sua camisa!</p>'
    : carrinho.itens.map((item) => `
      <div class="item">
        <img src="${item.produto.imagem}" alt="${item.produto.nome}">
        <div class="item-info">
          <h4>${item.produto.nome}</h4>
          <small>Unitário ${moeda(item.produto.preco)} | Subtotal ${moeda(item.subtotal())}</small>
          <div class="quantidade">
            <button data-diminuir="${item.produto.codigo}" aria-label="Diminuir quantidade">−</button>
            <span>${item.quantidade}</span>
            <button data-aumentar="${item.produto.codigo}" aria-label="Aumentar quantidade">+</button>
            <button class="remover" data-remover="${item.produto.codigo}">Remover</button>
          </div>
        </div>
      </div>`).join("");

  pegar("totalItens").textContent = carrinho.totalItens();
  elementos.contador.textContent = carrinho.totalItens();
  pegar("subtotal").textContent = moeda(carrinho.subtotal());
  pegar("desconto").textContent = "- " + moeda(carrinho.desconto());
  pegar("valorFinal").textContent = moeda(carrinho.valorFinal());
}

function atualizar() {
  mostrarProdutos();
  mostrarCarrinho();
}

function abrirCarrinho() {
  elementos.painel.classList.add("aberto");
  elementos.fundo.classList.add("ativo");
}

function fecharCarrinho() {
  elementos.painel.classList.remove("aberto");
  elementos.fundo.classList.remove("ativo");
}

function aviso(texto) {
  document.querySelector(".aviso")?.remove();
  const caixa = document.createElement("div");
  caixa.className = "aviso";
  caixa.textContent = texto;
  document.body.appendChild(caixa);
  setTimeout(() => caixa.remove(), 2200);
}

function adicionar(codigo) {
  const produto = produtos.find((p) => p.codigo === codigo);
  if (!produto) return;

  const resultado = carrinho.adicionar(produto);
  if (resultado === "limite") return aviso("Você atingiu o estoque disponível desta camisa.");
  if (resultado === "sem-estoque") return aviso("Produto sem estoque no momento.");

  aviso(produto.nome + " adicionado ao carrinho.");
  abrirCarrinho();
  atualizar();
}

function alterarQuantidade(codigo, acao) {
  const resultado = carrinho[acao](codigo);
  if (resultado === "limite") aviso("Quantidade maior que o estoque disponível.");
  atualizar();
}

function finalizarCompra() {
  if (carrinho.estaVazio()) return aviso("Adicione pelo menos uma camisa antes de finalizar.");

  const linhas = carrinho.itens.map((item) => `
    <div class="modal-linha"><span>${item.quantidade}x ${item.produto.nome}</span><span>${moeda(item.subtotal())}</span></div>`).join("");
  elementos.modalTitulo.textContent = "Resumo da compra";
  elementos.modalConteudo.innerHTML = linhas + `
    <div class="modal-linha"><span>Subtotal</span><span>${moeda(carrinho.subtotal())}</span></div>
    <div class="modal-linha"><span>Desconto</span><span>- ${moeda(carrinho.desconto())}</span></div>
    <div class="modal-linha"><strong>Valor final</strong><strong>${moeda(carrinho.valorFinal())}</strong></div>`;
  elementos.confirmar.classList.remove("oculto");
  elementos.cancelar.textContent = "Voltar";
  elementos.modal.classList.add("ativo");
}

function confirmarCompra() {
  const total = moeda(carrinho.valorFinal());
  carrinho.esvaziar();
  atualizar();
  fecharCarrinho();
  elementos.modalTitulo.textContent = "Compra concluída com sucesso!";
  elementos.modalConteudo.innerHTML = `<p>Obrigado por comprar na L&amp;S Imports. O valor pago foi de <strong>${total}</strong> e sua camisa será enviada em até 20 dias.</p>`;
  elementos.confirmar.classList.add("oculto");
  elementos.cancelar.textContent = "Fechar";
}

elementos.categorias.addEventListener("click", (evento) => {
  const categoria = evento.target.dataset.categoria;
  if (!categoria) return;
  categoriaSelecionada = categoria;
  mostrarCategorias();
  mostrarProdutos();
});

elementos.produtos.addEventListener("click", (evento) => {
  const codigo = Number(evento.target.dataset.adicionar);
  if (codigo) adicionar(codigo);
});

elementos.itens.addEventListener("click", (evento) => {
  const alvo = evento.target.dataset;
  if (alvo.aumentar) alterarQuantidade(Number(alvo.aumentar), "aumentar");
  if (alvo.diminuir) alterarQuantidade(Number(alvo.diminuir), "diminuir");
  if (alvo.remover) {
    carrinho.remover(Number(alvo.remover));
    atualizar();
  }
});

pegar("campoBusca").addEventListener("input", (evento) => {
  termoBusca = evento.target.value;
  mostrarProdutos();
});
pegar("botaoCarrinho").addEventListener("click", abrirCarrinho);
pegar("fecharCarrinho").addEventListener("click", fecharCarrinho);
elementos.fundo.addEventListener("click", fecharCarrinho);
pegar("botaoFinalizar").addEventListener("click", finalizarCompra);
elementos.confirmar.addEventListener("click", confirmarCompra);
elementos.cancelar.addEventListener("click", () => elementos.modal.classList.remove("ativo"));

mostrarCategorias();
atualizar();
class Produto {
  constructor(codigo, nome, categoria, preco, estoque, imagem) {
    this.codigo = codigo;
    this.nome = nome;
    this.categoria = categoria;
    this.preco = preco;
    this.estoque = estoque;
    this.imagem = imagem;
  }

  temEstoque() {
    return this.estoque > 0;
  }

  precoFormatado() {
    return formatarMoeda(this.preco);
  }

  situacao() {
    if (this.estoque === 0) {
      return "Indisponivel";
    } else if (this.estoque <= 4) {
      return "Ultimas " + this.estoque + " unidades";
    } else {
      return this.estoque + " em estoque";
    }
  }
}

class ItemCarrinho {
  constructor(produto, quantidade) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  subtotal() {
    return this.produto.preco * this.quantidade;
  }
}

class Carrinho {
  constructor() {
    this.itens = [];
    this.limiteDesconto = 300;
    this.percentualDesconto = 0.1;
  }

  buscarItem(codigo) {
    for (let i = 0; i < this.itens.length; i++) {
      if (this.itens[i].produto.codigo === codigo) {
        return this.itens[i];
      }
    }
    return null;
  }

  adicionar(produto) {
    if (!produto.temEstoque()) {
      return "sem-estoque";
    }

    const item = this.buscarItem(produto.codigo);

    if (item === null) {
      this.itens.push(new ItemCarrinho(produto, 1));
      return "adicionado";
    }

    if (item.quantidade >= produto.estoque) {
      return "limite";
    }

    item.quantidade = item.quantidade + 1;
    return "adicionado";
  }

  aumentar(codigo) {
    const item = this.buscarItem(codigo);
    if (item === null) {
      return "nao-encontrado";
    }
    if (item.quantidade >= item.produto.estoque) {
      return "limite";
    }
    item.quantidade++;
    return "ok";
  }

  diminuir(codigo) {
    const item = this.buscarItem(codigo);
    if (item === null) {
      return "nao-encontrado";
    }
    item.quantidade--;
    if (item.quantidade <= 0) {
      this.remover(codigo);
      return "removido";
    }
    return "ok";
  }

  remover(codigo) {
    const restantes = [];
    let i = 0;
    while (i < this.itens.length) {
      if (this.itens[i].produto.codigo !== codigo) {
        restantes.push(this.itens[i]);
      }
      i++;
    }
    this.itens = restantes;
  }

  esvaziar() {
    while (this.itens.length > 0) {
      this.itens.pop();
    }
  }

  estaVazio() {
    return this.itens.length === 0;
  }

  totalItens() {
    let total = 0;
    for (let i = 0; i < this.itens.length; i++) {
      total = total + this.itens[i].quantidade;
    }
    return total;
  }

  subtotal() {
    let soma = 0;
    for (let i = 0; i < this.itens.length; i++) {
      soma = soma + this.itens[i].subtotal();
    }
    return soma;
  }

  desconto() {
    const valor = this.subtotal();
    if (valor >= this.limiteDesconto) {
      return valor * this.percentualDesconto;
    } else {
      return 0;
    }
  }

  valorFinal() {
    return this.subtotal() - this.desconto();
  }
}

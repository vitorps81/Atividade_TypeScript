// Criando Objetos para os Testes

const item1: IItemCardapio = {
  id: 1,
  nome: "Hambúrguer",
  preco: 30,
  categoria: "prato_principal"
};

const item2: IItemCardapio = {
  id: 2,
  nome: "Refrigerante",
  preco: 8,
  categoria: "bebida"
};

const item3: IItemCardapio = {
  id: 3,
  nome: "Sorvete",
  preco: 12,
  categoria: "sobremesa"
};

const pedido: IPedido = {
  id: 101,
  cliente: "João",
  itens: [item1, item2],
  status: "aberto",
  observacoes: "Sem cebola"
};

// Começo da brincadeira

type CategoriaItem = "bebida" | "prato_principal" | "sobremesa";
type StatusPedido = "aberto" | "pago" | "cancelado";

interface IItemCardapio {
  readonly id: number;
  nome: string;
  preco: number;
  categoria: CategoriaItem;
}

interface IPedido {
  readonly id: number;
  cliente: string;
  itens: IItemCardapio[];
  status: StatusPedido;
  observacoes?: string;
}

// Função que Fará o Calculo Total

function calcularTotal(pedido: IPedido, descontoPercentual?: number): number {

  if (pedido.status === "cancelado") {
    return 0;
  }

  let total = 0;

  for (const item of pedido.itens) {
    total += item.preco;
  }

  if (descontoPercentual !== undefined) {
    if (!Number.isFinite(descontoPercentual) || descontoPercentual < 0 || descontoPercentual > 100) {
      console.error("Erro: desconto inválido!");
      return total;
    }

    total -= total * (descontoPercentual / 100);
  }

  return total;
}

// Função que fará o Adicioanr Item

function adicionarItem(
  pedido: IPedido,
  novoItem: IItemCardapio
): void {

  if (pedido.status === "pago" || pedido.status === "cancelado") {
    console.error(
      "Erro: não é possível adicionar itens a um pedido pago ou cancelado."
    );

    return;
  }

  pedido.itens.push(novoItem);

  console.log("Item adicionado com sucesso!");
}

// Testes de Funcionalidade 

// Teste 1: Total Sem Desconto
console.log("Total:", calcularTotal(pedido));

// Teste 2: Total Com Desconto de 10%
console.log("Com desconto:", calcularTotal(pedido, 10));

// Teste 3: Adicionar Item ao Pedido Aberto
adicionarItem(pedido, item3);

console.log("Novo total:", calcularTotal(pedido));

// Teste 4: Impedir Adição em Pedido Pago
pedido.status = "pago";
adicionarItem(pedido, item3);

// Teste 5: Pedido Cancelado
pedido.status = "cancelado";
console.log("Cancelado:", calcularTotal(pedido));

// Teste 6: Desconto Inválido
pedido.status = "aberto";
console.log("Desconto inválido:", calcularTotal(pedido, 150));
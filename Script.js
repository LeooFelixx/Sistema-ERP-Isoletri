// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll('nav a');

// Função para remover a classe 'active' de todos e adicionar no clicado
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    menuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Dados dos cards para atualizar dinamicamente
const cardsData = [
  { selector: '.card:nth-child(1) p', min: 0, max: 50, suffix: '' },               // Pedidos Pendentes
  { selector: '.card:nth-child(2) p', min: 1000, max: 2000, suffix: ' itens' },    // Estoque Disponível
  { selector: '.card:nth-child(3) p', min: 10, max: 100, suffix: ' clientes' }     // Clientes Ativos (exemplo)
];

// Função para atualizar os valores dos cards
cardsData.forEach(card => {
  const el = document.querySelector(card.selector);
  if (el) {
    const value = Math.floor(Math.random() * (card.max - card.min + 1)) + card.min;
    el.textContent = value + card.suffix;
  }
});

// Seleciona o card de Estoque
const estoqueCard = document.querySelector('.card:nth-child(2)');
const estoqueDetalhes = document.getElementById('estoque-detalhes');

// Mostra os detalhes ao clicar no card de Estoque
if (estoqueCard && estoqueDetalhes) {
  estoqueCard.addEventListener('click', () => {
    estoqueDetalhes.style.display = estoqueDetalhes.style.display === 'none' ? 'block' : 'none';
  });
}

// Exemplo de ações dos botões
document.getElementById('criar-endereco')?.addEventListener('click', () => {
  document.getElementById('estoque-info').textContent = 'Função de criar endereço acionada!';
});
document.getElementById('armazenar')?.addEventListener('click', () => {
  document.getElementById('estoque-info').textContent = 'Função de armazenar acionada!';
});
document.getElementById('relatorios')?.addEventListener('click', () => {
  document.getElementById('estoque-info').textContent = 'Função de relatórios acionada!';
});

// Controle do modal de cadastro
const modalCadastro = document.getElementById('modal-cadastro');
const formCadastro = document.getElementById('form-cadastro');

// Simulação de armazenamento de usuários cadastrados
let usuariosCadastrados = [];

// Cadastro de novo usuário
formNovoUsuario?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('novo-nome').value;
  const usuario = document.getElementById('novo-usuario').value;
  const senha = document.getElementById('nova-senha').value;
  usuariosCadastrados.push({ nome, usuario, senha });
  alert('Usuário cadastrado com sucesso!');
  modalNovoUsuario.style.display = 'none';
});

// Login do usuário
formCadastro.addEventListener('submit', function(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const encontrado = usuariosCadastrados.find(u => u.usuario === usuario && u.senha === senha);
  if (encontrado) {
    modalCadastro.style.display = 'none'; // Libera o acesso ao sistema
  } else {
    alert('Usuário não encontrado');
  }
});

const modalNovoUsuario = document.getElementById('modal-novo-usuario');
const formNovoUsuario = document.getElementById('form-novo-usuario');

// Abrir modal de novo usuário ao clicar em "Cadastre-se"
document.getElementById('btn-cadastrar')?.addEventListener('click', function() {
  document.getElementById('modal-novo-usuario').style.display = 'flex';
});

// Cancelar cadastro de novo usuário
document.getElementById('btn-cancelar-novo')?.addEventListener('click', function() {
  document.getElementById('modal-novo-usuario').style.display = 'none';
});

// Salvar novo usuário (apenas exemplo)
formNovoUsuario?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Usuário cadastrado com sucesso!');
  modalNovoUsuario.style.display = 'none';
});

// Função para deslogar e mostrar o modal de cadastro novamente
document.querySelector('.sair')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('modal-cadastro').style.display = 'flex';
});

// Gere uma URL de compartilhamento
function gerarURLCompartilhamento(base, params) {
  const query = new URLSearchParams(params).toString();
  return `${base}?${query}`;
}

// Exemplo de uso:
const url = gerarURLCompartilhamento('https://meusistema.com/dashboard', { usuario: 'lucimara' });
console.log(url); // https://meusistema.com/dashboard?usuario=lucimara

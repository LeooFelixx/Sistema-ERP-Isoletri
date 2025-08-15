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

// Armazenamento dos usuários cadastrados (em memória)
let usuariosCadastrados = [];

// Seletores dos modais e formulários
const modalCadastro = document.getElementById('modal-cadastro');
const formCadastro = document.getElementById('form-cadastro');
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

// Salvar novo usuário
formNovoUsuario?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('novo-nome').value;
  const usuario = document.getElementById('novo-usuario').value;
  const senha = document.getElementById('nova-senha').value;

  // Verifica se já existe usuário com o mesmo nome de usuário
  const existe = usuariosCadastrados.some(u => u.usuario === usuario);
  if (existe) {
    alert('Usuário já cadastrado!');
    return;
  }

  usuariosCadastrados.push({ nome, usuario, senha });
  alert('Usuário cadastrado com sucesso!');
  modalNovoUsuario.style.display = 'none';
});

// Login do usuário
formCadastro?.addEventListener('submit', function(e) {
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

// Função para deslogar e mostrar o modal de cadastro novamente
document.querySelector('.sair')?.addEventListener('click', (e) => {
  e.preventDefault();
  modalCadastro.style.display = 'flex';
});

// Gere uma URL de compartilhamento
function gerarURLCompartilhamento(base, params) {
  const query = new URLSearchParams(params).toString();
  return `${base}?${query}`;
}

// Exemplo de uso:
const url = gerarURLCompartilhamento('https://meusistema.com/dashboard', { usuario: 'lucimara' });
console.log(url); // https://meusistema.com/dashboard?usuario=lucimara

// Controle dos detalhes do estoque
document.getElementById('btn-estoque-detalhes')?.addEventListener('click', function() {
  const detalhes = document.getElementById('estoque-detalhes');
  detalhes.style.display = detalhes.style.display === 'none' ? 'block' : 'none';
});

// Controle das funções do estoque
function mostrarBox(boxId) {
  document.querySelectorAll('.box-funcao').forEach(box => box.style.display = 'none');
  const box = document.getElementById(boxId);
  if (box) box.style.display = 'block';
}

document.getElementById('criar-endereco')?.addEventListener('click', () => {
  mostrarBox('box-criar-endereco');
});
document.getElementById('armazenar')?.addEventListener('click', () => {
  mostrarBox('box-armazenar');
});
document.getElementById('relatorios')?.addEventListener('click', () => {
  mostrarBox('box-relatorios');
});

// Mostrar área de gráficos ao clicar em Dashboard
document.querySelector('nav a')?.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('dashboard-graficos').style.display = 'block';
  // Esconda outros painéis se necessário
});

// Inicializar gráficos Chart.js (apenas uma vez)
let graficoEstoque, graficoFaturamento;
window.addEventListener('DOMContentLoaded', function() {
  const ctxEstoque = document.getElementById('grafico-estoque').getContext('2d');
  graficoEstoque = new Chart(ctxEstoque, {
    type: 'doughnut',
    data: {
      labels: ['Ocupado', 'Livre'],
      datasets: [{
        data: [70, 30],
        backgroundColor: ['#0095eb', '#f4f7f9'],
      }]
    },
    options: { responsive: false, plugins: { legend: { position: 'bottom' } } }
  });

  const ctxFaturamento = document.getElementById('grafico-faturamento').getContext('2d');
  graficoFaturamento = new Chart(ctxFaturamento, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Faturamento (R$ mil)',
        data: [12, 19, 15, 22, 18, 25],
        borderColor: '#0095eb',
        backgroundColor: 'rgba(0,149,235,0.1)',
        tension: 0.4
      }]
    },
    options: { responsive: false, plugins: { legend: { display: false } } }
  });
});

// Controle dos botões de gráficos
document.querySelectorAll('.btn-grafico').forEach(btn => {
  btn.addEventListener('click', function() {
    // Esconde todos os gráficos
    document.getElementById('grafico-estoque-container').style.display = 'none';
    document.getElementById('grafico-faturamento-container').style.display = 'none';
    // Mostra o gráfico correspondente
    const grafico = btn.getAttribute('data-grafico');
    if (grafico === 'estoque') {
      document.getElementById('grafico-estoque-container').style.display = 'block';
    } else if (grafico === 'faturamento') {
      document.getElementById('grafico-faturamento-container').style.display = 'block';
    }
  });
});

// Opcional: mostrar o primeiro gráfico por padrão ao abrir o Dashboard
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.btn-grafico[data-grafico="estoque"]')?.click();
});



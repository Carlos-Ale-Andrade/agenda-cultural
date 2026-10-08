// Tela combinada no primeiro dia: só a assinatura { url, label, icon, pagina }.
// Responsável: Tabata
import './naoEncontrada.css'

function naoEncontrada(app) {
  app.innerHTML = `
    <div class="nao-encontrada">
      <p class="nao-encontrada-codigo">404</p>
      <h1>Página não encontrada</h1>
      <p>O endereço que você abriu não existe no aplicativo.</p>
      <a href="#inicio" class="nao-encontrada-botao">Voltar para o início</a>
    </div>`
}

// Não entra no mapa de rotas: o main.js usa esta tela quando nenhuma rota combina
export default {
  url: '#nao-encontrada',
  label: '',
  icon: "circle-alert",
  pagina: naoEncontrada
};

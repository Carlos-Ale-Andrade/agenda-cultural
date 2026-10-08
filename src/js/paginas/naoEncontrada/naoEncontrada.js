// Tela combinada no primeiro dia: só a assinatura { url, label, icon, pagina }.
// Responsável: Tabata
function naoEncontrada(app) {
  app.innerHTML = `<h1>Página não encontrada</h1><p>Em construção.</p>`
}

export default {
  url: '#nao-encontrada',
  label: '',
  icon: "circle-alert",
  pagina: naoEncontrada
};

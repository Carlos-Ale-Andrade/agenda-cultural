// Tela combinada no primeiro dia: só a assinatura { url, label, icon, pagina }.
// Responsável: Gabriel
import './detalhe.css'
import { buscarEventoPorId } from '../../dados/eventos.js'
import { formatarData, formatarPreco, escapar } from '../../utils/formatar.js'
import { usuarioLogado, ehFavorito, alternarFavorito } from '../../sessao/sessao.js'

function detalhe(app, id) {
  const evento = buscarEventoPorId(id)
  if (!evento) {
    app.innerHTML = `<div class="estado-vazio">
        <p>Esse evento não existe ou foi removido.</p>
        <a href="#resultados">Ver todos os eventos</a>
      </div>`
    return
  }

  const logado = usuarioLogado()
  const favorito = ehFavorito(evento.id)

  app.innerHTML = `
    <article class="detalhe">
      <a href="#resultados" class="detalhe-voltar"><i data-lucide="arrow-left"></i> Todos os eventos</a>
      <p class="detalhe-categoria">${escapar(evento.categoria)}</p>
      <h1>${escapar(evento.nome)}</h1>
      <ul class="detalhe-dados">
        <li><i data-lucide="calendar"></i> ${formatarData(evento.data)} às ${escapar(evento.hora)}</li>
        <li><i data-lucide="map-pin"></i> ${escapar(evento.local)}</li>
        <li><i data-lucide="ticket"></i> ${formatarPreco(evento.preco)}</li>
      </ul>
      <p class="detalhe-descricao">${escapar(evento.descricao || "Sem descrição.")}</p>
      ${logado
        ? `<button id="btn-favorito" class="${favorito ? "botao-secundario" : ""}">
             <i data-lucide="bookmark"></i> ${favorito ? "Remover dos favoritos" : "Salvar nos favoritos"}
           </button>`
        : `<p class="mensagem-aviso">Entre na sua <a href="#conta">conta</a> para salvar este evento.</p>`}
    </article>`

  const botao = document.getElementById("btn-favorito")
  if (botao) {
    botao.addEventListener("click", () => {
      alternarFavorito(evento.id)
      detalhe(app, id)
      window.dispatchEvent(new Event("tela-atualizada"))
    })
  }
}

export default {
  url: '#detalhe',
  label: '',
  icon: "info",
  pagina: detalhe
};

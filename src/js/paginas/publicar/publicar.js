// Tela combinada no primeiro dia: só a assinatura { url, label, icon, pagina }.
// Responsável: Gabriel
import './publicar.css'
import { CATEGORIAS, existeRepetido, publicarEvento } from '../../dados/eventos.js'
import { usuarioLogado } from '../../sessao/sessao.js'

function publicar(app) {
  if (!usuarioLogado()) {
    app.innerHTML = `
      <h1>Publicar evento</h1>
      <div class="estado-vazio">
        <i data-lucide="lock"></i>
        <p>Para publicar um evento você precisa entrar na sua conta.</p>
        <a href="#conta">Entrar</a>
      </div>`
    return
  }

  app.innerHTML = `
    <form class="form-publicar" novalidate>
      <h1>Publicar evento</h1>
      <div id="aviso-form" role="alert"></div>

      <label for="nome">Nome do evento</label>
      <input id="nome" name="nome" type="text">
      <small class="erro-campo" data-erro="nome"></small>

      <label for="categoria">Categoria</label>
      <select id="categoria" name="categoria">
        ${CATEGORIAS.map(cat => `<option>${cat}</option>`).join("")}
      </select>

      <label for="data">Data</label>
      <input id="data" name="data" type="date">
      <small class="erro-campo" data-erro="data"></small>

      <label for="hora">Horário</label>
      <input id="hora" name="hora" type="time">
      <small class="erro-campo" data-erro="hora"></small>

      <label for="local">Local</label>
      <input id="local" name="local" type="text">
      <small class="erro-campo" data-erro="local"></small>

      <label for="preco">Preço (0 para gratuito)</label>
      <input id="preco" name="preco" type="number" min="0" step="0.01" value="0">
      <small class="erro-campo" data-erro="preco"></small>

      <label for="descricao">Descrição (opcional)</label>
      <textarea id="descricao" name="descricao" rows="3" maxlength="300"></textarea>

      <button type="submit">Publicar</button>
    </form>`

  document.querySelector(".form-publicar").addEventListener("submit", (e) => {
    e.preventDefault()
    const dados = Object.fromEntries(new FormData(e.target))
    dados.nome = dados.nome.trim()
    dados.local = dados.local.trim()

    const erros = validar(dados)
    mostrarErros(erros)
    const aviso = document.getElementById("aviso-form")
    if (Object.keys(erros).length > 0) {
      aviso.innerHTML = `<p class="mensagem-erro">Confira os campos marcados.</p>`
      window.scrollTo(0, 0)
      return
    }
    if (existeRepetido(dados)) {
      aviso.innerHTML = `<p class="mensagem-aviso">Já existe um evento com esse nome, nessa data e nesse local. Ele não foi publicado de novo.</p>`
      window.scrollTo(0, 0)
      return
    }

    const novo = { ...dados, id: Date.now(), preco: Number(dados.preco) }
    publicarEvento(novo)
    location.hash = `#detalhe/${novo.id}`
  })
}

function hojeISO() {
  const hoje = new Date()
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset())
  return hoje.toISOString().slice(0, 10)
}

function validar(dados) {
  const erros = {}
  if (dados.nome.length < 3) erros.nome = "Escreva pelo menos 3 letras."
  if (!dados.data) erros.data = "Escolha a data."
  else if (dados.data < hojeISO()) erros.data = "A data não pode ser no passado."
  if (!dados.hora) erros.hora = "Escolha o horário."
  if (dados.local.length < 3) erros.local = "Informe o local."
  if (dados.preco === "" || Number(dados.preco) < 0) erros.preco = "O preço não pode ser negativo."
  return erros
}

function mostrarErros(erros) {
  document.querySelectorAll(".erro-campo").forEach(campo => {
    const nome = campo.dataset.erro
    campo.textContent = erros[nome] || ""
    document.getElementById(nome).classList.toggle("campo-invalido", Boolean(erros[nome]))
  })
}

export default {
  url: '#publicar',
  label: 'publicar',
  icon: "plus",
  pagina: publicar
};

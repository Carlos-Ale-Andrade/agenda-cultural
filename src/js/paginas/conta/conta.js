import './conta.css'
import { usuarioLogado, entrar, sair, carregarFavoritos } from '../../sessao/sessao.js'
import { todosOsEventos } from '../../dados/eventos.js'
import { cartao } from '../resultados/resultados.js'
import { escapar } from '../../utils/formatar.js'

function conta(app) {
  const sessao = usuarioLogado()
  if (sessao) {
    telaLogado(app, sessao)
  } else {
    telaLogin(app)
  }
}

function telaLogin(app) {
  app.innerHTML = `
    <form class="form-login" novalidate>
      <h1>Entrar</h1>
      <p class="conta-explicacao">Entre para salvar eventos e publicar os seus.</p>
      <div id="erro-login" role="alert"></div>
      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" autocomplete="username">
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" autocomplete="current-password">
      <button type="submit">Entrar</button>
      <p class="conta-dica">Para testar: aluno@fatec.sp.gov.br / 123456</p>
    </form>`

  document.querySelector(".form-login").addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const erro = document.getElementById("erro-login")
    if (!email || !senha) {
      erro.innerHTML = `<p class="mensagem-erro">Preencha e-mail e senha.</p>`
      return
    }
    if (!entrar(email, senha)) {
      erro.innerHTML = `<p class="mensagem-erro">E-mail ou senha incorretos. Tente de novo.</p>`
      document.getElementById("senha").value = ""
      return
    }
    conta(app)
    window.dispatchEvent(new Event("tela-atualizada"))
  })
}

function telaLogado(app, sessao) {
  const favoritos = carregarFavoritos(sessao.email)
  const lista = todosOsEventos().filter(ev => favoritos.includes(ev.id))
  app.innerHTML = `
    <div class="conta">
      <div class="conta-usuario">
        <i data-lucide="circle-user-round"></i>
        <div>
          <h1>Olá, ${escapar(sessao.nome)}</h1>
          <p>${escapar(sessao.email)}</p>
        </div>
      </div>
      <h2>Meus favoritos</h2>
      ${lista.length === 0
        ? `<p class="conta-explicacao">Você ainda não salvou nenhum evento.</p>`
        : lista.map(cartao).join("")}
      <button id="btn-sair" class="botao-secundario">Sair da conta</button>
    </div>`

  document.getElementById("btn-sair").addEventListener("click", () => {
    sair()
    conta(app)
  })
}

export default {
  url: '#conta',
  label: 'conta',
  icon: "user-round",
  pagina: conta
};

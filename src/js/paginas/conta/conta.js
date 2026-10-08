import usuarios from '../dadosMockados/usuarios.js'
import { carregar, salvar, remover } from '../utils/armazenamento.js'

const CHAVE_SESSAO = 'agenda:sessao'

function usuarioLogado() {
  return carregar(CHAVE_SESSAO, null)
}

// Devolve o usuário se e-mail e senha conferem, ou null
function entrar(email, senha) {
  const usuario = usuarios.find(u => u.email === email.trim().toLowerCase() && u.senha === senha)
  if (!usuario) return null
  const sessao = { email: usuario.email, nome: usuario.nome }
  salvar(CHAVE_SESSAO, sessao)
  return sessao
}

function sair() {
  remover(CHAVE_SESSAO)
}

// Favoritos ficam guardados por e-mail, para não sumirem ao sair da conta
function carregarFavoritos(email) {
  return carregar(`agenda:favoritos:${email}`, [])
}

function ehFavorito(id) {
  const sessao = usuarioLogado()
  return sessao ? carregarFavoritos(sessao.email).includes(id) : false
}

function alternarFavorito(id) {
  const sessao = usuarioLogado()
  if (!sessao) return false
  const favoritos = carregarFavoritos(sessao.email)
  const novos = favoritos.includes(id) ? favoritos.filter(f => f !== id) : [...favoritos, id]
  salvar(`agenda:favoritos:${sessao.email}`, novos)
  return true
}

export { usuarioLogado, entrar, sair, carregarFavoritos, ehFavorito, alternarFavorito }

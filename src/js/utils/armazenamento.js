// Sem backend: o que precisa ser lembrado fica no localStorage do aparelho.
function carregar(chave, padrao) {
  try {
    const salvo = localStorage.getItem(chave)
    return salvo ? JSON.parse(salvo) : padrao
  } catch (erro) {
    return padrao
  }
}

function salvar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor))
  } catch (erro) {
  }
}

function remover(chave) {
  try {
    localStorage.removeItem(chave)
  } catch (erro) {
  }
}

export { carregar, salvar, remover }

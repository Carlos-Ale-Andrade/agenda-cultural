// Contrato do módulo de sessão combinado no primeiro dia.
// Responsável: Tabata. Por enquanto ninguém fica logado.
function usuarioLogado() { return null }
function entrar(email, senha) { return null }
function sair() {}
function carregarFavoritos(email) { return [] }
function ehFavorito(id) { return false }
function alternarFavorito(id) { return false }

export { usuarioLogado, entrar, sair, carregarFavoritos, ehFavorito, alternarFavorito }

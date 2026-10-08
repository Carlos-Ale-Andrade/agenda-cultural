function formatarData(data) {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}`
}

function formatarPreco(preco) {
  return Number(preco) === 0 ? "Gratuito" : `R$ ${Number(preco).toFixed(2).replace('.', ',')}`
}

// Texto digitado pelo usuário vai para o innerHTML, então trocamos < > & " '
function escapar(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export { formatarData, formatarPreco, escapar }

import inicio from '../paginas/inicio/inicio.js'
import resultados from '../paginas/resultados/resultados.js'
import detalhe from '../paginas/detalhe/detalhe.js'
import publicar from '../paginas/publicar/publicar.js'
import conta from '../paginas/conta/conta.js'

// Assinatura combinada de toda tela: { url, label, icon, pagina(app, parametro) }
// label "" = a tela existe, mas não aparece na navbar
const mapaderotas = [
    inicio,
    publicar,
    conta,
    resultados,
    detalhe
]

export { mapaderotas }

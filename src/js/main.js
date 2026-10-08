import { createIcons, icons } from 'lucide';
import { mapaderotas } from './rotas/rotas.js'
import { navbar } from './navbar/navbar.js'
import naoEncontrada from './paginas/naoEncontrada/naoEncontrada.js'

const app = document.getElementById("app")

// O hash pode ter um parâmetro depois da barra: #resultados/Música ou #detalhe/3
function renderizarPagina() {
    const hash = window.location.hash || '#inicio'
    const [url, parametro] = hash.split('/')
    const rota = mapaderotas.find(tela => tela.url === url) || naoEncontrada
    rota.pagina(app, parametro ? decodeURIComponent(parametro) : undefined)
    navbar(mapaderotas, rota.url)
    createIcons({ icons })
    window.scrollTo(0, 0)
}

// Telas que mudam sozinhas (ex.: favoritar) chamam isto para redesenhar os ícones
window.addEventListener("tela-atualizada", () => createIcons({ icons }))
window.addEventListener("hashchange", renderizarPagina)
renderizarPagina()

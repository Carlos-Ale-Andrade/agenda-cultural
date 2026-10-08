import listaDeEventos from '../dadosMockados/eventos.js'
import { carregar, salvar } from '../utils/armazenamento.js'

const CHAVE_PUBLICADOS = 'agenda:publicados'
const CATEGORIAS = ["Música", "Teatro", "Exposição", "Cinema", "Dança", "Literatura"]

// Junta os eventos de exemplo com os publicados neste aparelho
function todosOsEventos() {
  return [...listaDeEventos, ...carregar(CHAVE_PUBLICADOS, [])]
}

function buscarEventoPorId(id) {
  return todosOsEventos().find(ev => String(ev.id) === String(id))
}

// Registro repetido = mesmo nome, mesma data e mesmo local
function existeRepetido(novo) {
  const normalizar = texto => texto.trim().toLowerCase()
  return todosOsEventos().some(ev =>
    normalizar(ev.nome) === normalizar(novo.nome) &&
    ev.data === novo.data &&
    normalizar(ev.local) === normalizar(novo.local))
}

function publicarEvento(novo) {
  salvar(CHAVE_PUBLICADOS, [...carregar(CHAVE_PUBLICADOS, []), novo])
}

export { CATEGORIAS, todosOsEventos, buscarEventoPorId, existeRepetido, publicarEvento }

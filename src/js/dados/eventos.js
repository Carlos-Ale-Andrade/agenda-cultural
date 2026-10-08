import listaDeEventos from '../dadosMockados/eventos.js'
import { carregar, salvar } from '../utils/armazenamento.js'

const CHAVE_PUBLICADOS = 'agenda:publicados'
const CATEGORIAS = ["Música", "Teatro", "Exposição", "Cinema", "Dança", "Literatura"]

// Junta os eventos de exemplo com os publicados neste aparelho
function todosOsEventos() {
  return [...listaDeEventos, ...carregar(CHAVE_PUBLICADOS, [])]
}

export { CATEGORIAS, todosOsEventos }

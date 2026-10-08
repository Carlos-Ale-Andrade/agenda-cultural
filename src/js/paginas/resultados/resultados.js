import './resultados.css'
import { todosOsEventos } from '../../dados/eventos.js'
import { formatarData, formatarPreco, escapar } from '../../utils/formatar.js'

const ORDENACOES = {
  data: { texto: "Data", comparar: (a, b) => (a.data + a.hora).localeCompare(b.data + b.hora) },
  preco: { texto: "Menor preço", comparar: (a, b) => Number(a.preco) - Number(b.preco) },
  nome: { texto: "Nome (A-Z)", comparar: (a, b) => a.nome.localeCompare(b.nome) }
}
let ordemAtual = "data"

// filtro pode ser uma categoria ("Música") ou uma busca ("busca:teatro")
function filtrar(filtro) {
  const lista = todosOsEventos()
  if (!filtro) return { lista, titulo: "Todos os eventos" }
  if (filtro.startsWith("busca:")) {
    const termo = filtro.replace("busca:", "")
    const t = termo.toLowerCase()
    return {
      lista: lista.filter(ev => `${ev.nome} ${ev.local} ${ev.categoria}`.toLowerCase().includes(t)),
      titulo: `Busca: "${termo}"`,
      termo
    }
  }
  return { lista: lista.filter(ev => ev.categoria === filtro), titulo: filtro }
}

function resultados(app, filtro) {
  const { lista, titulo, termo } = filtrar(filtro)
  lista.sort(ORDENACOES[ordemAtual].comparar)

  app.innerHTML = `
    <h1>${escapar(titulo)}</h1>
    ${lista.length === 0 ? estadoVazio(termo) : `
      <div class="resultados-topo">
        <p>${lista.length} ${lista.length === 1 ? "evento" : "eventos"}</p>
        <label>Ordenar por
          <select id="ordenar">
            ${Object.entries(ORDENACOES).map(([chave, o]) =>
              `<option value="${chave}" ${chave === ordemAtual ? "selected" : ""}>${o.texto}</option>`).join("")}
          </select>
        </label>
      </div>
      ${lista.map(cartao).join("")}
    `}`

  const select = document.getElementById("ordenar")
  if (select) {
    select.addEventListener("change", () => {
      ordemAtual = select.value
      resultados(app, filtro)
    })
  }
}

function estadoVazio(termo) {
  return `<div class="estado-vazio">
            <i data-lucide="calendar-x"></i>
            <p>${termo ? `Nenhum evento encontrado para "${escapar(termo)}".` : "Nenhum evento nesta categoria por enquanto."}</p>
            <p>Tente outra palavra ou veja todos os eventos.</p>
            <a href="#resultados">Ver todos os eventos</a>
          </div>`
}

function cartao(evento) {
  return `<a class="cartao-evento" href="#detalhe/${evento.id}">
            <div class="cartao-data">${formatarData(evento.data)}</div>
            <div class="cartao-info">
                <h3>${escapar(evento.nome)}</h3>
                <p>${escapar(evento.local)} · ${escapar(evento.hora)}</p>
            </div>
            <p class="cartao-preco">${formatarPreco(evento.preco)}</p>
        </a>`
}

export { cartao }
export default {
    url: "#resultados",
    label: "",
    icon: "calendar",
    pagina: resultados
 };

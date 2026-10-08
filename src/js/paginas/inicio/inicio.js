import './inicio.css'
import { CATEGORIAS } from '../../dados/eventos.js'

function inicio(app){
    app.innerHTML = `
        <div class="inicio">
            <p class="inicio-marca">Agenda Cultural</p>
            <h1 class="inicio-titulo">O que você quer fazer nesta semana?</h1>
            <form class="inicio-busca" role="search">
                <input
                    type="search"
                    id="input-busca"
                    placeholder="Nome do evento ou local"
                    aria-label="Buscar evento"
                >
                <button id="btn-busca" type="submit" aria-label="Buscar">
                    <i data-lucide="search"></i>
                </button>
            </form>
            <section>
                <h2 class="inicio-subtitulo">Categorias</h2>
                <ul class="inicio-categorias">
                    ${CATEGORIAS.map(cat => `<li><a class="inicio-categoria" href="#resultados/${encodeURIComponent(cat)}">${cat}</a></li>`).join("")}
                </ul>
            </section>
            <a href="#resultados" class="inicio-ver-todos">Ver todos os eventos</a>
        </div>
    `
    adicionarEvento()
}

function adicionarEvento(){
    document.querySelector(".inicio-busca").addEventListener("submit", (e)=>{
        e.preventDefault()
        const termo = document.getElementById("input-busca").value.trim()
        location.hash = termo ? `#resultados/${encodeURIComponent("busca:" + termo)}` : "#resultados"
    })
}

export default {
    url: "#inicio",
    label: "início",
    icon: "house",
    pagina: inicio
}

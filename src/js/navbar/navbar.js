function navbar(item_menu, urlAtual){
const navbar = document.getElementById('navbar');
navbar.innerHTML = `
<nav class="navbar">
        ${
            item_menu.filter(menu=> menu.label !== "")
            .map((item)=>{
                const ativo = item.url === urlAtual ? "navbar-item--ativo" : ""
                return `<li>
                            <a href="${item.url}" class="navbar-item navbar-item__icon ${ativo}">
                                <i data-lucide="${item.icon}"></i>
                                ${item.label}
                            </a>
                        </li>`
            }).join('')
        }
</nav>
`;
}

export { navbar };

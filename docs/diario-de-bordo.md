# Diário de bordo

Aqui anotamos tudo o que deu errado enquanto construíamos a Agenda Cultural, o que tentamos e como resolvemos. Somos iniciantes, então tem tentativa que não deu em nada. Deixamos registrado mesmo assim, porque foi assim que aprendemos.

---

## 1. A tela abria toda em branco

**O que aconteceu:** depois de copiar o esqueleto do KiOferta e trocar as telas, abrimos o `index.html` pelo Live Server do VS Code (e também com dois cliques no arquivo). Apareceu só uma página branca, sem navbar e sem nada.

**O que achamos que era, e o que tentamos:**

1. *"Errei o caminho do script."* Conferimos o `<script src="./js/main.js" type="module">` letra por letra. Estava certo.
2. *"O CSS não está carregando."* Apagamos o `<link>` do CSS para testar. A página continuou branca, então não era isso.
3. *"É o navegador."* Abrimos no Chrome e no Edge. Ficou igual nos dois.
4. *"Tem algum erro no nosso código novo."* Comentamos as telas novas uma por uma no `rotas.js`. Nada mudou.
5. Só aí lembramos do **F12 → Console**, e apareceu:
   ```
   Failed to resolve module specifier "lucide".
   Relative references must start with either "/", "./", or "../".
   ```

**O que era de fato:** o `main.js` começa com `import { createIcons, icons } from 'lucide'`. O navegador sozinho não sabe o que é `'lucide'`, porque ele só entende caminhos como `./arquivo.js`. Quem transforma `'lucide'` em `node_modules/lucide/...` é o **Vite**. Como abrimos o arquivo sem o Vite, o primeiro `import` quebrou e nenhuma linha do app rodou.

**Como resolvemos:**
- Passamos a rodar sempre com `npm install` e depois `npm run dev`, abrindo o endereço `http://localhost:5173` que o terminal mostra.
- Colocamos `base: './'` no `vite.config.ts`. Sem isso, o build gerava caminhos como `/assets/index.js`, que só funcionam na raiz do servidor. Com caminhos relativos, a pasta `dist/` abre em qualquer lugar e também no Capacitor.
- Escrevemos o aviso no README para ninguém do grupo cair nisso de novo.

**O que aprendemos:** quando a tela fica branca, a primeira coisa a fazer é abrir o console, não mexer no código.

---

## 2. Clicar no cartão do evento não abria o detalhe

**O que aconteceu:** na lista de eventos, clicar num cartão mostrava a mensagem "Escolha um produto." (herdada do KiOferta) em vez dos dados do evento.

**O que achamos que era, e o que tentamos:**

1. *"O clique não está registrado."* Colocamos um `console.log("clicou")` dentro do `addEventListener`. Ele aparecia, então o clique funcionava.
2. *"O `find` não está achando o evento."* Demos `console.log(escolhido)` e apareceu `undefined`.
3. Fomos ver o que o `find` comparava: `p.nome === card.dataset.nome`. Demos `console.log(card.dataset.nome)` e também veio `undefined`. **O cartão não tinha o atributo `data-nome` no HTML.** Colocamos o `data-nome="${produto.nome}"` e o evento passou a ser encontrado...
4. ...mas a tela ainda piscava e voltava para "Escolha um produto.". Depois de muito `console.log`, entendemos que a função de detalhe fazia `location.hash = "#mapa"` **depois** de desenhar a tela. Mudar o hash dispara o `hashchange`, e o `main.js` desenha a tela de novo, só que agora sem o produto (o roteador não tem como saber qual era). Ou seja, a tela certa era desenhada e apagada logo em seguida.

**O que era de fato:** dois problemas juntos. O cartão não tinha o `data-nome`, e o objeto escolhido se perdia quando o hash mudava.

**Como resolvemos:** em vez de passar o objeto inteiro de uma função para outra, passamos **só o id dentro do hash**: `#detalhe/3`. O `main.js` separa o hash na `/` (`hash.split('/')`) e entrega o `3` para a tela de detalhe, que busca o evento com `buscarEventoPorId`. Com isso:
- o cartão virou um link simples (`<a href="#detalhe/3">`), sem `addEventListener` e sem `data-nome`;
- o botão voltar do celular funciona;
- dá para abrir o endereço `#detalhe/3` direto e cair no evento certo.

Usamos a mesma ideia para os filtros: `#resultados/Música` e `#resultados/busca:teatro`.

---

## 3. Os ícones sumiam quando trocávamos de tela

**O que aconteceu:** na primeira tela os ícones apareciam, mas ao ir para outra tela ficavam só os espaços vazios. No detalhe, ao clicar em "Salvar nos favoritos", os ícones de calendário e local sumiam.

**O que tentamos:** primeiro achamos que faltava importar o ícone (por exemplo `calendar`). Mas o `import { icons }` já traz todos. Depois percebemos que no `main.js` o `createIcons({ icons })` era chamado **uma vez só**, no final do arquivo. O Lucide funciona assim: ele procura os `<i data-lucide="...">` que existem **naquele momento** e troca por `<svg>`. O HTML desenhado depois disso não era processado.

**Como resolvemos:**
- O `createIcons` passou a ser chamado dentro do `renderizarPagina()`, depois de cada tela.
- Para as telas que se redesenham sozinhas, sem trocar o hash (favoritar e fazer login), criamos um evento `tela-atualizada`. A tela dispara `window.dispatchEvent(new Event("tela-atualizada"))` e o `main.js` escuta esse evento e chama o `createIcons` de novo.

---

## 4. O `npm install` ficava travado

**O que aconteceu:** o projeto estava numa pasta sincronizada com a nuvem. O `npm install` ficou vários minutos parado.

**O que tentamos:** esperar mais (não adiantou) e cancelar com Ctrl+C e rodar de novo (travou igual).

**O que era:** o `node_modules` tem milhares de arquivos pequenos, e a pasta sincronizada tentava enviar cada um deles enquanto o npm escrevia.

**Como resolvemos:** copiamos o projeto para uma pasta local comum, rodamos o `npm install` lá e funcionou em segundos. O `node_modules/` já estava no `.gitignore`, então ele não vai para o GitHub.

---

## 5. A data "de hoje" virava amanhã à noite

**O que aconteceu:** a validação do formulário de publicar não deixa escolher uma data no passado. Para saber o dia de hoje, usamos `new Date().toISOString().slice(0, 10)`. Testando à noite, o formulário recusou a data de hoje, dizendo que estava no passado.

**O que era:** o `toISOString()` devolve a data em **UTC**, não no horário de Brasília. Depois das 21h, em UTC já é o dia seguinte.

**Como resolvemos:** antes de converter, descontamos o fuso do aparelho:
```js
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset())
```

---

## 6. O preço vinha como texto do formulário

**O que aconteceu:** depois de publicar um evento com preço 5, a ordenação por "Menor preço" ficava estranha e o `0` não aparecia como "Gratuito".

**O que era:** o `FormData` devolve **tudo como texto**. O preço era `"5"`, não `5`, e `"0" === 0` dá `false`.

**Como resolvemos:** convertemos com `Number(dados.preco)` antes de salvar, e as funções `formatarPreco` e de ordenação também usam `Number(...)`.

---

## 7. Texto digitado aparecia como HTML

**O que aconteceu:** testando o formulário, escrevemos `<b>teste</b>` na descrição, e na tela de detalhe o texto apareceu em **negrito**. Ou seja, o navegador interpretou o que o usuário digitou como código.

**Por que isso é ruim:** todas as telas usam `innerHTML`. Se alguém digitar uma tag `<img onerror=...>`, aquilo vira código rodando no app.

**Como resolvemos:** criamos a função `escapar()` em `src/js/utils/formatar.js`, que troca `< > & " '` pelos códigos HTML. Agora todo texto que veio do usuário passa por ela antes de entrar no `innerHTML`.

---

## 8. Reabrir "Publicar" não limpava o formulário

**O que aconteceu:** depois de ver o aviso de registro repetido, tocar de novo em "publicar" na navbar não limpava o formulário.

**O que era:** o `hashchange` só dispara quando o hash **muda**. Se já estamos em `#publicar` e clicamos em `#publicar`, nada acontece.

**Como resolvemos:** decidimos que isso está certo, porque o usuário não perde o que digitou. Para começar do zero, basta trocar de tela e voltar. Deixamos anotado para ninguém achar que é bug.

---

## Resumo do que mais ajudou

- **F12 → Console** antes de qualquer coisa.
- `console.log` em cada passo para ver onde o valor vira `undefined`.
- Testar com o DevTools no modo celular (360px de largura).
- Combinar no primeiro dia a "assinatura" das telas (`{ url, label, icon, pagina(app, parametro) }`) e não mexer no `rotas.js` e no `navbar.js` sem avisar o grupo.

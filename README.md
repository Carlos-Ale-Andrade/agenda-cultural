# Agenda Cultural

**Tema sorteado:** Agenda cultural

**Repositório:** https://github.com/Carlos-Ale-Andrade/agenda-cultural

**Disciplina:** Programação para Dispositivos Móveis (FATEC) · Desafio 1: o mesmo esqueleto, outro negócio

App de celular para descobrir os eventos culturais da cidade (shows, teatro, exposições, cinema, dança e literatura), salvar os favoritos e publicar novos eventos. Foi feito em cima do esqueleto do [KiOferta](https://github.com/GenezisDev/ki-oferta), com a mesma estrutura e as mesmas tecnologias.

## Integrantes

| Integrante | GitHub | Responsabilidade | Commits |
|---|---|---|---|
| Carlos | [Carlos-Ale-Andrade](https://github.com/Carlos-Ale-Andrade) | Dados e descoberta: esqueleto, dados mockados, tela de início, tela de resultados, relatório | 6 |
| Gabriel | [GenezisDev](https://github.com/GenezisDev) | Detalhe e publicação: tela de detalhe, formulário de publicar e validações, CSS base (tokens, base e navbar) | 3 |.
| Tabata | [tabatachferri](https://github.com/tabatachferri) | Conta e fundação: módulo de sessão, usuários de teste, conta, rota inexistente e funções do `dados/eventos.js` | 8 |

## Como rodar

Precisa do [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

> Não abra o `src/index.html` direto no navegador nem pelo Live Server. A tela fica em branco porque o `import` do Lucide só funciona passando pelo Vite. Está explicado no [diário de bordo](docs/diario-de-bordo.md).

Para testar o login, use **aluno@fatec.sp.gov.br** com a senha **123456**.

### No celular (Capacitor)

Precisa do Android Studio instalado.

```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```

## Telas

| Tela | Endereço | O que faz |
|---|---|---|
| Início | `#inicio` | Busca por nome, local ou categoria |
| Resultados | `#resultados`, `#resultados/Música` | Lista filtrada, com ordenação por data, preço ou nome e estado vazio |
| Detalhe | `#detalhe/3` | Dados do evento e botão de favoritar (precisa estar logado) |
| Publicar | `#publicar` | Formulário com validações e aviso de registro repetido (precisa estar logado) |
| Conta | `#conta` | Login com mensagem de erro, favoritos e sair |
| Rota inexistente | qualquer outro endereço | Página 404 com botão para voltar ao início |

## Tecnologias

- HTML, CSS e JavaScript puro (ES Modules), sem framework
- [Vite](https://vitejs.dev/) para o servidor de desenvolvimento e o build
- [Capacitor](https://capacitorjs.com/) para empacotar como app Android/iOS
- [Lucide](https://lucide.dev/) para os ícones

Não tem backend nem banco de dados. Os eventos de exemplo e os usuários de teste ficam em `src/js/dadosMockados/`, e o que o usuário faz (sessão, favoritos e eventos publicados) fica no `localStorage` do aparelho.

## Documentação

- [Relatório (PDF)](docs/relatorio.pdf)
- [Diário de bordo: todas as dificuldades e como resolvemos](docs/diario-de-bordo.md)
- [Capturas das telas em 360px](docs/capturas/)

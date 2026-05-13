#  Pinterest Clone 
Este projeto é um clone  do Pinterest. O objetivo principal foi recriar a fluidez e a arquitetura de informação da plataforma original, 
utilizando **JavaScript** e estruturação avançada de CSS.

##  Destaques do Projeto

A aplicação foi construída visando uma arquitetura robusta e adotando boas práticas de componentização sem o uso de frameworks JavaScript pesados.

* **Masonry Layout Nativo:** O icônico grid irregular do Pinterest recriado de forma responsiva utilizando CSS Columns puro, garantindo o efeito visual correto sem quebra de imagens.
* **Integração com API (Pixabay):** Consumo de API real (Fetch API) para popular o feed inicial e as galerias de inspiração com imagens dinâmicas e de alta qualidade.
* **Design Emocional & Soft UI:** Cantos arredondados, micro-interações de *hover*, botões com *feedback* tátil e paleta de cores limpa que guia o olhar do usuário para o *Call to Action* principal (CTAs em vermelho Pinterest).
* **Painéis Deslizantes (Slide-out Panels):** Implementação de gavetas laterais secundárias dinâmicas que "espremem" (Push UI) o conteúdo principal ao invés de cobri-lo, mantendo o contexto do usuário.
* **Modais de Alta Fidelidade:** Interfaces complexas de criação (Pins, Tableros e um Editor Visual de Colagens) renderizadas de forma programática.
* **Arquitetura Multi-Página Inteligente:** Separação entre Feed (`index.html`) e Perfil (`profile.html`) reaproveitando a mesma folha de estilos (`style.css`) e lógica de estados (`app.js`).

##  Funcionalidades Implementadas

**Feed Dinâmico:** Scroll contínuo e carregamento de imagens via API.
**Salvar Pins:** Lógica de estado que transfere imagens do feed principal para o grid pessoal do usuário.
**Gerenciamento de Entidades:** Edição e exclusão de Pins com validação de ações destrutivas (Modais de alerta).
**Criação Interativa:** Upload de arquivos locais (mock) e Canvas de edição interativa para Colagens com manipulação de camadas (duplicar, deletar).
**Navegação SPA Híbrida:** Troca de *Views* sem recarregamento de página dentro das áreas de perfil e feed detalhado (Pin Detail View).

##  Tecnologias Utilizadas

* **HTML:** Semântica e acessibilidade.
* **CSS:** Flexbox, CSS Columns, variáveis globais e Design Responsivo.
* **JavaScript:** Manipulação de DOM, Fetch API (Async/Await), Event Listeners e Gerenciamento de Estado de UI.
* **Bootstrap :** Utilizado seletivamente para sistema de grid e componentes base (Modais, Offcanvas), com forte sobrescrita de CSS customizado.
* **Pixabay API:** Fornecimento de assets visuais dinâmicos.

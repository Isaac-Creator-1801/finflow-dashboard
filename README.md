# FinFlow 360 - Dashboard Financeiro Multi-Perfil 💎

Sistema inteligente de gestão financeira desenvolvido sob medida para **controle unificado em 3 perfis**:
1. **Meu Pessoal** (Finanças Pessoais, Moradia, Lazer, Cartões, Investimentos)
2. **Namorada** (Finanças dela, Estudos, Autocuidado, Despesas próprias)
3. **Empresa (PJ)** (Faturamento, Tráfego Pago/Anúncios, Ferramentas SaaS, Impostos, Pró-Labore)
4. **Visão Consolidada 360°** (Visão global e comparativo familiar + PJ)

---

## 🚀 Como Executar

Não precisa instalar Node, Bun ou qualquer dependência pesada! O projeto roda nativamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari):

1. Vá até a pasta `fin-dashboard`.
2. Dê um duplo clique no arquivo [`index.html`](index.html).
3. O painel abrirá instantaneamente!

---

## ✨ Recursos & Funcionalidades

- **Alternância Instantânea entre Perfis**:
  - Clique em qualquer perfil no menu lateral para visualizar e filtrar automaticamente métricas, despesas e gráficos daquela entidade.
  - Esquema de cores dinâmico (Azul Elétrico para Meu Pessoal, Rosa Vibrante para Namorada, Verde Esmeralda para Empresa PJ e Roxo para Visão Consolidada).

- **Widget & Modal de Acerto de Contas do Casal**:
  - Qualquer despesa pode ser marcada com o selo **"Dividir este gasto entre o casal (50%/50%)"**.
  - O sistema calcula em tempo real o total compartilhado, quem pagou quanto e mostra exatamente o saldo do acerto (ex: *"Namorada deve R$ 1.430,25 para Você"* ou *"Você deve R$ 250,00 para a Namorada"*).

- **Gráficos Dinâmicos e Interativos**:
  - **Gráfico de Evolução Diária**: Entradas vs Saídas ao longo dos dias do mês.
  - **Gráfico Donut de Categorias**: Distribuição visual dos maiores centros de custos com porcentagens e valores.

- **Gestão de Lançamentos**:
  - Inclusão rápida de **+ Despesa** e **+ Receita** com modal intuitivo.
  - Status de pagamento com alternância rápida (Pago / Pendente com 1 clique no ícone).
  - Filtros rápidos por chips: Todos, Despesas, Receitas, Pendentes e Divisão Casal.
  - Busca em tempo real por descrição, categoria ou forma de pagamento.

- **Segurança & Portabilidade dos Dados**:
  - Salvamento automático contínuo via `LocalStorage`.
  - **Backup JSON**: Baixe seus dados a qualquer momento em 1 clique.
  - **Restaurar Backup**: Importe backups para restaurar em qualquer computador.
  - **Exportar CSV**: Exporte relatórios para abrir diretamente no Excel ou Google Planilhas.

- **Tema Dark / Light**:
  - Dark mode sofisticado com glassmorphism e sombras elegantes.
  - Alternador de tema no rodapé lateral.

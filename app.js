/**
 * FinFlow 360 - Engine inspirado no Finavera
 * Multi-Perfil (Rodrego, Rodrega, Empresa PJ e Consolidado)
 * Orçado vs Realizado, Metas, Cofrinho (Porquinho), Dívidas e Gestão de Categorias.
 */

// --- CONFIGURAÇÃO INICIAL DE METAS ---
const DEFAULT_METAS = {
  compromissoMensal: 200.00,
  // Array único e 100% customizável - usuário cria, edita e exclui como quiser
  customMetas: [
    { id: 'cm-1', name: 'Reserva de Emergência', icon: '🛡️', target: 25000.00, saved: 0, active: true },
    { id: 'cm-2', name: 'Liberdade Financeira', icon: '✨', target: 800000.00, saved: 0, active: true },
    { id: 'cm-3', name: 'Viagem dos Sonhos', icon: '✈️', target: 15000.00, saved: 3200.00, active: true },
    { id: 'cm-4', name: 'Reforma da Casa', icon: '🏠', target: 20000.00, saved: 0, active: true }
  ]
};

// --- CONFIGURAÇÃO INICIAL DE DÍVIDAS ---
const DEFAULT_DIVIDAS = [
  { id: 'div-1', name: 'Financiamento / Carnê', icon: '🏦', total: 15000.00, paid: 2000.00, monthlyMin: 850.00, active: true },
  { id: 'div-2', name: 'Cartão de Crédito', icon: '💳', total: 3500.00, paid: 0, monthlyMin: 300.00, active: true }
];


// --- ESTRUTURA PADRÃO DE CATEGORIAS E ITENS POR PERFIL ---
const DEFAULT_DATA = {
  // Saldo inicial do mês por perfil
  saldosIniciais: {
    me: 2500.00,
    girlfriend: 1800.00,
    business: 15400.00
  },

  // Caixinhas do Cofrinho (O famoso Porquinho)
  cofrinhos: {
    me: [
      { id: 'cof-1', name: 'Reserva de Emergência', icon: '🛡️', saved: 12500.00, target: 25000.00 },
      { id: 'cof-2', name: 'Viagem Casal 2027', icon: '✈️', saved: 3200.00, target: 10000.00 },
      { id: 'cof-3', name: 'Troca de Carro / Celular', icon: '📱', saved: 1800.00, target: 5000.00 }
    ],
    girlfriend: [
      { id: 'cof-gf-1', name: 'Reserva Pessoal', icon: '🛡️', saved: 4500.00, target: 10000.00 },
      { id: 'cof-gf-2', name: 'Especialização & Sonhos', icon: '📚', saved: 1200.00, target: 3000.00 }
    ],
    business: [
      { id: 'cof-biz-1', name: 'Capital de Giro / Caixa', icon: '🏢', saved: 25000.00, target: 50000.00 },
      { id: 'cof-biz-2', name: 'Provisão Tributos / 13º', icon: '🏛️', saved: 8500.00, target: 15000.00 }
    ]
  },

  // Categorias de Rodrego
  categories_me: [
    // Entradas
    {
      id: 'cat-me-renda',
      profile: 'me',
      flow: 'entrada',
      name: 'Renda',
      icon: '👛',
      items: [
        { id: 'i-1', name: 'Pró-Labore / Retirada', orcado: 9500.00, realizado: 9500.00, isShared: false },
        { id: 'i-2', name: 'Rendimento de Aplicações', orcado: 350.00, realizado: 410.00, isShared: false }
      ]
    },
    {
      id: 'cat-me-inv',
      profile: 'me',
      flow: 'entrada',
      name: 'Investimentos',
      icon: '📈',
      items: [
        { id: 'i-3', name: 'Aporte Tesouro Selic / Reserva', orcado: 200.00, realizado: 200.00, isShared: false }
      ]
    },
    // Saídas (Gastos Fixos como primeira categoria prioritária!)
    {
      id: 'cat-me-fixos',
      profile: 'me',
      flow: 'saida',
      name: 'Gastos Fixos do Mês',
      icon: '📌',
      items: [
        { id: 'if-1', name: 'Fatura Cartão de Crédito', orcado: 1800.00, realizado: 1800.00, isShared: false },
        { id: 'if-2', name: 'Plano de Saúde', orcado: 420.00, realizado: 420.00, isShared: false },
        { id: 'if-3', name: 'Seguro do Carro / Vida', orcado: 210.00, realizado: 210.00, isShared: false },
        { id: 'if-4', name: 'Conta de Celular / Internet Móvel', orcado: 79.90, realizado: 79.90, isShared: false },
        { id: 'if-5', name: 'Academia / Treino', orcado: 150.00, realizado: 150.00, isShared: false }
      ]
    },
    {
      id: 'cat-me-hab',
      profile: 'me',
      flow: 'saida',
      name: 'Habitação',
      icon: '🏠',
      items: [
        { id: 'i-4', name: 'Aluguel do Apartamento', orcado: 2200.00, realizado: 2200.00, isShared: true },
        { id: 'i-5', name: 'Condomínio', orcado: 450.00, realizado: 450.00, isShared: true },
        { id: 'i-6', name: 'Energia Elétrica', orcado: 180.00, realizado: 165.40, isShared: true },
        { id: 'i-7', name: 'Internet Fibra', orcado: 130.00, realizado: 129.90, isShared: true }
      ]
    },
    {
      id: 'cat-me-transp',
      profile: 'me',
      flow: 'saida',
      name: 'Transporte',
      icon: '🚗',
      items: [
        { id: 'i-8', name: 'Combustível', orcado: 350.00, realizado: 280.00, isShared: false },
        { id: 'i-9', name: 'Uber e similares', orcado: 100.00, realizado: 84.50, isShared: false }
      ]
    },
    {
      id: 'cat-me-alim',
      profile: 'me',
      flow: 'saida',
      name: 'Alimentação',
      icon: '🛒',
      items: [
        { id: 'i-11', name: 'Supermercado Mensal', orcado: 1000.00, realizado: 980.00, isShared: true },
        { id: 'i-12', name: 'Restaurantes e Jantares', orcado: 500.00, realizado: 420.00, isShared: true }
      ]
    },
    {
      id: 'cat-me-lazer',
      profile: 'me',
      flow: 'saida',
      name: 'Lazer & Assinaturas',
      icon: '🎬',
      items: [
        { id: 'i-13', name: 'Netflix & Spotify', orcado: 95.00, realizado: 95.00, isShared: false },
        { id: 'i-14', name: 'Passeios de Fim de Semana', orcado: 300.00, realizado: 250.00, isShared: true }
      ]
    }
  ],

  // Categorias de Namorada
  categories_girlfriend: [
    // Entradas
    {
      id: 'cat-gf-renda',
      profile: 'girlfriend',
      flow: 'entrada',
      name: 'Renda & Ganhos',
      icon: '👛',
      items: [
        { id: 'ig-1', name: 'Remuneração Principal', orcado: 5800.00, realizado: 5800.00, isShared: false }
      ]
    },
    // Saídas (Gastos Fixos)
    {
      id: 'cat-gf-fixos',
      profile: 'girlfriend',
      flow: 'saida',
      name: 'Gastos Fixos do Mês',
      icon: '📌',
      items: [
        { id: 'igf-1', name: 'Fatura Cartão de Crédito', orcado: 1200.00, realizado: 1120.00, isShared: false },
        { id: 'igf-2', name: 'Plano de Saúde', orcado: 350.00, realizado: 350.00, isShared: false },
        { id: 'igf-3', name: 'Plano de Celular', orcado: 65.00, realizado: 65.00, isShared: false },
        { id: 'igf-4', name: 'Academia / Pilates', orcado: 180.00, realizado: 180.00, isShared: false }
      ]
    },
    {
      id: 'cat-gf-hab',
      profile: 'girlfriend',
      flow: 'saida',
      name: 'Habitação & Casa',
      icon: '🏠',
      items: [
        { id: 'ig-2', name: 'Feira Orgânica & Hortifrúti', orcado: 350.00, realizado: 320.00, isShared: true },
        { id: 'ig-3', name: 'Decoração & Utensílios', orcado: 150.00, realizado: 110.00, isShared: true }
      ]
    },
    {
      id: 'cat-gf-beleza',
      profile: 'girlfriend',
      flow: 'saida',
      name: 'Beleza & Autocuidado',
      icon: '✨',
      items: [
        { id: 'ig-4', name: 'Salão de Beleza & Cabelo', orcado: 250.00, realizado: 240.00, isShared: false },
        { id: 'ig-5', name: 'Skincare e Farmácia', orcado: 180.00, realizado: 165.00, isShared: false }
      ]
    },
    {
      id: 'cat-gf-estudos',
      profile: 'girlfriend',
      flow: 'saida',
      name: 'Estudos & Cursos',
      icon: '📚',
      items: [
        { id: 'ig-6', name: 'Mensalidade Especialização / Pós', orcado: 650.00, realizado: 650.00, isShared: false }
      ]
    },
    {
      id: 'cat-gf-transp',
      profile: 'girlfriend',
      flow: 'saida',
      name: 'Transporte',
      icon: '🚗',
      items: [
        { id: 'ig-7', name: 'Combustível / Uber', orcado: 200.00, realizado: 185.00, isShared: false }
      ]
    }
  ],

  // Categorias da Empresa (PJ)
  categories_business: [
    // Entradas
    {
      id: 'cat-biz-fat',
      profile: 'business',
      flow: 'entrada',
      name: 'Faturamento da Operação',
      icon: '💼',
      items: [
        { id: 'ib-1', name: 'Vendas E-commerce / Produtos', orcado: 40000.00, realizado: 38400.00, isShared: false }
      ]
    },
    // Saídas (Custos Fixos)
    {
      id: 'cat-biz-fixos',
      profile: 'business',
      flow: 'saida',
      name: 'Custos Fixos Operacionais',
      icon: '🏢',
      items: [
        { id: 'ibf-1', name: 'Contabilidade PJ', orcado: 450.00, realizado: 450.00, isShared: false },
        { id: 'ibf-2', name: 'Sistemas & Softwares de Gestão', orcado: 1200.00, realizado: 1200.00, isShared: false },
        { id: 'ibf-3', name: 'Tarifas Bancárias & Conta PJ', orcado: 80.00, realizado: 75.00, isShared: false }
      ]
    },
    {
      id: 'cat-biz-trafego',
      profile: 'business',
      flow: 'saida',
      name: 'Tráfego Pago & Anúncios',
      icon: '📣',
      items: [
        { id: 'ib-2', name: 'Meta Ads (Facebook / Instagram)', orcado: 12000.00, realizado: 11800.00, isShared: false },
        { id: 'ib-3', name: 'Google Ads / YouTube', orcado: 2000.00, realizado: 1650.00, isShared: false }
      ]
    },
    {
      id: 'cat-biz-softwares',
      profile: 'business',
      flow: 'saida',
      name: 'Softwares & Ferramentas',
      icon: '💻',
      items: [
        { id: 'ib-4', name: 'Plataforma & Automação SaaS', orcado: 1500.00, realizado: 1450.00, isShared: false },
        { id: 'ib-5', name: 'Hospedagem & Domínios Cloud', orcado: 220.00, realizado: 210.00, isShared: false }
      ]
    },
    {
      id: 'cat-biz-impostos',
      profile: 'business',
      flow: 'saida',
      name: 'Impostos & Taxas',
      icon: '🏛️',
      items: [
        { id: 'ib-6', name: 'DAS Simples Nacional', orcado: 3000.00, realizado: 2850.00, isShared: false },
        { id: 'ib-7', name: 'Taxas Gateway de Pagamento', orcado: 900.00, realizado: 870.00, isShared: false }
      ]
    },
    {
      id: 'cat-biz-prolabore',
      profile: 'business',
      flow: 'saida',
      name: 'Pró-Labore & Sócios',
      icon: '👥',
      items: [
        { id: 'ib-8', name: 'Retirada Pró-Labore Sócio', orcado: 9500.00, realizado: 9500.00, isShared: false }
      ]
    }
  ]
};

// --- ESTADO GLOBAL DA APLICAÇÃO ---
class FinanceState {
  constructor() {
    this.activeProfile = 'me'; // 'me' | 'girlfriend' | 'business' | 'all'
    this.selectedYear = 2026;
    this.selectedMonth = 9; // Outubro (0-indexed)
    this.theme = localStorage.getItem('finavera_theme') || 'light';
    this.data = this.loadData();
    this.metas = this.loadMetas();
    this.dividas = this.loadDividas();
    // Supabase config (filled by user via UI)
    this.supabaseUrl = localStorage.getItem('finavera_sb_url') || '';
    this.supabaseKey = localStorage.getItem('finavera_sb_key') || '';
    this.supabaseUserId = localStorage.getItem('finavera_sb_uid') || 'shared';
  }

  loadData() {
    const raw = localStorage.getItem('finavera_db');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // Garantir que Gastos Fixos e Cofrinho existam mesmo em dados antigos
        this.ensureFixosAndCofrinhos(parsed);
        return parsed;
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }
    this.saveData(DEFAULT_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  ensureFixosAndCofrinhos(data) {
    let changed = false;

    // Migração de Gastos Fixos em Rodrego
    if (data.categories_me && !data.categories_me.some(c => c.name.toLowerCase().includes('fixos'))) {
      const fixedCat = JSON.parse(JSON.stringify(DEFAULT_DATA.categories_me.find(c => c.id === 'cat-me-fixos')));
      // Inserir antes das demais saídas
      const saidaIdx = data.categories_me.findIndex(c => c.flow === 'saida');
      if (saidaIdx !== -1) {
        data.categories_me.splice(saidaIdx, 0, fixedCat);
      } else {
        data.categories_me.push(fixedCat);
      }
      changed = true;
    }

    // Migração de Gastos Fixos em Namorada
    if (data.categories_girlfriend && !data.categories_girlfriend.some(c => c.name.toLowerCase().includes('fixos'))) {
      const fixedCatGf = JSON.parse(JSON.stringify(DEFAULT_DATA.categories_girlfriend.find(c => c.id === 'cat-gf-fixos')));
      const saidaIdx = data.categories_girlfriend.findIndex(c => c.flow === 'saida');
      if (saidaIdx !== -1) {
        data.categories_girlfriend.splice(saidaIdx, 0, fixedCatGf);
      } else {
        data.categories_girlfriend.push(fixedCatGf);
      }
      changed = true;
    }

    // Migração de Custos Fixos na Empresa
    if (data.categories_business && !data.categories_business.some(c => c.name.toLowerCase().includes('fixos'))) {
      const fixedCatBiz = JSON.parse(JSON.stringify(DEFAULT_DATA.categories_business.find(c => c.id === 'cat-biz-fixos')));
      const saidaIdx = data.categories_business.findIndex(c => c.flow === 'saida');
      if (saidaIdx !== -1) {
        data.categories_business.splice(saidaIdx, 0, fixedCatBiz);
      } else {
        data.categories_business.push(fixedCatBiz);
      }
      changed = true;
    }

    // Migração de Cofrinhos
    if (!data.cofrinhos) {
      data.cofrinhos = JSON.parse(JSON.stringify(DEFAULT_DATA.cofrinhos));
      changed = true;
    }

    if (changed) {
      this.saveData(data);
    }
  }

  saveData(data) {
    this.data = data;
    localStorage.setItem('finavera_db', JSON.stringify(data));
    this.syncToSupabase();
  }

  loadMetas() {
    const raw = localStorage.getItem('finavera_metas');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // Migrate old format (com reservaEmergencia/liberdadeFinanceira) para o novo
        if (!parsed.customMetas) {
          const migrated = {
            compromissoMensal: parsed.compromissoMensal || 200,
            customMetas: [
              { id: 'cm-1', name: 'Reserva de Emergência', icon: '🛡️', target: parsed.reservaEmergencia || 25000, saved: 0, active: true },
              { id: 'cm-2', name: 'Liberdade Financeira', icon: '✨', target: parsed.liberdadeFinanceira || 800000, saved: 0, active: true },
              ...(parsed.outras || []).map(m => ({ ...m, id: 'cm-' + m.id, icon: '🎯', saved: 0 }))
            ]
          };
          this.saveMetas(migrated);
          return migrated;
        }
        return parsed;
      } catch (e) { console.error(e); }
    }
    this.saveMetas(DEFAULT_METAS);
    return JSON.parse(JSON.stringify(DEFAULT_METAS));
  }

  saveMetas(metas) {
    this.metas = metas;
    localStorage.setItem('finavera_metas', JSON.stringify(metas));
    this.syncToSupabase();
  }

  loadDividas() {
    const raw = localStorage.getItem('finavera_dividas');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { console.error(e); }
    }
    this.saveDividas(DEFAULT_DIVIDAS);
    return JSON.parse(JSON.stringify(DEFAULT_DIVIDAS));
  }

  saveDividas(dividas) {
    this.dividas = dividas;
    localStorage.setItem('finavera_dividas', JSON.stringify(dividas));
    this.syncToSupabase();
  }

  // --- DÍVIDAS METHODS ---
  getTotalDividas() {
    return (this.dividas || []).reduce((s, d) => s + Math.max(0, (d.total || 0) - (d.paid || 0)), 0);
  }

  getTotalPaidDividas() {
    return (this.dividas || []).reduce((s, d) => s + (d.paid || 0), 0);
  }

  getMonthlyDividas() {
    return (this.dividas || []).reduce((s, d) => s + (d.monthlyMin || 0), 0);
  }

  abaterDivida(divId, amount) {
    const d = (this.dividas || []).find(d => d.id === divId);
    if (d) {
      d.paid = Math.min((d.paid || 0) + amount, d.total || 0);
      this.saveDividas(this.dividas);
      return d;
    }
    return null;
  }

  addDivida(name, icon, total, monthlyMin) {
    const nova = {
      id: 'div-' + Date.now(),
      name,
      icon: icon || '💳',
      total: total || 0,
      paid: 0,
      monthlyMin: monthlyMin || 0,
      active: true
    };
    if (!this.dividas) this.dividas = [];
    this.dividas.push(nova);
    this.saveDividas(this.dividas);
    return nova;
  }

  deleteDivida(divId) {
    this.dividas = (this.dividas || []).filter(d => d.id !== divId);
    this.saveDividas(this.dividas);
  }

  editDivida(divId, fields) {
    const d = (this.dividas || []).find(d => d.id === divId);
    if (d) { Object.assign(d, fields); this.saveDividas(this.dividas); }
  }

  getCategoriesForProfile(profile) {
    if (profile === 'all') {
      return [
        ...(this.data.categories_me || []),
        ...(this.data.categories_girlfriend || []),
        ...(this.data.categories_business || [])
      ];
    }
    const key = `categories_${profile}`;
    return this.data[key] || [];
  }

  getSaldoInicial(profile) {
    if (profile === 'all') {
      return (this.data.saldosIniciais?.me || 0) +
             (this.data.saldosIniciais?.girlfriend || 0) +
             (this.data.saldosIniciais?.business || 0);
    }
    return this.data.saldosIniciais?.[profile] || 0;
  }

  setSaldoInicial(profile, value) {
    if (!this.data.saldosIniciais) this.data.saldosIniciais = {};
    this.data.saldosIniciais[profile] = value;
    this.saveData(this.data);
  }

  // --- MÉTODOS DO COFRINHO ---
  getCofrinhosForProfile(profile) {
    if (profile === 'all') {
      return [
        ...(this.data.cofrinhos?.me || []),
        ...(this.data.cofrinhos?.girlfriend || []),
        ...(this.data.cofrinhos?.business || [])
      ];
    }
    return this.data.cofrinhos?.[profile] || [];
  }

  getTotalCofrinho(profile) {
    const cofs = this.getCofrinhosForProfile(profile);
    return cofs.reduce((sum, c) => sum + (c.saved || 0), 0);
  }

  depositToCofrinho(cofId, amount) {
    for (const key of ['me', 'girlfriend', 'business']) {
      const cof = this.data.cofrinhos?.[key]?.find(c => c.id === cofId);
      if (cof) {
        cof.saved = (cof.saved || 0) + amount;
        this.saveData(this.data);
        return cof;
      }
    }
    return null;
  }

  withdrawFromCofrinho(cofId, amount) {
    for (const key of ['me', 'girlfriend', 'business']) {
      const cof = this.data.cofrinhos?.[key]?.find(c => c.id === cofId);
      if (cof) {
        cof.saved = Math.max(0, (cof.saved || 0) - amount);
        this.saveData(this.data);
        return cof;
      }
    }
    return null;
  }

  addCofrinho(profile, name, icon, target) {
    if (!this.data.cofrinhos) this.data.cofrinhos = {};
    if (!this.data.cofrinhos[profile]) this.data.cofrinhos[profile] = [];
    const newCof = {
      id: 'cof-' + Date.now(),
      name,
      icon: icon || '🐷',
      saved: 0,
      target: target || 5000
    };
    this.data.cofrinhos[profile].push(newCof);
    this.saveData(this.data);
    return newCof;
  }

  // --- MÉTODOS DE CATEGORIAS E ITENS ---
  findItemAndCategory(catId, itemId) {
    for (const key of ['categories_me', 'categories_girlfriend', 'categories_business']) {
      const cat = (this.data[key] || []).find(c => c.id === catId);
      if (cat) {
        const item = cat.items.find(i => i.id === itemId);
        if (item) return { cat, item, key };
      }
    }
    return null;
  }

  updateItemOrcado(catId, itemId, newOrcado) {
    const found = this.findItemAndCategory(catId, itemId);
    if (found) {
      found.item.orcado = newOrcado;
      this.saveData(this.data);
    }
  }

  updateItemRealizado(catId, itemId, newRealizado) {
    const found = this.findItemAndCategory(catId, itemId);
    if (found) {
      found.item.realizado = newRealizado;
      this.saveData(this.data);
    }
  }

  updateItemName(catId, itemId, newName) {
    const found = this.findItemAndCategory(catId, itemId);
    if (found) {
      found.item.name = newName;
      this.saveData(this.data);
    }
  }

  deleteItem(catId, itemId) {
    const cats = this.getCategoriesForProfile(this.activeProfile);
    const cat = cats.find(c => c.id === catId);
    if (cat) {
      cat.items = cat.items.filter(i => i.id !== itemId);
      this.saveData(this.data);
    }
  }

  addItemToCategory(catId, name, orcado = 0, realizado = 0, isShared = false) {
    const cats = this.getCategoriesForProfile(this.activeProfile);
    const cat = cats.find(c => c.id === catId);
    if (cat) {
      const newItem = {
        id: 'item-' + Date.now() + Math.random().toString(36).substring(2, 5),
        name,
        orcado,
        realizado,
        isShared
      };
      cat.items.push(newItem);
      this.saveData(this.data);
      return newItem;
    }
    return null;
  }

  addCategory(profile, flow, name, icon = '📁') {
    const key = `categories_${profile}`;
    if (!this.data[key]) this.data[key] = [];
    const newCat = {
      id: `cat-${profile}-${Date.now()}`,
      profile,
      flow,
      name,
      icon,
      items: []
    };
    this.data[key].push(newCat);
    this.saveData(this.data);
    return newCat;
  }

  deleteCategory(catId) {
    for (const key of ['categories_me', 'categories_girlfriend', 'categories_business']) {
      if (this.data[key]) {
        const idx = this.data[key].findIndex(c => c.id === catId);
        if (idx !== -1) {
          const removed = this.data[key].splice(idx, 1)[0];
          this.saveData(this.data);
          return removed;
        }
      }
    }
    return null;
  }

  renameCategory(catId, newName, newIcon) {
    for (const key of ['categories_me', 'categories_girlfriend', 'categories_business']) {
      const cat = this.data[key]?.find(c => c.id === catId);
      if (cat) {
        if (newName) cat.name = newName;
        if (newIcon) cat.icon = newIcon;
        this.saveData(this.data);
        return cat;
      }
    }
    return null;
  }

  // --- SUPABASE SYNC (Tempo Real para Vocês Dois) ---
  syncToSupabase() {
    if (!this.supabaseUrl || !this.supabaseKey) return;
    clearTimeout(this._syncTimer);
    this._syncTimer = setTimeout(() => this._doSync(), 800); // debounce 800ms
  }

  async _doSync() {
    if (!this.supabaseUrl || !this.supabaseKey) return;
    try {
      setSyncStatus('syncing');
      const payload = {
        id: this.supabaseUserId,
        data: this.data,
        metas: this.metas,
        dividas: this.dividas,
        updated_at: new Date().toISOString()
      };
      const res = await fetch(`${this.supabaseUrl}/rest/v1/finflow_state`, {
        method: 'POST',
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSyncStatus('ok');
      } else {
        setSyncStatus('error');
      }
    } catch (e) {
      console.warn('Supabase sync failed:', e);
      setSyncStatus('error');
    }
  }

  async loadFromSupabase() {
    if (!this.supabaseUrl || !this.supabaseKey) return false;
    try {
      setSyncStatus('syncing');
      const res = await fetch(
        `${this.supabaseUrl}/rest/v1/finflow_state?id=eq.${this.supabaseUserId}&limit=1`,
        {
          headers: {
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
          }
        }
      );
      if (res.ok) {
        const rows = await res.json();
        if (rows.length > 0) {
          const row = rows[0];
          if (row.data) { this.data = row.data; localStorage.setItem('finavera_db', JSON.stringify(row.data)); }
          if (row.metas) { this.metas = row.metas; localStorage.setItem('finavera_metas', JSON.stringify(row.metas)); }
          if (row.dividas) { this.dividas = row.dividas; localStorage.setItem('finavera_dividas', JSON.stringify(row.dividas)); }
          setSyncStatus('ok');
          return true;
        }
      }
      setSyncStatus('error');
    } catch (e) {
      console.warn('Supabase load failed:', e);
      setSyncStatus('error');
    }
    return false;
  }

  setSupabaseConfig(url, key, uid) {
    this.supabaseUrl = url;
    this.supabaseKey = key;
    this.supabaseUserId = uid || 'shared';
    localStorage.setItem('finavera_sb_url', url);
    localStorage.setItem('finavera_sb_key', key);
    localStorage.setItem('finavera_sb_uid', this.supabaseUserId);
  }
}

// --- INSTÂNCIA DO ESTADO ---
const state = new FinanceState();

// --- FORMATADORES AUXILIARES ---
const fmtCurrency = (val) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(val || 0);
};

// --- INICIALIZAÇÃO DA APLICAÇÃO ---
function initApp() {
  try { initTheme(); } catch (e) { console.error('Theme init error:', e); }
  try { setupEventListeners(); } catch (e) { console.error('EventListeners error:', e); }
  try { renderApp(); } catch (e) { console.error('RenderApp error:', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// --- CONTROLE DE TEMA ---
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('finavera_theme', state.theme);
  showToast(`Modo ${state.theme === 'dark' ? 'Escuro' : 'Claro'} ativado!`);
}

// --- CONFIGURAÇÃO DE EVENT LISTENERS ---
function setupEventListeners() {
  // Theme Toggle
  const btnTheme = document.getElementById('btn-toggle-theme');
  if (btnTheme) btnTheme.addEventListener('click', toggleTheme);

  // Profile Pill Buttons
  document.querySelectorAll('.profile-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const profile = pill.getAttribute('data-profile');
      if (profile) switchProfile(profile);
    });
  });

  // Metas Modal
  document.getElementById('btn-open-metas-modal').addEventListener('click', openMetasModal);
  document.getElementById('btn-close-metas-modal').addEventListener('click', closeMetasModal);
  document.getElementById('btn-save-metas-modal').addEventListener('click', closeMetasModal);
  document.getElementById('modal-metas').addEventListener('click', (e) => {
    if (e.target.id === 'modal-metas') closeMetasModal();
  });

  // Cofrinho Modal Openers & Actions
  const btnOpenCof = document.getElementById('btn-open-cofrinho-modal');
  if (btnOpenCof) btnOpenCof.addEventListener('click', openCofrinhoModal);
  const dockBtnCof = document.getElementById('dock-btn-cofrinho');
  if (dockBtnCof) dockBtnCof.addEventListener('click', openCofrinhoModal);
  const quickGuardar = document.getElementById('btn-quick-guardar');
  if (quickGuardar) quickGuardar.addEventListener('click', openCofrinhoModal);
  const quickVerCof = document.getElementById('btn-quick-ver-cofrinho');
  if (quickVerCof) quickVerCof.addEventListener('click', openCofrinhoModal);

  document.getElementById('btn-close-cofrinho-modal').addEventListener('click', closeCofrinhoModal);
  document.getElementById('btn-close-cofrinho-btn').addEventListener('click', closeCofrinhoModal);
  document.getElementById('modal-cofrinho').addEventListener('click', (e) => {
    if (e.target.id === 'modal-cofrinho') closeCofrinhoModal();
  });

  // Cofrinho Actions: Guardar e Resgatar
  document.getElementById('btn-action-guardar').addEventListener('click', handleCofrinhoDeposit);
  document.getElementById('btn-action-resgatar').addEventListener('click', handleCofrinhoWithdraw);
  document.getElementById('btn-create-caixinha').addEventListener('click', handleCreateCaixinha);

  // Saldo Inicial Form
  const btnSaveInitial = document.getElementById('btn-save-initial-balance');
  if (btnSaveInitial) {
    btnSaveInitial.addEventListener('click', () => {
      const val = parseFloat(document.getElementById('input-saldo-inicial').value) || 0;
      state.setSaldoInicial(state.activeProfile, val);
      renderApp();
      showToast('Saldo inicial atualizado!');
    });
  }

  // + Nova Categoria Modal
  document.getElementById('btn-open-category-modal').addEventListener('click', () => openNewCatModal('saida'));
  document.getElementById('btn-close-new-cat').addEventListener('click', closeNewCatModal);
  document.getElementById('btn-cancel-new-cat').addEventListener('click', closeNewCatModal);
  document.getElementById('form-new-cat').addEventListener('submit', handleNewCatSubmit);
  document.getElementById('modal-new-cat').addEventListener('click', (e) => {
    if (e.target.id === 'modal-new-cat') closeNewCatModal();
  });

  // Novo Lançamento Modal
  document.getElementById('dock-btn-novo').addEventListener('click', () => openItemModal());
  document.getElementById('btn-close-item-modal').addEventListener('click', closeItemModal);
  document.getElementById('btn-cancel-item-modal').addEventListener('click', closeItemModal);
  document.getElementById('form-item').addEventListener('submit', handleItemFormSubmit);
  document.getElementById('modal-item').addEventListener('click', (e) => {
    if (e.target.id === 'modal-item') closeItemModal();
  });

  // Profile change in item modal updates category options
  document.getElementById('form-item-profile').addEventListener('change', (e) => {
    const flow = document.querySelector('input[name="item-flow"]:checked').value;
    populateCategorySelect(e.target.value, flow);
  });
  document.querySelectorAll('input[name="item-flow"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const profile = document.getElementById('form-item-profile').value;
      populateCategorySelect(profile, e.target.value);
    });
  });

  // Casal Settlement Modal
  document.getElementById('header-couple-settlement-btn').addEventListener('click', openCoupleModal);
  document.getElementById('dock-btn-casal').addEventListener('click', openCoupleModal);
  document.getElementById('btn-close-couple-modal').addEventListener('click', closeCoupleModal);
  document.getElementById('btn-close-couple-btn').addEventListener('click', closeCoupleModal);
  document.getElementById('modal-couple').addEventListener('click', (e) => {
    if (e.target.id === 'modal-couple') closeCoupleModal();
  });

  // Extrato Modal
  document.getElementById('dock-btn-extrato').addEventListener('click', openExtratoModal);
  document.getElementById('btn-close-extrato').addEventListener('click', closeExtratoModal);
  document.getElementById('btn-close-extrato-btn').addEventListener('click', closeExtratoModal);
  document.getElementById('modal-extrato').addEventListener('click', (e) => {
    if (e.target.id === 'modal-extrato') closeExtratoModal();
  });

  // Export / Backup
  document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
  document.getElementById('btn-backup-json').addEventListener('click', exportBackupJSON);
  const restoreTrigger = document.getElementById('btn-restore-json-trigger');
  const restoreInput = document.getElementById('input-restore-json');
  if (restoreTrigger && restoreInput) {
    restoreTrigger.addEventListener('click', () => restoreInput.click());
    restoreInput.addEventListener('change', handleRestoreJSON);
  }

  // Copy previous month
  document.getElementById('btn-copy-prev-month').addEventListener('click', () => {
    showToast('Planejamento do mês anterior importado com sucesso!');
  });

  // Clear Month
  document.getElementById('btn-clear-month').addEventListener('click', () => {
    if (confirm('Deseja realmente zerar os valores realizados deste mês?')) {
      const cats = state.getCategoriesForProfile(state.activeProfile);
      cats.forEach(c => c.items.forEach(i => i.realizado = 0));
      state.saveData(state.data);
      renderApp();
      showToast('Valores realizados zerados.');
    }
  });

  // Custom Metas (new unified customizable list)
  const btnAddCustomMeta = document.getElementById('btn-add-custom-meta');
  if (btnAddCustomMeta) {
    btnAddCustomMeta.addEventListener('click', () => {
      const name = prompt('Nome da nova meta (Ex: Viagem a Paris, Troca de Carro, Faculdade):');
      if (!name) return;
      const iconStr = prompt('Ícone/Emoji para a meta (opcional):', '🎯');
      const targetStr = prompt('Valor alvo (R$):', '5000');
      const savedStr = prompt('Quanto você já tem guardado para esta meta? (R$):', '0');
      const target = parseFloat(targetStr) || 1000;
      const saved = parseFloat(savedStr) || 0;
      if (!state.metas.customMetas) state.metas.customMetas = [];
      state.metas.customMetas.push({
        id: 'cm-' + Date.now(),
        name,
        icon: iconStr || '🎯',
        target,
        saved,
        active: true
      });
      state.saveMetas(state.metas);
      renderMetasModalContent();
      showToast('✅ Nova meta cadastrada!');
    });
  }

  // Dívidas Modal Listeners
  const btnDividasHeader = document.getElementById('btn-header-dividas');
  if (btnDividasHeader) btnDividasHeader.addEventListener('click', window.openDividasModal);
  const btnOpenDiviCard = document.getElementById('btn-open-dividas-modal');
  if (btnOpenDiviCard) btnOpenDiviCard.addEventListener('click', window.openDividasModal);
  const btnQuickAbater = document.getElementById('btn-quick-abater-divida');
  if (btnQuickAbater) btnQuickAbater.addEventListener('click', window.openDividasModal);
  const dockBtnDividas = document.getElementById('dock-btn-dividas');
  if (dockBtnDividas) dockBtnDividas.addEventListener('click', window.openDividasModal);
  const btnCloseDividasModal = document.getElementById('btn-close-dividas-modal');
  if (btnCloseDividasModal) btnCloseDividasModal.addEventListener('click', window.closeDividasModal);
  const btnCloseDividasBtn = document.getElementById('btn-close-dividas-btn');
  if (btnCloseDividasBtn) btnCloseDividasBtn.addEventListener('click', window.closeDividasModal);
  const modalDividas = document.getElementById('modal-dividas');
  if (modalDividas) modalDividas.addEventListener('click', (e) => { if (e.target.id === 'modal-dividas') window.closeDividasModal(); });

  const btnAbaterDivida = document.getElementById('btn-action-abater-divida');
  if (btnAbaterDivida) btnAbaterDivida.addEventListener('click', handleAbaterDivida);

  const btnCreateDivida = document.getElementById('btn-create-divida');
  if (btnCreateDivida) btnCreateDivida.addEventListener('click', handleCreateDivida);

  // Supabase Config Modal Listeners
  const btnOpenSupabase = document.getElementById('btn-open-supabase-modal');
  if (btnOpenSupabase) btnOpenSupabase.addEventListener('click', window.openSupabaseModal);
  const btnCloseSupabase = document.getElementById('btn-close-supabase-modal');
  if (btnCloseSupabase) btnCloseSupabase.addEventListener('click', window.closeSupabaseModal);
  const btnSaveSupabase = document.getElementById('btn-save-supabase');
  if (btnSaveSupabase) btnSaveSupabase.addEventListener('click', window.handleSaveSupabaseConfig);
  const btnSyncNow = document.getElementById('btn-sync-now');
  if (btnSyncNow) btnSyncNow.addEventListener('click', window.handleSyncNow);
  const modalSupabase = document.getElementById('modal-supabase');
  if (modalSupabase) modalSupabase.addEventListener('click', (e) => { if (e.target.id === 'modal-supabase') window.closeSupabaseModal(); });
}

// --- PROFILE SWITCHER ---
function switchProfile(profileId) {
  state.activeProfile = profileId;

  // Atualizar botões visuais de perfil
  document.querySelectorAll('.profile-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-profile') === profileId);
  });

  // Atualizar texto de boas-vindas e indicador
  const welcomeEl = document.getElementById('header-user-welcome');
  const pciLabel = document.getElementById('pci-label');
  const pciDot = document.getElementById('pci-dot');
  const consRow = document.getElementById('consolidated-details-row');

  if (profileId === 'me') {
    welcomeEl.textContent = 'Bem-vindo(a), Você!';
    pciLabel.textContent = 'Visualizando: Rodrego';
    pciDot.style.backgroundColor = 'var(--color-blue)';
    if (consRow) consRow.style.display = 'none';
  } else if (profileId === 'girlfriend') {
    welcomeEl.textContent = 'Bem-vinda, Rodrega!';
    pciLabel.textContent = 'Visualizando: Rodrega';
    pciDot.style.backgroundColor = 'var(--color-pink)';
    if (consRow) consRow.style.display = 'none';
  } else if (profileId === 'business') {
    welcomeEl.textContent = 'Painel Empresarial (PJ)';
    pciLabel.textContent = 'Visualizando: Empresa (PJ)';
    pciDot.style.backgroundColor = 'var(--color-green)';
    if (consRow) consRow.style.display = 'none';
  } else {
    welcomeEl.textContent = 'Visão Global Consolidada 360°';
    pciLabel.textContent = 'Visualizando: Todos os Perfis (Familiar + PJ)';
    pciDot.style.backgroundColor = 'var(--color-purple)';
    if (consRow) consRow.style.display = 'grid';
  }

  renderApp();
}

// --- PIPELINE PRINCIPAL DE RENDERIZAÇÃO ---
function renderApp() {
  const categories = state.getCategoriesForProfile(state.activeProfile);
  const saldoInicial = state.getSaldoInicial(state.activeProfile);

  // 1. Cálculos de Totais
  let receitas = 0;
  let despesas = 0;
  let totalOrcadoDespesas = 0;
  let totalInvestido = 0;

  categories.forEach(cat => {
    const isEntrada = cat.flow === 'entrada';
    cat.items.forEach(item => {
      if (isEntrada) {
        receitas += (item.realizado || 0);
        if (cat.name.toLowerCase().includes('invest')) {
          totalInvestido += (item.realizado || 0);
        }
      } else {
        despesas += (item.realizado || 0);
        totalOrcadoDespesas += (item.orcado || 0);
      }
    });
  });

  const receitasComSaldo = receitas + saldoInicial;
  const saldoFinal = receitasComSaldo - despesas;

  // 2. Atualizar Cards da Row 1 (KPIs Finavera)
  document.getElementById('kpi-receitas').textContent = fmtCurrency(receitas);
  document.getElementById('kpi-receitas-saldo').textContent = fmtCurrency(receitasComSaldo);
  document.getElementById('kpi-despesas').textContent = fmtCurrency(despesas);
  document.getElementById('kpi-saldo-final').textContent = fmtCurrency(saldoFinal);

  // 3. Atualizar Total Investido & % Compromisso Mensal
  document.getElementById('kpi-invested').textContent = fmtCurrency(totalInvestido);
  const compromisso = state.metas.compromissoMensal || 200;
  const pctInvestido = compromisso > 0 ? Math.min(Math.round((totalInvestido / compromisso) * 100), 100) : 0;
  document.getElementById('kpi-invested-pct').textContent = `${pctInvestido}%`;

  // 4. Atualizar Card do Cofrinho (Porquinho)
  const totalCofrinho = state.getTotalCofrinho(state.activeProfile);
  const kpiCof = document.getElementById('kpi-cofrinho-total');
  if (kpiCof) kpiCof.textContent = fmtCurrency(totalCofrinho);

  // 5. Atualizar Orçamento Utilizado (Gauge Semicircular)
  document.getElementById('kpi-total-orcado').textContent = fmtCurrency(totalOrcadoDespesas);
  document.getElementById('kpi-total-realizado').textContent = fmtCurrency(despesas);
  updateGauge(despesas, totalOrcadoDespesas);

  // 6. Saldo Inicial no Card
  document.getElementById('val-saldo-inicial').textContent = fmtCurrency(saldoInicial);
  const initialInput = document.getElementById('input-saldo-inicial');
  if (initialInput && document.activeElement !== initialInput) {
    initialInput.value = saldoInicial;
  }

  // 7. Atualizar Totais das Colunas
  document.getElementById('col-entradas-total').textContent = fmtCurrency(receitas);
  document.getElementById('col-saidas-total').textContent = fmtCurrency(despesas);

  // 8. Renderizar Categorias Dinâmicas (Entradas vs Saídas)
  renderCategoriesColumns(categories);

  // 9. Se perfil consolidado, calcular números lado a lado
  if (state.activeProfile === 'all') {
    renderConsolidatedCards();
  }

  // 10. Atualizar Acerto de Contas do Casal
  updateCoupleSettlementMath();

  // 11. Atualizar KPI de Dívidas
  updateDividasKPI();
}

// --- ATUALIZAÇÃO DO GAUGE SEMICIRCULAR SVG ---
function updateGauge(realizado, orcado) {
  const progressBar = document.getElementById('gauge-progress-bar');
  const pctText = document.getElementById('gauge-pct-val');
  const subText = document.getElementById('gauge-status-sub');
  if (!progressBar || !pctText || !subText) return;

  const maxDash = 157; // Comprimento do arco semi-circular SVG

  if (orcado <= 0) {
    progressBar.style.strokeDashoffset = maxDash;
    progressBar.style.stroke = 'var(--text-muted)';
    pctText.textContent = '0%';
    subText.textContent = 'Adicione orçamento';
  } else {
    const pct = Math.round((realizado / orcado) * 100);
    const offset = Math.max(0, maxDash - (Math.min(pct, 100) / 100) * maxDash);
    progressBar.style.strokeDashoffset = offset;

    pctText.textContent = `${pct}%`;
    if (pct > 100) {
      progressBar.style.stroke = 'var(--color-red)';
      subText.textContent = 'Estourou orçamento';
    } else if (pct >= 85) {
      progressBar.style.stroke = 'var(--color-yellow)';
      subText.textContent = 'Atenção ao limite';
    } else {
      progressBar.style.stroke = 'var(--color-green)';
      subText.textContent = 'Dentro da meta';
    }
  }
}

// --- RENDERIZAR COLUNAS DE CATEGORIAS (ENTRADAS VS SAÍDAS) ---
function renderCategoriesColumns(categories) {
  const entradasContainer = document.getElementById('entradas-categories-container');
  const saidasContainer = document.getElementById('saidas-categories-container');

  const entradas = categories.filter(c => c.flow === 'entrada');
  const saidas = categories.filter(c => c.flow === 'saida');

  entradasContainer.innerHTML = entradas.map(cat => renderCategoryCardHtml(cat)).join('');
  saidasContainer.innerHTML = saidas.map(cat => renderCategoryCardHtml(cat)).join('');
}

function renderCategoryCardHtml(cat) {
  const totalCat = cat.items.reduce((acc, i) => acc + (i.realizado || 0), 0);
  const itemsCount = cat.items.length;
  const isSaida = cat.flow === 'saida';

  return `
    <div class="accordion-card open" id="card-${cat.id}">
      <div class="accordion-header" onclick="toggleAccordion('body-${cat.id}')">
        <div class="acc-left">
          <span class="acc-drag-handle">::</span>
          <div class="acc-icon-box">${cat.icon || '📁'}</div>
          <div class="acc-titles">
            <span class="acc-name">${cat.name}</span>
            <span class="acc-sub">${itemsCount} item(s)</span>
          </div>
        </div>
        <div class="acc-right">
          <span class="acc-val ${isSaida ? 'value-red' : ''}">${fmtCurrency(totalCat)}</span>
          
          <!-- Category Actions: Rename / Delete -->
          <div class="cat-header-actions" onclick="event.stopPropagation()">
            <button class="btn-cat-action" onclick="handleRenameCategory('${cat.id}')" title="Renomear Categoria">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>
            <button class="btn-cat-action delete" onclick="handleDeleteCategory('${cat.id}', '${cat.name}')" title="Excluir Categoria">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>

          <svg class="acc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      <div class="accordion-body" id="body-${cat.id}">
        <div class="items-table-header">
          <span class="th-orcado">Orçado</span>
          <span class="th-realizado">Realizado</span>
        </div>

        <div class="category-items-list">
          ${cat.items.map(item => `
            <div class="item-row" id="row-${item.id}">
              <div class="item-row-left">
                <span class="item-drag-icon">::</span>
                <span class="item-title-text" onclick="handleRenameItem('${cat.id}', '${item.id}')" title="Clique para renomear este item">${item.name}</span>
                ${item.isShared ? '<span class="item-tag-shared">Casal 50%</span>' : ''}
              </div>

              <div class="item-row-right">
                <input type="number" 
                       step="0.01" 
                       class="inline-orcado-input" 
                       value="${(item.orcado || 0).toFixed(2)}" 
                       onchange="handleInlineOrcadoChange('${cat.id}', '${item.id}', this.value)" 
                       title="Clique para editar o valor orçado (Planejado)" />

                <input type="number" 
                       step="0.01" 
                       class="inline-realizado-input ${isSaida ? 'input-realizado-saida' : 'input-realizado-entrada'}" 
                       value="${(item.realizado || 0).toFixed(2)}" 
                       onchange="handleInlineRealizadoChange('${cat.id}', '${item.id}', this.value)" 
                       title="Clique para editar o valor realizado (Gasto real / Entrada real)" />

                <button class="btn-delete-item" onclick="handleDeleteItem('${cat.id}', '${item.id}')" title="Excluir item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Add Item Row (Finavera Style: Adicionar item... +) -->
        <div class="add-item-row">
          <input type="text" 
                 id="input-add-${cat.id}" 
                 placeholder="Adicionar item..." 
                 onkeydown="handleQuickAddKey(event, '${cat.id}')" />
          <button class="btn-add-item-plus" onclick="handleQuickAddBtn('${cat.id}')" title="Adicionar">+</button>
        </div>
      </div>
    </div>
  `;
}

// --- FUNÇÃO PARA EXPANDIR / RECOLHER ACCORDION ---
window.toggleAccordion = function(bodyId) {
  const body = document.getElementById(bodyId);
  if (!body) return;
  const parentCard = body.closest('.accordion-card');
  if (parentCard) {
    parentCard.classList.toggle('open');
  }
};

// --- HANDLERS INLINE DE ITENS ---
window.handleInlineOrcadoChange = function(catId, itemId, val) {
  const newNum = parseFloat(val) || 0;
  state.updateItemOrcado(catId, itemId, newNum);
  renderApp();
  showToast('Orçado atualizado!');
};

window.handleInlineRealizadoChange = function(catId, itemId, val) {
  const newNum = parseFloat(val) || 0;
  state.updateItemRealizado(catId, itemId, newNum);
  renderApp();
  showToast('Realizado atualizado!');
};

window.handleRenameItem = function(catId, itemId) {
  const found = state.findItemAndCategory(catId, itemId);
  if (!found) return;
  const newName = prompt('Novo nome para este item:', found.item.name);
  if (newName && newName.trim()) {
    state.updateItemName(catId, itemId, newName.trim());
    renderApp();
    showToast('Item renomeado!');
  }
};

window.handleDeleteItem = function(catId, itemId) {
  if (confirm('Deseja excluir este item?')) {
    state.deleteItem(catId, itemId);
    renderApp();
    showToast('Item removido.');
  }
};

window.handleQuickAddKey = function(event, catId) {
  if (event.key === 'Enter') {
    handleQuickAddBtn(catId);
  }
};

window.handleQuickAddBtn = function(catId) {
  const input = document.getElementById(`input-add-${catId}`);
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;

  state.addItemToCategory(catId, name, 0, 0, false);
  input.value = '';
  renderApp();
  showToast(`Item "${name}" adicionado!`);
};

// --- GERENCIAMENTO DE CATEGORIAS (RENOMEAR E EXCLUIR) ---
window.handleRenameCategory = function(catId) {
  const newName = prompt('Novo nome para a categoria:');
  if (!newName) return;
  const newIcon = prompt('Ícone / Emoji (ex: 📌, 🔒, 💳, 🛒):');
  state.renameCategory(catId, newName.trim(), newIcon ? newIcon.trim() : null);
  renderApp();
  showToast('Categoria atualizada com sucesso!');
};

window.handleDeleteCategory = function(catId, catName) {
  if (confirm(`Deseja realmente excluir toda a categoria "${catName}" e seus itens?`)) {
    state.deleteCategory(catId);
    renderApp();
    showToast(`Categoria "${catName}" excluída.`);
  }
};

// --- RENDERIZAR CARDS CONSOLIDADOS (3 PERFIS LADO A LADO) ---
function renderConsolidatedCards() {
  const calcProfile = (p) => {
    const cats = state.getCategoriesForProfile(p);
    let inc = 0, exp = 0;
    cats.forEach(c => {
      c.items.forEach(i => {
        if (c.flow === 'entrada') inc += (i.realizado || 0);
        else exp += (i.realizado || 0);
      });
    });
    return { inc, exp, bal: inc - exp };
  };

  const me = calcProfile('me');
  const gf = calcProfile('girlfriend');
  const biz = calcProfile('business');

  document.getElementById('c-me-inc').textContent = fmtCurrency(me.inc);
  document.getElementById('c-me-exp').textContent = fmtCurrency(me.exp);
  document.getElementById('c-me-bal').textContent = fmtCurrency(me.bal);

  document.getElementById('c-gf-inc').textContent = fmtCurrency(gf.inc);
  document.getElementById('c-gf-exp').textContent = fmtCurrency(gf.exp);
  document.getElementById('c-gf-bal').textContent = fmtCurrency(gf.bal);

  document.getElementById('c-biz-inc').textContent = fmtCurrency(biz.inc);
  document.getElementById('c-biz-exp').textContent = fmtCurrency(biz.exp);
  document.getElementById('c-biz-bal').textContent = fmtCurrency(biz.bal);
}

// --- COFRINHO (O FAMOSO PORQUINHO & CAIXINHAS) ---
function openCofrinhoModal() {
  renderCofrinhoModalUI();
  document.getElementById('modal-cofrinho').classList.add('open');
}

function closeCofrinhoModal() {
  document.getElementById('modal-cofrinho').classList.remove('open');
}

function renderCofrinhoModalUI() {
  const profile = state.activeProfile === 'all' ? 'me' : state.activeProfile;
  const profileLabels = { me: 'Rodrego', girlfriend: 'Rodrega', business: 'Empresa (PJ)' };
  
  const total = state.getTotalCofrinho(profile);
  document.getElementById('modal-cofrinho-total').textContent = fmtCurrency(total);
  document.getElementById('modal-cofrinho-profile-label').textContent = `Perfil Ativo: ${profileLabels[profile] || profile}`;

  const cofs = state.getCofrinhosForProfile(profile);

  // Preencher dropdown de caixinhas para guardar/resgatar
  const select = document.getElementById('cofrinho-target-select');
  if (select) {
    select.innerHTML = cofs.map(c => `
      <option value="${c.id}">${c.icon || '🐷'} ${c.name} (Saldo: ${fmtCurrency(c.saved)})</option>
    `).join('');
  }

  // Preencher Lista de Caixinhas com Barras de Progresso
  const container = document.getElementById('caixinhas-container');
  if (container) {
    if (cofs.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhuma caixinha criada ainda no porquinho.</p>';
    } else {
      container.innerHTML = cofs.map(c => {
        const pct = c.target > 0 ? Math.min(Math.round((c.saved / c.target) * 100), 100) : 0;
        return `
          <div class="caixinha-item-card">
            <div class="cic-top">
              <span class="cic-title">${c.icon || '🐷'} ${c.name}</span>
              <div class="cic-values">
                <strong>${fmtCurrency(c.saved)}</strong> de ${fmtCurrency(c.target)} (${pct}%)
              </div>
            </div>
            <div class="cic-progress-bar-bg">
              <div class="cic-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function handleCofrinhoDeposit() {
  const select = document.getElementById('cofrinho-target-select');
  const input = document.getElementById('cofrinho-action-amount');
  const amount = parseFloat(input.value) || 0;

  if (!select.value) {
    showToast('Crie ou selecione uma caixinha primeiro.');
    return;
  }
  if (amount <= 0) {
    showToast('Informe um valor válido maior que zero.');
    return;
  }

  state.depositToCofrinho(select.value, amount);
  input.value = '';
  renderCofrinhoModalUI();
  renderApp();
  showToast(`🐷 Parabéns! + ${fmtCurrency(amount)} guardado no Porquinho!`);
}

function handleCofrinhoWithdraw() {
  const select = document.getElementById('cofrinho-target-select');
  const input = document.getElementById('cofrinho-action-amount');
  const amount = parseFloat(input.value) || 0;

  if (!select.value) return;
  if (amount <= 0) {
    showToast('Informe um valor válido para resgate.');
    return;
  }

  state.withdrawFromCofrinho(select.value, amount);
  input.value = '';
  renderCofrinhoModalUI();
  renderApp();
  showToast(`Resgate de ${fmtCurrency(amount)} realizado.`);
}

function handleCreateCaixinha() {
  const profile = state.activeProfile === 'all' ? 'me' : state.activeProfile;
  const name = prompt('Nome da nova caixinha do Porquinho (Ex: Viagem 2027, IPVA, Comprar Notebook):');
  if (!name) return;
  const icon = prompt('Emoji da Caixinha (Ex: ✈️, 🚗, 🛡️, 💻, 💍):', '🐷');
  const targetStr = prompt('Meta de valor (R$):', '5000');
  const target = parseFloat(targetStr) || 5000;

  state.addCofrinho(profile, name.trim(), icon ? icon.trim() : '🐷', target);
  renderCofrinhoModalUI();
  renderApp();
  showToast(`Caixinha "${name}" adicionada ao Porquinho!`);
}

// --- ACERTO DE CONTAS DO CASAL (MOTOR MATEMÁTICO) ---
function updateCoupleSettlementMath() {
  const allCats = [
    ...(state.data.categories_me || []),
    ...(state.data.categories_girlfriend || [])
  ];

  let totalShared = 0;
  let paidByMe = 0;
  let paidByGf = 0;
  const sharedList = [];

  allCats.forEach(cat => {
    if (cat.flow === 'saida') {
      cat.items.forEach(item => {
        if (item.isShared && item.realizado > 0) {
          totalShared += item.realizado;
          if (cat.profile === 'me') {
            paidByMe += item.realizado;
          } else {
            paidByGf += item.realizado;
          }
          sharedList.push({ ...item, payer: cat.profile });
        }
      });
    }
  });

  const half = totalShared / 2;
  const netDue = paidByMe - half;

  const headerText = document.getElementById('header-couple-text');
  if (totalShared === 0) {
    headerText.textContent = 'Acerto: R$ 0,00';
  } else if (Math.abs(netDue) < 0.01) {
    headerText.textContent = 'Casal: Quitado!';
  } else if (netDue > 0) {
    headerText.textContent = `Receber: ${fmtCurrency(netDue)}`;
  } else {
    headerText.textContent = `Pagar: ${fmtCurrency(Math.abs(netDue))}`;
  }

  document.getElementById('couple-total-shared').textContent = fmtCurrency(totalShared);
  document.getElementById('couple-paid-me').textContent = fmtCurrency(paidByMe);
  document.getElementById('couple-paid-gf').textContent = fmtCurrency(paidByGf);

  const verdictMsg = document.getElementById('couple-verdict-msg');
  if (totalShared === 0) {
    verdictMsg.textContent = 'Sem gastos divididos cadastrados';
  } else if (Math.abs(netDue) < 0.01) {
    verdictMsg.textContent = 'Contas 100% equilibradas!';
  } else if (netDue > 0) {
    verdictMsg.textContent = `Rodrega deve acertar ${fmtCurrency(netDue)} com você`;
  } else {
    verdictMsg.textContent = `Você deve acertar ${fmtCurrency(Math.abs(netDue))} com Rodrego`;
  }

  const listContainer = document.getElementById('couple-shared-items-list');
  if (sharedList.length === 0) {
    listContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhum item marcado como compartilhado.</p>';
  } else {
    listContainer.innerHTML = sharedList.map(i => `
      <div class="couple-item-line">
        <div>
          <strong>${i.name}</strong>
          <small style="color: var(--text-muted); margin-left: 0.4rem;">
            (Pago por: ${i.payer === 'me' ? 'Você' : 'Rodrega'})
          </small>
        </div>
        <strong>${fmtCurrency(i.realizado)}</strong>
      </div>
    `).join('');
  }
}

// --- MODAL DE METAS ---
function openMetasModal() {
  renderMetasModalContent();
  document.getElementById('modal-metas').classList.add('open');
}

function closeMetasModal() {
  document.getElementById('modal-metas').classList.remove('open');
}

function renderMetasModalContent() {
  // Compromisso mensal
  const compEl = document.getElementById('meta-compromisso-display');
  if (compEl) compEl.textContent = fmtCurrency(state.metas.compromissoMensal);

  // Novas metas 100% personalizáveis
  const container = document.getElementById('custom-metas-container');
  if (!container) return;

  const metas = state.metas.customMetas || [];
  if (metas.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">Nenhuma meta cadastrada ainda. Clique em + Nova Meta para começar!</p>';
    return;
  }

  container.innerHTML = metas.map(meta => {
    const pct = meta.target > 0 ? Math.min(Math.round((meta.saved / meta.target) * 100), 100) : 0;
    return `
      <div class="meta-item-card-new">
        <div class="micn-top">
          <div class="micn-left">
            <span class="micn-icon">${meta.icon || '🎯'}</span>
            <div class="micn-info">
              <strong>${meta.name}</strong>
              <span class="micn-values">${fmtCurrency(meta.saved)} de ${fmtCurrency(meta.target)} &nbsp;·&nbsp; <span class="micn-pct">${pct}%</span></span>
            </div>
          </div>
          <div class="mic-actions">
            <button class="btn-icon-soft" onclick="editCustomMeta('${meta.id}')" title="Editar meta">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>
            <button class="btn-icon-soft btn-cat-action delete" onclick="deleteCustomMeta('${meta.id}')" title="Excluir meta">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="cic-progress-bar-bg">
          <div class="cic-progress-fill" style="width: ${pct}%; background: ${pct >= 100 ? '#10b981' : 'linear-gradient(90deg, #6366f1, #ec4899)'};"></div>
        </div>
      </div>
    `;
  }).join('');
}

window.editMetaCompromisso = function() {
  const cur = state.metas.compromissoMensal;
  const val = prompt('Definir compromisso mensal para poupar (R$):', cur);
  if (val !== null) {
    state.metas.compromissoMensal = parseFloat(val) || 200;
    state.saveMetas(state.metas);
    renderMetasModalContent();
    renderApp();
    showToast('Compromisso mensal atualizado!');
  }
};

window.editCustomMeta = function(id) {
  const meta = (state.metas.customMetas || []).find(m => m.id === id);
  if (!meta) return;
  const newName = prompt('Nome da meta:', meta.name);
  if (newName === null) return;
  const newIcon = prompt('Ícone/Emoji:', meta.icon || '🎯');
  const newTargetStr = prompt('Valor alvo (R$):', meta.target);
  const newSavedStr = prompt('Valor já guardado (R$):', meta.saved || 0);
  if (newName) meta.name = newName.trim();
  if (newIcon) meta.icon = newIcon.trim();
  meta.target = parseFloat(newTargetStr) || meta.target;
  meta.saved = parseFloat(newSavedStr) || 0;
  state.saveMetas(state.metas);
  renderMetasModalContent();
  renderApp();
  showToast('✅ Meta atualizada!');
};

window.deleteCustomMeta = function(id) {
  if (!confirm('Deseja realmente excluir esta meta?')) return;
  state.metas.customMetas = (state.metas.customMetas || []).filter(m => m.id !== id);
  state.saveMetas(state.metas);
  renderMetasModalContent();
  renderApp();
  showToast('Meta removida.');
};



// --- MODAL DE NOVO ITEM / LANÇAMENTO (+ NOVO) ---
function openItemModal() {
  const form = document.getElementById('form-item');
  form.reset();
  document.getElementById('form-item-id').value = '';

  const activeP = state.activeProfile === 'all' ? 'me' : state.activeProfile;
  document.getElementById('form-item-profile').value = activeP;
  populateCategorySelect(activeP, 'saida');

  document.getElementById('modal-item').classList.add('open');
}

function closeItemModal() {
  document.getElementById('modal-item').classList.remove('open');
}

function populateCategorySelect(profile, flow) {
  const select = document.getElementById('form-item-cat');
  const cats = state.getCategoriesForProfile(profile).filter(c => c.flow === flow);
  select.innerHTML = cats.map(c => `<option value="${c.id}">${c.icon || '📁'} ${c.name}</option>`).join('');
}

function handleItemFormSubmit(e) {
  e.preventDefault();
  const profile = document.getElementById('form-item-profile').value;
  const catId = document.getElementById('form-item-cat').value;
  const name = document.getElementById('form-item-name').value.trim();
  const orcado = parseFloat(document.getElementById('form-item-orcado').value) || 0;
  const realizado = parseFloat(document.getElementById('form-item-realizado').value) || 0;
  const isShared = document.getElementById('form-item-is-shared').checked;

  if (!name) {
    showToast('Informe o nome do item.');
    return;
  }

  const key = `categories_${profile}`;
  const cat = state.data[key]?.find(c => c.id === catId);
  if (cat) {
    cat.items.push({
      id: 'item-' + Date.now(),
      name,
      orcado,
      realizado,
      isShared
    });
    state.saveData(state.data);
    renderApp();
    showToast(`Lançamento "${name}" adicionado com sucesso!`);
    closeItemModal();
  }
}

// --- MODAL DE NOVA CATEGORIA ---
window.openNewCatModal = function(flow = 'saida') {
  document.getElementById('form-new-cat').reset();
  const activeP = state.activeProfile === 'all' ? 'me' : state.activeProfile;
  document.getElementById('new-cat-profile').value = activeP;
  document.getElementById('new-cat-flow').value = flow;
  selectCatEmoji('📌');
  document.getElementById('modal-new-cat').classList.add('open');
};

window.selectCatEmoji = function(emoji) {
  const input = document.getElementById('new-cat-icon');
  if (input) input.value = emoji;
  document.querySelectorAll('.emoji-chip').forEach(chip => {
    chip.classList.toggle('active', chip.textContent.trim() === emoji);
  });
};

function closeNewCatModal() {
  document.getElementById('modal-new-cat').classList.remove('open');
}

function handleNewCatSubmit(e) {
  e.preventDefault();
  const flow = document.getElementById('new-cat-flow').value;
  const profile = document.getElementById('new-cat-profile').value;
  const icon = document.getElementById('new-cat-icon').value.trim() || '📁';
  const name = document.getElementById('new-cat-name').value.trim();

  if (!name) return;

  state.addCategory(profile, flow, name, icon);
  renderApp();
  closeNewCatModal();
  showToast(`Categoria "${name}" criada com sucesso!`);
}

// --- MODAL DO CASAL ---
function openCoupleModal() {
  updateCoupleSettlementMath();
  document.getElementById('modal-couple').classList.add('open');
}

function closeCoupleModal() {
  document.getElementById('modal-couple').classList.remove('open');
}

// --- MODAL DE EXTRATO ---
function openExtratoModal() {
  const tbody = document.getElementById('extrato-table-body');
  const allProfiles = ['me', 'girlfriend', 'business'];
  const profileLabels = { me: 'Rodrego', girlfriend: 'Rodrega', business: 'Empresa (PJ)' };

  let rowsHtml = '';
  allProfiles.forEach(p => {
    const cats = state.data[`categories_${p}`] || [];
    cats.forEach(c => {
      c.items.forEach(i => {
        rowsHtml += `
          <tr>
            <td><strong>${profileLabels[p]}</strong></td>
            <td><span class="badge ${c.flow === 'entrada' ? 'badge-inc' : 'badge-exp'}">${c.flow === 'entrada' ? 'Entrada' : 'Saída'}</span></td>
            <td>${c.name}</td>
            <td>${i.name}</td>
            <td>${fmtCurrency(i.orcado)}</td>
            <td><strong>${fmtCurrency(i.realizado)}</strong></td>
            <td>${i.isShared ? '<span class="item-tag-shared">Sim</span>' : 'Não'}</td>
            <td>
              <button class="btn-delete-item" onclick="deleteFromExtrato('${c.id}', '${i.id}')" title="Excluir">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
              </button>
            </td>
          </tr>
        `;
      });
    });
  });

  tbody.innerHTML = rowsHtml || '<tr><td colspan="8" style="text-align:center; padding: 1rem;">Nenhum item lançado.</td></tr>';
  document.getElementById('modal-extrato').classList.add('open');
}

function closeExtratoModal() {
  document.getElementById('modal-extrato').classList.remove('open');
}

window.deleteFromExtrato = function(catId, itemId) {
  if (confirm('Deseja excluir este lançamento?')) {
    ['categories_me', 'categories_girlfriend', 'categories_business'].forEach(key => {
      const cat = state.data[key]?.find(c => c.id === catId);
      if (cat) cat.items = cat.items.filter(i => i.id !== itemId);
    });
    state.saveData(state.data);
    renderApp();
    openExtratoModal();
    showToast('Lançamento removido.');
  }
};

// --- EXPORTAÇÃO CSV & BACKUP JSON ---
function exportCSV() {
  const headers = ['Perfil', 'Tipo', 'Categoria', 'Item', 'Orçado (R$)', 'Realizado (R$)', 'Dividido Casal'];
  const rows = [];
  const profileLabels = { me: 'Rodrego', girlfriend: 'Rodrega', business: 'Empresa PJ' };

  ['me', 'girlfriend', 'business'].forEach(p => {
    const cats = state.data[`categories_${p}`] || [];
    cats.forEach(c => {
      c.items.forEach(i => {
        rows.push([
          profileLabels[p],
          c.flow === 'entrada' ? 'Entrada' : 'Saída',
          `"${c.name}"`,
          `"${i.name}"`,
          (i.orcado || 0).toFixed(2).replace('.', ','),
          (i.realizado || 0).toFixed(2).replace('.', ','),
          i.isShared ? 'Sim' : 'Não'
        ]);
      });
    });
  });

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `painel_financeiro_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Planilha CSV gerada com sucesso!');
}

function exportBackupJSON() {
  const fullBackup = {
    data: state.data,
    metas: state.metas,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finavera_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Backup JSON baixado!');
}

function handleRestoreJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.data && parsed.metas) {
        state.saveData(parsed.data);
        state.saveMetas(parsed.metas);
        renderApp();
        showToast('Backup completo restaurado com sucesso!');
      } else {
        showToast('Arquivo de backup incompatível.');
      }
    } catch (err) {
      showToast('Erro ao processar o arquivo.');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// --- NOTIFICAÇÕES TOAST ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 250ms ease';
    setTimeout(() => toast.remove(), 250);
  }, 2400);
}


// =============================================================
// --- DÍVIDAS & PASSIVOS ---
// =============================================================
function renderDividasModalUI() {
  if (!Array.isArray(state.dividas)) {
    state.dividas = [];
  }
  const totalRestante = state.getTotalDividas();
  const totalPago = state.getTotalPaidDividas();
  const totalGeral = totalRestante + totalPago;
  const mensalidade = state.getMonthlyDividas();

  // KPI no topo do modal
  const el = (id) => document.getElementById(id);
  if (el('div-total-restante')) el('div-total-restante').textContent = fmtCurrency(totalRestante);
  if (el('div-total-pago')) el('div-total-pago').textContent = fmtCurrency(totalPago);
  if (el('div-mensalidade-total')) el('div-mensalidade-total').textContent = fmtCurrency(mensalidade);

  // Populate select for abatimento
  const selectDiv = el('select-divida-abater');
  if (selectDiv) {
    selectDiv.innerHTML = '<option value="">Selecione a dívida...</option>' +
      (state.dividas || []).map(d => {
        const saldo = Math.max(0, (d.total || 0) - (d.paid || 0));
        return `<option value="${d.id}">${d.icon || '💳'} ${d.name} — saldo: ${fmtCurrency(saldo)}</option>`;
      }).join('');
  }

  // List cards
  const container = el('dividas-list-container');
  if (!container) return;

  if (!state.dividas || state.dividas.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 1.5rem 0;">Nenhuma dívida cadastrada. Clique em "+ Nova Dívida" acima para começar!</p>';
    return;
  }

  container.innerHTML = state.dividas.map(d => {
    const saldo = Math.max(0, (d.total || 0) - (d.paid || 0));
    const pct = d.total > 0 ? Math.min(Math.round(((d.paid || 0) / d.total) * 100), 100) : 0;
    const done = saldo <= 0;
    return `
      <div class="divida-card${done ? ' divida-quitada' : ''}">
        <div class="divida-card-header">
          <div class="divida-icon-name">
            <span class="divida-icon">${d.icon || '💳'}</span>
            <div>
              <strong>${d.name}</strong>
              <span class="divida-monthly">Parcela mínima: ${fmtCurrency(d.monthlyMin)}/mês</span>
            </div>
          </div>
          <div class="divida-card-actions">
            <button class="btn-icon-soft" onclick="openEditDividaPrompt('${d.id}')" title="Editar dívida">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>
            <button class="btn-icon-soft btn-cat-action delete" onclick="deleteDividaCard('${d.id}')" title="Remover dívida">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="divida-values">
          <span class="divida-saldo ${done ? 'saldo-quitado' : ''}">${done ? '✅ QUITADA' : 'Saldo: ' + fmtCurrency(saldo)}</span>
          <span class="divida-total-paid">Pago: ${fmtCurrency(d.paid || 0)} / ${fmtCurrency(d.total)}</span>
        </div>
        <div class="cic-progress-bar-bg" style="margin-top: 0.5rem;">
          <div class="cic-progress-fill" style="width: ${pct}%; background: ${done ? '#10b981' : 'linear-gradient(90deg, #f59e0b, #ef4444)'};"></div>
        </div>
        <div style="text-align: right; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${pct}% quitado</div>
      </div>
    `;
  }).join('');

  // Update the KPI card in main dashboard
  updateDividasKPI();
}

window.openDividasModal = function() {
  try {
    renderDividasModalUI();
  } catch (err) {
    console.error('Error rendering dividas modal:', err);
  }
  const modal = document.getElementById('modal-dividas');
  if (modal) modal.classList.add('open');
};

window.closeDividasModal = function() {
  const modal = document.getElementById('modal-dividas');
  if (modal) modal.classList.remove('open');
};

function updateDividasKPI() {
  const totalRestante = state.getTotalDividas();
  const totalPago = state.getTotalPaidDividas();
  const kpiEl = document.getElementById('kpi-dividas-total');
  if (kpiEl) kpiEl.textContent = fmtCurrency(totalRestante);
  const kpiMonEl = document.getElementById('kpi-dividas-mensal');
  if (kpiMonEl) kpiMonEl.textContent = fmtCurrency(state.getMonthlyDividas());
  const kpiSub = document.getElementById('kpi-dividas-paid-sub');
  if (kpiSub) {
    const totalGeral = totalRestante + totalPago;
    const pct = totalGeral > 0 ? Math.round((totalPago / totalGeral) * 100) : 0;
    kpiSub.textContent = `Pago: ${fmtCurrency(totalPago)} (${pct}%)`;
  }
}

window.handleAbaterDivida = function() {
  const selectEl = document.getElementById('select-divida-abater');
  const inputEl = document.getElementById('input-abatimento-valor');
  if (!selectEl || !inputEl) return;

  const divId = selectEl.value;
  const amount = parseFloat(inputEl.value);

  if (!divId) { showToast('Selecione uma dívida.'); return; }
  if (!amount || amount <= 0) { showToast('Informe um valor válido.'); return; }

  const updated = state.abaterDivida(divId, amount);
  if (updated) {
    inputEl.value = '';
    renderDividasModalUI();
    renderApp();
    const saldo = Math.max(0, updated.total - updated.paid);
    showToast(saldo <= 0 ? `🎉 Parabéns! "${updated.name}" foi quitada!` : `✅ R$ ${amount.toFixed(2)} abatido de "${updated.name}"!`);
  }
};
function handleAbaterDivida() { window.handleAbaterDivida(); }

window.handleCreateDivida = function() {
  const name = prompt('Nome da dívida (Ex: Financiamento do Carro, Cartão Nubank, Empréstimo):');
  if (!name) return;
  const icon = prompt('Ícone/Emoji:', '💳');
  const totalStr = prompt('Valor total da dívida (R$):');
  const minStr = prompt('Parcela mínima mensal (R$):', '0');
  const total = parseFloat(totalStr);
  if (!total || total <= 0) { showToast('Informe um valor total válido.'); return; }
  const monthly = parseFloat(minStr) || 0;

  state.addDivida(name.trim(), icon || '💳', total, monthly);
  renderDividasModalUI();
  renderApp();
  showToast(`✅ Dívida "${name}" cadastrada!`);
};
function handleCreateDivida() { window.handleCreateDivida(); }

window.openEditDividaPrompt = function(id) {
  const d = (state.dividas || []).find(d => d.id === id);
  if (!d) return;
  const newName = prompt('Nome:', d.name);
  if (newName === null) return;
  const newIcon = prompt('Ícone:', d.icon);
  const newTotal = prompt('Valor total (R$):', d.total);
  const newPaid = prompt('Quanto já foi pago (R$):', d.paid || 0);
  const newMonthly = prompt('Parcela mínima mensal (R$):', d.monthlyMin);
  state.editDivida(id, {
    name: newName.trim() || d.name,
    icon: (newIcon || d.icon).trim(),
    total: parseFloat(newTotal) || d.total,
    paid: parseFloat(newPaid) || 0,
    monthlyMin: parseFloat(newMonthly) || 0
  });
  renderDividasModalUI();
  renderApp();
  showToast('✅ Dívida atualizada!');
};

window.deleteDividaCard = function(id) {
  const d = (state.dividas || []).find(d => d.id === id);
  if (!d) return;
  if (!confirm(`Deseja remover "${d.name}" da lista de dívidas?`)) return;
  state.deleteDivida(id);
  renderDividasModalUI();
  renderApp();
  showToast('Dívida removida.');
};

// =============================================================
// --- SYNC STATUS INDICATOR ---
// =============================================================
function setSyncStatus(status) {
  const btn = document.getElementById('btn-open-supabase-modal');
  if (!btn) return;
  const icons = { syncing: '🔄', ok: '☁️', error: '⚠️' };
  const icon = btn.querySelector('.sync-icon');
  if (icon) icon.textContent = icons[status] || '☁️';
  btn.title = status === 'ok' ? 'Sincronizado com a nuvem ✓' : status === 'error' ? 'Erro de sincronização' : 'Sincronizando...';
}

// =============================================================
// --- SUPABASE MODAL ---
// =============================================================
window.openSupabaseModal = function() {
  const urlEl = document.getElementById('input-supabase-url');
  const keyEl = document.getElementById('input-supabase-key');
  const uidEl = document.getElementById('input-supabase-uid');
  if (urlEl) urlEl.value = state.supabaseUrl || '';
  if (keyEl) keyEl.value = state.supabaseKey || '';
  if (uidEl) uidEl.value = state.supabaseUserId || 'shared';
  const modal = document.getElementById('modal-supabase');
  if (modal) modal.classList.add('open');
};
function openSupabaseModal() { window.openSupabaseModal(); }

window.closeSupabaseModal = function() {
  const modal = document.getElementById('modal-supabase');
  if (modal) modal.classList.remove('open');
};
function closeSupabaseModal() { window.closeSupabaseModal(); }

window.handleSaveSupabaseConfig = async function() {
  const url = (document.getElementById('input-supabase-url')?.value || '').trim();
  const key = (document.getElementById('input-supabase-key')?.value || '').trim();
  const uid = (document.getElementById('input-supabase-uid')?.value || 'shared').trim();
  if (!url || !key) { showToast('Preencha URL e API Key do Supabase.'); return; }
  state.setSupabaseConfig(url, key, uid);
  window.closeSupabaseModal();
  showToast('☁️ Config salva! Sincronizando com a nuvem...');
  const loaded = await state.loadFromSupabase();
  if (loaded) {
    renderApp();
    showToast('☁️ Dados carregados da nuvem com sucesso!');
  } else {
    state.syncToSupabase();
    showToast('☁️ Nuvem configurada! Enviando seus dados...');
  }
};
function handleSaveSupabaseConfig() { window.handleSaveSupabaseConfig(); }

window.handleSyncNow = async function() {
  showToast('🔄 Buscando dados da nuvem...');
  const loaded = await state.loadFromSupabase();
  if (loaded) {
    renderApp();
    showToast('☁️ Dados atualizados da nuvem com sucesso!');
  } else {
    showToast('Nuvem não configurada ou sem dados ainda.');
  }
};

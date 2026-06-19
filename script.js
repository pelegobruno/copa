// ==========================================
// CONFIGURAÇÃO FIREBASE (TEMPO REAL VIA CDN)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyB7vfszXpZ8dDvT8olDu3-yr3m0ML6nFTc",
    authDomain: "copa-26-3c0ff.firebaseapp.com",
    databaseURL: "https://copa-26-3c0ff-default-rtdb.firebaseio.com",
    projectId: "copa-26-3c0ff",
    storageBucket: "copa-26-3c0ff.firebasestorage.app",
    messagingSenderId: "536434048427",
    appId: "1:536434048427:web:7a8a1e984c0782e503a6ee",
    measurementId: "G-MJ7D0RX5MY"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ==========================================
// SISTEMA DE BANDEIRAS (FLAGCDN) E NOMES
// ==========================================
const bandeiras = {
    "México": "mx", "Coreia do Sul": "kr", "Tchéquia": "cz", "África do Sul": "za",
    "Canadá": "ca", "Suíça": "ch", "Catar": "qa", "Bósnia e H.": "ba",
    "Brasil": "br", "Marrocos": "ma", "Haiti": "ht", "Escócia": "gb-sct",
    "EUA": "us", "Austrália": "au", "Turquia": "tr", "Paraguai": "py",
    "Alemanha": "de", "Equador": "ec", "Costa do Marfim": "ci", "Curaçao": "cw",
    "Holanda": "nl", "Suécia": "se", "Japão": "jp", "Tunísia": "tn",
    "Bélgica": "be", "Egito": "eg", "Irã": "ir", "Nova Zelândia": "nz",
    "Espanha": "es", "Uruguai": "uy", "Arábia Saudita": "sa", "Cabo Verde": "cv",
    "França": "fr", "Noruega": "no", "Senegal": "sn", "Iraque": "iq",
    "Argentina": "ar", "Áustria": "at", "Jordânia": "jo", "Argélia": "dz",
    "Portugal": "pt", "Colômbia": "co", "Uzbequistão": "uz", "RD Congo": "cd",
    "Inglaterra": "gb-eng", "Croácia": "hr", "Gana": "gh", "Panamá": "pa"
};

function renderTime(nome, lado = 'esquerda') {
    const codigo = bandeiras[nome];
    if (codigo) {
        if (lado === 'direita') {
            return `<div class="time-wrapper"><span>${nome}</span> <img src="https://flagcdn.com/w20/${codigo}.png" class="bandeira-img"></div>`;
        }
        return `<div class="time-wrapper"><img src="https://flagcdn.com/w20/${codigo}.png" class="bandeira-img"> <span>${nome}</span></div>`;
    }
    return `<span>${nome}</span>`;
}

// ==========================================
// SISTEMA DYNAMIC DE ELENCO EXTERNO
// ==========================================
function obterElenco(selecao) {
    if (typeof elencosOficiais !== "undefined" && elencosOficiais[selecao]) {
        return elencosOficiais[selecao];
    }
    let elencoFicticio = [];
    let num = 1;
    for(let i=0; i<3; i++) elencoFicticio.push({ num: num++, nome: `Goleiro Reservado ${i+1}`, pos: "Goleiro" });
    for(let i=0; i<7; i++) elencoFicticio.push({ num: num++, nome: `Defensor Convocado ${i+1}`, pos: "Defensor" });
    for(let i=0; i<7; i++) elencoFicticio.push({ num: num++, nome: `Meio-campista Convocado ${i+1}`, pos: "Meio-campista" });
    for(let i=0; i<6; i++) elencoFicticio.push({ num: num++, nome: `Atacante Convocado ${i+1}`, pos: "Atacante" });
    return elencoFicticio;
}

window.abrirElenco = function(selecao) {
    const modal = document.getElementById('modal-elenco');
    const titulo = document.getElementById('elenco-titulo');
    const bandeira = document.getElementById('elenco-bandeira');
    const lista = document.getElementById('elenco-lista');

    titulo.innerText = selecao;
    const codigo = bandeiras[selecao];
    if(codigo) {
        bandeira.src = `https://flagcdn.com/w40/${codigo}.png`;
        bandeira.style.display = "block";
    } else {
        bandeira.style.display = "none";
    }

    const jogadores = obterElenco(selecao);
    let htmlLista = '';
    jogadores.forEach(jog => {
        htmlLista += `
            <div class="jogador-item">
                <div class="jogador-num">${jog.num}</div>
                <div class="jogador-dados">
                    <div class="jogador-nome">${jog.nome}</div>
                    <div class="jogador-pos">${jog.pos}</div>
                </div>
            </div>
        `;
    });

    lista.innerHTML = htmlLista;
    modal.style.display = "flex";
};

window.fecharElenco = function() {
    document.getElementById('modal-elenco').style.display = "none";
};

// ==========================================
// SINCRO/ESTADO DO BANCO DE DADOS DA NUVEM
// ==========================================
let bancoDeDados = {};
let isAppIniciado = false;
const listaGrupos = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Grupo I", "Grupo J", "Grupo K", "Grupo L"];

function salvarBD() {
    db.ref('copa2026_oficial').set(bancoDeDados);
}

// ==========================================
// INTELIGÊNCIA: CÁLCULO DE TABELA DE GRUPOS
// ==========================================
function recalcularTabelas() {
    listaGrupos.forEach(grupo => {
        bancoDeDados[grupo].classificacao.forEach(t => {
            t.pts = 0; t.j = 0; t.v = 0; t.e = 0; t.d = 0; t.gp = 0; t.gc = 0; t.sg = 0;
        });

        bancoDeDados[grupo].jogos.forEach(jogo => {
            if (jogo.placar && jogo.placar !== "-") {
                let placarQuebrado = jogo.placar.split('-');
                let g1 = parseInt(placarQuebrado[0]);
                let g2 = parseInt(placarQuebrado[1]);

                if (!isNaN(g1) && !isNaN(g2)) {
                    let time1 = bancoDeDados[grupo].classificacao.find(t => t.time === jogo.t1);
                    let time2 = bancoDeDados[grupo].classificacao.find(t => t.time === jogo.t2);

                    if (time1 && time2) {
                        time1.j++; time2.j++;
                        time1.gp += g1; time2.gp += g2;
                        time1.gc += g2; time2.gc += g1;
                        time1.sg = time1.gp - time1.gc;
                        time2.sg = time2.gp - time2.gc;

                        if (g1 > g2) { time1.pts += 3; time1.v++; time2.d++; }
                        else if (g1 < g2) { time2.pts += 3; time2.v++; time1.d++; }
                        else { time1.pts += 1; time2.pts += 1; time1.e++; time2.e++; }
                    }
                }
            }
        });

        bancoDeDados[grupo].classificacao.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.sg !== a.sg) return b.sg - a.sg;
            return b.gp - a.gp;
        });

        bancoDeDados[grupo].classificacao.forEach((t, i) => t.pos = i + 1);
    });
}

function atualizarFasesMataMata() {
    const classificados = {};

    listaGrupos.forEach(grupo => {
        const classif = bancoDeDados[grupo].classificacao;
        const todosFinalizados = bancoDeDados[grupo].jogos.every(j => j.placar !== "-");
        
        if (todosFinalizados) {
            classificados[`1º ${grupo}`] = classif[0].time;
            classificados[`2º ${grupo}`] = classif[1].time;
        }
    });

    bancoDeDados["16-avos"].forEach((jogo, i) => {
        const originalT1 = dadosIniciais["16-avos"][i].t1;
        const originalT2 = dadosIniciais["16-avos"][i].t2;
        
        if (originalT1.includes("Grupo") && classificados[originalT1]) jogo.t1 = classificados[originalT1];
        if (originalT2.includes("Grupo") && classificados[originalT2]) jogo.t2 = classificados[originalT2];
    });

    const getVencedorOuPerdedor = (fase, index, querVencedor) => {
        const j = bancoDeDados[fase][index];
        if (j.placar === "-") return null;
        let [g1, g2] = j.placar.split('-').map(Number);
        
        if (g1 > g2) return querVencedor ? j.t1 : j.t2;
        if (g2 > g1) return querVencedor ? j.t2 : j.t1;
        if (j.penaltis) {
            let [p1, p2] = j.penaltis.split('-').map(Number);
            if (p1 > p2) return querVencedor ? j.t1 : j.t2;
            if (p2 > p1) return querVencedor ? j.t2 : j.t1;
        }
        return null;
    };

    const mapaJogos = {
        73: { f: "16-avos", i: 0 }, 74: { f: "16-avos", i: 1 }, 75: { f: "16-avos", i: 2 }, 76: { f: "16-avos", i: 3 },
        77: { f: "16-avos", i: 4 }, 78: { f: "16-avos", i: 5 }, 79: { f: "16-avos", i: 6 }, 80: { f: "16-avos", i: 7 },
        81: { f: "16-avos", i: 8 }, 82: { f: "16-avos", i: 9 }, 83: { f: "16-avos", i: 10 }, 84: { f: "16-avos", i: 11 },
        85: { f: "16-avos", i: 12 }, 86: { f: "16-avos", i: 13 }, 87: { f: "16-avos", i: 14 }, 88: { f: "16-avos", i: 15 },
        89: { f: "Oitavas", i: 0 }, 90: { f: "Oitavas", i: 1 }, 91: { f: "Oitavas", i: 2 }, 92: { f: "Oitavas", i: 3 },
        93: { f: "Oitavas", i: 4 }, 94: { f: "Oitavas", i: 5 }, 95: { f: "Oitavas", i: 6 }, 96: { f: "Oitavas", i: 7 },
        97: { f: "Quartas", i: 0 }, 98: { f: "Quartas", i: 1 }, 99: { f: "Quartas", i: 2 }, 100: { f: "Quartas", i: 3 },
        101: { f: "Semifinais", i: 0 }, 102: { f: "Semifinais", i: 1 }
    };

    const processarAvanco = (faseAtual) => {
        bancoDeDados[faseAtual].forEach((jogo, i) => {
            const originalT1 = dadosIniciais[faseAtual][i].t1;
            const originalT2 = dadosIniciais[faseAtual][i].t2;

            const processarTime = (templateStr) => {
                if (templateStr.startsWith("Venc. Jogo ")) {
                    const num = parseInt(templateStr.replace("Venc. Jogo ", ""));
                    if (mapaJogos[num]) return getVencedorOuPerdedor(mapaJogos[num].f, mapaJogos[num].i, true) || jogo.t1;
                } else if (templateStr.startsWith("Perdedor ")) {
                    const num = parseInt(templateStr.replace("Perdedor ", ""));
                    if (mapaJogos[num]) return getVencedorOuPerdedor(mapaJogos[num].f, mapaJogos[num].i, false) || jogo.t2;
                }
                return null;
            };

            const novoT1 = processarTime(originalT1);
            const novoT2 = processarTime(originalT2);

            if (novoT1 && novoT1 !== originalT1) jogo.t1 = novoT1;
            if (novoT2 && novoT2 !== originalT2) jogo.t2 = novoT2;
        });
    };

    processarAvanco("Oitavas");
    processarAvanco("Quartas");
    processarAvanco("Semifinais");
    processarAvanco("3º Lugar");
    processarAvanco("Final");
}

// ==========================================
// MONITOR DE RELÓGIO UNIVERSAL
// ==========================================
function atualizarStatusAoVivo() {
    const agora = new Date();
    let mudouAlgo = false;

    Object.keys(bancoDeDados).forEach(fase => {
        const jogos = listaGrupos.includes(fase) ? bancoDeDados[fase].jogos : bancoDeDados[fase];
        
        jogos.forEach(jogo => {
            const matchInfo = jogo.data.match(/(\d{2})\/(\d{2}).*?(\d{2}):(\d{2})/);
            if (matchInfo) {
                const dia = parseInt(matchInfo[1]);
                const mes = parseInt(matchInfo[2]) - 1; 
                const hora = parseInt(matchInfo[3]);
                const min = parseInt(matchInfo[4]);
                
                const dataJogo = new Date(2026, mes, dia, hora, min);
                const difMs = agora.getTime() - dataJogo.getTime();
                const minutosPassados = difMs / (1000 * 60);
                
                let statusAntigoAoVivo = jogo.aoVivo;
                let statusAntigoEncerrado = jogo.encerrado;
                let placarAntigo = jogo.placar;

                if (minutosPassados >= 0 && minutosPassados <= 120) {
                    jogo.aoVivo = true;
                    jogo.encerrado = false;
                    
                    if (!jogo.placar || jogo.placar === "-") {
                        jogo.placar = "0-0";
                    }
                } 
                else if (minutosPassados > 120) {
                    jogo.aoVivo = false;
                    jogo.encerrado = true;
                } 
                else {
                    jogo.aoVivo = false;
                    jogo.encerrado = false;
                }

                if (jogo.aoVivo !== statusAntigoAoVivo || jogo.encerrado !== statusAntigoEncerrado || jogo.placar !== placarAntigo) {
                    mudouAlgo = true;
                }
            }
        });
    });

    if (mudouAlgo) {
        recalcularTabelas(); 
        atualizarFasesMataMata();
        salvarBD();
        
        const abaAtiva = document.querySelector('.menu-wrapper button.ativo')?.innerText || 'Jogos de Hoje';
        carregarAba(abaAtiva);
    }
}
setInterval(atualizarStatusAoVivo, 30000);

// ==========================================
// INTERAÇÕES DE EDIÇÃO DO USUÁRIO
// ==========================================
let jogoEditando = null;
let faseEditando = null;

window.editarPlacar = function(fase, indexJogo) {
    faseEditando = fase;
    let isFaseDeGrupos = listaGrupos.includes(fase);
    
    jogoEditando = isFaseDeGrupos ? bancoDeDados[fase].jogos[indexJogo] : bancoDeDados[fase][indexJogo];

    document.getElementById('modal-teams').innerText = `${jogoEditando.t1} x ${jogoEditando.t2}`;
    
    const golsT1Input = document.getElementById('gols-t1');
    const golsT2Input = document.getElementById('gols-t2');
    const areaPenaltis = document.getElementById('modal-penaltis-area');
    const penT1Input = document.getElementById('pen-t1');
    const penT2Input = document.getElementById('pen-t2');

    if (jogoEditando.placar !== "-") {
        let [g1, g2] = jogoEditando.placar.split('-');
        golsT1Input.value = g1;
        golsT2Input.value = g2;
    } else {
        golsT1Input.value = "";
        golsT2Input.value = "";
    }

    if (jogoEditando.penaltis) {
        let [p1, p2] = jogoEditando.penaltis.split('-');
        penT1Input.value = p1;
        penT2Input.value = p2;
    } else {
        penT1Input.value = "";
        penT2Input.value = "";
    }

    function checarPenaltis() {
        if (!isFaseDeGrupos && golsT1Input.value !== "" && golsT2Input.value !== "" && golsT1Input.value === golsT2Input.value) {
            areaPenaltis.style.display = "block";
        } else {
            areaPenaltis.style.display = "none";
        }
    }

    golsT1Input.oninput = checarPenaltis;
    golsT2Input.oninput = checarPenaltis;
    checarPenaltis();

    document.getElementById('modal-placar').style.display = "flex";
};

document.getElementById('btn-cancelar').onclick = () => {
    document.getElementById('modal-placar').style.display = "none";
    jogoEditando = null;
};

document.getElementById('btn-salvar').onclick = () => {
    if (!jogoEditando) return;

    const g1 = document.getElementById('gols-t1').value;
    const g2 = document.getElementById('gols-t2').value;

    if (g1 !== "" && g2 !== "") {
        jogoEditando.placar = `${g1}-${g2}`;
        
        let isFaseDeGrupos = listaGrupos.includes(faseEditando);

        if (!isFaseDeGrupos && g1 === g2) {
            const p1 = document.getElementById('pen-t1').value;
            const p2 = document.getElementById('pen-t2').value;
            if (p1 !== "" && p2 !== "") jogoEditando.penaltis = `${p1}-${p2}`;
            else jogoEditando.penaltis = "";
        } else {
            jogoEditando.penaltis = "";
        }

        recalcularTabelas(); 
        atualizarFasesMataMata(); 
        salvarBD(); 
        
        document.getElementById('modal-placar').style.display = "none";
        
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.value.trim() !== "") {
            searchInput.dispatchEvent(new Event('input'));
        } else {
            const abaAtiva = document.querySelector('.menu-wrapper button.ativo')?.innerText || 'Jogos de Hoje';
            carregarAba(abaAtiva);
        }
    }
};

// ==========================================
// RENDERIZAÇÃO DA INTERFACE GRÁFICA
// ==========================================
const abas = ["Jogos de Hoje", "Tabelas de Classificação", "Jogos (Fase de Grupos)", "16-avos", "Oitavas", "Quartas", "Semifinais", "3º Lugar", "Final"];
const menuContainer = document.getElementById('menu');
const tituloFase = document.getElementById('fase-titulo');
const classificacaoContainer = document.getElementById('classificacao-container');
const jogosContainer = document.getElementById('jogos-container');
const tituloJogos = document.getElementById('jogos-titulo');

function criarCardJogo(jogo, fase, index) {
    const agora = new Date();
    const matchInfo = jogo.data.match(/(\d{2})\/(\d{2}).*?(\d{2}):(\d{2})/);
    let aoVivoClass = '';
    let badgeHtml = '';

    if (matchInfo) {
        const dia = parseInt(matchInfo[1]);
        const mes = parseInt(matchInfo[2]) - 1;
        const hora = parseInt(matchInfo[3]);
        const min = parseInt(matchInfo[4]);
        const dataJogo = new Date(2026, mes, dia, hora, min);
        const difMs = agora.getTime() - dataJogo.getTime();
        const minutesPassed = difMs / (1000 * 60);

        if (minutesPassed >= 0 && minutesPassed <= 120) {
            aoVivoClass = ' ao-vivo';
            badgeHtml = '<span class="badge-aovivo">AO VIVO</span>';
        } else if (minutesPassed > 120) {
            aoVivoClass = ' jogo-encerrado';
            badgeHtml = '<span class="badge-encerrado">ENCERRADO</span>';
        }
    }

    const nomeFaseCard = listaGrupos.includes(fase) ? `${fase} • ${jogo.data}` : `${fase} • ${jogo.data}`;
    const penaltisHtml = jogo.penaltis ? `<div class="penalties-text">Pênaltis (${jogo.penaltis})</div>` : '';
    
    let classT1 = "team home";
    let classT2 = "team away";

    if (jogo.placar && jogo.placar !== "-") {
        let [g1, g2] = jogo.placar.split('-').map(Number);
        let p1 = 0, p2 = 0;
        
        if (jogo.penaltis) {
            [p1, p2] = jogo.penaltis.split('-').map(Number);
        }

        if (g1 > g2 || p1 > p2) {
            classT1 += " team-winner";
            classT2 += " team-loser";
        } else if (g2 > g1 || p2 > p1) {
            classT1 += " team-loser";
            classT2 += " team-winner";
        } else {
            classT1 += " team-draw";
            classT2 += " team-draw";
        }
    }

    return `
        <div class="card${aoVivoClass}">
            <div class="card-header">${nomeFaseCard} ${badgeHtml}</div>
            <div class="card-body">
                <div class="${classT1}">${renderTime(jogo.t1, 'esquerda')}</div>
                <div class="score" style="cursor: pointer;" title="Clique para editar placar" onclick="editarPlacar('${fase}', ${index})">
                    ${jogo.placar}
                    ${penaltisHtml}
                </div>
                <div class="${classT2}">${renderTime(jogo.t2, 'direita')}</div>
            </div>
        </div>
    `;
}

function carregarAba(abaNome) {
    if (!isAppIniciado) return;

    tituloFase.innerText = abaNome;

    document.querySelectorAll('.menu-wrapper button').forEach(btn => {
        btn.classList.remove('ativo');
        if (btn.innerText === abaNome) {
            btn.classList.add('ativo');
            btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    });

    classificacaoContainer.innerHTML = "";
    jogosContainer.innerHTML = "";
    if(document.getElementById('search-input')) document.getElementById('search-input').value = "";

    recalcularTabelas(); 
    atualizarFasesMataMata();

    // ==========================================
    // NOVA ABA: JOGOS DE HOJE + 3º COLOCADOS + RANKING 48
    // ==========================================
    if (abaNome === "Jogos de Hoje") {
        tituloJogos.style.display = "block";
        const hoje = new Date();
        const diaStr = String(hoje.getDate()).padStart(2, '0');
        const mesStr = String(hoje.getMonth() + 1).padStart(2, '0');
        const dataHojeStr = `${diaStr}/${mesStr}`;

        tituloJogos.innerText = `Partidas de Hoje (${dataHojeStr})`;
        classificacaoContainer.style.display = "none";
        jogosContainer.style.display = "block"; 

        // 1. CARDS DE HOJE
        let jogosHoje = [];
        Object.keys(bancoDeDados).forEach(fase => {
            let arrayJogos = listaGrupos.includes(fase) ? bancoDeDados[fase].jogos : bancoDeDados[fase];
            arrayJogos.forEach((jogo, index) => {
                if (jogo.data.startsWith(dataHojeStr)) {
                    jogosHoje.push({ jogo, fase, index });
                }
            });
        });

        jogosHoje.sort((a, b) => {
            const regexTempo = /(\d{2}):(\d{2})/;
            const timeA = a.jogo.data.match(regexTempo);
            const timeB = b.jogo.data.match(regexTempo);
            if (timeA && timeB) {
                const minutosA = parseInt(timeA[1]) * 60 + parseInt(timeA[2]);
                const minutosB = parseInt(timeB[1]) * 60 + parseInt(timeB[2]);
                return minutosA - minutosB;
            }
            return 0;
        });

        let cardsHtml = "";
        if (jogosHoje.length > 0) {
            jogosHoje.forEach(item => {
                cardsHtml += criarCardJogo(item.jogo, item.fase, item.index);
            });
        } else {
            cardsHtml = `<div style="text-align: center; padding: 40px; background: #fff; border-radius: 12px; border: 1px dashed #e5e7eb;">Nenhuma partida agendada para a data de hoje.</div>`;
        }

        // 2. TABELA DE MELHORES 3º COLOCADOS
        let terceiros = [];
        listaGrupos.forEach(grupo => {
            const classif = bancoDeDados[grupo].classificacao;
            if (classif && classif.length >= 3) {
                terceiros.push({
                    grupo: grupo.replace('Grupo ', ''),
                    time: classif[2].time,
                    j: classif[2].j,
                    gp: classif[2].gp,
                    pts: classif[2].pts,
                    sg: classif[2].sg
                });
            }
        });
        
        terceiros.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.sg !== a.sg) return b.sg - a.sg;
            return b.gp - a.gp;
        });

        let rankingHtml = `
            <div class="ranking-geral-box">
                <div class="ranking-geral-title" style="display: flex; justify-content: space-between; align-items: center; border-bottom: none; margin-bottom: 8px;">
                    <span>Melhores 3º Colocados</span>
                    <span style="font-size: 10px; background: var(--live-green); color: white; padding: 3px 8px; border-radius: 6px;">Top 8 Avançam</span>
                </div>
                <table class="ranking-geral-table tabela-terceiros">
                    <thead>
                        <tr>
                            <th style="width: 25px;">#</th>
                            <th class="time-col">Seleção</th>
                            <th title="Jogos">J</th>
                            <th title="Saldo de Gols">SG</th>
                            <th title="Pontos">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        terceiros.forEach((t, index) => {
            let rowClass = index < 8 ? 'classificado-row' : 'eliminado-row';
            rankingHtml += `
                <tr class="${rowClass}">
                    <td><strong>${index + 1}</strong></td>
                    <td class="time-col time-hover" onclick="abrirElenco('${t.time}')" title="Ver 23 convocados">
                        ${renderTime(t.time)} <span class="grupo-tag">${t.grupo}</span>
                    </td>
                    <td>${t.j}</td>
                    <td>${t.sg}</td>
                    <td><strong>${t.pts}</strong></td>
                </tr>
            `;
        });
        rankingHtml += `</tbody></table></div>`;

        // 3. NOVO: RANKING GERAL DE TODOS OS 48 TIMES
        let todosOsTimes = [];
        listaGrupos.forEach(grupo => {
            todosOsTimes = todosOsTimes.concat(bancoDeDados[grupo].classificacao);
        });
        
        todosOsTimes.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.sg !== a.sg) return b.sg - a.sg;
            return b.gp - a.gp;
        });

        let rankingGeralHtml = `
            <div class="grupo-tabela-box" style="margin-top: 40px; border-color: var(--header-bg);">
                <div class="grupo-tabela-header" style="background-color: var(--header-bg);">Ranking Geral da Copa (1º ao 48º)</div>
                <div class="tabela-overflow" style="max-height: 500px; overflow-y: auto;">
                    <table class="tabela-classificacao">
                        <thead style="position: sticky; top: 0; background-color: #F9FAFB; z-index: 5; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                            <tr><th>#</th><th class="time-col">Seleção</th><th>PTS</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr>
                        </thead>
                        <tbody>
        `;
        todosOsTimes.forEach((time, index) => {
            rankingGeralHtml += `
                <tr>
                    <td>${index + 1}º</td>
                    <td class="time-col time-hover" onclick="abrirElenco('${time.time}')" title="Ver 23 convocados">
                        ${renderTime(time.time)}
                    </td>
                    <td class="pontos-destaque">${time.pts}</td>
                    <td>${time.j}</td>
                    <td>${time.v}</td>
                    <td>${time.e}</td>
                    <td>${time.d}</td>
                    <td>${time.sg}</td>
                </tr>
            `;
        });
        rankingGeralHtml += `</tbody></table></div></div>`;

        // RENDERIZA TUDO NA TELA
        jogosContainer.innerHTML = `
            <div class="split-layout">
                <div class="jogos-col">
                    <div class="jogos-grid">
                        ${cardsHtml}
                    </div>
                </div>
                <div class="ranking-col">
                    ${rankingHtml}
                </div>
            </div>
            ${rankingGeralHtml}
        `;
    }
    else if (abaNome === "Tabelas de Classificação") {
        tituloJogos.style.display = "none";
        classificacaoContainer.className = "tabelas-grid";
        classificacaoContainer.style.display = "grid";
        jogosContainer.style.display = "none";

        let htmlTabelas = "";
        listaGrupos.forEach(grupo => {
            const classif = bancoDeDados[grupo].classificacao;
            const jogosDoGrupo = bancoDeDados[grupo].jogos;

            const linhasHtml = classif.map(time => {
                let classeTr = '';
                if (time.pos === 1) classeTr = ' class="primeiro-lugar"';
                else if (time.pos === 2) classeTr = ' class="segundo-lugar"';

                const estaJogandoAgora = jogosDoGrupo.some(j => j.aoVivo && (j.t1 === time.time || j.t2 === time.time));
                const liveDotHtml = estaJogandoAgora ? '<span class="live-dot" title="Jogando agora"></span>' : '';

                return `
                    <tr${classeTr}>
                        <td>${time.pos}º</td>
                        <td class="time-col time-hover" onclick="abrirElenco('${time.time}')" title="Ver 23 convocados">
                            ${renderTime(time.time)}
                            ${liveDotHtml}
                        </td>
                        <td class="pontos-destaque">${time.pts}</td>
                        <td>${time.j}</td>
                        <td>${time.v}</td>
                        <td>${time.e}</td>
                        <td>${time.d}</td>
                        <td>${time.sg}</td>
                    </tr>
                `;
            }).join("");

            htmlTabelas += `
                <div class="grupo-tabela-box">
                    <div class="grupo-tabela-header">${grupo}</div>
                    <div class="tabela-overflow">
                        <table class="tabela-classificacao">
                            <thead><tr><th>#</th><th class="time-col">Seleção</th><th>PTS</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead>
                            <tbody>${linhasHtml}</tbody>
                        </table>
                    </div>
                </div>
            `;
        });
        classificacaoContainer.innerHTML = htmlTabelas;
    }
    else if (abaNome === "Jogos (Fase de Grupos)") {
        tituloJogos.style.display = "block";
        tituloJogos.innerText = "Lista Completa - Fase de Grupos";
        classificacaoContainer.style.display = "none";
        jogosContainer.style.display = "grid";

        let cardsHtml = "";
        listaGrupos.forEach(grupo => {
            bancoDeDados[grupo].jogos.forEach((jogo, index) => {
                cardsHtml += criarCardJogo(jogo, grupo, index);
            });
        });
        jogosContainer.innerHTML = cardsHtml;
    }
    else {
        tituloJogos.style.display = "block";
        tituloJogos.innerText = `Confrontos - ${abaNome}`;
        classificacaoContainer.style.display = "none";
        jogosContainer.style.display = "grid";

        let cardsHtml = "";
        if (bancoDeDados[abaNome]) {
            bancoDeDados[abaNome].forEach((jogo, index) => {
                cardsHtml += criarCardJogo(jogo, abaNome, index);
            });
        }
        jogosContainer.innerHTML = cardsHtml;
    }
}

// ==========================================
// FUNCIONALIDADE DA BARRA DE PESQUISA
// ==========================================
const searchInput = document.getElementById('search-input');
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();
        
        if (termo === "") {
            const abaAtiva = document.querySelector('.menu-wrapper button.ativo')?.innerText || 'Jogos de Hoje';
            carregarAba(abaAtiva);
            return;
        }

        classificacaoContainer.style.display = "none";
        jogosContainer.style.display = "grid";
        tituloFase.innerText = "Resultados da Pesquisa";
        tituloJogos.style.display = "block";
        tituloJogos.innerText = `Mostrando jogos para: "${termo}"`;
        document.querySelectorAll('.menu-wrapper button').forEach(btn => btn.classList.remove('ativo'));

        let cardsHtml = "";
        Object.keys(bancoDeDados).forEach(fase => {
            let arrayJogos = listaGrupos.includes(fase) ? bancoDeDados[fase].jogos : bancoDeDados[fase];
            arrayJogos.forEach((jogo, index) => {
                if (
                    jogo.t1.toLowerCase().includes(termo) || 
                    jogo.t2.toLowerCase().includes(termo) ||
                    jogo.data.toLowerCase().includes(termo)
                ) {
                    cardsHtml += criarCardJogo(jogo, fase, index);
                }
            });
        });

        if (cardsHtml === "") jogosContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Nenhum resultado encontrado para "${termo}".</p>`;
        else jogosContainer.innerHTML = cardsHtml;
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "F4") {
        const confirmar = confirm("ATENÇÃO: Deseja realmente resetar todos os placares da nuvem e voltar ao início da Copa?");
        if (confirmar) {
            db.ref('copa2026_oficial').set(dadosIniciais).then(() => {
                alert("Banco de dados na nuvem resetado com sucesso!");
                location.reload(); 
            });
        }
    }
});

function iniciarApp() {
    abas.forEach(aba => {
        const btn = document.createElement('button');
        btn.innerText = aba;
        btn.onclick = () => carregarAba(aba);
        if (menuContainer) {
            menuContainer.appendChild(btn);
        }
    });
    
    atualizarStatusAoVivo(); 
    carregarAba('Jogos de Hoje');
}

document.addEventListener("DOMContentLoaded", () => {
    db.ref('copa2026_oficial').on('value', (snapshot) => {
        if (snapshot.exists()) {
            bancoDeDados = snapshot.val();
        } else {
            bancoDeDados = JSON.parse(JSON.stringify(dadosIniciais));
            db.ref('copa2026_oficial').set(bancoDeDados);
        }

        if (!isAppIniciado) {
            isAppIniciado = true;
            iniciarApp();
        } else {
            const modalPlacar = document.getElementById('modal-placar');
            const modalElenco = document.getElementById('modal-elenco');
            
            if ((!modalPlacar || modalPlacar.style.display !== "flex") && (!modalElenco || modalElenco.style.display !== "flex")) {
                const searchBox = document.getElementById('search-input');
                if (searchBox && searchBox.value.trim() !== "") {
                    searchBox.dispatchEvent(new Event('input')); 
                } else {
                    const abaAtiva = document.querySelector('.menu-wrapper button.ativo')?.innerText || 'Jogos de Hoje';
                    carregarAba(abaAtiva); 
                }
            }
        }
    });
});
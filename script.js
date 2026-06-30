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

// NÓ DA NUVEM ALTERADO PARA FUGIR DO CACHE ANTIGO!
const DB_NODE = 'copa26_v2'; 

// ==========================================
// SISTEMA DE BANDEIRAS E NOMES
// ==========================================
const bandeiras = {
    "México": "mx", "Coreia do Sul": "kr", "República Tcheca": "cz", "África do Sul": "za",
    "Canadá": "ca", "Suíça": "ch", "Catar": "qa", "Bósnia": "ba",
    "Brasil": "br", "Marrocos": "ma", "Haiti": "ht", "Escócia": "gb-sct",
    "Estados Unidos": "us", "Austrália": "au", "Turquia": "tr", "Paraguai": "py",
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
        if (lado === 'direita') return `<div class="time-wrapper"><span>${nome}</span> <img src="https://flagcdn.com/w20/${codigo}.png" class="bandeira-img"></div>`;
        return `<div class="time-wrapper"><img src="https://flagcdn.com/w20/${codigo}.png" class="bandeira-img"> <span>${nome}</span></div>`;
    }
    return `<span>${nome}</span>`;
}

// ==========================================
// ELENCOS EXTERNOS
// ==========================================
function obterElenco(selecao) {
    if (typeof elencosOficiais !== "undefined" && elencosOficiais[selecao]) return elencosOficiais[selecao];
    let arr = []; let num = 1;
    for(let i=0; i<3; i++) arr.push({ num: num++, nome: `Goleiro Reservado ${i+1}`, pos: "Goleiro" });
    for(let i=0; i<7; i++) arr.push({ num: num++, nome: `Defensor Convocado ${i+1}`, pos: "Defensor" });
    for(let i=0; i<7; i++) arr.push({ num: num++, nome: `Meio-campista Convocado ${i+1}`, pos: "Meio-campista" });
    for(let i=0; i<6; i++) arr.push({ num: num++, nome: `Atacante Convocado ${i+1}`, pos: "Atacante" });
    return arr;
}

window.abrirElenco = function(selecao) {
    const modal = document.getElementById('modal-elenco');
    document.getElementById('elenco-titulo').innerText = selecao;
    const bdImg = document.getElementById('elenco-bandeira');
    const codigo = bandeiras[selecao];
    if(codigo) { bdImg.src = `https://flagcdn.com/w40/${codigo}.png`; bdImg.style.display = "block"; } 
    else { bdImg.style.display = "none"; }

    let html = '';
    obterElenco(selecao).forEach(jog => {
        html += `<div class="jogador-item"><div class="jogador-num">${jog.num}</div><div class="jogador-dados"><div class="jogador-nome">${jog.nome}</div><div class="jogador-pos">${jog.pos}</div></div></div>`;
    });
    document.getElementById('elenco-lista').innerHTML = html;
    modal.style.display = "flex";
};

window.fecharElenco = function() { document.getElementById('modal-elenco').style.display = "none"; };

// ==========================================
// BANCO DE DADOS E CÁLCULO DE GRUPOS
// ==========================================
let bancoDeDados = {};
let isAppIniciado = false;
const listaGrupos = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Grupo I", "Grupo J", "Grupo K", "Grupo L"];

function salvarBD() { db.ref(DB_NODE).set(bancoDeDados); }

function recalcularTabelas() {
    listaGrupos.forEach(g => {
        if (!bancoDeDados[g] || !bancoDeDados[g].classificacao) return;
        bancoDeDados[g].classificacao.forEach(t => {
            t.pts = 0; t.j = 0; t.v = 0; t.e = 0; t.d = 0; t.gp = 0; t.gc = 0; t.sg = 0;
        });

        if (bancoDeDados[g].jogos) {
            bancoDeDados[g].jogos.forEach(j => {
                if (j.placar && j.placar.trim() !== "-") {
                    let [g1, g2] = j.placar.replace(/\s+/g, '').split('-').map(Number);
                    if (!isNaN(g1) && !isNaN(g2)) {
                        let t1 = bancoDeDados[g].classificacao.find(x => x.time === j.t1);
                        let t2 = bancoDeDados[g].classificacao.find(x => x.time === j.t2);
                        if (t1 && t2) {
                            t1.j++; t2.j++; t1.gp += g1; t2.gp += g2; t1.gc += g2; t2.gc += g1;
                            t1.sg = t1.gp - t1.gc; t2.sg = t2.gp - t2.gc;
                            if (g1 > g2) { t1.pts += 3; t1.v++; t2.d++; }
                            else if (g2 > g1) { t2.pts += 3; t2.v++; t1.d++; }
                            else { t1.pts += 1; t2.pts += 1; t1.e++; t2.e++; }
                        }
                    }
                }
            });
        }
        
        // CRITÉRIO DE DESEMPATE OFICIAL
        bancoDeDados[g].classificacao.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts; // 1º Pontos
            
            // 2º Confronto Direto
            let confronto = bancoDeDados[g].jogos.find(j => 
                (j.t1 === a.time && j.t2 === b.time) || (j.t1 === b.time && j.t2 === a.time)
            );
            if (confronto && confronto.placar && confronto.placar.trim() !== "-") {
                let [g1, g2] = confronto.placar.replace(/\s+/g, '').split('-').map(Number);
                if (confronto.t1 === a.time) {
                    if (g1 > g2) return -1;
                    if (g2 > g1) return 1;
                } else {
                    if (g2 > g1) return -1;
                    if (g1 > g2) return 1;
                }
            }

            // 3º Saldo de Gols e 4º Gols Pró
            if (b.sg !== a.sg) return b.sg - a.sg;
            if (b.gp !== a.gp) return b.gp - a.gp;
            return a.time.localeCompare(b.time);
        });
        
        bancoDeDados[g].classificacao.forEach((t, i) => t.pos = i + 1);
    });
}

// ========================================================
// SISTEMA LINEAR DE MATA-MATA
// ========================================================
function atualizarFasesMataMata() {
    try {
        const pegarVencedor = (faseBusca, indexLinha, querVencedor) => {
            if (!bancoDeDados[faseBusca] || !bancoDeDados[faseBusca][indexLinha]) return null;
            let j = bancoDeDados[faseBusca][indexLinha];
            if (!j.placar || j.placar.trim() === "-") return null;
            
            let [g1, g2] = j.placar.replace(/\s+/g, '').split('-').map(Number);
            if (isNaN(g1) || isNaN(g2)) return null;
            
            if (g1 > g2) return querVencedor ? j.t1 : j.t2;
            if (g2 > g1) return querVencedor ? j.t2 : j.t1;
            
            if (j.penaltis) {
                let [p1, p2] = j.penaltis.replace(/\s+/g, '').split('-').map(Number);
                if (!isNaN(p1) && !isNaN(p2)) {
                    if (p1 > p2) return querVencedor ? j.t1 : j.t2;
                    if (p2 > p1) return querVencedor ? j.t2 : j.t1;
                }
            }
            return null;
        };

        if (bancoDeDados["Oitavas"]) {
            bancoDeDados["Oitavas"][0].t1 = pegarVencedor("16-avos", 0, true) || dadosIniciais["Oitavas"][0].t1;
            bancoDeDados["Oitavas"][0].t2 = pegarVencedor("16-avos", 1, true) || dadosIniciais["Oitavas"][0].t2;
            
            bancoDeDados["Oitavas"][1].t1 = pegarVencedor("16-avos", 2, true) || dadosIniciais["Oitavas"][1].t1;
            bancoDeDados["Oitavas"][1].t2 = pegarVencedor("16-avos", 3, true) || dadosIniciais["Oitavas"][1].t2;
            
            bancoDeDados["Oitavas"][2].t1 = pegarVencedor("16-avos", 4, true) || dadosIniciais["Oitavas"][2].t1;
            bancoDeDados["Oitavas"][2].t2 = pegarVencedor("16-avos", 5, true) || dadosIniciais["Oitavas"][2].t2;
            
            bancoDeDados["Oitavas"][3].t1 = pegarVencedor("16-avos", 6, true) || dadosIniciais["Oitavas"][3].t1;
            bancoDeDados["Oitavas"][3].t2 = pegarVencedor("16-avos", 7, true) || dadosIniciais["Oitavas"][3].t2;
            
            bancoDeDados["Oitavas"][4].t1 = pegarVencedor("16-avos", 8, true) || dadosIniciais["Oitavas"][4].t1;
            bancoDeDados["Oitavas"][4].t2 = pegarVencedor("16-avos", 9, true) || dadosIniciais["Oitavas"][4].t2;
            
            bancoDeDados["Oitavas"][5].t1 = pegarVencedor("16-avos", 10, true) || dadosIniciais["Oitavas"][5].t1;
            bancoDeDados["Oitavas"][5].t2 = pegarVencedor("16-avos", 11, true) || dadosIniciais["Oitavas"][5].t2;
            
            bancoDeDados["Oitavas"][6].t1 = pegarVencedor("16-avos", 12, true) || dadosIniciais["Oitavas"][6].t1;
            bancoDeDados["Oitavas"][6].t2 = pegarVencedor("16-avos", 13, true) || dadosIniciais["Oitavas"][6].t2;
            
            bancoDeDados["Oitavas"][7].t1 = pegarVencedor("16-avos", 14, true) || dadosIniciais["Oitavas"][7].t1;
            bancoDeDados["Oitavas"][7].t2 = pegarVencedor("16-avos", 15, true) || dadosIniciais["Oitavas"][7].t2;
        }

        if (bancoDeDados["Quartas"]) {
            bancoDeDados["Quartas"][0].t1 = pegarVencedor("Oitavas", 0, true) || dadosIniciais["Quartas"][0].t1;
            bancoDeDados["Quartas"][0].t2 = pegarVencedor("Oitavas", 1, true) || dadosIniciais["Quartas"][0].t2;
            
            bancoDeDados["Quartas"][1].t1 = pegarVencedor("Oitavas", 2, true) || dadosIniciais["Quartas"][1].t1;
            bancoDeDados["Quartas"][1].t2 = pegarVencedor("Oitavas", 3, true) || dadosIniciais["Quartas"][1].t2;
            
            bancoDeDados["Quartas"][2].t1 = pegarVencedor("Oitavas", 4, true) || dadosIniciais["Quartas"][2].t1;
            bancoDeDados["Quartas"][2].t2 = pegarVencedor("Oitavas", 5, true) || dadosIniciais["Quartas"][2].t2;
            
            bancoDeDados["Quartas"][3].t1 = pegarVencedor("Oitavas", 6, true) || dadosIniciais["Quartas"][3].t1;
            bancoDeDados["Quartas"][3].t2 = pegarVencedor("Oitavas", 7, true) || dadosIniciais["Quartas"][3].t2;
        }

        if (bancoDeDados["Semifinais"]) {
            bancoDeDados["Semifinais"][0].t1 = pegarVencedor("Quartas", 0, true) || dadosIniciais["Semifinais"][0].t1;
            bancoDeDados["Semifinais"][0].t2 = pegarVencedor("Quartas", 1, true) || dadosIniciais["Semifinais"][0].t2;
            
            bancoDeDados["Semifinais"][1].t1 = pegarVencedor("Quartas", 2, true) || dadosIniciais["Semifinais"][1].t1;
            bancoDeDados["Semifinais"][1].t2 = pegarVencedor("Quartas", 3, true) || dadosIniciais["Semifinais"][1].t2;
        }

        if (bancoDeDados["3º Lugar"] && dadosIniciais["3º Lugar"][0]) {
            bancoDeDados["3º Lugar"][0].t1 = pegarVencedor("Semifinais", 0, false) || dadosIniciais["3º Lugar"][0].t1;
            bancoDeDados["3º Lugar"][0].t2 = pegarVencedor("Semifinais", 1, false) || dadosIniciais["3º Lugar"][0].t2;
        }

        if (bancoDeDados["Final"] && dadosIniciais["Final"][0]) {
            bancoDeDados["Final"][0].t1 = pegarVencedor("Semifinais", 0, true) || dadosIniciais["Final"][0].t1;
            bancoDeDados["Final"][0].t2 = pegarVencedor("Semifinais", 1, true) || dadosIniciais["Final"][0].t2;
        }
    } catch (e) {
        console.error("Erro no processamento linear:", e);
    }
}

// ==========================================
// RELOGIO AO VIVO COM 110 MINUTOS EXATOS
// ==========================================
function atualizarStatusAoVivo() {
    const agora = new Date(); let mudouAlgo = false;
    Object.keys(bancoDeDados).forEach(f => {
        const jogos = listaGrupos.includes(f) ? bancoDeDados[f].jogos : bancoDeDados[f];
        if (!jogos || !Array.isArray(jogos)) return;
        jogos.forEach(jogo => {
            if (!jogo.data) return;
            const matchInfo = jogo.data.match(/(\d{2})\/(\d{2}).*?(\d{2}):(\d{2})/);
            if (matchInfo) {
                const dia = parseInt(matchInfo[1]), mes = parseInt(matchInfo[2]) - 1, hora = parseInt(matchInfo[3]), min = parseInt(matchInfo[4]);
                const minutosPassados = (agora.getTime() - new Date(2026, mes, dia, hora, min).getTime()) / 60000;
                let aoVivoOld = jogo.aoVivo; let encerradoOld = jogo.encerrado;

                if (minutosPassados >= 0 && minutosPassados <= 110) {
                    jogo.aoVivo = true; jogo.encerrado = false;
                    if (!jogo.placar || jogo.placar.trim() === "-") { jogo.placar = "0-0"; mudouAlgo = true; }
                } else if (minutosPassados > 110) {
                    jogo.aoVivo = false; jogo.encerrado = true;
                } else {
                    jogo.aoVivo = false; jogo.encerrado = false;
                }

                if (jogo.aoVivo !== aoVivoOld || jogo.encerrado !== encerradoOld) mudouAlgo = true;
            }
        });
    });
    if (mudouAlgo) {
        recalcularTabelas(); atualizarFasesMataMata(); salvarBD();
        carregarAba(document.querySelector('.menu-wrapper button.ativo')?.innerText || 'Jogos de Hoje');
    }
}
setInterval(atualizarStatusAoVivo, 30000);

// ==========================================
// FUNÇÕES DE EDIÇÃO DE PLACAR
// ==========================================
let jogoEditando = null; let faseEditando = null;

window.editarPlacar = function(fase, indexJogo) {
    faseEditando = fase; let isFaseDeGrupos = listaGrupos.includes(fase);
    jogoEditando = isFaseDeGrupos ? bancoDeDados[fase].jogos[indexJogo] : bancoDeDados[fase][indexJogo];
    document.getElementById('modal-teams').innerText = `${jogoEditando.t1} x ${jogoEditando.t2}`;
    
    const golsT1Input = document.getElementById('gols-t1');
    const golsT2Input = document.getElementById('gols-t2');
    const areaPenaltis = document.getElementById('modal-penaltis-area');
    const penT1Input = document.getElementById('pen-t1');
    const penT2Input = document.getElementById('pen-t2');

    if (jogoEditando.placar && jogoEditando.placar.trim() !== "-") {
        let [g1, g2] = jogoEditando.placar.replace(/\s+/g, '').split('-');
        golsT1Input.value = g1; golsT2Input.value = g2;
    } else {
        golsT1Input.value = ""; golsT2Input.value = "";
    }

    if (jogoEditando.penaltis) {
        let [p1, p2] = jogoEditando.penaltis.replace(/\s+/g, '').split('-');
        penT1Input.value = p1 || ""; penT2Input.value = p2 || "";
    } else {
        penT1Input.value = ""; penT2Input.value = "";
    }

    function checarPenaltis() {
        if (!isFaseDeGrupos && golsT1Input.value !== "" && golsT2Input.value !== "" && golsT1Input.value === golsT2Input.value) {
            areaPenaltis.style.display = "block";
        } else {
            areaPenaltis.style.display = "none";
        }
    }
    golsT1Input.oninput = checarPenaltis; golsT2Input.oninput = checarPenaltis;
    checarPenaltis();
    document.getElementById('modal-placar').style.display = "flex";
};

document.getElementById('btn-cancelar').onclick = () => { document.getElementById('modal-placar').style.display = "none"; jogoEditando = null; };

document.getElementById('btn-salvar').onclick = () => {
    if (!jogoEditando) return;
    const g1 = document.getElementById('gols-t1').value;
    const g2 = document.getElementById('gols-t2').value;
    if (g1 !== "" && g2 !== "") {
        jogoEditando.placar = `${g1}-${g2}`;
        if (!listaGrupos.includes(faseEditando) && g1 === g2) {
            const p1 = document.getElementById('pen-t1').value; const p2 = document.getElementById('pen-t2').value;
            if (p1 !== "" && p2 !== "") jogoEditando.penaltis = `${p1}-${p2}`;
            else jogoEditando.penaltis = "";
        } else { jogoEditando.penaltis = ""; }
        recalcularTabelas(); atualizarFasesMataMata(); salvarBD();
        document.getElementById('modal-placar').style.display = "none";
        carregarAba(document.querySelector('.menu-wrapper button.ativo')?.innerText || 'Jogos de Hoje');
    }
};

// ==============================================================
// RENDERIZADOR DE INTERFACE LIMPANDO COLUNAS
// ==============================================================
const menuContainer = document.getElementById('menu');
const tituloFase = document.getElementById('fase-titulo');
const classificacaoContainer = document.getElementById('classificacao-container');
const jogosContainer = document.getElementById('jogos-container');
const tituloJogos = document.getElementById('jogos-titulo');
const abas = ["Jogos de Hoje", "Tabelas de Classificação", "16-avos", "Oitavas", "Quartas", "Semifinais", "3º Lugar", "Final"];

function carregarAba(abaNome) {
    if (!isAppIniciado) return;
    tituloFase.innerText = abaNome;
    document.querySelectorAll('.menu-wrapper button').forEach(btn => {
        btn.classList.remove('ativo'); if (btn.innerText === abaNome) btn.classList.add('ativo');
    });

    classificacaoContainer.innerHTML = ""; jogosContainer.innerHTML = "";

    recalcularTabelas(); atualizarFasesMataMata();

    if (abaNome === "Jogos de Hoje") {
        tituloJogos.style.display = "block"; const hoje = new Date();
        const dataHojeStr = `${String(hoje.getDate()).padStart(2,'0')}/${String(hoje.getMonth()+1).padStart(2,'0')}`;
        tituloJogos.innerText = `Partidas de Hoje (${dataHojeStr})`;
        classificacaoContainer.style.display = "none"; jogosContainer.style.display = "block";

        let jogosHoje = [];
        Object.keys(bancoDeDados).forEach(f => {
            let arr = listaGrupos.includes(f) ? bancoDeDados[f].jogos : bancoDeDados[f];
            if (arr && Array.isArray(arr)) {
                arr.forEach((j, idx) => { 
                    if (j.data && j.data.includes(dataHojeStr)) {
                        jogosHoje.push({ jogo: j, fase: f, index: idx }); 
                    }
                });
            }
        });

        jogosHoje.sort((a, b) => {
            const timeA = a.jogo.data.match(/(\d{2})\:(\d{2})/); const timeB = b.jogo.data.match(/(\d{2})\:(\d{2})/);
            return (timeA && timeB) ? (parseInt(timeA[1]) * 60 + parseInt(timeA[2])) - (parseInt(timeB[1]) * 60 + parseInt(timeB[2])) : 0;
        });

        let cardsHtml = "";
        if (jogosHoje.length > 0) { jogosHoje.forEach(item => { cardsHtml += criarCardJogo(item.jogo, item.fase, item.index); }); } 
        else { cardsHtml = `<div style="text-align: center; padding: 40px; background: #fff; border-radius: 12px; border: 1px dashed #e5e7eb;">Nenhuma partida agendada para hoje.</div>`; }

        let terceiros = [];
        listaGrupos.forEach(g => {
            if (bancoDeDados[g] && bancoDeDados[g].classificacao && bancoDeDados[g].classificacao[2]) {
                let c = bancoDeDados[g].classificacao[2];
                terceiros.push({ grupo: g.replace('Grupo ',''), time: c.time, j: c.j, sg: c.sg, gp: c.gp, pts: c.pts });
            }
        });
        terceiros.sort((a,b) => (b.pts - a.pts) || (b.sg - a.sg) || (b.gp - a.gp) || a.time.localeCompare(b.time));

        let rankingHtml = `<div class="ranking-geral-box"><div class="ranking-geral-title">Melhores 3º Colocados</div><table class="ranking-geral-table tabela-terceiros"><thead><tr><th>#</th><th>Seleção</th><th>J</th><th>SG</th><th>Pts</th></tr></thead><tbody>`;
        terceiros.forEach((t, idx) => {
            let rowClass = idx < 8 ? 'classificado-row' : 'eliminado-row';
            rankingHtml += `<tr class="${rowClass}"><td><strong>${idx+1}</strong></td><td class="time-col time-hover" onclick="abrirElenco('${t.time}')">${renderTime(t.time)} <span class="grupo-tag">${t.grupo}</span></td><td>${t.j}</td><td>${t.sg}</td><td><strong>${t.pts}</strong></td></tr>`;
        });
        rankingHtml += `</tbody></table></div>`;

        let todosOsTimes = [];
        listaGrupos.forEach(g => { if (bancoDeDados[g]) todosOsTimes = todosOsTimes.concat(bancoDeDados[g].classificacao); });
        todosOsTimes.sort((a,b) => (b.pts - a.pts) || (b.sg - a.sg) || (b.gp - a.gp) || a.time.localeCompare(b.time));

        let rankingGeralHtml = `<div class="grupo-tabela-box" style="margin-top:40px;"><div class="grupo-tabela-header">Ranking Geral da Copa</div><div class="tabela-overflow" style="max-height:400px; overflow-y:auto;"><table class="tabela-classificacao"><thead><tr><th>#</th><th class="time-col">Seleção</th><th>PTS</th><th>J</th><th>SG</th></tr></thead><tbody>`;
        todosOsTimes.forEach((time, idx) => {
            rankingGeralHtml += `<tr><td>${idx+1}º</td><td class="time-col time-hover" onclick="abrirElenco('${time.time}')">${renderTime(time.time)}</td><td class="pontos-destaque">${time.pts}</td><td>${time.j}</td><td>${time.sg}</td></tr>`;
        });
        rankingGeralHtml += `</tbody></table></div></div>`;

        jogosContainer.innerHTML = `<div class="split-layout"><div class="jogos-col"><div class="jogos-grid">${cardsHtml}</div></div><div class="ranking-col">${rankingHtml}</div></div>${rankingGeralHtml}`;
    }
    else if (abaNome === "Tabelas de Classificação") {
        tituloJogos.style.display = "none"; classificacaoContainer.style.display = "grid"; jogosContainer.style.display = "none";
        let htmlTabelas = "";
        listaGrupos.forEach(g => {
            if (!bancoDeDados[g] || !bancoDeDados[g].classificacao) return;
            let classif = bancoDeDados[g].classificacao;
            let lines = classif.map(time => {
                let cl = time.pos === 1 ? ' class="primeiro-lugar"' : (time.pos === 2 ? ' class="segundo-lugar"' : '');
                return `<tr${cl}><td>${time.pos}º</td><td class="time-col time-hover" onclick="abrirElenco('${time.time}')">${renderTime(time.time)}</td><td class="pontos-destaque">${time.pts}</td><td>${time.j}</td><td>${time.v}</td><td>${time.e}</td><td>${time.d}</td><td>${time.sg}</td></tr>`;
            }).join("");
            htmlTabelas += `<div class="grupo-tabela-box"><div class="grupo-tabela-header">${g}</div><table class="tabela-classificacao"><thead><tr><th>#</th><th class="time-col">Seleção</th><th>PTS</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead><tbody>${lines}</tbody></table></div>`;
        });
        classificacaoContainer.innerHTML = htmlTabelas;
    }
    else {
        tituloJogos.style.display = "block"; tituloJogos.innerText = `Confrontos - ${abaNome}`;
        classificacaoContainer.style.display = "none"; jogosContainer.style.display = "grid";
        let cardsHtml = ""; let arr = bancoDeDados[abaNome] || [];
        arr.forEach((j, idx) => { cardsHtml += criarCardJogo(j, abaNome, idx); });
        jogosContainer.innerHTML = cardsHtml;
    }
}

function criarCardJogo(jogo, fase, index) {
    const agora = new Date(); let aoVivoClass = '', badgeHtml = '';
    if (jogo.data && typeof jogo.data === 'string') {
        const matchInfo = jogo.data.match(/(\d{2})\/(\d{2}).*?(\d{2}):(\d{2})/);
        if (matchInfo) {
            const dia = parseInt(matchInfo[1]), mes = parseInt(matchInfo[2]) - 1, hora = parseInt(matchInfo[3]), min = parseInt(matchInfo[4]);
            const minutesPassed = (agora.getTime() - new Date(2026, mes, dia, hora, min).getTime()) / 60000;
            if (minutesPassed >= 0 && minutesPassed <= 110) { aoVivoClass = ' ao-vivo'; badgeHtml = '<span class="badge-aovivo">AO VIVO</span>'; }
            else if (minutesPassed > 110) { aoVivoClass = ' jogo-encerrado'; badgeHtml = '<span class="badge-encerrado">ENCERRADO</span>'; }
        }
    }
    let classT1 = "team home", classT2 = "team away";
    if (jogo.placar && jogo.placar.trim() !== "-") {
        let [g1, g2] = jogo.placar.replace(/\s+/g, '').split('-').map(Number);
        let p1 = 0, p2 = 0;
        if (jogo.penaltis) [p1, p2] = jogo.penaltis.replace(/\s+/g, '').split('-').map(Number);
        if (g1 > g2 || p1 > p2) { classT1 += " team-winner"; classT2 += " team-loser"; }
        else if (g2 > g1 || p2 > p1) { classT1 += " team-loser"; classT2 += " team-winner"; }
        else { classT1 += " team-draw"; classT2 += " team-draw"; }
    }
    return `<div class="card${aoVivoClass}"><div class="card-header">${fase} • ${jogo.data} ${badgeHtml}</div><div class="card-body"><div class="${classT1}">${renderTime(jogo.t1, 'esquerda')}</div><div class="score" style="cursor: pointer;" onclick="editarPlacar('${fase}', ${index})">${jogo.placar}${jogo.penaltis ? `<div class="penalties-text">Pênaltis (${jogo.penaltis})</div>` : ''}</div><div class="${classT2}">${renderTime(jogo.t2, 'direita')}</div></div></div>`;
}

function iniciarApp() {
    if (menuContainer) menuContainer.innerHTML = "";
    abas.forEach(aba => {
        const btn = document.createElement('button');
        btn.innerText = aba;
        btn.onclick = () => carregarAba(aba);
        if (menuContainer) menuContainer.appendChild(btn);
    });
    atualizarStatusAoVivo(); 
    carregarAba('Jogos de Hoje');
}

document.addEventListener("keydown", (e) => {
    if (e.key === "F4") {
        if (confirm("Deseja resetar a nuvem e forçar a nova grade linear de 48 seleções?")) {
            db.ref(DB_NODE).set(dadosIniciais).then(() => { location.reload(); });
        }
    }
});

// ==============================================================
// INICIALIZAÇÃO INFALÍVEL
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
    try {
        db.ref(DB_NODE).on('value', (snapshot) => {
            try {
                if (snapshot.exists()) {
                    bancoDeDados = snapshot.val();
                    let precisaSalvar = false;

                    const todasChaves = [...listaGrupos, "16-avos", "Oitavas", "Quartas", "Semifinais", "3º Lugar", "Final"];
                    for (let c of todasChaves) {
                        if (!bancoDeDados[c]) {
                            bancoDeDados[c] = JSON.parse(JSON.stringify(dadosIniciais[c]));
                            precisaSalvar = true;
                        }
                        let bdJogos = listaGrupos.includes(c) ? bancoDeDados[c].jogos : bancoDeDados[c];
                        let initJogos = listaGrupos.includes(c) ? dadosIniciais[c].jogos : dadosIniciais[c];

                        if (bdJogos && initJogos) {
                            bdJogos.forEach((j, i) => {
                                if (initJogos[i] && j.data !== initJogos[i].data) {
                                    j.data = initJogos[i].data;
                                    precisaSalvar = true;
                                }
                            });
                        }
                    }

                    if (precisaSalvar) { db.ref(DB_NODE).set(bancoDeDados); }
                } else {
                    bancoDeDados = JSON.parse(JSON.stringify(dadosIniciais));
                    db.ref(DB_NODE).set(bancoDeDados);
                }

                if (!isAppIniciado) { 
                    isAppIniciado = true; 
                    iniciarApp(); 
                } else { 
                    carregarAba(document.querySelector('.menu-wrapper button.ativo')?.innerText || 'Jogos de Hoje'); 
                }
            } catch(e) {
                console.error("Erro interno:", e);
                if (!isAppIniciado) { isAppIniciado = true; bancoDeDados = JSON.parse(JSON.stringify(dadosIniciais)); iniciarApp(); }
            }
        });
    } catch(e) {
        if (!isAppIniciado) { isAppIniciado = true; bancoDeDados = JSON.parse(JSON.stringify(dadosIniciais)); iniciarApp(); }
    }
});
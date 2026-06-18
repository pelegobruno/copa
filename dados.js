// ==========================================
// BANCO DE DADOS (ARQUIVO EXTERNO: dados.js)
// Horários revisados sem sobreposição nas R1 e R2
// ==========================================
const dadosIniciais = {
    "Grupo A": {
        classificacao: [
            { pos: 1, time: "México", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Coreia do Sul", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Tchéquia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "África do Sul", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "11/06 - 16:00", t1: "México", placar: "-", t2: "África do Sul", aoVivo: false },
            { data: "11/06 - 22:00", t1: "Coreia do Sul", placar: "-", t2: "Tchéquia", aoVivo: false },
            { data: "18/06 - 13:00", t1: "Tchéquia", placar: "-", t2: "África do Sul", aoVivo: false },
            { data: "18/06 - 22:00", t1: "México", placar: "-", t2: "Coreia do Sul", aoVivo: false },
            { data: "24/06 - 17:00", t1: "Tchéquia", placar: "-", t2: "México", aoVivo: false },
            { data: "24/06 - 17:00", t1: "África do Sul", placar: "-", t2: "Coreia do Sul", aoVivo: false }
        ]
    },
    "Grupo B": {
        classificacao: [
            { pos: 1, time: "Canadá", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Suíça", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Catar", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Bósnia e H.", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "12/06 - 13:00", t1: "Canadá", placar: "-", t2: "Bósnia e H.", aoVivo: false },
            { data: "12/06 - 16:00", t1: "Catar", placar: "-", t2: "Suíça", aoVivo: false },
            { data: "18/06 - 16:00", t1: "Suíça", placar: "-", t2: "Bósnia e H.", aoVivo: false },
            { data: "18/06 - 19:00", t1: "Canadá", placar: "-", t2: "Catar", aoVivo: false },
            { data: "24/06 - 13:00", t1: "Suíça", placar: "-", t2: "Canadá", aoVivo: false },
            { data: "24/06 - 13:00", t1: "Bósnia e H.", placar: "-", t2: "Catar", aoVivo: false }
        ]
    },
    "Grupo C": {
        classificacao: [
            { pos: 1, time: "Brasil", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Marrocos", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Haiti", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Escócia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "12/06 - 19:00", t1: "Brasil", placar: "-", t2: "Marrocos", aoVivo: false },
            { data: "13/06 - 13:00", t1: "Haiti", placar: "-", t2: "Escócia", aoVivo: false },
            { data: "19/06 - 13:00", t1: "Escócia", placar: "-", t2: "Marrocos", aoVivo: false },
            { data: "19/06 - 19:00", t1: "Brasil", placar: "-", t2: "Haiti", aoVivo: false },
            { data: "24/06 - 21:00", t1: "Escócia", placar: "-", t2: "Brasil", aoVivo: false },
            { data: "24/06 - 21:00", t1: "Marrocos", placar: "-", t2: "Haiti", aoVivo: false }
        ]
    },
    "Grupo D": {
        classificacao: [
            { pos: 1, time: "EUA", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Austrália", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Turquia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Paraguai", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "13/06 - 16:00", t1: "EUA", placar: "-", t2: "Paraguai", aoVivo: false },
            { data: "13/06 - 19:00", t1: "Austrália", placar: "-", t2: "Turquia", aoVivo: false },
            { data: "19/06 - 16:00", t1: "EUA", placar: "-", t2: "Austrália", aoVivo: false },
            { data: "19/06 - 22:00", t1: "Turquia", placar: "-", t2: "Paraguai", aoVivo: false },
            { data: "25/06 - 13:00", t1: "Turquia", placar: "-", t2: "EUA", aoVivo: false },
            { data: "25/06 - 13:00", t1: "Paraguai", placar: "-", t2: "Austrália", aoVivo: false }
        ]
    },
    "Grupo E": {
        classificacao: [
            { pos: 1, time: "Alemanha", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Equador", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Costa do Marfim", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Curaçao", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "13/06 - 22:00", t1: "Alemanha", placar: "-", t2: "Curaçao", aoVivo: false },
            { data: "14/06 - 13:00", t1: "Costa do Marfim", placar: "-", t2: "Equador", aoVivo: false },
            { data: "20/06 - 13:00", t1: "Alemanha", placar: "-", t2: "Costa do Marfim", aoVivo: false },
            { data: "20/06 - 19:00", t1: "Equador", placar: "-", t2: "Curaçao", aoVivo: false },
            { data: "25/06 - 17:00", t1: "Equador", placar: "-", t2: "Alemanha", aoVivo: false },
            { data: "25/06 - 17:00", t1: "Curaçao", placar: "-", t2: "Costa do Marfim", aoVivo: false }
        ]
    },
    "Grupo F": {
        classificacao: [
            { pos: 1, time: "Holanda", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Suécia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Japão", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Tunísia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "14/06 - 16:00", t1: "Holanda", placar: "-", t2: "Japão", aoVivo: false },
            { data: "14/06 - 19:00", t1: "Suécia", placar: "-", t2: "Tunísia", aoVivo: false },
            { data: "20/06 - 16:00", t1: "Holanda", placar: "-", t2: "Suécia", aoVivo: false },
            { data: "20/06 - 22:00", t1: "Tunísia", placar: "-", t2: "Japão", aoVivo: false },
            { data: "25/06 - 21:00", t1: "Tunísia", placar: "-", t2: "Holanda", aoVivo: false },
            { data: "25/06 - 21:00", t1: "Japão", placar: "-", t2: "Suécia", aoVivo: false }
        ]
    },
    "Grupo G": {
        classificacao: [
            { pos: 1, time: "Bélgica", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Egito", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Irã", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Nova Zelândia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "14/06 - 22:00", t1: "Bélgica", placar: "-", t2: "Egito", aoVivo: false },
            { data: "15/06 - 13:00", t1: "Irã", placar: "-", t2: "Nova Zelândia", aoVivo: false },
            { data: "21/06 - 13:00", t1: "Bélgica", placar: "-", t2: "Irã", aoVivo: false },
            { data: "21/06 - 19:00", t1: "Nova Zelândia", placar: "-", t2: "Egito", aoVivo: false },
            { data: "26/06 - 13:00", t1: "Nova Zelândia", placar: "-", t2: "Bélgica", aoVivo: false },
            { data: "26/06 - 13:00", t1: "Egito", placar: "-", t2: "Irã", aoVivo: false }
        ]
    },
    "Grupo H": {
        classificacao: [
            { pos: 1, time: "Espanha", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Uruguai", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Arábia Saudita", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Cabo Verde", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "15/06 - 16:00", t1: "Espanha", placar: "-", t2: "Cabo Verde", aoVivo: false },
            { data: "15/06 - 19:00", t1: "Arábia Saudita", placar: "-", t2: "Uruguai", aoVivo: false },
            { data: "21/06 - 16:00", t1: "Espanha", placar: "-", t2: "Arábia Saudita", aoVivo: false },
            { data: "21/06 - 22:00", t1: "Uruguai", placar: "-", t2: "Cabo Verde", aoVivo: false },
            { data: "26/06 - 17:00", t1: "Uruguai", placar: "-", t2: "Espanha", aoVivo: false },
            { data: "26/06 - 17:00", t1: "Cabo Verde", placar: "-", t2: "Arábia Saudita", aoVivo: false }
        ]
    },
    "Grupo I": {
        classificacao: [
            { pos: 1, time: "França", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Noruega", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Senegal", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Iraque", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "15/06 - 22:00", t1: "França", placar: "-", t2: "Senegal", aoVivo: false },
            { data: "16/06 - 13:00", t1: "Iraque", placar: "-", t2: "Noruega", aoVivo: false },
            { data: "22/06 - 13:00", t1: "França", placar: "-", t2: "Iraque", aoVivo: false },
            { data: "22/06 - 19:00", t1: "Noruega", placar: "-", t2: "Senegal", aoVivo: false },
            { data: "26/06 - 21:00", t1: "Noruega", placar: "-", t2: "França", aoVivo: false },
            { data: "26/06 - 21:00", t1: "Senegal", placar: "-", t2: "Iraque", aoVivo: false }
        ]
    },
    "Grupo J": {
        classificacao: [
            { pos: 1, time: "Argentina", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Áustria", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Jordânia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Argélia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "16/06 - 16:00", t1: "Argentina", placar: "-", t2: "Argélia", aoVivo: false },
            { data: "16/06 - 19:00", t1: "Áustria", placar: "-", t2: "Jordânia", aoVivo: false },
            { data: "22/06 - 16:00", t1: "Argentina", placar: "-", t2: "Áustria", aoVivo: false },
            { data: "22/06 - 22:00", t1: "Jordânia", placar: "-", t2: "Argélia", aoVivo: false },
            { data: "27/06 - 13:00", t1: "Jordânia", placar: "-", t2: "Argentina", aoVivo: false },
            { data: "27/06 - 13:00", t1: "Argélia", placar: "-", t2: "Áustria", aoVivo: false }
        ]
    },
    "Grupo K": {
        classificacao: [
            { pos: 1, time: "Portugal", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Colômbia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Uzbequistão", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "RD Congo", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "16/06 - 22:00", t1: "Portugal", placar: "-", t2: "RD Congo", aoVivo: false },
            { data: "17/06 - 13:00", t1: "Uzbequistão", placar: "-", t2: "Colômbia", aoVivo: false },
            { data: "23/06 - 13:00", t1: "Portugal", placar: "-", t2: "Uzbequistão", aoVivo: false },
            { data: "23/06 - 19:00", t1: "Colômbia", placar: "-", t2: "RD Congo", aoVivo: false },
            { data: "27/06 - 17:00", t1: "Colômbia", placar: "-", t2: "Portugal", aoVivo: false },
            { data: "27/06 - 17:00", t1: "RD Congo", placar: "-", t2: "Uzbequistão", aoVivo: false }
        ]
    },
    "Grupo L": {
        classificacao: [
            { pos: 1, time: "Inglaterra", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Croácia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Gana", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Panamá", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "17/06 - 16:00", t1: "Inglaterra", placar: "-", t2: "Croácia", aoVivo: false },
            { data: "17/06 - 19:00", t1: "Gana", placar: "-", t2: "Panamá", aoVivo: false },
            { data: "23/06 - 16:00", t1: "Inglaterra", placar: "-", t2: "Gana", aoVivo: false },
            { data: "23/06 - 22:00", t1: "Panamá", placar: "-", t2: "Croácia", aoVivo: false },
            { data: "27/06 - 21:00", t1: "Panamá", placar: "-", t2: "Inglaterra", aoVivo: false },
            { data: "27/06 - 21:00", t1: "Croácia", placar: "-", t2: "Gana", aoVivo: false }
        ]
    },
    "16-avos": [
        { data: "28/06 - Jogo 73", t1: "2º Grupo A", placar: "-", t2: "2º Grupo B", aoVivo: false, penaltis: "" },
        { data: "29/06 - Jogo 74", t1: "1º Grupo E", placar: "-", t2: "3º A/B/C/D/F", aoVivo: false, penaltis: "" },
        { data: "29/06 - Jogo 75", t1: "1º Grupo I", placar: "-", t2: "3º C/D/F/G/H", aoVivo: false, penaltis: "" },
        { data: "29/06 - Jogo 76", t1: "2º Grupo C", placar: "-", t2: "2º Grupo D", aoVivo: false, penaltis: "" },
        { data: "30/06 - Jogo 77", t1: "1º Grupo A", placar: "-", t2: "3º C/E/F/H/I", aoVivo: false, penaltis: "" },
        { data: "30/06 - Jogo 78", t1: "2º Grupo L", placar: "-", t2: "2º Grupo K", aoVivo: false, penaltis: "" },
        { data: "01/07 - Jogo 79", t1: "1º Grupo H", placar: "-", t2: "3º E/F/G/I/J", aoVivo: false, penaltis: "" },
        { data: "01/07 - Jogo 80", t1: "2º Grupo E", placar: "-", t2: "2º Grupo F", aoVivo: false, penaltis: "" },
        { data: "02/07 - Jogo 81", t1: "1º Grupo G", placar: "-", t2: "3º A/E/H/I/J", aoVivo: false, penaltis: "" },
        { data: "02/07 - Jogo 82", t1: "1º Grupo D", placar: "-", t2: "3º B/E/F/I/J", aoVivo: false, penaltis: "" },
        { data: "03/07 - Jogo 83", t1: "2º Grupo G", placar: "-", t2: "2º Grupo H", aoVivo: false, penaltis: "" },
        { data: "03/07 - Jogo 84", t1: "1º Grupo L", placar: "-", t2: "3º C/D/H/I/J", aoVivo: false, penaltis: "" },
        { data: "04/07 - Jogo 85", t1: "1º Grupo B", placar: "-", t2: "3º E/F/G/I/J", aoVivo: false, penaltis: "" },
        { data: "04/07 - Jogo 86", t1: "1º Grupo F", placar: "-", t2: "3º A/B/C/H/L", aoVivo: false, penaltis: "" },
        { data: "05/07 - Jogo 87", t1: "1º Grupo C", placar: "-", t2: "3º D/E/F/G/L", aoVivo: false, penaltis: "" },
        { data: "05/07 - Jogo 88", t1: "1º Grupo K", placar: "-", t2: "3º A/D/E/G/H", aoVivo: false, penaltis: "" }
    ],
    "Oitavas": [
        { data: "06/07 - Jogo 89", t1: "Venc. Jogo 73", placar: "-", t2: "Venc. Jogo 74", aoVivo: false, penaltis: "" },
        { data: "06/07 - Jogo 90", t1: "Venc. Jogo 75", placar: "-", t2: "Venc. Jogo 76", aoVivo: false, penaltis: "" },
        { data: "07/07 - Jogo 91", t1: "Venc. Jogo 77", placar: "-", t2: "Venc. Jogo 78", aoVivo: false, penaltis: "" },
        { data: "07/07 - Jogo 92", t1: "Venc. Jogo 79", placar: "-", t2: "Venc. Jogo 80", aoVivo: false, penaltis: "" },
        { data: "08/07 - Jogo 93", t1: "Venc. Jogo 81", placar: "-", t2: "Venc. Jogo 82", aoVivo: false, penaltis: "" },
        { data: "08/07 - Jogo 94", t1: "Venc. Jogo 83", placar: "-", t2: "Venc. Jogo 84", aoVivo: false, penaltis: "" },
        { data: "09/07 - Jogo 95", t1: "Venc. Jogo 85", placar: "-", t2: "Venc. Jogo 86", aoVivo: false, penaltis: "" },
        { data: "09/07 - Jogo 96", t1: "Venc. Jogo 87", placar: "-", t2: "Venc. Jogo 88", aoVivo: false, penaltis: "" }
    ],
    "Quartas": [
        { data: "11/07 - Jogo 97", t1: "Venc. Jogo 89", placar: "-", t2: "Venc. Jogo 90", aoVivo: false, penaltis: "" },
        { data: "12/07 - Jogo 98", t1: "Venc. Jogo 93", placar: "-", t2: "Venc. Jogo 94", aoVivo: false, penaltis: "" },
        { data: "12/07 - Jogo 99", t1: "Venc. Jogo 91", placar: "-", t2: "Venc. Jogo 92", aoVivo: false, penaltis: "" },
        { data: "13/07 - Jogo 100", t1: "Venc. Jogo 95", placar: "-", t2: "Venc. Jogo 96", aoVivo: false, penaltis: "" }
    ],
    "Semifinais": [
        { data: "16/07 - Jogo 101", t1: "Venc. Jogo 97", placar: "-", t2: "Venc. Jogo 98", aoVivo: false, penaltis: "" },
        { data: "17/07 - Jogo 102", t1: "Venc. Jogo 99", placar: "-", t2: "Venc. Jogo 100", aoVivo: false, penaltis: "" }
    ],
    "3º Lugar": [
        { data: "18/07 - 17:00", t1: "Perdedor 101", placar: "-", t2: "Perdedor 102", aoVivo: false, penaltis: "" }
    ],
    "Final": [
        { data: "19/07 - 17:00", t1: "Venc. Jogo 101", placar: "-", t2: "Venc. Jogo 102", aoVivo: false, penaltis: "" }
    ]
};
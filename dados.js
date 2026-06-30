const dadosIniciais = {
    "Grupo A": {
        classificacao: [
            { pos: 1, time: "México", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Coreia do Sul", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "República Tcheca", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "África do Sul", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "11/06 - 16:00", t1: "México", placar: "2-0", t2: "África do Sul", aoVivo: false },
            { data: "11/06 - 23:00", t1: "Coreia do Sul", placar: "2-1", t2: "República Tcheca", aoVivo: false },
            { data: "18/06 - 13:00", t1: "República Tcheca", placar: "1-1", t2: "África do Sul", aoVivo: false },
            { data: "18/06 - 22:00", t1: "México", placar: "1-0", t2: "Coreia do Sul", aoVivo: false },
            { data: "24/06 - 22:00", t1: "África do Sul", placar: "1-0", t2: "Coreia do Sul", aoVivo: false },
            { data: "24/06 - 22:00", t1: "República Tcheca", placar: "0-3", t2: "México", aoVivo: false }
        ]
    },
    "Grupo B": {
        classificacao: [
            { pos: 1, time: "Canadá", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Suíça", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Catar", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Bósnia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "12/06 - 16:00", t1: "Canadá", placar: "1-1", t2: "Bósnia", aoVivo: false },
            { data: "13/06 - 16:00", t1: "Catar", placar: "1-1", t2: "Suíça", aoVivo: false },
            { data: "18/06 - 16:00", t1: "Suíça", placar: "4-1", t2: "Bósnia", aoVivo: false },
            { data: "18/06 - 19:00", t1: "Canadá", placar: "6-0", t2: "Catar", aoVivo: false },
            { data: "24/06 - 16:00", t1: "Suíça", placar: "2-1", t2: "Canadá", aoVivo: false },
            { data: "24/06 - 16:00", t1: "Bósnia", placar: "3-1", t2: "Catar", aoVivo: false }
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
            { data: "13/06 - 19:00", t1: "Brasil", placar: "1-1", t2: "Marrocos", aoVivo: false },
            { data: "13/06 - 22:00", t1: "Haiti", placar: "0-1", t2: "Escócia", aoVivo: false },
            { data: "19/06 - 19:00", t1: "Escócia", placar: "0-1", t2: "Marrocos", aoVivo: false },
            { data: "19/06 - 21:30", t1: "Brasil", placar: "3-0", t2: "Haiti", aoVivo: false },
            { data: "24/06 - 19:00", t1: "Marrocos", placar: "4-2", t2: "Haiti", aoVivo: false },
            { data: "24/06 - 19:00", t1: "Escócia", placar: "0-3", t2: "Brasil", aoVivo: false }
        ]
    },
    "Grupo D": {
        classificacao: [
            { pos: 1, time: "Estados Unidos", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 2, time: "Austrália", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 3, time: "Turquia", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
            { pos: 4, time: "Paraguai", pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
        ],
        jogos: [
            { data: "12/06 - 22:00", t1: "Estados Unidos", placar: "4-1", t2: "Paraguai", aoVivo: false },
            { data: "14/06 - 01:00", t1: "Austrália", placar: "2-0", t2: "Turquia", aoVivo: false },
            { data: "19/06 - 16:00", t1: "Estados Unidos", placar: "2-0", t2: "Austrália", aoVivo: false },
            { data: "20/06 - 00:00", t1: "Turquia", placar: "0-1", t2: "Paraguai", aoVivo: false },
            { data: "25/06 - 23:00", t1: "Turquia", placar: "3-2", t2: "Estados Unidos", aoVivo: false },
            { data: "25/06 - 23:00", t1: "Paraguai", placar: "0-0", t2: "Austrália", aoVivo: false }
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
            { data: "14/06 - 14:00", t1: "Alemanha", placar: "7-1", t2: "Curaçao", aoVivo: false },
            { data: "14/06 - 20:00", t1: "Costa do Marfim", placar: "1-0", t2: "Equador", aoVivo: false },
            { data: "20/06 - 17:00", t1: "Alemanha", placar: "2-1", t2: "Costa do Marfim", aoVivo: false },
            { data: "20/06 - 21:00", t1: "Equador", placar: "0-0", t2: "Curaçao", aoVivo: false },
            { data: "25/06 - 17:00", t1: "Equador", placar: "2-1", t2: "Alemanha", aoVivo: false },
            { data: "25/06 - 17:00", t1: "Curaçao", placar: "0-2", t2: "Costa do Marfim", aoVivo: false }
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
            { data: "14/06 - 17:00", t1: "Holanda", placar: "2-2", t2: "Japão", aoVivo: false },
            { data: "14/06 - 23:00", t1: "Suécia", placar: "5-1", t2: "Tunísia", aoVivo: false },
            { data: "20/06 - 14:00", t1: "Holanda", placar: "5-1", t2: "Suécia", aoVivo: false },
            { data: "21/06 - 01:00", t1: "Tunísia", placar: "0-4", t2: "Japão", aoVivo: false },
            { data: "25/06 - 20:00", t1: "Tunísia", placar: "1-3", t2: "Holanda", aoVivo: false },
            { data: "25/06 - 20:00", t1: "Japão", placar: "1-1", t2: "Suécia", aoVivo: false }
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
            { data: "15/06 - 16:00", t1: "Bélgica", placar: "1-1", t2: "Egito", aoVivo: false },
            { data: "15/06 - 22:00", t1: "Irã", placar: "2-2", t2: "Nova Zelândia", aoVivo: false },
            { data: "21/06 - 16:00", t1: "Bélgica", placar: "0-0", t2: "Irã", aoVivo: false },
            { data: "21/06 - 22:00", t1: "Nova Zelândia", placar: "1-3", t2: "Egito", aoVivo: false },
            { data: "27/06 - 00:00", t1: "Egito", placar: "1-1", t2: "Irã", aoVivo: false },
            { data: "27/06 - 00:00", t1: "Nova Zelândia", placar: "1-5", t2: "Bélgica", aoVivo: false }
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
            { data: "15/06 - 13:00", t1: "Espanha", placar: "0-0", t2: "Cabo Verde", aoVivo: false },
            { data: "15/06 - 19:00", t1: "Arábia Saudita", placar: "1-1", t2: "Uruguai", aoVivo: false },
            { data: "21/06 - 13:00", t1: "Espanha", placar: "4-0", t2: "Arábia Saudita", aoVivo: false },
            { data: "21/06 - 19:00", t1: "Uruguai", placar: "2-2", t2: "Cabo Verde", aoVivo: false },
            { data: "26/06 - 21:00", t1: "Cabo Verde", placar: "0-0", t2: "Arábia Saudita", aoVivo: false },
            { data: "26/06 - 21:00", t1: "Uruguai", placar: "0-1", t2: "Espanha", aoVivo: false }
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
            { data: "16/06 - 16:00", t1: "França", placar: "3-1", t2: "Senegal", aoVivo: false },
            { data: "16/06 - 19:00", t1: "Iraque", placar: "1-4", t2: "Noruega", aoVivo: false },
            { data: "22/06 - 18:00", t1: "França", placar: "3-0", t2: "Iraque", aoVivo: false },
            { data: "22/06 - 21:00", t1: "Noruega", placar: "3-2", t2: "Senegal", aoVivo: false },
            { data: "26/06 - 16:00", t1: "Senegal", placar: "5-0", t2: "Iraque", aoVivo: false },
            { data: "26/06 - 16:00", t1: "Noruega", placar: "1-4", t2: "França", aoVivo: false }
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
            { data: "16/06 - 22:00", t1: "Argentina", placar: "3-0", t2: "Argélia", aoVivo: false },
            { data: "17/06 - 01:00", t1: "Áustria", placar: "3-1", t2: "Jordânia", aoVivo: false },
            { data: "22/06 - 14:00", t1: "Argentina", placar: "2-0", t2: "Áustria", aoVivo: false },
            { data: "23/06 - 00:00", t1: "Jordânia", placar: "1-2", t2: "Argélia", aoVivo: false },
            { data: "27/06 - 23:00", t1: "Jordânia", placar: "1-3", t2: "Argentina", aoVivo: false },
            { data: "27/06 - 23:00", t1: "Argélia", placar: "3-3", t2: "Áustria", aoVivo: false }
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
            { data: "17/06 - 14:00", t1: "Portugal", placar: "1-1", t2: "RD Congo", aoVivo: false },
            { data: "17/06 - 23:00", t1: "Uzbequistão", placar: "1-3", t2: "Colômbia", aoVivo: false },
            { data: "23/06 - 14:00", t1: "Portugal", placar: "5-0", t2: "Uzbequistão", aoVivo: false },
            { data: "23/06 - 23:00", t1: "Colômbia", placar: "1-0", t2: "RD Congo", aoVivo: false },
            { data: "27/06 - 20:30", t1: "RD Congo", placar: "3-1", t2: "Uzbequistão", aoVivo: false },
            { data: "27/06 - 20:30", t1: "Colômbia", placar: "0-0", t2: "Portugal", aoVivo: false }
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
            { data: "17/06 - 17:00", t1: "Inglaterra", placar: "4-2", t2: "Croácia", aoVivo: false },
            { data: "17/06 - 20:00", t1: "Gana", placar: "1-0", t2: "Panamá", aoVivo: false },
            { data: "23/06 - 17:00", t1: "Inglaterra", placar: "0-0", t2: "Gana", aoVivo: false },
            { data: "23/06 - 20:00", t1: "Panamá", placar: "0-1", t2: "Croácia", aoVivo: false },
            { data: "27/06 - 18:00", t1: "Croácia", placar: "2-1", t2: "Gana", aoVivo: false },
            { data: "27/06 - 18:00", t1: "Panamá", placar: "0-2", t2: "Inglaterra", aoVivo: false }
        ]
    },

    // ==========================================
    // SEGUNDA FASE (MATA-MATA COM LAYOUT LINEAR SOLICITADO)
    // ==========================================
    "16-avos": [
        { data: "29/06 - 17:30 (SF1)", t1: "Alemanha", placar: "0-1", t2: "Paraguai", aoVivo: false },
        { data: "30/06 - 18:00 (SF2)", t1: "França", placar: "-", t2: "Suécia", aoVivo: false },
        { data: "28/06 - 16:00 (SF3)", t1: "África do Sul", placar: "0-1", t2: "Canadá", aoVivo: false },
        { data: "29/06 - 22:00 (SF4)", t1: "Holanda", placar: "-", t2: "Marrocos", aoVivo: false },
        { data: "02/07 - 20:00 (SF5)", t1: "Portugal", placar: "-", t2: "Croácia", aoVivo: false },
        { data: "02/07 - 16:00 (SF6)", t1: "Espanha", placar: "-", t2: "Áustria", aoVivo: false },
        { data: "01/07 - 21:00 (SF7)", t1: "Estados Unidos", placar: "-", t2: "Bósnia", aoVivo: false },
        { data: "01/07 - 17:00 (SF8)", t1: "Bélgica", placar: "-", t2: "Senegal", aoVivo: false },
        { data: "29/06 - 14:00 (SF9)", t1: "Brasil", placar: "2-1", t2: "Japão", aoVivo: false },
        { data: "30/06 - 14:00 (SF10)", t1: "Costa do Marfim", placar: "-", t2: "Noruega", aoVivo: false },
        { data: "30/06 - 22:00 (SF11)", t1: "México", placar: "-", t2: "Equador", aoVivo: false },
        { data: "01/07 - 13:00 (SF12)", t1: "Inglaterra", placar: "-", t2: "RD Congo", aoVivo: false },
        { data: "03/07 - 19:00 (SF13)", t1: "Argentina", placar: "-", t2: "Cabo Verde", aoVivo: false },
        { data: "03/07 - 15:00 (SF14)", t1: "Austrália", placar: "-", t2: "Egito", aoVivo: false },
        { data: "03/07 - 00:00 (SF15)", t1: "Suíça", placar: "-", t2: "Argélia", aoVivo: false },
        { data: "03/07 - 22:30 (SF16)", t1: "Colômbia", placar: "-", t2: "Gana", aoVivo: false }
    ],
    "Oitavas": [
        { data: "04/07 - 18:00 (Oitavas 1)", t1: "Venc. Segunda fase 1", placar: "-", t2: "Venc. Segunda fase 2", aoVivo: false },
        { data: "04/07 - 14:00 (Oitavas 2)", t1: "Venc. Segunda fase 3", placar: "-", t2: "Venc. Segunda fase 4", aoVivo: false },
        { data: "06/07 - 16:00 (Oitavas 3)", t1: "Venc. Segunda fase 5", placar: "-", t2: "Venc. Segunda fase 6", aoVivo: false },
        { data: "06/07 - 21:00 (Oitavas 4)", t1: "Venc. Segunda fase 7", placar: "-", t2: "Venc. Segunda fase 8", aoVivo: false },
        { data: "05/07 - 17:00 (Oitavas 5)", t1: "Venc. Segunda fase 9", placar: "-", t2: "Venc. Segunda fase 10", aoVivo: false },
        { data: "05/07 - 21:00 (Oitavas 6)", t1: "Venc. Segunda fase 11", placar: "-", t2: "Venc. Segunda fase 12", aoVivo: false },
        { data: "07/07 - 13:00 (Oitavas 7)", t1: "Venc. Segunda fase 13", placar: "-", t2: "Venc. Segunda fase 14", aoVivo: false },
        { data: "07/07 - 17:00 (Oitavas 8)", t1: "Venc. Segunda fase 15", placar: "-", t2: "Venc. Segunda fase 16", aoVivo: false }
    ],
    "Quartas": [
        { data: "09/07 - 17:00 (Quartas 1)", t1: "Venc. Oitavas 1", placar: "-", t2: "Venc. Oitavas 2", aoVivo: false },
        { data: "10/07 - 16:00 (Quartas 2)", t1: "Venc. Oitavas 3", placar: "-", t2: "Venc. Oitavas 4", aoVivo: false },
        { data: "11/07 - 18:00 (Quartas 3)", t1: "Venc. Oitavas 5", placar: "-", t2: "Venc. Oitavas 6", aoVivo: false },
        { data: "11/07 - 21:00 (Quartas 4)", t1: "Venc. Oitavas 7", placar: "-", t2: "Venc. Oitavas 8", aoVivo: false }
    ],
    "Semifinais": [
        { data: "14/07 - 16:00 (Semifinal 1)", t1: "Venc. Quartas 1", placar: "-", t2: "Venc. Quartas 2", aoVivo: false },
        { data: "15/07 - 16:00 (Semifinal 2)", t1: "Venc. Quartas 3", placar: "-", t2: "Venc. Quartas 4", aoVivo: false }
    ],
    "3º Lugar": [
        { data: "18/07 - 18:00", t1: "Perd. Semifinal 1", placar: "-", t2: "Perd. Semifinal 2", aoVivo: false }
    ],
    "Final": [
        { data: "19/07 - 16:00", t1: "Venc. Semifinal 1", placar: "-", t2: "Venc. Semifinal 2", aoVivo: false }
    ]
};
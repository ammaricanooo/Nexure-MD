import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {};
    const tebakkalimat_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ TEBAK KALIMAT ]

• *Question :* ${json.soal}
• *Timeout :* 60 seconds


Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
    conn.tebakkalimat[tebakkalimat_id] = {
        tebakkalimat_id,
        msg: m.reply(`${caption}`),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.tebakkalimat[tebakkalimat_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.tebakkalimat[tebakkalimat_id];
            }
        }, timeout),
    };
}
handler.help = ['tebakkalimat']
handler.tags = ['game']
handler.command = /^tebakkalimat/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133
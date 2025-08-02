import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {};
    const tebakkimia_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ TEBAK KIMIA ]

• *Unsur :* ${json.unsur}
• *Timeout :* 60 seconds


Tebak apa lambang dari unsur tersebut
Type *nyerah* to surrender`.trim();
    conn.tebakkimia[tebakkimia_id] = {
        tebakkimia_id,
        msg: m.reply(`${caption}`),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.tebakkimia[tebakkimia_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.tebakkimia[tebakkimia_id];
            }
        }, timeout),
    };
}
handler.help = ['tebakkimia']
handler.tags = ['game']
handler.command = /^tebakkimia/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133
import similarity from 'similarity';
const threshold = 1
let limit = 15
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
    if (!conn.tebakkimia[id]) return;
    let json = conn.tebakkimia[id];

    if (
        m.text.toLowerCase() === 'nyerah' ||
        m.text.toLowerCase() === 'surrend' ||
        m.text.toLowerCase() === 'surrender'
    ) {
        clearTimeout(conn.tebakkimia[id].timeout);
        await m.reply(`Game Over!! Kamu menyerah! Jawaban yang benar adalah: *${json.lambang}*`);
        delete conn.tebakkimia[id];
    } else if (m.text.toLowerCase() == json.lambang.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += 15
        users.limit += limit
        await m.reply(`Selamat @${m.sender.split('@')[0]} 🎉 Jawaban kamu benar!

limit kamu bertambah sebesar: ${limit} limit

Mau main lagi? ketik *.tebakkimia* lagi ya kak heheh`)
        clearTimeout(conn.tebakkimia[id].timeout)
        delete conn.tebakkimia[id]
    } else if (similarity(m.text.toLowerCase(), json.lambang.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else {
        await conn.sendMessage(m.chat, {
            react: {
                text: '❌',
                key: m.key,
            },
        });
    }
}
handler.exp = 0

export default handler
import similarity from 'similarity';
const threshold = 0.72
let limit = 15
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    if (!conn.siapakahaku[id]) return;
    let json = conn.siapakahaku[id];

    if (
        m.text.toLowerCase() === 'nyerah' ||
        m.text.toLowerCase() === 'surrend' ||
        m.text.toLowerCase() === 'surrender'
    ) {
        clearTimeout(conn.siapakahaku[id].timeout);
        await m.reply(`Game Over!! Kamu menyerah! Jawaban yang benar adalah: *${json.jawaban}*`);
        delete conn.siapakahaku[id];
    } else if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += 15
        users.limit += limit
        await m.reply(`Selamat @${m.sender.split('@')[0]} 🎉 Jawaban kamu benar!

limit kamu bertambah sebesar: ${limit} limit

Mau main lagi? ketik *.siapakahaku* lagi ya kak heheh`)
        clearTimeout(conn.siapakahaku[id].timeout)
        delete conn.siapakahaku[id]
    } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
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
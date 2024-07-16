var handler = async (m, { conn, text, isROwner, isOwner }) => {

if (!text) return conn.reply(m.chat, 'هذا الأمر خاص بتغيير إسم المجموعة تكتب هكذا \n\n*.setgoupename* SNIPER BOT GROUPE', m,  )
await conn.groupUpdateSubject(m.chat, text)
conn.reply(m.chat, `🚩 ${text ? `${text} *هو الاسم الجديد لهذه المجموعة*\n` : '*لم يعطوا اسما*'}`, m,  )
}
handler.help = ['setgroupname']
handler.tags = ['owner']
handler.command = /^setgroupname$/i

handler.botAdmin = true
handler.group = true
handler.admin = true

export default handler

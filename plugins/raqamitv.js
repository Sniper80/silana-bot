import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "read"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("يمكنك الاطلاع على مراجعات الهواتف وآخر أخبار التقنية مع ميزة رقمي تيفي مثال :\n\n*.raqamitv* search|samsung\n\n\nاذا واجهتك اي مشاكل فيمكنك التواصل معي من هنا : \n\nhttps://egsniper.com \n\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("\nExample: .raqamitv search|iphone")
            await m.reply(wait)
            try {
                let res = await fetchAndParseData(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *link:* ${decodeURIComponent(item.link)}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('error')
            }
        }

        if (feature == "read") {
            if (!inputs) return m.reply("Input query link\nExample: .raqamitv app|link")
            await m.reply(wait)
            try {
                let obje = await ambilKontenDenganLink(inputs)
                await m.reply(obje)
            } catch (e) {
                await m.reply('error')
            }
        }
    }
}
handler.help = ["raqamitv"]
handler.tags = ["morocco"]
handler.command = /^(raqamitv)$/i
export default handler

/* New Line */
async function fetchAndParseData(q) {
  try {
    const response = await fetch('https://raqamitv.com/?s=' + q);
    const html = await response.text();
    const $ = cheerio.load(html);

    const posts = $('.post-item').map((index, element) => {
      const title = $(element).find('.post-title a').text();
      const link = $(element).find('.post-title a').attr('href');
      const description = $(element).find('.post-excerpt').text();

      return { title, link, description };
    }).get();

    return posts;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function ambilKontenDenganLink(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const semuaKontenDenganLink = [];

    $('p').each((index, element) => {
      const teksP = $(element).text();
      const teksDalamP = $(element).find('a').map((indexA, elementA) => {
        const teksA = $(elementA).text();
        const linkA = $(elementA).attr('href');
        return teksA && linkA ? `[${teksA}](${linkA})` : null;
      }).get().join(' ');

      if (teksP) {
        semuaKontenDenganLink.push(`${teksP}\n${teksDalamP}`);
      }
    });

    return semuaKontenDenganLink.join('\n\n');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return null;
  }
}

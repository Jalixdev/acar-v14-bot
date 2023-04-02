const { Cent, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ComponentType} = require("discord.js");
const { cartelEmbed } = require('../../../../base/Reference/Embed');
const GUILD_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Invite = require('../../../../database/Schemas/Global.Guild.Invites')
const Users = require('../../../../database/Schemas/Client.Users');
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const Heykeller = require('../../../../database/Schemas/Others/Middle.Heykels')
let statConfig;
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const table = require('table');
const { 
  Modal,
  TextInputComponent, 
  showModal
} = dcmodal = require('discord-modals')

dcmodal(client)

let özellikler = [
    { name: "oğlak", type: "burç" },
    { name: "kova", type: "burç"},
    { name: "balık", type: "burç"},
    { name: "koç", type: "burç"},
    { name: "boğa", type: "burç"},
    { name: "ikizler", type: "burç"},
    { name: "yengeç", type: "burç"},
    { name: "aslan", type: "burç"},
    { name: "başak", type: "burç"},
    { name: "terazi", type: "burç"},
    { name: "akrep", type: "burç"},
    { name: "yay", type: "burç"},

    { name: "lovers", type: "ilişki"},
    { name: "LGBT", type: "ilişki"},

    {name: "pembe", type: "renkler"},
    {name: "mavi", type: "renkler"},
    {name: "turuncu", type: "renkler"},
    {name: "kırmızı", type: "renkler"},
    {name: "mor", type: "renkler"},
    {name: "beyaz", type: "renkler"},
    {name: "sarı", type: "renkler"},
    {name: "yeşil", type: "renkler"},
    {name: "siyah", type: "renkler"},

    {name: "dc", type: "oyun"},
    {name: "vk", type: "oyun"},

    {name: "bestFriendRolü", type: "diğer"},
    
    

 // Tekil, Rol, Kanal, Roller, Acmali, Cogul
  ];
module.exports = {
    Isim: "seçenek",
    Komut: ["seçeneksistem"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    client.on('modalSubmit', async (modal) => {
      statConfig =  require('../../../../base/Additions/Staff/Sources/_settings')
      let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
      if(!guild) {
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
      }
      let cartelim = guild.members.cache.get(modal.user.id)
      if(!cartelim)  {
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
      }
      if(modal.customId == "istekoneri") {
        let logKanalı = guild.kanalBul("istek-öneri-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `İstek-Öneri kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ${cevaplar.prefix}` , ephemeral: true })
        }
        let text = modal.getTextInputValue('textIstekOneri'); 
        let embed = new EmbedBuilder().setFooter({text: `${cartelim.user.tag} • Yeni ${ayarlar.serverName} İstek/Öneri`, iconURL: cartelim.user.avatarURL({dynamic: true})})
        let Etiket;
        if(roller && roller.Buttons && roller.Buttons.istekÖneriŞikayetSorumlusu) Etiket = `${cartelim.guild.roles.cache.get(roller.Buttons.istekÖneriŞikayetSorumlusu)}`
        logKanalı.send({content: Etiket ? Etiket : null, embeds: [embed.setColor("Random").setDescription(`**Merhaba!** ${ayarlar.serverName} Yönetimi
${cartelim} isimli üyenin <t:${String(Date.now()).slice(0,10)}:F> tarihinde aşağıda istek veya önerisi belirtilmiştir.`)
        .addField(`İçerik`, `${text}`)
        ]})
        await modal.deferReply({ ephemeral: true })
        await modal.followUp({content: `Başarıyla istek veya öneriniz yönetime iletilmiştir. Teşekkür Ederiz! ${guild.emojiGöster(emojiler.onay_cartel)}` , ephemeral: true })
      }
      if(modal.customId == "botsorun") {
        let logKanalı = guild.kanalBul("bot-sorun-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Bot sorun kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ${cevaplar.prefix}` , ephemeral: true })
        }
        let text = modal.getTextInputValue('textsorun'); 
        let embed = new EmbedBuilder().setFooter({text: `${cartelim.user.tag} • Yeni Bot Sorun Bildirimi`, iconURL: cartelim.user.avatarURL({dynamic: true})})
        logKanalı.send({content: `<@719117042904727635>`, embeds: [embed.setColor("Random").setDescription(`**Merhaba!** ${ayarlar.serverName} Yönetimi
${cartelim} isimli üyenin <t:${String(Date.now()).slice(0,10)}:F> tarihinde aşağıda bot sorunu bildirdi.`)
        .addField(`İçerik`, `${text}`)
        ]})
        await modal.deferReply({ ephemeral: true })
        await modal.followUp({content: `Başarıyla bot sorunu münür'a iletilmiştir. Teşekkür Ederiz! ${guild.emojiGöster(emojiler.onay_cartel)}` , ephemeral: true })
      }
      if(modal.customId == "soruncozmecagir") {
        let logKanalı = guild.kanalBul("şikayet-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Şikayet kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ${cevaplar.prefix}` , ephemeral: true })
        }
        let yetkiliRol = cartelim.guild.roles.cache.get(roller.altilkyetki);
        let uyeUstRol = cartelim.guild.roles.cache.get(cartelim.roles.highest.id)
       // if(yetkiliRol.rawPosition < uyeUstRol.rawPosition) {
       //   await modal.deferReply({ ephemeral: true })
      //    return await modal.followUp({content: `Yetkili olduğunuzdan dolayı, işleminize devam edemiyoruz. ${cevaplar.prefix}` , ephemeral: true })
      //  }
        let sorun = modal.getTextInputValue('sorun');  
        let hakkında = modal.getTextInputValue('hakkında');  
        let embed = new EmbedBuilder().setFooter({text: `${cartelim.user.tag} • Yeni ${ayarlar.serverName} Sorun Çözme Çağırma Formu`, iconURL: cartelim.user.avatarURL({dynamic: true})})
        logKanalı.send({content: `${roller.sorunÇözmeciler.map(x => cartelim.guild.roles.cache.get(x)).join(", ")}`, embeds: [embed.setColor("Random").setDescription(`${cartelim} isimli cezalı bir üye sorun çözme çağırmak istiyor. Aktif olan sorun çözmecilerimizin bu olaya bakmasını istiyorum.`)
      .addField("Sorun Tipi",`> ${sorun}`)
      .addField("Sorun",`> ${hakkında}`)
    ]})
    await modal.deferReply({ ephemeral: true })
    await modal.followUp({content: `Başarıyla sorun çözmeye hatalı bildiri iletilmiştir. Teşekkür Ederiz! ${guild.emojiGöster(emojiler.onay_cartel)}` , ephemeral: true })
      }
      if(modal.customId == "ybasvuru") {
        let logKanalı = guild.kanalBul("başvuru-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Başvuru kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ${cevaplar.prefix}` , ephemeral: true })
        }
        let yetkiliRol = cartelim.guild.roles.cache.get(roller.altilkyetki);
        let uyeUstRol = cartelim.guild.roles.cache.get(cartelim.roles.highest.id)
        if(yetkiliRol.rawPosition < uyeUstRol.rawPosition) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Yetkili olduğunuzdan dolayı, işleminize devam edemiyoruz. ${cevaplar.prefix}` , ephemeral: true })
        }
        let isimyas = modal.getTextInputValue('isimyas');  
        let aktiflik = modal.getTextInputValue('aktiflik');  
        let yarar = modal.getTextInputValue('yarar');  
        let hakkında = modal.getTextInputValue('hakkında');
        let refernas = modal.getTextInputValue('referans');
        let nekatican = modal.getTextInputValue('nekatican');
        let embed = new EmbedBuilder().setFooter({text: `${cartelim.user.tag} • Yeni ${ayarlar.serverName} Yetkili Başvurusu`, iconURL: cartelim.user.avatarURL({dynamic: true})})
        let Etiket;
        if(ayarlar && roller.Buttons && roller.Buttons.genelSorumlular && roller.Buttons.sorumlulukSorumlusu) {
          Etiket = [...roller.Buttons.genelSorumlular, ...roller.Buttons.sorumlulukSorumlusu]
        }
        logKanalı.send({content: `${Etiket ? Etiket.map(x => guild.roles.cache.get(x)).join(", ") : `@everyone`}`, embeds: [embed.setColor("Random").setDescription(`**Merhaba!** ${Etiket ? Etiket.map(x => guild.roles.cache.get(x)).join(", ") : ayarlar.serverName}

${cartelim} (**\`${isimyas}\`**) isimli üyesinin yaptığı <t:${String(Date.now()).slice(0,10)}:F> tarihindeki yetkili başvurusunun detayları aşağıda görüntülenmiştir.`)
.addField(`Referans Bilgisi`, `${refernas ? `${guild.members.cache.find(x => x.user.tag == refernas || x.user.username.includes(refernas) || x.id == refernas) ? guild.members.cache.find(x => x.user.tag == refernas || x.user.username.includes(refernas) || x.id == refernas) : `${refernas}`}` : "Bir referans belirtilmemiş."}`)
.addField(`Yetkilik Geçmiş Bilgisi`, `${aktiflik}`)
.addField(`Yetkili Olarak Katabilecekleri`, `${nekatican}`)
.addField(`Yaptırım Bilgisi`, `${yarar}`)
.addField(`Hakkında`, `${hakkında}`)
]})
        await modal.deferReply({ ephemeral: true })
        await modal.followUp({content: `Başarıyla yetkili başvuru kaydınız alınmıştır en kısa süreçte sizlere ulaşacağız, lütfen özel mesaj kutunuzu herkese açık yapın. ${guild.emojiGöster(emojiler.onay_cartel)}` , ephemeral: true })
      }  
  });

    client.ws.on('INTERACTION_CREATE', async interaction => {
      let GameMap = new Map([
          ["cezaListesi",roller.teyitciRolleri],
          ["lastPunitives",roller.teyitciRolleri],
          ["cezaPuanim",roller.teyitciRolleri],
          ["II", "123"],
          ["III", "123"],
          ["IV", "123"],
          ["V", "123"],
          ["VI", "123"],
          ["VII", "123"],
          ["VIII", "123"],
          ["IX", "123"],
          ["bestFriend", roller.Buttons ? roller.Buttons.bestFriendRolü ? roller.Buttons.bestFriendRolü : "123" : "123"],
  
      ])
      let name = interaction.data.custom_id        
      let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
      let member = guild.members.cache.get(interaction.member.user.id)
      if(!GameMap.has(name) || !member) return;
      let Cezalar = await Punitives.find({Member: member.id})
      let InviteData = await Invite.findOne({ guildID: member.guild.id, userID: member.user.id });
      let returnText;
      if(name == "bestFriend") {
        let heykelKontrol = await Heykeller.findOne({_id: member.id})
        if(!heykelKontrol) {
          returnText = `**Üzgünüm!** Yakın arkadaş  listesine girebilmek için listeye eklenmen gerekli. Lütfen daha sonra tekrar deneyin! ${member.guild.emojiGöster(emojiler.no_cartel)}`
        } else if(heykelKontrol) {
          if(roller.Buttons.bestFriendRolü && member.roles.cache.has(roller.Buttons.bestFriendRolü)) {
            returnText = `${member.guild.emojiGöster(emojiler.no_cartel)} **Alınmış!** Daha önce alındığı için 00:00 Saatini beklemelisin.`
          } else if(roller.Buttons.bestFriendRolü && !member.roles.cache.has(roller.Buttons.bestFriendRolü)) {
            member.roles.add(roller.Buttons.bestFriendRolü)
            returnText = `**Başarılı!** Artık Sende Bir Yakın Arkadaş Oldun!  ${member.guild.emojiGöster(emojiler.onay_cartel)}`
          }
        }

      }
if(name == "cezaListesi") {
      let data = [["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];
      data = data.concat(Cezalar.map(value => {          
          return [
              `#${value.No}`,
              `${value.Active == true ? "✅" : `❌`}`,
              `${tarihsel(value.Date)}`,
              `${value.Type}`,
              `${value.Reason}`
          ]
      }));
      let veriler = table.table(data, {
         columns: { 0: { paddingLeft: 1 }, 1: { paddingLeft: 1 }, 2: { paddingLeft: 1 }, 3: { paddingLeft: 1, paddingRight: 1 }, },
         border : table.getBorderCharacters(`void`),  
         drawHorizontalLine: function (index, size) {
             return index === 0 || index === 1 || index === size;
         }
      });
      returnText = `\`\`\`fix
${await Punitives.findOne({Member: member.id}) ? veriler : `Ceza bilginiz bulunamadı.`}\`\`\``
      }
      
      if(name == "lastPunitives") {
          let sesMute = await Punitives.find({Member: member.id, Active: true, Type: "Ses Susturulma"})
          let chatMute = await Punitives.find({Member: member.id, Active: true, Type: "Metin Susturulma"})
          let Cezali = await Punitives.find({Member: member.id, Active: true, Type: "Cezalandırılma"})
          let aktifCezalarList = []
          if(Cezali) Cezali.forEach(ceza => {
              aktifCezalarList.push({
                  No: ceza.No,
                  Tip: ceza.Type,
                  Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                  Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                  Kalkma: `${moment.duration(ceza.Duration- Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
              })
          })
          if(sesMute) sesMute.forEach(ceza => {
              aktifCezalarList.push({
                  No: ceza.No,
                  Tip: ceza.Type,
                  Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                  Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                  Kalkma: `${moment.duration(ceza.Duration- Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
              })
          })
          if(chatMute) chatMute.forEach(ceza => {
              aktifCezalarList.push({
                  No: ceza.No,
                  Tip: ceza.Type,
                  Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                  Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                  Kalkma: `${ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı"}`
              })
          })

          returnText = `${aktifCezalarList ? 
aktifCezalarList.map(x => `${member.guild.emojiGöster(emojiler.no_cartel)} ${x.Yetkili} tarafından **${x.Atılan}** süresince işlenen "__#${x.No}__" numaralı "__${x.Tip}__" türündeki cezalandırmanın kalkmasına **${x.Kalkma}** kaldı.`).join("\n") 
: `Ceza bilginiz bulunamadı.`}`
      }

      if(name == "cezaPuanim") {
              let cezaPuanı = await member.cezaPuan()
              returnText = ` **${await member.cezaPuan()}** ceza puanınız bulunmakta.`
      }
      client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
              type: 4,
              data: {
                  content: returnText ? returnText : `Ceza bilginiz bulunamadı.`,
                  flags: "64"
              }
          }
      })
      
  });
    client.on('interactionCreate', async (i) => {
      let member = await i.guild.members.cache.get(i.user.id)
      if(i.customId == "cdestekcik") {
        let canlıDestekBul = i.guild.kanalBul("canlı-destek")
        if(!canlıDestekBul) return i.reply({ephemeral: true, content: `Canlı destek sistemi kurulu olmadığından dolayı işleminize devam edilemiyor. ${cevaplar.prefix}`})
        const canlıDestekKategorisi = canlıDestekBul.parentId
        let canlıDestekRolü = []
        i.guild.roles.cache.array().filter(x => x.name.includes("Canlı Destek")).map(x => canlıDestekRolü.push(x.id))

        const evet = new ButtonBuilder()
        .setCustomId("evt")
        .setLabel("Evet")
        .setStyle(ButtonStyle.Success)
  
        const hayır = new ButtonBuilder()
        .setCustomId("hyr")
        .setLabel("Hayır")
        .setStyle(ButtonStyle.Danger)
  
        const onay = new ButtonBuilder()
        .setCustomId("onayla")
        .setLabel("Canlı Desteği Onayla")
        .setStyle(ButtonStyle.Success)
  
        const red = new ButtonBuilder()
        .setCustomId("reddet")
        .setLabel("Reddet")
        .setStyle(ButtonStyle.Danger)

        const dk = new ButtonBuilder()
        .setCustomId("kapatCanliDestek")
        .setLabel("Desteği Sonlandır")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🎫")

        const row2 = new ActionRowBuilder()
        .addComponents([evet, hayır])

        const row3 = new ActionRowBuilder()
        .addComponents([onay, red])

        const row31 = new ActionRowBuilder()
        .addComponents([dk])

        await i.reply({ embeds:[new EmbedBuilder().setDescription(`Canlı desteğe bağlanmak istediğinize emin misiniz?`).setFooter({text: `gereksiz isteklerde yaptırım uygulanacaktır.`})] , components: [row2], ephemeral: true});
        var filter = (c) => c.user.id && i.user.id 
        let collector = i.channel.createMessageComponentCollector({filter: filter, max: 1, time: 30000})
        collector.on('collect', async (collect) => {
          if(collect.customId == "evt") {
            await i.editReply({embeds: [new EmbedBuilder().setDescription(`Canlı destek ekibimize bildirdik, sizi canlı destek ekibine aktarıyorum. Lütfen bekleyin!`)], components: [], ephemeral: true});
            let logKanalı = i.guild.kanalBul("canlı-destek")
            if(logKanalı) logKanalı.send({content: `${canlıDestekRolü.map(x => i.guild.roles.cache.get(x)).join(", ")}`, embeds: [new EmbedBuilder().setDescription(`${member} üyesi canlı desteğe bağlanmak istiyor. Kabul ediyor musunuz?`)], components: [row3]}).then(async (msg) => {
              var filter = (i) => {
                let cartelimcik = i.guild.members.cache.get(i.user.id)
                return canlıDestekRolü.some(x => cartelimcik.roles.cache.has(x))
              }
              let collector2 = msg.createMessageComponentCollector({ componentType: ComponentType.Button, max: 1 });
              collector2.on("collect", async (interaction) => { 
                if(interaction.customId == "onayla") {
                  msg.edit({
                    content: null,
                    embeds : [new EmbedBuilder().setDescription(`${member} üyesinin canlı desteği <t:${String(Date.now()).slice(0,10)}:F> tarihinde ${interaction.user} tarafından onaylandı. ${member.guild.emojiGöster(emojiler.onay_cartel)}`)],
                    components : []
                  })
                  
                  member.guild.channels.create(`${member.user.tag}-destek`, {
                    parent: canlıDestekKategorisi,
                    topic: member.id,
                    permissionOverwrites: [{
                        id: member,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
            
                      {
                        id: interaction.user,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
                      {
                        id: member.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                      },
                    ],
                    type: 'text',
                  }).then(async c => { 
                    c.send({
                      embeds: [new EmbedBuilder().setDescription(`Canlı destek kanalı başarıyla oluşturuldu.
**NOT:** Canlı destek almaktan vaz geçerseniz veya destek bitti ise aşağıda ki düğmeyi kullanabilirsiniz.`).setFooter({text: `bu canlı destek 5 dakika sonra kapatılacaktır.`})],
                      components : [row31]
                    }).then(async (cmsg) => {
                      let collectorcuk = cmsg.createMessageComponentCollector({time: 60000*5})
                      collectorcuk.on('collect', async (inte) => {
                        if(inte.customId == "kapatCanliDestek") {
                          inte.deferUpdate().catch(err => {})
                          cmsg.edit({embeds: [new EmbedBuilder().setDescription(`${cmsg.guild.emojiGöster(emojiler.onay_cartel)} ${inte.user} tarafından canlı destek kapatıldı. 10 Saniye içerisinde kanal yok olacaktır.`)],components: []})
                          setTimeout(() => {
                            c.delete().catch(err => {})
                          }, 10000);
                        }
                      })
                      collectorcuk.on('end', async (kapat) => {
                        c.delete().catch(err => {})
                      })
                    })
                    interaction.reply({content: `[ONAYLANDI] Canlı destek kanalı oluşturuldu.`, ephemeral: true})
                    member.send({
                     content: `Canlı destek isteğiniz başarıyla onaylandı!\nSunucumuzda bulunan <#${c.id}> kanalını ziyaret ediniz.`
                    }).catch(err => {});
                    
                  })

                }
                if(interaction.customId == "reddet") {
                  member.send(`Canlı destek isteğiniz, ${interaction.user} tarafından reddedildi. ${cevaplar.prefix}`).catch(err => {})
                  msg.edit({content: null, embeds: [new EmbedBuilder().setDescription(`${cevaplar.prefix} ${member} üyesinin canlı destek isteği <t:${String(Date.now()).slice(0, 10)}:R> ${interaction.user} tarafından reddedildi.`)], components: []}).catch(err => {})
                  await interaction.reply({ephemeral: true, content: `${member.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${member} üyesinin, canlı desteğini iptal ettin.`}) 
                  setTimeout(() => {
                    msg.delete().catch(err => {})
                  }, 10000);        
                }
              })
            })

          }
          if(collect.customId == "hyr") {
            await i.editReply({content: `${member.guild.emojiGöster("support")} Canlı destek bağlantısını iptal ettiniz. İyi günler!`, components: [], ephemeral: true})
          }
        })
      }
   
        

      if(i.customId == "sorunÇözmeci") {
        const modal = new ModalBuilder()
        .setCustomId('soruncozmecagir')
        .setTitle('Sorun Çözme Çağır')
        .addComponents(
          new TextInputComponent()
          .setCustomId('sorun')
          .setLabel('Sorun çeşiti?')
          .setStyle('SHORT')
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder('Örn: Yetkili şikayeti')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('hakkında')
          .setLabel('Sorunu anlatır mısınız?')
          .setStyle("LONG")
          .setMinLength(5)
          .setMaxLength(500)
          .setPlaceholder('Örn: Sebepsiz yere karantinaya düştüm, böyle böyle vs.')
          .setRequired(true)
        );
        showModal(modal, {
          client: client,
          interaction: i
        })
      }
       if(i.customId == "basvurucuk") {
          const modal = new ModalBuilder()
          .setCustomId('ybasvuru')
          .setTitle('Yetkili Başvuru Formu')
          .addComponents(
            new TextInputComponent()
            .setCustomId('zaman')
            .setLabel('Sunucuya ne kadar zaman ayırabilirsin?')
            .setStyle('LONG')
            .setMinLength(5)
            .setMaxLength(10)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId("nekatican")
            .setLabel("Yetkili olarak bize ne katabilirsin?")
            .setStyle("LONG")
            .setMinLength(5)
            .setMaxLength(50)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId("nedenknk")
            .setLabel("Neden yetkili olmak istiyorsun?")
            .setStyle("LONG")
            .setMinLength(5)
            .setMaxLength(50)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('hakkında')
            .setLabel('Hakkında bize neler söyleyebilirsin?')
            .setStyle("LONG")
            .setMinLength(5)
            .setMaxLength(300)
          .setRequired(true)
          );
          showModal(modal, {
            client: client,
            interaction: i 
          })
        }
        if(i.customId == "soruniletcik") {
          const modal = new ModalBuilder()
          .setCustomId('botsorun')
          .setTitle('Sorun Bildirme Formu')
          .addComponents(
            new TextInputComponent()
            .setCustomId('textsorun')
            .setLabel('Sorununuzu buradan belirtebilirsiniz')
            .setStyle("LONG")
            .setMinLength(5)
            .setMaxLength(500)
            .setRequired(true)
          );
          showModal(modal, {
            client: client,
            interaction: i
          })
        }
      if(i.customId == "istekönericik") {
        const istekOneri = new ModalBuilder()
        .setCustomId('istekoneri')
        .setTitle('İstek & Öneri Formu')
        .addComponents(
          new TextInputComponent() 
          .setCustomId('textIstekOneri')
          .setLabel('İsteğinizi veya önerinizi belirtebilirsiniz')
          .setStyle('LONG')
          .setMinLength(10)
          .setMaxLength(1000)

          .setRequired(true)
        );
        showModal(istekOneri, {
          client: client,
          interaction: i 
        })
      }
    })

    client.on('interactionCreate', async (i) => {
      let member = await i.guild.members.cache.get(i.user.id)
      let Cezalar = await Punitives.find({Member: member.id})
      let InviteData = await Invite.findOne({ guildID: member.guild.id, userID: member.user.id });
      if(i.values == "kullanicip2") {
      let name = i.values 
        const total = InviteData ? InviteData.total ? InviteData.total  : 0: 0;
    const regular = InviteData ? InviteData.regular ? InviteData.regular  : 0: 0;
    const bonus = InviteData ? InviteData.bonus ? InviteData.bonus  : 0: 0;
    const leave = InviteData ? InviteData.leave ? InviteData.leave  : 0: 0;
    const fake = InviteData ? InviteData.fake ? InviteData.fake  : 0: 0;
    const invMember = await Invite.find({ Inviter: member.user.id });
    const bazıları = invMember ? invMember.filter(value => member.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => `\` • \`${member.guild.members.cache.get(value.userID)} (\`${value.userID}\`)`).join("\n") : undefined
    const daily = invMember ? member.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? member.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    let toplamMesaj = 0
    let toplamSes = 0
    let statData = await Stats.findOne({ guildID: member.guild.id, userID: member.id})
        if(statData && statData.voiceStats) statData.voiceStats.forEach(c => toplamSes += c);
        if(statData && statData.chatStats)   statData.chatStats.forEach(c => toplamMesaj += c);
        let returnText;
        if(name == "I") returnText = `:tada: **${member.guild.name}** Sunucusuna \`${tarihsel(member.joinedAt)}\` Tarihinde Katılmışsınız.`
        if(name == "II") returnText = `:tada: ${member}, üstünüzde bulunan rol(ler) şunlardır:
${member.roles.cache.filter(x => x.name != "@everyone" && x.id != roller.boosterRolü).map(x => `\` ••❯ \` ${x} (\`${x.id}\`)`).join("\n")}
üzeriniz de **${member.roles.cache.size}** adet rol(ler) bulunmaktadır.`
         if(name == "III") returnText = `:tada: ${member} hesabınız, **${tarihsel(member.user.createdAt)}** tarihinde ${global.tarihHesapla(member.user.createdAt)} açılmış.`
         if(name == "IV") returnText = `${member.toString()}, üyesinin \`${tarihsel(Date.now() - (1000*60*60*3))}\` tarihinden itibaren \`${member.guild.name}\` sunucusunda toplam davet bilgileri aşağıda belirtilmiştir.
\` • \` **Toplam**: \` ${total + bonus} üye \` (**Bonus**: \` ${bonus} üye \`)
\` • \` **Girenler**: \` ${regular} üye \` (**Sahte**: \` ${fake} üye \`, **Ayrılmış**: \` ${leave} üye \`)
\` • \` **Günlük**: \` ${daily} üye \`
\` • \` **Haftalık**: \` ${weekly} üye \`

${bazıları ? `\` ••❯ \` Davet ettiğin bazı kişiler: 
${bazıları}` : ''}`
if(name == "V") returnText = `:tada: **${member.guild.name}** sunucunda **${await member.cezaPuan()}** ceza puanın bulunmakta.`
if(name == "VI") returnText = `**${member.guild.name}** Sunucusunun Aktif & Ses Bilgisi
Sunucumuz da **${global.sayılıEmoji(member.guild.memberCount)}** üye bulunmakta.
Sunucumuz da **${global.sayılıEmoji(member.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)}** aktif üye bulunmakta.`
     
if(name == "VII") {
  let isimveri = await Users.findById(member.id)
    if(isimveri && isimveri.Names) {
      let isimler = isimveri.Names.length > 0 ? isimveri.Names.reverse().map((value, index) => `**İsim**: \` ${value.Name} \`  
**İşlem**: ${value.State} ${value.Staff ? "(**İşlem Yapan**: <@"+ value.Staff + ">)" : ""}
**Tarih**: \` ${tarihsel(value.Date)} \`
──────────────────────`).join("\n") : "";
        returnText = `
Aşağıda sunucu içerisinde ki isimleriniz (**${isimveri.Names.length || 0}**) sıralandırılmıştır:
──────────────────────
${isimler}`
    } else {
        returnText = `:tada: ${member.guild.name} sunucusunda isim kaydınız bulunamadı.`
     }
} 
let saatDakikaCevir = (date) => { return moment.duration(date).format('H [saat,] m [dakika]'); }; 
if(name == "VIII")  returnText = `:tada: **${member.guild.name}** Sunucusunda Toplamda **${toplamMesaj} mesaj** istatistiğiniz bulunuyor.`
if(name == "IX") returnText = `:tada: **${member.guild.name}** Sunucusunda Toplamda **${saatDakikaCevir(toplamSes)}** boyunca zaman geçirmişsin.`
      }
    })

   

    



    
    
            client.on("interactionCreate", async (interaction) => {
                let menu = interaction.data.customId
                const member = await client.guilds.cache.get(sistem.SUNUCU.GUILD).members.fetch(interaction.member.user.id)
                if (!member) return;
                let Database = await GUILD_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
                const data = Database.Ayarlar.Buttons




                if (menu === "renks") {
                  let color = new Map([
                    ["kirmizi", data.kırmızı],
                    ["turuncu", data.turuncu],
                    ["mavi", data.mavi],
                    ["mor", data.mor],
                    ["pembe", data.pembe],
                    ["beyaz", data.beyaz],
                    ["yeşil", data.yeşil],
                    ["sarı", data.sarı],
                    ["siyah", data.siyah],
                  ])
                  let role = color.get(interaction.customId)
                  let renkroller = [data.kırmızı, data.turuncu, data.mavi, data.mor, data.pembe, data.yeşil, data.sarı, data.siyah, data.beyaz]
                  if (!member.roles.cache.has(roller.tagRolü) && !member.roles.cache.has(roller.boosterRolü) && !member.permissions.has("ADMINISTRATOR")) {
                    interaction.reply({ content: `Sadece sunucumuza boost basmış ${ayarlar.type ? `veya taglı` : ``} üyeler renk rolü seçebilir. `, ephemeral: true })
                  } else {
                     if (role) {
                      if (renkroller.some(m => member.roles.cache.has(m))) {
                        await member.roles.remove(renkroller)
                        interaction.reply({ content: `Belirlenen renk rolü üzerinizden alındı.`, ephemeral: true })
                      }
                      await member.roles.add(role)
                    }
                    interaction.reply({ content: `Belirlenen renk rolü üzerinize verildi.`, ephemeral: true })
                  }
                } else if (menu === "valantines") {
                    let relationship = new Map([
                      ["couple", data.lovers],
                      ["single", data.LGBT]
                    ])
                    let role = relationship.get(interaction.values[0])
                    let roles = [data.lovers, data.LGBT]
                 if (role) {
                      if (roles.some(m => member.roles.cache.has(m))) {
                        await member.roles.remove(roles)
                      }
                      await member.roles.add(role)
                    }
                    interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                  } else if (menu === "games") {
                    let GameMap = new Map([
                      ["lol", data.lol],
                      ["csgo", data.csgo],
                      ["minecraft", data.minecraft],
                      ["valorant", data.valorant],
                      ["fortnite", data.fortnite],
                      ["gta5", data.gta5],
                      ["pubg", data.pubg],
                      ["wildrift", data.wildrift],
                      ["fivem", data.fivem],
                      ["mlbb", data.mobilelegends],
                    ])

                    let roles = [data.lol,data.csgo,data.minecraft, data.valorant, data.fortnite,data.gta5, data.pubg,data.wildrift, data.fivem, data.mobilelegends]
                    var role = []
                    for (let index = 0; index < interaction.values.length; index++) {
                      let ids = interaction.values[index]
                      let den = GameMap.get(ids)
                      role.push(den)
                    }
                    if (!interaction.values.length) {
                      await member.roles.remove(roles)
                    } else {
                      await member.roles.remove(roles)
                      await member.roles.add(role)
                    }
                    interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })

                                        }
                                      }
            )
                

                
        

            client.on("interactionCreate", async (i) => { 
              let menu = i.customId
              const member = await client.guilds.cache.get(sistem.SUNUCU.GUILD).members.fetch(i.member.user.id)
              if (!member) return;
             if(menu == "KONTROLPANEL") {
              let info = [
                {header: "Yükseltim Nedir? Nasıl Yetki Atlanır?", description: `
Sunucumuz da yetki atlamak için hali hazırda Upstaff (**Terfi**) dediğimiz yani diğer adıyla Yükseltim (\` ${global.sistem.botSettings.Prefixs[0]}yetkim \`) sistemi bulunmaktadır.
Ayrıca sizin rolünüze uygun haftalık görevleriniz var ise \` ${global.sistem.botSettings.Prefixs[0]}görev \` komutu ile görevlerinizi görüntüleyebilirsiniz. Sistem üzerinden ayrıca ${ayarlar.serverName ? ayarlar.serverName : i.guild.name} Parası elde edebilirsiniz.
    
Seste kaldıkça, mesaj attıkça, taglı görevi yaptıkça, davet görevi yaptıkça, kayıt yaptıkça sistem üzerinden belirli bir puan elde ederek otomatik olarak adil bir şekilde yetki atlamanıza yarar fakat Sesteyseniz kulaklığınız kapalı ise hiç bir şekilde puan alamazsınız veya da ses süreniz devam etmez ayrıca mikrofonunuz kapalıysa sizi AFK algılayıp örnek olarak 15 puan vericekse o puan 3/1 olarak bölünecektir. AFK odasında AFK olarak algılanırsanız 3/1 değil 3/2 olarak puan belirlenecektir. 2 Hafta içerisinde hiç bir etkinliğiniz olmaz ise otomatik olarak yetkiniz çekilir ayrıca Toplantı zamanları Mazeretli değilseniz 2 toplantıya üst üste katılmazsanız sistemsel olarak yetkiniz tekrardan çekilir.`
    , image: "https://cdn.discordapp.com/attachments/921409976336007218/942299463253372988/unknown.png", category: "yukseltim"},
                {header: "Nasıl Kayıt Yapılır?", description: `\` 1. Adım \` Sunucumuz da doğru bir kayıt için öncelikle teyit kanalarında bulunmalısın ve gelen kayıtsız bir üyeye direk isim yaş sormak yerine onunla sohbet ederek ismini ve yaşını sormalısın.
    
\` 2. Adım \` Kayıt yapmak için \`.kayıt <@münür/ID> <İsim> <Yaş>\` komutu ile kayıt işlemine başlarsın orda konuştuğun üyenin cinsiyetini belirleyerek kayıt işlemini gerçekleştirirsin ve **5 Saniye** sonra Sohbet odalarına otomatik olarak üyeyi taşıma işlemi yapar.
                
\` ❯ \` Yükseltim sisteminde ki puanınıza (\` +${statConfig.points.record} Puan Etkisi \`) puan olarak ekler fakat kayıt ettiğiniz kişi kayıtsıza atılırsa veya sunucudan çıkarsa size verilen puan geri düşer.
\` ❯ \` Ayrıca kayıt ettiğiniz üye sunucumuzda yetkili olur ise onun kayıt ettiği, taglıya çektiği, davet ettiği ve yetkili başlattığı kadar sizde bonus alırsınız.
    
**Örnek Görsel**`, image: "https://cdn.discordapp.com/attachments/919637452648493116/942304484120461382/unknown.png", category: "kayıt"},
                {header: "Nasıl Davet Yapılır?", description: `\` DAVET (Invite) \` Sunucumuza bir üye davet etmek için öncelikle davet bağlantısı almanız gerekmekte, aldığınız davet bağlantısını davet etmek istediğiniz üyeye atarak sunucuda davet işlemini gerçekleştirirsiniz veya da sunucumuzun resmine basılı tutarak İnsanları Davet Et buttonunu kullanarak, arkadaşlarını davet edebilirsin ve davet ettiğin üye sayısını öğrenmek için \`${global.sistem.botSettings.Prefixs[0]}invite\` komutunu kullanabilirsin.
    
\` ❯ \` Her bir davet size yükseltim sisteminde \` +${statConfig.points.invite} Puan Etkisi \` ekleyecektir. Davet ettiğiniz üye sunucudan ayrılırsa davetinizden üye miktarı düşer ve yükseltim sisteminden kazandığınız (\` -${statConfig.points.invite} Puan Etkisi \`) olarak sisteminize yansır.
    
**Örnek Görsel**`, image: "https://cdn.discordapp.com/attachments/919637452648493116/942305761902592010/unknown.png", category: "davet"},
                {header: "Kaç Puan Kazanıyorum?", description: `Sunucumuz da yükseltim sisteminden kaç puan aldığınızı ve nereler de kaç puan aldığınızı aşağıda tabloda belirtilmektedir. 
Aşağı da verilen görsel de ise hangi işlemlerde toplam kaç puan kazandığınızı veya da hangi kategori ve kanalda kaç puan aldığınızı gösteren tablolar bulunmaktadır.
    
\` ❯ \` **Puan Bilgileri Ve Puanlamalar**
${ayarlar.type ? `\` • \` **Taglı**: \` +${statConfig.points.tagged} Puan Etkisi \`\n` : ``}\` • \` **Davet**: \` +${statConfig.points.invite} Puan Etkisi \`
\` • \` **Kayıt**: \` +${statConfig.points.record} Puan Etkisi \`
\` • \` **Mesaj**: \` +${statConfig.points.message} Puan Etkisi \`
Gereksiz kısa ve random mesajlar algılanarak puan verilmesini engeller ve ceza etkisi olarak size geri yaptırım uygular.
\` • \` **Etkinlik Katılımı**: \`Saatlik +${3600*Number(ayarlar.etkinlikPuan ? ayarlar.etkinlikPuan : 0.01)} Puan Etkisi\`
${ayarlar.etkinlikIzinliler ? `\` • \` Sadece etkinlik kategorileri ve kanallarında bu puan elde edilmektedir, kanal ve kategoriler şunlardır: \`${ayarlar.etkinlikIzinliler.filter(x => i.guild.channels.cache.get(x)).map(x => i.guild.channels.cache.get(x).name).join(", ")}\`` : ""}

\` ❯ \` **Ses Puanlama Bilgisi**
Öne çıkan kategoriler ve kanallar şunlardır: \`${statConfig.fullPointChannels.filter(x => i.guild.channels.cache.get(x)).map(x => i.guild.channels.cache.get(x).name).join(", ")}\`      
Ortalama olarak bu kategori ve kanallardan \` +%${statConfig.points.voice-2.4} \` puan kazanırsınız. Bu puan sizin afk, kulaklık ve mikrofon kapatmanız halinde yaptırımla beraber değişmektedir.
Yukarda belirtilen kategori ve __kanallar dışında ki diğer kanallardan__ ortalama olarak \` +%${statConfig.points.halfVoice} \` puan kazanırsınız. Bu puan sizin afk, kulaklık ve mikrofon kapatmanız halinde yaptırımla beraber değişmektedir.
    
**Puan Detay Bilgisi Görseli**`, image: "https://cdn.discordapp.com/attachments/919637452648493116/942310714989772841/unknown.png" ,category: "kaçpuan"}
    
            ] 
            if(ayarlar.type) info.push({header: "Taglı Nasıl Kullanılır?", description: `\` TAGLI (Tagged) \` Sunucumuz da davet ettiğin, kayıt ettiğin ve arkadaşlarını taga davet edebilirsin ettiğin arkadaşların ile puan kazanmak istemez misin? Ozaman \`${global.sistem.botSettings.Prefixs[0]}tag <@münür/ID>\` komutu ile taglı daveti gönderebilirsin ama ondan önce kesinlikle isminin ister başına ister sonuna \` ${ayarlar.tag} \` sembolünü koymalıdır ayrıca taga davet ettiğin üyeleri \`${global.sistem.botSettings.Prefixs[0]}taglılarım\` komutu ile görüntüleyebilirsin.
    
\` ❯ \` Taga davet ettiğiniz üye başına (\` +${statConfig.points.tagged} Puan Etkisi \`) eklenir ve tagı saldığında size verilen puan otomatik olarak geri düşer.
                
**Örnek Görsel**`, image: "https://cdn.discordapp.com/attachments/919637452648493116/942309234245263391/unknown.png", category: "taglı"})
              
              let kategori = i.values
               if(!kategori) return;
               let getInfo = info.find(x => i.values == x.category) 
               if(getInfo) {
                   let embed = new EmbedBuilder().setTitle(getInfo.header).setDescription(getInfo.description)
                   if(getInfo.image) embed.setColor("Random").setImage(getInfo.image)
                   i.reply({embeds: [embed], ephemeral: true})
               }
             }
          })
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    
        const embed = new EmbedBuilder()
        let Database = await GUILD_SETTINGS.findOne({guildID: message.guild.id})
        const data = Database.Ayarlar.Buttons
        let secim = args[0];
        let ozelliklerListe = Object.keys(data || {}).filter(a => özellikler.find(v => v.name == a))

        

             

        
        let Rowck = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
          .setCustomId("qwewqwqwq")
          .setPlaceholder(`🎄 Options`)
          .setOptions(
              
              {label: "Rol Alma", emoji:"1055524311533899776", description: "Sunucuda Etkinlik Çekiliş Rollerini Almaya Yarayan Paneli Kurar.", value: "etkinlikçekilişkur"},
              {label: "Rol Kurulumu", emoji:"1081915419713081434", description: "Sunucudaki Gerekli Olan Rolleri/Sistemleri Kurar.", value: "otomatikkur"},
              {label: "Kullanıcı Paneli", emoji:"1081916599155576832", description: "Sunucudaki Üyelerin Yardım Alması İçin Gerekli Sistemi Kurar.", value: "kpaneli"},
              {label: "Kullanıcı Paneli 2", emoji:"1081916599155576832", description: "Sunucudaki Üyelerin Yardım Alması İçin Gerekli Sistemi Kurar.", value: "kullanicip2"},
              {label: "Doğrulama Paneli", emoji: "1085163658117656617", description: "Sunucuya Yeni Giriş Yapan Üyelerin Bot Olmadığını Doğrulaması için Panel", value:"dogrulamapanel"},
              {label: "Ceza Paneli", emoji:"1081917543708622878", description: "Sunucudaki Üyelerin Cezalarını/Ceza Puanlarını Öğrenmeye Yarayan Sistemi Kurar.", value: "cezapanelikur"},
              {label: "Yetkili Paneli", emoji:"1081919671307092009", description: "Sunucudaki Yetkililerin İşlemleri Hakkında Bilgi Verem Sistemi Kurar.", value: "yetkiliPaneli"},
              {label: "Yönetim Paneli", emoji:"1081920722689085500", description: "Sunucudaki Yönetim Kadrosunda Bulunan Kişilerin İşlemleri Hakkında Bilgi Verem Sistemi Kurar.", value: "yöneticiPaneli"},
              {label: "Yakın Arkadaşlık", emoji:"1081916040021291038", description: "Sunucunun Dost Serverinin Üyelerinin Rol Almasına Yarayan Sistemdir.", value: "kisayol"},
              )

        )


             

        
        const sywss = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
          .setCustomId("qwewqwq")
          .setPlaceholder("🎄 Roles")
          .setOptions(
          {label: "İlişki Rolleri", emoji:"1075747163302285413", description: "Sunucudaki Üyelerin İlişki Rollerini Alması İçin Gerek İlişki Rollerini Kurar.", value: "otomatikilişki"},
          {label: "Renk Rolleri", emoji:"1075747163302285413", description: "Sunucudaki Üyelerin Renk Rollerini Alması İçin Gerekli Renk Rollerini Kurar.", value: "otomatikrenk"},
          {label: "Oyun Rolleri", emoji:"1075747163302285413", description: "Sunucudaki Üyelerin Oyun Rollerini Alması İçin Gerekli Oyun Rollerini Kurar", value: "otomatikoyun"},
          {label: "Aylık Üye Rolleri", emoji:"1075747163302285413", description: "Sunucudaki Üyelerin Serverde Geçirdiği Zamana Göre Rollerini Verir", value: "otomatikaylikuye"},
          {label: "Ses Rozet Rolleri",  emoji:"1075747163302285413", description:  "Kullanıcıların Seste Durduğu Kadar Üzerilerine Rol Eklenir.", value: "otomatiksesrozet"},

        )

        
        )   
            
        if (!secim || !özellikler.some(ozellik => ozellik.name.toLowerCase() == secim.toLowerCase())) {
            let emboo = embed.setColor("Random").setDescription(`Merhaba **${message.member.user.tag}** (${message.member}) ${ayarlar.serverName ? ayarlar.serverName : message.guild.name } sunucusuna ait rol menü, düğme ve liste menü sistemi ayarları bu komut ile yapılmaktadır. Bu komut ile isteğe bağlı anlık güncelleme işlemini yapabilirsiniz.
`)
            return message.channel.send({components: [Rowck],embeds: [emboo]}).then(async (x) => {
                const filter = i =>  i.user.id === message.member.id;

                const collector = await x.createMessageComponentCollector({ filter: filter, time: 30000 });
           
                collector.on('collect', async i => {

                  if(i.values[0]  == "özelmenü") {
                    let kom = client.commands.find(x => x.Isim == "menü")
                    if(kom) kom.onRequest(client, message, args)
                    await x.delete().catch(err => {})
                    await i.deferUpdate().catch(err => {})
                  }

                  if(i.values[0] === 'dogrulamapanel') {  
                    x.delete().catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "confirmation")
                    kom.onRequest(client, message, args)
                  }
                  if(i.values[0] == "otomatiksesrozet") {
                    if(ayarlar.statRozet && ayarlar.statRozetOne && message.guild.roles.cache.get(roller.statRozetOne)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla otomatik ses rozet rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let aylıkSistem = [
                      {isim: "Bronz 🥉", renk: "#ca9501",  sheet: "statRozetOne"},
                      {isim: "Gümüş 🥈", renk: "#7c818d",  sheet: "statRozetTwo"},
                      {isim: "Altın 🥇", renk: "#efff5d",  sheet: "statRozetThree"},
                      {isim: "Elmas ✨", renk: "#30b7c5", sheet: "statRozetFour"},
                      {isim: "Şampiyon 🏆", renk: "#fff02d",  sheet: "statRozetFive"},
                    ]
                    aylıkSistem.forEach(async (data) => {
                        let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                        if(rol) {
                          await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                        } else {
                          const burçRolü = await message.guild.roles.create({
                            name: data.isim,
                            color: data.renk,
                            reason: "Otomatik Ses Rozet Sistemi!"
                          }).then(async (rol) => {
                            await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                          })
                        }
                    })

                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.statRozet`]: true}}, {upsert: true}).catch(e => console.log(e))
                  }
                  if(i.values[0] == "otomatikaylikuye") {
                    if(ayarlar.aylikuye && ayarlar.birAy && message.guild.roles.cache.get(ayarlar.birAy)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla otomatik aylık üye rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let aylıkSistem = [
                      {isim: "1 Aylık Üye", renk: "#96963d", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996913946747470004/image-removebg-preview_1.png", sheet: "birAy"},
                      {isim: "3 Aylık Üye", renk: "#aaaa54", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914106298810429/image-removebg-preview_2.png", sheet: "ucAy"},
                      {isim: "6 Aylık Üye", renk: "#d1d16d", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914232090169534/image-removebg-preview_3.png", sheet: "altiAy"},
                      {isim: "9 Aylık Üye", renk: "#f8f825", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914374918803486/image-removebg-preview_4.png", sheet: "dokuzAy"},
                      {isim: "+1 Yıllık Üye", renk: "#1ad8d3", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914881225830410/image-removebg-preview_5.png", sheet: "birYil"},
                    ]
                    
                    aylıkSistem.forEach(async (data) => {
                      let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                      if(rol) {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      } else { 
                            const burçRolü = await message.guild.roles.create({
                              name: data.isim,
                              color: data.renk,
                            //  icon: data.icon,
                              reason: "Otomatik Aylık Üyelik Sistemi!"
                            }).then(async (rol) => {
                      await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      })
                      }
                    })
                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.aylikuye`]: true}}, {upsert: true}).catch(e => console.log(e))
                  }
                  
                  if(i.values[0] == "otomatikilişki") {
                    if(ayarlar.Buttons && ayarlar.Buttons.lovers && message.guild.roles.cache.get(ayarlar.Buttons.lovers)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla otomatik ilişki & etkinlik rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let iliskiSistemi = [
                      {isim: "♥️ Lovers", renk: "#f1479a", sheet: "lovers"},
                      {isim: "🏳️‍🌈 LGBT", renk: "#1b0404", sheet: "lgbt"},

                    ]
                    iliskiSistemi.forEach(async (data) => {
                      let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                      if(rol) {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                        if(data.sheetcik)  await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheetcik}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      } else { 

                     const iliskiRolü = await message.guild.roles.create({
                            name: data.isim,
                            color: data.renk,
                            reason: "Otomatik İlişki & Etkinlik Kurulum Sistemi!"
                          }).then(async (rol) => {
                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                    if(data.sheetcik)  await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheetcik}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                  })
                }
                    })
                  }





                  if(i.values[0]  == "kullanicip2") {
                    await x.delete().catch(err => {}),await i.deferUpdate().catch(err => {}).catch(err => {}); 
                    
                    client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\` Sunucusu içerisinde yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli düğmelere tıklamanız yeterli olucaktır!\n\n**I**: Sunucuya giriş tarihinizi öğrenin.\n**II**: Üstünüzde bulunan rollerin listesini alın.\n**III**: Hesabınızın açılış tarihini öğrenin.\n\n**IV**: Davet bilgilerinizi öğrenin.\n**V**: Ceza puanını görüntüle.\n**VI**: Sunucunun anlık aktif listesini görüntüleyin.\n\n**VII**: Sunucudaki eski isim bilgilerinizi görüntüleyin.\n**VIII**: Sunucudaki toplam mesaj sayınızı öğrenin.\n**IX**: Sunucu ses kanallarında toplam geçirdiğiniz süreyi öğrenin.\n`,
                    "components":[{
                    "type":1,"components":[
                                             {"type":2,"style":1,"custom_id":"I","label":"I"},
                                             {"type":2,"style":1,"custom_id":"II","label":"II"},
                                             {"type":2,"style":1,"custom_id":"III","label":"III"},
                           ]}, {  "type":1,"components":[
                                             {"type":2,"style":1,"custom_id":"IV","label":"IV"},
                                             {"type":2,"style":1,"custom_id":"V","label":"V"},
                                             {"type":2,"style":1,"custom_id":"VI","label":"VI"}
                           ]}, {  "type":1,"components":[
                                             {"type":2,"style":1,"custom_id":"VII","label":"VII"},
                                             {"type":2,"style":1,"custom_id":"VIII","label":"VIII"},
                                             {"type":2,"style":1,"custom_id":"IX","label":"IX"}
                           ]}
                    
                    
                    ]}
                    
                     })
                  }
                  
                  if(i.values[0] == "otomatikoyun") {
                    if(ayarlar.Buttons && ayarlar.Buttons.csgo && message.guild.roles.cache.get(ayarlar.Buttons.csgo)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla otomatik oyun rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let oyunSistemi = [
                      {isim: "League Of Legends", renk: "#ffffff", sheet: "lol"},
                      {isim: "Counter-Strike: Global Offensive", renk: "#ffffff", sheet: "csgo"},
                      {isim: "Minecraft", renk: "#ffffff", sheet: "minecraft"},
                      {isim: "Valorant", renk: "#ffffff", sheet: "valorant"},
                      {isim: "Fortnite", renk: "#ffffff", sheet: "fortnite"},
                      {isim: "Grand Theft Auto V", renk: "#ffffff", sheet: "gta5"},
                      {isim: "PUBG", renk: "#ffffff", sheet: "pubg"},
                      {isim: "Wild Rift", renk: "#ffffff", sheet: "wildrift"},
                      {isim: "Mobile Legends", renk: "#ffffff", sheet: "mobilelegends"},
                      {isim: "FiveM", renk: "#ffffff", sheet: "fivem"},
                    ]
                    oyunSistemi.forEach(async (data) => {
                      let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                      if(rol) {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      } else { 
                     const oyunRolü = await message.guild.roles.create({
                            name: data.isim,
                            color: data.renk,
                            reason: "Otomatik Oyun Kurulum Sistemi!"
                          }).then(async (rol) => {
                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                    })
                  }
                    })
                  }
                  if(i.values[0] == "otomatikrenk") {
                    if(ayarlar.Buttons && ayarlar.Buttons.kırmızı && message.guild.roles.cache.get(ayarlar.Buttons.kırmızı)) return await i.reply({content: `Bu İşlem Daha Önce Gerçekleştirildiği İçin İşlem İptal Edildi.`, ephemeral: true});
                    await i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla otomatik renk rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let renkSistemi = [
                        {isim: "Kırmızı", renk: "#e43200", sheet: "kırmızı"},
                        {isim: "Turuncu", renk: "#e4b400", sheet: "turuncu"},
                        {isim: "Mavi", renk: "#0055e4", sheet: "mavi"},
                        {isim: "Mor", renk: "#7c00f8", sheet: "mor"},
                        {isim: "Pembe", renk: "#f866c1", sheet: "pembe"},
                        {isim: "Beyaz", renk: "#e9e4e7", sheet: "beyaz"},
                        {isim: "Yeşil", renk: "#0fc708", sheet: "yeşil"},
                        {isim: "Sarı", renk: "#d8e244", sheet: "sarı"},
                        {isim: "Siyah", renk: "#181817", sheet: "siyah"}
                      ]
                      renkSistemi.forEach(async (data) => {
                        let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                        if(rol) {
                          await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                        } else { 
                       const renkRolü = await message.guild.roles.create({
                              name: data.isim,
                              color: data.renk,
                              reason: "Otomatik Renk Kurulum Sistemi!"
                            }).then(async (rol) => {
                      await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      })
                    }
                      })
                  }
                  
                      

                  if(i.values[0]  == "kpaneli") {
                    await x.delete().catch(err => {}),await i.deferUpdate().catch(err => {}).catch(err => {}); 
                    let Rowuc = new ActionRowBuilder().addComponents(
                      new ButtonBuilder()
                      .setCustomId("basvurucuk")
                      .setLabel("Yetkili Başvuru")
                      .setStyle(ButtonStyle.Primary),
            


                      new ButtonBuilder()
                      .setCustomId("istekönericik")
                      .setLabel("İstek & Öneri")
                      .setStyle(ButtonStyle.Primary)
,
                      new ButtonBuilder()
                      .setCustomId("soruniletcik")
                      .setLabel("Sorun Bildirimi")
                      .setStyle(ButtonStyle.Primary),
                    )
               



              
                      
                    
                  
                    message.channel.send({content: `Talep oluşturmak için aşağıdaki butonları kullanabilirsiniz.`, components: [Rowuc]})

                  }
                  if(i.values[0]  == "yöneticiPaneli") {
                    let konser = client.channels.cache.find(x => x.type == ChannelType.GuildCategory && x.name.includes("Konser") || x.name.includes("KONSER"))
                    let etkınlik = client.channels.cache.find(x => x.type == ChannelType.GuildCategory && x.name.includes("Etkinlik") || x.name.includes("ETKİNLİK") || x.name.includes("Etkinlık") || x.name.includes("ETKINLIK"))
                    let vkKategori = etkınlik ? etkınlik.id : undefined
                    let dcKategori = konser ? konser.id : undefined
                   
                    let Row = new ActionRowBuilder().addComponents(
                      new StringSelectMenuBuilder()
                      .setCustomId("münüryöneticipaneli")
                      .setPlaceholder("Yönetici işlemleri şunlardır...")
                      .setOptions(
                        {label: "Sunucu Güncelle", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde herhangi bir değişiklik yapabilirsiniz.", value: "sunucuduzenle"},
                        {label: "Rolsüz Ver", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde rolü bulunmayanlara kayıtsız vermeyi sağlar.", value: "rolsüzver"},
                        {label: "Özel Karakter Temizle", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde isminde ünlem, sembol vs. bulunanları temizler.",value: "özelkarakter"},
                        {label: "Public Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncpublic"},
                        {label: "Streamer Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncstreamer"},
                        {label: "Teyit Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncregister"},
                        {label: "Sorun Çözme Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncsç"},
                        {label: "Diğer Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncother"},
                        {label: "Genel Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncguild"},
                    )
                    )
                    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
                    let RowTwo = new ActionRowBuilder().addComponents(
                      new ButtonBuilder()
                      .setLabel(`Etkinlik Odası (${i.guild.kanalBul(vkKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? "Gösterme" : "Göster"})`)
                      .setCustomId("vkgoster")
                      .setStyle(i.guild.kanalBul(vkKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? ButtonStyle.Secondary : ButtonStyle.Primary),
                      new ButtonBuilder()
                      .setLabel(`Konser Odası (${i.guild.kanalBul(dcKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? "Gösterme" : "Göster"})`)
                      .setCustomId("konsergoster")
                      .setStyle(i.guild.kanalBul(dcKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? ButtonStyle.Secondary : ButtonStyle.Primary),
                    )
                
                    message.channel.send({components: [Row,RowTwo], content: `**Merhaba!** ${ayarlar.serverName} ${message.guild.emojiGöster(emojiler.serverTag)}\nAşağıda bulunan menü aracılığı ile "${ayarlar.serverName}" sunucusunun üzerinde değişiklilik ve kontrolleri sağlayabilirsin, bu sizin için kolaylık sağlar.`})
                    x.delete().catch(err => {})
                    await i.deferUpdate().catch(err => {}),await message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                  }
                  if(i.values[0]  == "yetkiliPaneli") {
                    let opt = [
                      {label: "Uyar",emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi belirtilen sebepte uyarabilirsin.", value: "uyari"},
                      {label: "Sustur",emoji: {id: "1042946131077902417"},  description: "Belirtilen üyeyi seste ve metin kanallarında susturursun.", value: "gg3"},
                      {label: "Reklam", emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi reklam yapmaktan cezalandırırsın.", value: "reklam"},
                      {label: "Cezalandır", emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi karantinaya gönderirsin.", value: "gg"},
                      {label: "Underworld", emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi Underworld'e gönderirsin.", value: "underworld"},
                      {label: "Ceza Bilgileri",emoji: {id: "1042946131077902417"}, description: "Belirtilen üyenin son 10 cezasını listelersiniz.", value: "cezakontrol"},
                      {label: "Ceza Kontrolü",emoji: {id: "1042946131077902417"}, description: "Belirtilen ceza numarası ile ceza bilgisini görüntülersiniz.", value: "cezabilgisi"},
                      {label: "Yükseltim Nedir? Nasıl Yetki Atlanır?", emoji: {id: "1042946131077902417"}, value: "yukseltim", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                      {label: "Puanlama Bilgisi Nedir?", emoji: {id: "1042946131077902417"},value: "kaçpuan", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                      {label: "Kayıt Nasıl Yapılır?", emoji: {id: "1042946131077902417"},value: "kayıt", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                      {label: "Davet Nasıl Yapılır?", emoji: {id: "1042946131077902417"},value: "davet", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                    ]
                    if(ayarlar.type) opt.push({label: "Taglı Nasıl Kullanılır?", emoji: {id: "1042946131077902417"},value: "taglı", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"})
                    let Row = new ActionRowBuilder().addComponents(
                      new StringSelectMenuBuilder()
                      .setCustomId("KONTROLPANEL")
                      .setPlaceholder("Yetkili işlemleri şunlardır...")
                      .setOptions(
                        [
                          ...opt,
                          {label: "Yetki Detayı",emoji: {id: "1042946131077902417"}, description: "Belirtilen üyenin yetkili geçmişini görüntüler.", value: "ygeçmiş"},
                          {label: "İstifa",emoji: {id: "1042946131077902417"}, description: "Basıldığı zaman üzerinizdeki tüm yetkileri bırakırsınız.", value: "istifa"}
                        ]
                      )
                    )
                
                    message.channel.send({components: [Row], embeds: [], content: `**Merhaba!** ${ayarlar.serverName} ${message.guild.emojiGöster(emojiler.serverTag)}\nAşağı listede yetkili moderasyon işlemleri belirtilmiştir, uygulamak istediğiniz moderasyon işlemini aşağıda ki menüden seçiniz.`})
                    x.delete().catch(err => {})
                    await i.deferUpdate().catch(err => {}),await message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                  }
                    if(i.values[0]  === "cezapanelikur") {
                      await x.delete().catch(err => {}),await i.deferUpdate().catch(err => {}).catch(err => {}); 
                        client.api.channels(message.channel.id).messages.post({ data: {"content":`Aşağıdaki seçeneklerden bilgisini almak istediğiniz butona tıklayıp öğrenebilirsiniz.`,"components":[{"type":1,"components":[
                            {"type":2,"style":2,"custom_id":"cezaListesi","label":"Cezalarım"},
                            {"type":2,"style":2,"custom_id":"cezaPuanim","label":"Ceza Puanım"},
                            {"type":2,"style":2,"custom_id":"lastPunitives","label":"Aktif Cezalarım"},
                         
                            ]}]} })
                            
                            await message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                      
                    }
                    if(i.values[0]  == "otomatikkur") {
                      await x.edit({content: null, components: [ sywss ], embeds: [new EmbedBuilder().setDescription(`
Aşağıdaki Menüler Sayesinde Sunucu İçerisinde Rol Alma'daki Rolleri Kurabilirsiniz`)]}), 
                      await i.deferUpdate().catch(err => {}).catch(err => {});
                    }
                    
                    if(i.values[0]  === "etkinlikçekilişkur") {
                      await x.delete().catch(err => {}),await i.deferUpdate().catch(err => {}).catch(err => {});
                   if(ayarlar.Buttons && ayarlar.Buttons.lovers && message.guild.roles.cache.get(ayarlar.Buttons.lovers)) client.api.channels(message.channel.id).messages.post({ data: {"content":`__İlişki Durumu__`,"components":[{"type": 1,"components": [
                        {"type":2,"style":1,"custom_id":"sevimvaroc","label":"Sevgilim Var", "emoji": { "name": "💕" }, },
                        {"type":2,"style":1,"custom_id":"gayoc","label":"LGBT", "emoji": {"name": "🏳️‍🌈" }, },
                      ]}]} })
                                                
                                             
                     
                         
                          if(ayarlar.Buttons && ayarlar.Buttons.mavi && message.guild.roles.cache.get(ayarlar.Buttons.mavi)) client.api.channels(message.channel.id).messages.post({
                          data: {
                              "content": `Renk Rollerini Almak İçin Menüden rolünüzü alınız.`,
                              "components": [{
                                  "type": 1, "components": [{
                                      "type": 3, "custom_id": "renks", "options": [
                                          { "label": "Kırmızı", "value": "kirmizi", "emoji": { "name": "🍒" }, },
                                          { "label": "Turuncu", "value": "turuncu", "emoji": {  "name": "🥕" }, },
                                          { "label": "Mavi", "value": "mavi", "emoji": { "name": "🌊" }, },
                                          { "label": "Mor", "value": "mor", "emoji": {  "name": "🍇" }, },
                                          { "label": "Pembe", "value": "pembe", "emoji": { "name": "🌸" }, },
                                          { "label": "Yeşil", "value": "yeşil", "emoji": {  "name": "🥝" }, },
                                          { "label": "Sarı", "value": "sarı", "emoji": {  "name": "🍋" }, },
                                          { "label": "Siyah", "value": "siyah", "emoji": { "name": "🕷️" }, },
                                          { "label": "Beyaz", "value": "beyaz", "emoji": { "name": "🥥" }, },

                                          {
                                              "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "922058306263072860", "name": "monarch_trash" },
                                          }], "placeholder": "Rol Seç!", "min_values": 1, "max_values": 1
                                  }],
                              }
                              ]
                          }
                      })

                    if(i.customId == "yardimmenusu") {
                      if(i.values == "talent") {
                           cartel.edit({embeds: [new EmbedBuilder().setDescription(`${Data ?  Data.talentPerms ? Data.talentPerms.map(x => `\`${sistem.botSettings.Prefixs[0] + x.Commands + " <@cartel/ID>"}\``).join("\n") : '' : ''}`)]})
                      } else {
                           cartel.edit({embeds: [new EmbedBuilder().setDescription(`${client.commands.filter(x => x.Extend != false && x.Kategori == `${i.values}` && (ayarlar.dugmeliKayit ? x.Isim != "erkek" : true)).map(x => `\`${sistem.botSettings.Prefixs[0] + (ayarlar.dugmeliKayit ? x.Kullanim.replace("kadın", "kayıt") : x.Kullanim)}\``).join("\n")}`)]})
                      }
                      i.deferUpdate()
                   }
               
                      
                      
                  
                   
                            await message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {}).catch(err => {})
                    }

                    
                  });
                
                collector.on('end', collected => { 
                    x.delete().catch(err => {})
                 });
            })
        }
        let ozellik = özellikler.find(o => o.name.toLowerCase() === secim.toLowerCase());
        if (ozellik.type) {
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join(' '));
            if(!rol) return message.channel.send({embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.no_cartel)} **${başHarfBüyült(ozellik.name)}** isimli seçenek ayarını hangi rol yapmamı istiyorsun?`)]}).then(x => setTimeout(() => {
              x.delete().catch(err => {});
          }, 7500));
            await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${ozellik.name}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
             message.channel.send({embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla **${başHarfBüyült(ozellik.name)}** isimli seçenek ayar rolü ${rol} olarak tanımladı.`)]})
            return message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})  
        }
    }
};

function başHarfBüyült(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }





 
                   
            
module.exports.config = {
  name: "اوامر",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "S H A D O W",
  description: "اوامر البوت",
  usages: "الاوامر",
  usePrefix: true,
    commandCategory: "الــــجـــروب", 
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  let num = parseInt(event.body.split(" ")[0].trim());
  (handleReply.bonus) ? num -= handleReply.bonus : num;
  let msg = "";
  let data = handleReply.content;
  let check = false;
  if (isNaN(num)) msg = "رد علي الرساله برقم العنوان لاظهار الاوامر";
  else if (num > data.length || num <= 0) msg = "ياغبي الرقم الي اخترته مش في المنيو اصلا 😂😂";
  else {
    const { commands } = global.client;
    let dataAfter = data[num-=1];
    if (handleReply.type == "cmd_info") {
      let command_config = commands.get(dataAfter).config;
      msg += ` 『  ${command_config.category.toUpperCase()}   』   \n`;
      msg += `\n⌯ اســم الــامــر: ${dataAfter}`;
      msg += `\n⌯ الــوصــف: ${command_config.description}`;
      msg += `\n⌯ الــاســتــخــدام: ${(command_config.usages) ? command_config.usages : ""}`;
      msg += `\n⌯ الــانـتـظـار: ${command_config.cooldowns || 5} ثانيه`;
      msg += `\n⌯ الــمـستـخـدمـيـن : ${(command_config.hasPermssion == 0) ? "مستخدم" : (command_config.hasPermssion == 1) ? "Group administrator" : "Bot admin"}`;
      msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`
      msg += `\n\n» تــابــعــنــي هــنـــا : https://solo.to/shadowsensei`;
    } else {
      check = true;
      let count = 0;
      msg += `» ${dataAfter.group.toUpperCase()} «\n`;

      dataAfter.cmds.forEach(item => {
        msg += `\n ${count+=1}. » ${item}: ${commands.get(item).config.description}`;
      })
      msg += "\n━━━━━━༺۵༻━━━━━━\n\tمــيــكــو  شــان\n━━━━━━༺۵༻━━━━━━";
    }
  }
  const axios = require('axios');
  const fs = require('fs-extra');
  const img = ["https://i.postimg.cc/VNsVqZXz/0c9f58ea240b118063ed295caacadc07.jpg", "https://i.postimg.cc/fT4q2RY2/1f1cbd1177ea5a87db37de23dee505c7.jpg", "https://i.postimg.cc/QMMf99rt/54e2578ba167064a984125d5f6af5366.jpg", "https://i.postimg.cc/yYznhrz2/8b47af4e8a9259241cd342ec361b05db.jpg", "https://i.postimg.cc/rpz9yBSR/6d8be090d1b092af424ecf8da22a2c4a.jpg", "https://i.postimg.cc/mDHNC7pb/2f0a6e497e09da8945083d8047b31cbc.jpg", "https://i.postimg.cc/y88mnMpp/3921823d2438e6f9c92399178f6689ae.jpg", "https://i.postimg.cc/x8QHmhbR/9c592e59ef22bd17f53a2b2a5fd25510.jpg", "https://i.postimg.cc/jdsPSVTq/f5f78f7661d94f279f8fe23cee0d93a9.jpg", "https://i.postimg.cc/Pr2ZL6fW/28ffe43847184b1d7df79a5a84ede996.jpg",
"https://i.postimg.cc/kgHbsBbD/28ce8809d07af743eb5c0c24746a4fa3.jpg","https://i.postimg.cc/8Crr0NR4/b43f246a5c02f2943a23e80fa0d49358.jpg"]
  var path = __dirname + "/cache/menu.jpg"
  var rdimg = img[Math.floor(Math.random() * img.length)]; 
  const imgP = []
  let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
  fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
  imgP.push(fs.createReadStream(path))
  var msgg = {body: msg, attachment: imgP}
  api.unsendMessage(handleReply.messageID);
  return api.sendMessage(msgg, event.threadID, (error, info) => {
    if (error) console.log(error);
    if (check) {
      global.client.handleReply.push({
        type: "cmd_info",
        name: this.config.name,
        messageID: info.messageID,
        content: data[num].cmds
      })
    }
  }, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const axios = require('axios');
  const fs = require('fs-extra');
  const imgP = []
  const img = ["https://i.postimg.cc/VNsVqZXz/0c9f58ea240b118063ed295caacadc07.jpg", "https://i.postimg.cc/fT4q2RY2/1f1cbd1177ea5a87db37de23dee505c7.jpg", "https://i.postimg.cc/QMMf99rt/54e2578ba167064a984125d5f6af5366.jpg", "https://i.postimg.cc/yYznhrz2/8b47af4e8a9259241cd342ec361b05db.jpg", "https://i.postimg.cc/rpz9yBSR/6d8be090d1b092af424ecf8da22a2c4a.jpg", "https://i.postimg.cc/mDHNC7pb/2f0a6e497e09da8945083d8047b31cbc.jpg", "https://i.postimg.cc/y88mnMpp/3921823d2438e6f9c92399178f6689ae.jpg", "https://i.postimg.cc/x8QHmhbR/9c592e59ef22bd17f53a2b2a5fd25510.jpg", "https://i.postimg.cc/jdsPSVTq/f5f78f7661d94f279f8fe23cee0d93a9.jpg", "https://i.postimg.cc/Pr2ZL6fW/28ffe43847184b1d7df79a5a84ede996.jpg",
              "https://i.postimg.cc/kgHbsBbD/28ce8809d07af743eb5c0c24746a4fa3.jpg","https://i.postimg.cc/8Crr0NR4/b43f246a5c02f2943a23e80fa0d49358.jpg"]
  var path = __dirname + "/cache/menu.jpg"
  var rdimg = img[Math.floor(Math.random() * img.length)]; 

    let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
        imgP.push(fs.createReadStream(path))
  const command = commands.values();
  var group = [], msg = "━━━━━━༺۵༻━━━━━━\n» قــائــمــه الــاوامــر «\n━━━━━━༺۵༻━━━━━━\n";
  let check = true, page_num_input = "";
  let bonus = 0;

  for (const commandConfig of command) {
    if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.category.toLowerCase(), cmds: [commandConfig.config.name] });
    else group.find(item => item.group.toLowerCase() == commandConfig.config.category.toLowerCase()).cmds.push(commandConfig.config.name);
  }

  if (args[0] && ["all", "-a"].includes(args[0].trim())) {
    let all_commands = [];
    group.forEach(commandGroup => {
      commandGroup.cmds.forEach(item => all_commands.push(item));
    });
    let page_num_total = Math.ceil(all_commands.length / 2222222222);
    if (args[1]) {
      check = false;
      page_num_input = parseInt(args[1]);
      if (isNaN(page_num_input)) msg = "رد علي الرساله برقم العنوان لاظهار الاوامر";
      else if (page_num_input > page_num_total || page_num_input <= 0) msg = "ياغبي الرقم الي اخترته مش في المنيو اصلا 😂😂";
      else check = true;
    }
    if (check) {
    index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
      bonus = index_start;
      index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
      all_commands = all_commands.slice(index_start, index_end);
      all_commands.forEach(e => {
        msg += `\n${index_start+=1}. » ${e}: ${commands.get(e).config.description}`;
      })
      msg += `\n\n⌯ الــصــفــحــه ${page_num_input || 1}/${page_num_total}`;
      msg +=``
      msg += "\n━━━━━━༺۵༻━━━━━━\n⌯ اكــامــي بـــوت\n━━━━━━༺۵༻━━━━━━\n⌯ جــروب الــدعــم ↯\nhttps://chat.whatsapp.com/F6gNHec7QOCERSVC5mAEGr\n━━━━━━༺۵༻━━━━━━";
    }
    var msgg = {body: msg, attachment: imgP}
    return api.sendMessage(msgg, threadID, (error, info) => {
      if (check) {
        global.client.handleReply.push({
          type: "cmd_info",
          bonus: bonus,
          name: this.config.name,
          messageID: info.messageID,
          content: all_commands
        })
      }
    }, messageID)
  }

  let page_num_total = Math.ceil(group.length / 2222222222);
  if (args[0]) {
    check = false;
    page_num_input = parseInt(args[0]);
    if (isNaN(page_num_input)) msg = "رد علي الرساله برقم العنوان لاظهار الاوامر";
    else if (page_num_input > page_num_total || page_num_input <= 0) msg = "ياغبي الرقم الي اخترته مش في المنيو اصلا 😂😂";
    else check = true;
  }
  if (check) {
    index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
    bonus = index_start;
    index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
    group = group.slice(index_start, index_end);
    group.forEach(commandGroup => msg += `\n${index_start+=1}. » ${commandGroup.group.toUpperCase()} `);
    msg += `\n\n⌯ الــصــفــحــه【${page_num_input || 1}/${page_num_total}】`;
    msg +=``
    msg += `\n\n━━━━━━༺۵༻━━━━━━\n⌯ رد عــلـي الــرســالــه مــع اخــتــيــار رقــم الــمــنــيــو\n━━━━━━༺۵༻━━━━━━`;
  }
  var msgg = {body: msg, attachment: imgP}
  return api.sendMessage(msgg, threadID, async (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      bonus: bonus,
      messageID: info.messageID,
      content: group
    })
  });
    }

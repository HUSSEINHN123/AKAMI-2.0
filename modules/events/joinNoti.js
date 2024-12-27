const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.6",
  credits: "عمر + S H A D O W",
  description: "إرسال رسالة ترحيب مع صورة بروفايل العضو الجديد واسم المجموعة وترتيبه",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, Users, Threads }) {
  const { threadID, logMessageData } = event;

  // تحقق إذا كان البوت قد أضيف
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    return api.sendMessage("⌯ تم التفعيل بنجاح", threadID, () => {
      api.changeNickname(`[ . ] • ${global.config.BOTNAME || "Made By S H A D O W"}`, threadID, api.getCurrentUserID());
      api.sendMessage(
        `نجح الاتصال 👀💞

مرحبًا بك في عالمي الخاص

استخدم .الاوامر لرؤية الأوامر

ممنوع السبام وإحداث المشاكل

في حال حظر مجموعتك، راسل المطور.`,
        threadID
      );
    });
  }

  // رسالة ترحيب الأعضاء الجدد
  try {
    const { addedParticipants } = logMessageData;
    let mentions = [];
    let names = [];
    let memLength = [];
    const threadInfo = await api.getThreadInfo(threadID);
    const { threadName, participantIDs } = threadInfo;
    const totalMembers = participantIDs.length;

    for (const participant of addedParticipants) {
      const { userFbId, fullName } = participant;
      const userInfo = await api.getUserInfo(userFbId);
      const userName = userInfo[userFbId].name || fullName;
      const userRank = totalMembers + 1; // ترتيب العضو الجديد

      names.push(userName);
      mentions.push({ tag: userName, id: userFbId });

      // جلب صورة البروفايل
      const avatarPath = path.join(__dirname, "cache", `avatar_${userFbId}.png`);
      const avatarData = (await axios.get(`https://api-canvass.vercel.app/profile?uid=${userFbId}`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(avatarPath, Buffer.from(avatarData, "utf-8"));

      const welcomeMessage = `❏ إســـمـــك: ${userName}\n❏ مــجــمــوعــتــنــا: "${threadName}"\n❏ تــرتــيــبــك: ${userRank}`;
      await api.sendMessage({ body: welcomeMessage, attachment: fs.createReadStream(avatarPath) }, threadID, () => {
        fs.unlinkSync(avatarPath);
      });
    }

    let msgTemplate = "مرحبًا {name} في مجموعة {threadName}، ترتيبك الحالي هو {rank}! 🎉";
    let msg = msgTemplate
      .replace(/\{name}/g, names.join(", "))
      .replace(/\{threadName}/g, threadName)
      .replace(/\{rank}/g, totalMembers + addedParticipants.length);

    api.sendMessage({ body: msg, mentions }, threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("حدث خطأ أثناء إرسال رسالة الترحيب.", threadID);
  }
};

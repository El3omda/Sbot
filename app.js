const { Client, MessageMedia, LocalAuth, Buttons, List } = require("whatsapp-web.js");
const express = require("express");
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(50);
const { body, validationResult } = require("express-validator");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const http = require("http");
const fs = require("fs");
const { phoneNumberFormatter } = require("./helpers/formatter");
const fileUpload = require("express-fileupload");
const axios = require("axios");
const mime = require("mime-types");

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * BASED ON MANY QUESTIONS
 * Actually ready mentioned on the tutorials
 *
 * Many people confused about the warning for file-upload
 * So, we just disabling the debug for simplicity.
 */
app.use(
  fileUpload({
    debug: false,
  })
);

app.get("/", (req, res) => {
  res.sendFile("connect.html", {
    root: __dirname,
  });
});

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
  },
  authStrategy: new LocalAuth(),
});

// Support No

const supportNo = phoneNumberFormatter('201202716895');


client.on("message", (msg) => {

  if (msg.body == "test") {
    console.log(msg._data.notifyName);
  } 
  
  if (msg.body == "السلام عليكم") {
    msg.reply(" و عليكم السلام ورحمة الله و بركاتة");
    msg.reply("مرحبا بك يا " + msg._data.notifyName + " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }
  
  if (msg.body == "السلام عليكم و رحمة الله و بركاتة") {
    msg.reply(" و عليكم السلام ورحمة الله و بركاتة");
    msg.reply("مرحبا بك يا " + msg._data.notifyName + " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }
  
  if (msg.body == "السلام عليكم و رحمه الله و بركاته") {
    msg.reply(" و عليكم السلام ورحمة الله و بركاتة");
    msg.reply("مرحبا بك يا " + msg._data.notifyName + " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }
  
  if (msg.body == "السلام عليكم و رحمه الله") {
    msg.reply(" و عليكم السلام ورحمة الله و بركاتة");
    msg.reply("مرحبا بك يا " + msg._data.notifyName + " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }

  if (msg.body == "اهلا") {
    msg.reply(" أهلا بك استاذ/ة " + msg._data.notifyName);
    msg.reply("مرحبا بك عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }

  if (msg.body == "صباح الخير") {
    msg.reply(" اسعد الله صباحك بكل خير استاذ/ة " + msg._data.notifyName);
    msg.reply("مرحبا بك عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }

  if (msg.body == "مساء الخير") {
    msg.reply(" اسعد الله مسائك بكل خير استاذ/ة " + msg._data.notifyName);
    msg.reply("مرحبا بك عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }

  if (msg.body == "مرحبا") {
    msg.reply("مرحبا بك يا " + msg._data.notifyName + " عميل/ة سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟\n\" فقط قم بالرد برقم  \"\n( 1 ) اعطال فنية\n( 2 ) برمجة\n( 3 ) شراء منتجات\n( 4 ) أخري");
  }

  if (msg.body == "1") {
    msg.reply("من فضلك أختار نوع الجهاز الذي به عطل :\n( 5 ) مفتاح الانارة الذكي\n( 6 ) قفل الدخول\n( 7 ) لوحة الجرس\n( 8 ) أخري");
  } else if (msg.body == "2") {
    msg.reply("برجاء اختيار الجهاز الذي تود برمجتة:\n( 9 ) بوابة المنزل الذكي\n( 10 ) مفتاح الانارة الذكي\n( 11 ) مفتاح الانماط الذكية\n( 12 ) حساس حركة الابواب و النوافذ\n( 13 ) حساس الحركة\n( 14 ) IR\n( 15 ) قفل الدخول الذكي\n( 16 ) طلب زيارة برمجة المنزل الذكي");
  } else if (msg.body == "3") {
    msg.reply("تفضل بزيارة متجرنا الالكتروني :\n رابط المتجر");
  }
  if (msg.body == "4") {
    msg.reply("تفضل بترك رسالتك و سيقوم فريق خدمة العملاء بالتواصل معك باقرب وقت");
  } else if (msg.body == "5") {
    msg.reply("سوف يقوم الفني بزيارتك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة");
    client.sendMessage(supportNo, 'هناك عميل جديد قام بارسال بياناته "برمجة مفتاح الانارة الذكي"');
  } else if (msg.body == "6") {
    msg.reply("سوف يقوم الفني بزيارتك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة");
    client.sendMessage(supportNo, 'هناك عميل جديد قام بارسال بياناته "برمجة قفل الدخول الذكي"');
  }

  if (msg.body == "7") {
    msg.reply("سوف يقوم الفني بزيارتك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة");
    client.sendMessage(supportNo, 'هناك عميل جديد قام بارسال بياناته "برمجة لوحة الجرس"');
  } else if (msg.body == "8") {
    msg.reply("تفضل بترك رسالتك و سيقوم فريق خدمة العملاء بالتواصل معك باقرب وقت");
    client.sendMessage(supportNo, 'هناك عميل جديد قام بارسال بياناته');
  } else if (msg.body == "9") {
    msg.reply("برجاء مشاهدة هذا الفيديو علي قناتنا علي اليوتيوب واتباع الارشادات التي بة و في حالة مازلت تواجة صعوبة في برمجة المنتج\n( 16 ) طلب زيارة المختص");
  } 
  if (msg.body == "10") {
    msg.reply("برجاء مشاهدة هذا الفيديو علي قناتنا علي اليوتيوب واتباع الارشادات التي بة و في حالة مازلت تواجة صعوبة في برمجة المنتج\n( 16 ) طلب زيارة المختص");
  }
  if (msg.body == "11") {
    msg.reply("برجاء مشاهدة هذا الفيديو علي قناتنا علي اليوتيوب واتباع الارشادات التي بة و في حالة مازلت تواجة صعوبة في برمجة المنتج\n( 16 ) طلب زيارة المختص");
  } else if (msg.body == "12") {
    msg.reply("برجاء مشاهدة هذا الفيديو علي قناتنا علي اليوتيوب واتباع الارشادات التي بة و في حالة مازلت تواجة صعوبة في برمجة المنتج\n( 16 ) طلب زيارة المختص");
  } else if (msg.body == "13") {
    msg.reply("برجاء مشاهدة هذا الفيديو علي قناتنا علي اليوتيوب واتباع الارشادات التي بة و في حالة مازلت تواجة صعوبة في برمجة المنتج\n( 16 ) طلب زيارة المختص");
  } else if (msg.body == "14") {
    msg.reply("برجاء مشاهدة هذا الفيديو علي قناتنا علي اليوتيوب واتباع الارشادات التي بة و في حالة مازلت تواجة صعوبة في برمجة المنتج\n( 16 ) طلب زيارة المختص");
  }
  if (msg.body == "15") {
    msg.reply("برجاء مشاهدة هذا الفيديو علي قناتنا علي اليوتيوب واتباع الارشادات التي بة و في حالة مازلت تواجة صعوبة في برمجة المنتج\n( 16 ) طلب زيارة المختص");
  } else if (msg.body == "16") {
    msg.reply("سوف يقوم الفني بزيارتك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة");
    client.sendMessage(supportNo, 'هناك عميل جديد قام بطلب زيارة المختص');
  }

  // NOTE!
  // UNCOMMENT THE SCRIPT BELOW IF YOU WANT TO SAVE THE MESSAGE MEDIA FILES
  // Downloading media
  // if (msg.hasMedia) {
  //   msg.downloadMedia().then(media => {
  //     // To better understanding
  //     // Please look at the console what data we get
  //     console.log(media);

  //     if (media) {
  //       // The folder to store: change as you want!
  //       // Create if not exists
  //       const mediaPath = './downloaded-media/';

  //       if (!fs.existsSync(mediaPath)) {
  //         fs.mkdirSync(mediaPath);
  //       }

  //       // Get the file extension by mime-type
  //       const extension = mime.extension(media.mimetype);

  //       // Filename: change as you want!
  //       // I will use the time for this example
  //       // Why not use media.filename? Because the value is not certain exists
  //       const filename = new Date().getTime();

  //       const fullFilename = mediaPath + filename + '.' + extension;

  //       // Save to file
  //       try {
  //         fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' });
  //         console.log('File downloaded successfully!', fullFilename);
  //       } catch (err) {
  //         console.log('Failed to save the file:', err);
  //       }
  //     }
  //   });
  // }
});

client.initialize();

// Socket IO
io.on("connection", function (socket) {
  socket.emit("message", "يتم الاتصال");

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit("qr", url);
      socket.emit("message", "من فضلك قم بمسح الرمز");
    });
  });

  client.on("ready", () => {
    socket.emit("ready", "تم الربط بنجاح");
    socket.emit("message", "تم الربط بنجاح");
  });

  client.on("authenticated", () => {
    socket.emit("authenticated", "تم الربط بنجاح");
    socket.emit("message", "تم الربط بنجاح");
    console.log("AUTHENTICATED");
  });

  client.on("auth_failure", function (session) {
    socket.emit("message", "تتم اعادة المحاولة");
  });

  client.on("disconnected", (reason) => {
    socket.emit("message", "تم قطع الاتصال");
    client.destroy();
    client.initialize();
  });
});

const checkRegisteredNumber = async function (number) {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
};

// Send message
app.post(
  "/send-message",
  [body("number").notEmpty(), body("message").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });

    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: errors.mapped(),
      });
    }

    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;

    const isRegisteredNumber = await checkRegisteredNumber(number);

    if (!isRegisteredNumber) {
      return res.status(422).json({
        status: false,
        message: "The number is not registered",
      });
    }

    client
      .sendMessage(number, message)
      .then((response) => {
        res.status(200).json({
          status: true,
          response: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          response: err,
        });
      });
  }
);

// Send media
app.post("/send-media", async (req, res) => {
  const number = phoneNumberFormatter(req.body.number);
  const caption = req.body.caption;
  const fileUrl = req.body.file;

  // const media = MessageMedia.fromFilePath('./image-example.png');
  // const file = req.files.file;
  // const media = new MessageMedia(file.mimetype, file.data.toString('base64'), file.name);
  let mimetype;
  const attachment = await axios
    .get(fileUrl, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      mimetype = response.headers["content-type"];
      return response.data.toString("base64");
    });

  const media = new MessageMedia(mimetype, attachment, "Media");

  client
    .sendMessage(number, media, {
      caption: caption,
    })
    .then((response) => {
      res.status(200).json({
        status: true,
        response: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        response: err,
      });
    });
});

const findGroupByName = async function (name) {
  const group = await client.getChats().then((chats) => {
    return chats.find(
      (chat) => chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
    );
  });
  return group;
};

// Send message to group
// You can use chatID or group name, yea!
app.post(
  "/send-group-message",
  [
    body("id").custom((value, { req }) => {
      if (!value && !req.body.name) {
        throw new Error("Invalid value, you can use `id` or `name`");
      }
      return true;
    }),
    body("message").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });

    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: errors.mapped(),
      });
    }

    let chatId = req.body.id;
    const groupName = req.body.name;
    const message = req.body.message;

    // Find the group by name
    if (!chatId) {
      const group = await findGroupByName(groupName);
      if (!group) {
        return res.status(422).json({
          status: false,
          message: "No group found with name: " + groupName,
        });
      }
      chatId = group.id._serialized;
    }

    client
      .sendMessage(chatId, message)
      .then((response) => {
        res.status(200).json({
          status: true,
          response: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          response: err,
        });
      });
  }
);

// Clearing message on spesific chat
app.post("/clear-message", [body("number").notEmpty()], async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped(),
    });
  }

  const number = phoneNumberFormatter(req.body.number);

  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return res.status(422).json({
      status: false,
      message: "The number is not registered",
    });
  }

  const chat = await client.getChatById(number);

  chat
    .clearMessages()
    .then((status) => {
      res.status(200).json({
        status: true,
        response: status,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        response: err,
      });
    });
});

server.listen(port, function () {
  console.log("App running on *: " + port);
});

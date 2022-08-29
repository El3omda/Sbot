const {
  Client,
  MessageMedia,
  LocalAuth,
  Buttons,
  List,
} = require("whatsapp-web.js");
const express = require("express");
const EventEmitter = require("events");
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
  res.sendFile("index.html", {
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

const supportNo = phoneNumberFormatter("966507610054");

client.on("message", (msg) => {
  if (msg.body == "test") {
    console.log(msg._data);
  }

  if (msg.body == "B") {
  }

  const section1 = {
    title: "",
    rows: [
      {
        title: "اعطال فنية",
        id: "test-2",
      },
      {
        title: "برمجة",
      },
      // {
      //   title: "شراء منتجات",
      //   id: "test-4",
      // },
      {
        title: "أخري",
        id: "test-5",
      },
    ],
  };

  const list1 = new List(
    "مرحبا بك يا " +
      msg._data.notifyName +
      " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟",
    "الخيارات",
    [section1],
    "و عليكم السلام ورحمة الله و بركاتة",
    "footer"
  );

  const list2 = new List(
    " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟",
    "الخيارات",
    [section1],
    "أهلا بك استاذ/ة " + msg._data.notifyName,
    "footer"
  );

  const list3 = new List(
    " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟",
    "الخيارات",
    [section1],
    " اسعد الله صباحك بكل خير استاذ/ة " + msg._data.notifyName,
    "footer"
  );

  const list4 = new List(
    " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟",
    "الخيارات",
    [section1],
    " اسعد الله مساؤك بكل خير استاذ/ة " + msg._data.notifyName,
    "footer"
  );

  const list5 = new List(
    " عميل سمارتا لحلول المنزل الذكي\nكيف يمكنني مساعدتك؟",
    "الخيارات",
    [section1],
    " مرحبا بك استاذ/ة " + msg._data.notifyName,
    "footer"
  );

  const section2 = {
    title: "",
    rows: [
      {
        title: "مفتاح الإنارة الذكي",
        id: "test-6",
      },
      {
        title: "قفل الدخول الذكى",
      },
      {
        title: "لوحة الجرس",
        id: "test-7",
      },
      {
        title: "جهاز أخر",
        id: "test-8",
      },
    ],
  };

  const pdf1 = MessageMedia.fromFilePath('./files/جهاز التحكم بالتلفاز والتكييف - IR.pdf');
  const pdf2 = MessageMedia.fromFilePath('./files/بوابة المنزل الذكي.pdf');
  const pdf3 = MessageMedia.fromFilePath('./files/حساس الحركة PIR Motion Sensor.pdf');
  const pdf4 = MessageMedia.fromFilePath('./files/حساس حركة الأبواب والنوافذ  Window.pdf');
  const pdf5 = MessageMedia.fromFilePath('./files/مفتاح الانارة الذكي.pdf');
  const pdf6 = MessageMedia.fromFilePath('./files/مفتاح الأنماط الذكية Smart Scene Switch.pdf');

  const list6 = new List(
    " من فضلك أختار نوع الجهاز الذي به عطل :",
    "الاجهزه",
    [section2],
    "",
    "footer"
  );

  const section3 = {
    title: "",
    rows: [
      {
        title: "بوابة المنزل الذكي",
        id: "test-8",
      },
      {
        title: "مفتاح الانارة الذكي",
      },
      {
        title: "مفتاح الانماط الذكية",
        id: "test-9",
      },
      {
        title: "حساس حركة الابواب و النوافذ",
        id: "test-10",
      },
      {
        title: "حساس الحركة",
        id: "test-11",
      },
      {
        title: "جهاز التحكم بالتلفاز و التكيف IR",
        id: "test-12",
      },
      {
        title: "قفل الدخول الذكي",
        id: "test-13",
      },
      {
        title: "طلب زيارة برمجة المنزل الذكي",
        id: "test-14",
      },
    ],
  };

  const list7 = new List(
    " ",
    "عرض الاجهزة",
    [section3],
    "برجاء اختيار الجهاز الذي تود برمجتة:",
    "footer"
  );

  if (msg.body == "سلام عليكم") {
    client.sendMessage(msg._data.from, list1);
  }

  if (msg.body == "السلام عليكم") {
    client.sendMessage(msg._data.from, list1);
  }

  if (msg.body == "السلام عليكم و رحمة الله و بركاتة") {
    client.sendMessage(msg._data.from, list1);
  }

  if (msg.body == "السلام عليكم و رحمه الله و بركاته") {
    client.sendMessage(msg._data.from, list1);
  }

  if (msg.body == "السلام عليكم و رحمه الله") {
    client.sendMessage(msg._data.from, list1);
  }

  if (msg.body == "اهلا" || msg.body == "أهلا" || msg.body == "أهلاً") {
    client.sendMessage(msg._data.from, list2);
  }

  if (msg.body == "صباح الخير") {
    client.sendMessage(msg._data.from, list3);
  }

  if (msg.body == "مساء الخير") {
    client.sendMessage(msg._data.from, list4);
  }

  if (msg.body == "مرحبا") {
    client.sendMessage(msg._data.from, list5);
  }

  if (msg.body == "اعطال فنية") {
    client.sendMessage(msg._data.from, list6);
  } else if (msg.body == "برمجة") {
    client.sendMessage(msg._data.from, list7);
  } else if (msg.body == "شراء منتجات") {
    // msg.reply("تفضل بزيارة متجرنا الالكتروني :\n رابط المتجر");
  }

  if (msg.body == "أخري") {
    msg.reply(
      "تفضل بترك رسالتك و سيقوم فريق خدمة العملاء بالتواصل معك باقرب وقت"
    );
    client.sendMessage(
      supportNo,
      'هناك عميل جديد قام بارسال بياناته'
    );
  } else if (msg.body == "بوابة المنزل الذكي") {
    msg.reply(
      "بامكانك برمجة بوابة المنزل الذكي من خلال الطرق التالية:\n1 - الدليل الارشادي المرفق\n2 - اطلع على فيديو شرح برمجة بوابة المنزل الذكي على قناة اليوتيوب: \nhttps://youtu.be/ins658T5FIs\nاو بامكانك طلب خدمة البرمجة المدفوعة بالضغط على الرابط أدناه:\n"
    );
    msg.reply(pdf2);
  } 
  if (msg.body == "مفتاح الانارة الذكي") {
    msg.reply(
      "بامكانك برمجة مفتاح الانارة الذكي  من خلال الطرق التالية:\n1 - الدليل الارشادي المرفق\n2 - اطلع على فيديو شرح برمجة مفتاح الانارة الذكي على قناة اليوتيوب: \nhttps://youtu.be/ins658T5FIs\nاو بامكانك طلب خدمة البرمجة المدفوعة بالضغط على الرابط أدناه:\n"
    );
    msg.reply(pdf5);
  }

  if (msg.body == "مفتاح الانماط الذكية") {
    msg.reply(
      "بامكانك برمجة مفتاح الانماط الذكية  من خلال الطرق التالية:\n1 - الدليل الارشادي المرفق\n2 - اطلع على فيديو شرح برمجة مفتاح الانماط الذكية على قناة اليوتيوب: \nhttps://youtu.be/ins658T5FIs\nاو بامكانك طلب خدمة البرمجة المدفوعة بالضغط على الرابط أدناه:\n"
    );
    msg.reply(pdf6);
  } else if (msg.body == "حساس حركة الابواب و النوافذ") {
    msg.reply(
      "بامكانك برمجة حساس حركة الابواب و النوافذ  من خلال الطرق التالية:\n1 - الدليل الارشادي المرفق\n2 - اطلع على فيديو شرح برمجة حساس حركة الابواب و النوافذ على قناة اليوتيوب: \nhttps://youtu.be/ins658T5FIs\nاو بامكانك طلب خدمة البرمجة المدفوعة بالضغط على الرابط أدناه:\n"
    );
    msg.reply(pdf4);
  } else if (msg.body == "حساس الحركة") {
    msg.reply(
      "بامكانك برمجة حساس الحركة من خلال الطرق التالية:\n1 - الدليل الارشادي المرفق\n2 - اطلع على فيديو شرح برمجة حساس الحركة على قناة اليوتيوب: \nhttps://youtu.be/ins658T5FIs\nاو بامكانك طلب خدمة البرمجة المدفوعة بالضغط على الرابط أدناه:\n"
    );
    msg.reply(pdf3);
  }
  if (msg.body == "جهاز التحكم بالتلفاز و التكيف IR") {
    msg.reply(
      "بامكانك برمجة جهاز التحكم بالتلفاز و التكيف IR من خلال الطرق التالية:\n1 - الدليل الارشادي المرفق\n2 - اطلع على فيديو شرح جهاز التحكم بالتلفاز و التكيف IR على قناة اليوتيوب: \nhttps://youtu.be/ins658T5FIs\nاو بامكانك طلب خدمة البرمجة المدفوعة بالضغط على الرابط أدناه:\n"
    );
    msg.reply(pdf1);
  }
  if (msg.body == "قفل الدخول الذكي") {
    msg.reply(
      "نأمل ارسال صورة القفل الذكي ليتم تزويدكم بالدليل الارشادي ورابط برمجة القفل بقناة اليوتيوب\nاو بامكانك طلب خدمة البرمجة المدفوعة بالضغط على الرابط أدناه:"
    );
  } else if (msg.body == "طلب زيارة برمجة المنزل الذكي") {
    msg.reply(
      "سوف يقوم الفني بالتواصل معك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة"
    );
    client.sendMessage(supportNo, "هناك عميل جديد قام بطلب زيارة المختص");
  }  else if (msg.body == "مفتاح الإنارة الذكي") {
    msg.reply(
      "سوف يقوم الفني بالتواصل معك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة"
    );
    client.sendMessage(supportNo, "هناك عميل جديد قام بطلب زيارة المختص");
  }  else if (msg.body == "قفل الدخول الذكى") {
    msg.reply(
      "سوف يقوم الفني بالتواصل معك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة"
    );
    client.sendMessage(supportNo, "هناك عميل جديد قام بطلب زيارة المختص");
  }  else if (msg.body == "لوحة الجرس") {
    msg.reply(
      "سوف يقوم الفني بالتواصل معك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة"
    );
    client.sendMessage(supportNo, "هناك عميل جديد قام بطلب زيارة المختص");
  } else if (msg.body == "جهاز أخر") {
    msg.reply(
      "سوف يقوم الفني بالتواصل معك الرجاء تزويدنا بالبيانات التالية :\nالأسم\nرقم التواصل\nاسم المشروع\nرقم المبني\nرقم الوحدة"
    );
    client.sendMessage(supportNo, "هناك عميل جديد قام بطلب زيارة المختص");
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

import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

import colors from "@colors/colors/safe";
import { getInfo } from "./ults";
import axios from "axios";
import { embedType } from "../..//interfaces";
import * as FileStreamRotator from "file-stream-rotator";
import config from "../..//config";

var infoStream = FileStreamRotator.getStream({
  filename: "./logs/info-%DATE%",
  frequency: "1d",
  date_format: "YYYY-MM-DD.HH.mm",
  size: "100M",
  max_logs: "1",
  audit_file: "./logs/info-audit.json",
  extension: ".log",
  create_symlink: true,
  symlink_name: "./logs/info.log",
});

var errorStream = FileStreamRotator.getStream({
  filename: "./logs/error-%DATE%",
  frequency: "1d",
  date_format: "YYYY-MM-DD.HH.mm",
  size: "100M",
  max_logs: "1",
  audit_file: "./logs/error-audit.json",
  extension: ".log",
  create_symlink: true,
  symlink_name: "./logs/error.log",
});

var successStream = FileStreamRotator.getStream({
  filename: "./logs/success-%DATE%",
  frequency: "1d",
  date_format: "YYYY-MM-DD.HH.mm",
  size: "100M",
  max_logs: "1",
  audit_file: "./logs/success-audit.json",
  extension: ".log",
  create_symlink: true,
  symlink_name: "./logs/success.log",
});

var warnStream = FileStreamRotator.getStream({
  filename: "./logs/warn-%DATE%",
  frequency: "1d",
  date_format: "YYYY-MM-DD.HH.mm",
  size: "100M",
  max_logs: "1",
  audit_file: "./logs/warn-audit.json",
  extension: ".log",
  create_symlink: true,
  symlink_name: "./logs/warn.log",
});

var fatalStream = FileStreamRotator.getStream({
  filename: "./logs/fatal-%DATE%",
  frequency: "1d",
  date_format: "YYYY-MM-DD.HH.mm",
  size: "100M",
  max_logs: "1",
  audit_file: "./logs/fatal-audit.json",
  extension: ".log",
  create_symlink: true,
  symlink_name: "./logs/fatal.log",
});

var requestStream = FileStreamRotator.getStream({
  filename: "./logs/request-%DATE%",
  frequency: "1d",
  date_format: "YYYY-MM-DD.HH.mm",
  size: "100M",
  max_logs: "1",
  audit_file: "./logs/request-audit.json",
  extension: ".log",
  create_symlink: true,
  symlink_name: "./logs/request.log",
});

var systemStream = FileStreamRotator.getStream({
  filename: "./logs/system-%DATE%",
  frequency: "1d",
  date_format: "YYYY-MM-DD.HH.mm",
  size: "100M",
  max_logs: "1",
  audit_file: "./logs/system-audit.json",
  extension: ".log",
  create_symlink: true,
  symlink_name: "./logs/system.log",
});

const logger = {
  discord: {
    info: async function (
      o: unknown,
      embed: embedType,
      ...n: (undefined | unknown[])[]
    ) {
      if (config.mode != "production") return;
      const data = getInfo();
      let args: string | Object;
      if (n[0] == undefined) {
        args = " ";
      } else {
        args = JSON.stringify(n[0], null, 2);
      }

      if (embed.color == undefined || null) {
        embed.color = 0x00ff00;
      }
      const payload = {
        embeds: [
          {
            title: embed.title,
            description:
              embed.description +
              `\n \n **INFO INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
            color: embed.color,
          },
        ],
      };
      try {
        const response = await axios.post(
          "https://discord.com/api/webhooks/1125295537269260308/IkCHIonTNJj_1RXJmpif-fuTpxKv1odgPPmu9U9uyt5mIDYzsLYd-bRevP8jkGEuGLz_",
          payload,
        );
      } catch (e: any) {
        logger.fatal(
          "Webhook failed: " +
            e.message +
            "\n" +
            "Url: https://discord.com/api/webhooks/1125295537269260308/IkCHIonTNJj_1RXJmpif-fuTpxKv1odgPPmu9U9uyt5mIDYzsLYd-bRevP8jkGEuGLz_",
        );
      }
    },
    error: async function (
      o: unknown,
      embed: embedType,
      ...n: (undefined | unknown[])[]
    ) {
      if (config.mode != "production") return;
      const data = getInfo();
      let args: string | Object;
      if (n[0] == undefined) {
        args = " ";
      } else {
        args = JSON.stringify(n[0], null, 2);
      }

      if (embed.color == undefined || null) {
        embed.color = 16711680;
      }
      const payload = {
        content: "@everyone",
        embeds: [
          {
            title: embed.title,
            description:
              embed.description +
              `\n \n **ERROR INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
            color: embed.color,
          },
        ],
      };
      try {
        const response = await axios.post(
          "https://discord.com/api/webhooks/1125296506447081523/JBQ7O3GRv_RRMDStn9VjvC_FNO6K52Kqz1goEN_hezIZfyPbAg6yTFSetVPDbzuBeqMq",
          payload,
        );
      } catch (e: any) {
        logger.fatal(
          "Webhook failed: " +
            e.message +
            "\n" +
            "Url: https://discord.com/api/webhooks/1125296506447081523/JBQ7O3GRv_RRMDStn9VjvC_FNO6K52Kqz1goEN_hezIZfyPbAg6yTFSetVPDbzuBeqMq",
        );
      }
    },
    fatal: async function (
      o: unknown,
      embed: embedType,
      ...n: (undefined | unknown[])[]
    ) {
      if (config.mode != "production") return;
      const data = getInfo();
      let args: string | Object;
      if (n[0] == undefined) {
        args = " ";
      } else {
        args = JSON.stringify(n[0], null, 2);
      }

      if (embed.color == undefined || null) {
        embed.color = 16711680;
      }
      const payload = {
        content: "@everyone",
        embeds: [
          {
            title: embed.title,
            description:
              embed.description +
              `\n \n **FATAL INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
            color: embed.color,
          },
        ],
      };
      try {
        const response = await axios.post(
          "https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
          payload,
        );
      } catch (e: any) {
        logger.fatal(
          "Webhook failed: " +
            e.message +
            "\n" +
            "Url: https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
        );
      }
    },
    warn: async function (
      o: unknown,
      embed: embedType,
      ...n: (undefined | unknown[])[]
    ) {
      if (config.mode != "production") return;
      const data = getInfo();
      let args: string | Object;
      if (n[0] == undefined) {
        args = " ";
      } else {
        args = JSON.stringify(n[0], null, 2);
      }

      if (embed.color == undefined || null) {
        embed.color = 16776960;
      }
      const payload = {
        content: "@everyone",
        embeds: [
          {
            title: embed.title,
            description:
              embed.description +
              `\n \n **WARN INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
            color: embed.color,
          },
        ],
      };
      try {
        const response = await axios.post(
          "https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
          payload,
        );
      } catch (e: any) {
        logger.fatal(
          "Webhook failed: " +
            e.message +
            "\n" +
            "Url: https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
        );
      }
    },
    request: async function (
      o: unknown,
      embed: embedType,
      ...n: (undefined | unknown[])[]
    ) {
      if (config.mode != "production") return;
      const data = getInfo();
      let args: string | Object;
      if (n[0] == undefined) {
        args = " ";
      } else {
        args = JSON.stringify(n[0], null, 2);
      }

      if (embed.color == undefined || null) {
        embed.color = 0x00ff00;
      }
      const payload = {
        embeds: [
          {
            title: embed.title,
            description:
              embed.description +
              `\n \n **REQUEST INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
            color: embed.color,
          },
        ],
      };
      try {
        const response = await axios.post(
          "https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
          payload,
        );
      } catch (e: any) {
        logger.fatal(
          "Webhook failed: " +
            e.message +
            "\n" +
            "Url: https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
        );
      }
    },
  },

  info: function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    const data = getInfo();
    let args: string | Object;
    if (n[0] == undefined) {
      args = " ";
    } else {
      args = JSON.stringify(n[0], null, 2);
    }
    infoStream.write(`[INFO] ${data.hostname} ${data.date} ${o} \n${args}\n`);
    console.log(
      colors.gray("[" + colors.green("INFO") + "]") +
        colors.grey(`\t ${data.hostname} \t ${data.date} \t`) +
        colors.blue(o + "\n" + args),
    );
  },

  request: async function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    const data = getInfo();
    let args: string | Object;
    if (n[0] == undefined) {
      args = " ";
    } else {
      args = JSON.stringify(n[0], null, 2);
    }
    requestStream.write(
      `[REQUEST] ${data.hostname} ${data.date} ${o} \n${args}\n`,
    );
    console.log(
      colors.gray("[" + colors.green("REQUEST") + "]") +
        colors.grey(`\t ${data.hostname} \t ${data.date} \t`) +
        colors.blue(o + "\n" + args),
    );
    if (config.mode != "production") return;
    const payload = {
      embeds: [
        {
          title: "[REQUEST LOGS]",
          description:
            o +
            `\n \n **REQUEST INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
          color: 0x00ff00,
        },
      ],
    };
    try {
      const response = await axios.post(
        "https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
        payload,
      );
    } catch (e: any) {
      logger.fatal(
        "Webhook failed: " +
          e.message +
          "\n" +
          "Url: https://discord.com/api/webhooks/1125296934123487252/ZQfI07hQLFEb8W1HsZwHQN7Zx6exw3miilmI7IRlj214uE-MovwbGBydifjt_XYkoL0q",
      );
    }
  },

  system: function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    const data = getInfo();
    let args: string | Object;
    if (n[0] == undefined) {
      args = " ";
    } else {
      args = JSON.stringify(n[0], null, 2);
    }
    systemStream.write(
      `[SYSTEM] ${data.hostname} ${data.date} ${o} \n${args}\n`,
    );
    console.log(
      colors.gray("[" + colors.green("SYSTEM") + "]") +
        colors.grey(`\t ${data.hostname} \t ${data.date} \t`) +
        colors.blue(o + "\n" + args),
    );
  },

  warn: async function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    const data = getInfo();
    let args: string | Object;
    if (n[0] == undefined) {
      args = " ";
    } else {
      args = JSON.stringify(n[0], null, 2);
    }
    warnStream.write(`[WARN] ${data.hostname} ${data.date} ${o} \n${args}\n`);
    console.log(
      colors.gray("[" + colors.yellow("WARN") + "]") +
        colors.grey(`\t ${data.hostname} \t ${data.date} \t`) +
        colors.blue(o + "\n" + args),
    );

    if (config.mode != "production") return;
    const payload = {
      content: "@everyone",
      embeds: [
        {
          title: "[WARN LOGS]",
          description:
            o +
            `\n \n **WARN INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
          color: 16776960,
        },
      ],
    };
    try {
      const response = await axios.post(
        "https://discord.com/api/webhooks/1125296799805100082/UZIirvtbXFNam6-6vu4uafSLL4O3SjTew2bFYu0A04KwYRTDwO7qpRVq2X9Veik3s-FL",
        payload,
      );
    } catch (e: any) {
      logger.fatal(
        "Webhook failed: " +
          e.message +
          "\n" +
          "Url: https://discord.com/api/webhooks/1125296799805100082/UZIirvtbXFNam6-6vu4uafSLL4O3SjTew2bFYu0A04KwYRTDwO7qpRVq2X9Veik3s-FL",
      );
    }
  },

  error: async function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    const data = getInfo();
    let args: string | Object;
    if (n[0] == undefined) {
      args = " ";
    } else {
      args = JSON.stringify(n[0], null, 2);
    }
    errorStream.write(`[ERROR] ${data.hostname} ${data.date} ${o} \n${args}\n`);
    console.log(
      colors.gray("[" + colors.red("ERROR") + "]") +
        colors.grey(`\t ${data.hostname} \t ${data.date} \t`) +
        colors.blue(o + "\n" + args),
    );

    if (config.mode != "production") return;
    const payload = {
      content: "@everyone",
      embeds: [
        {
          title: "[ERROR LOGS]",
          description:
            o +
            `\n \n **ERROR INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
          color: 16776960,
        },
      ],
    };
    try {
      const response = await axios.post(
        "https://discord.com/api/webhooks/1125296506447081523/JBQ7O3GRv_RRMDStn9VjvC_FNO6K52Kqz1goEN_hezIZfyPbAg6yTFSetVPDbzuBeqMq",
        payload,
      );
    } catch (e: any) {
      logger.fatal(
        "Webhook failed: " +
          e.message +
          "\n" +
          "Url: https://discord.com/api/webhooks/1125296506447081523/JBQ7O3GRv_RRMDStn9VjvC_FNO6K52Kqz1goEN_hezIZfyPbAg6yTFSetVPDbzuBeqMq",
      );
    }
  },

  success: function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    const data = getInfo();
    let args: string | Object;
    if (n[0] == undefined) {
      args = " ";
    } else {
      args = JSON.stringify(n[0], null, 2);
    }
    successStream.write(
      `[SUCCESS] ${data.hostname} ${data.date} ${o} \n${args}\n`,
    );
    console.log(
      colors.bgGreen("[" + colors.bgGreen("SUCCESS") + "]") +
        colors.grey(`\t ${data.hostname} \t ${data.date} \t`) +
        colors.blue(o + "\n" + args),
    );
  },

  fatal: async function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    const data = getInfo();
    let args: string | Object;
    if (n[0] == undefined) {
      args = " ";
    } else {
      args = JSON.stringify(n[0], null, 2);
    }
    fatalStream.write(`[FATAL] ${data.hostname} ${data.date} ${o} \n${args}\n`);
    console.log(
      colors.bgRed("[" + colors.bgRed("FATAL") + "]") +
        colors.grey(`\t ${data.hostname} \t ${data.date} \t`) +
        colors.blue(o + "\n" + args),
    );

    if (config.mode != "production") return;
    const payload = {
      content: "@everyone",
      embeds: [
        {
          title: "[FATAL LOGS]",
          description:
            o +
            `\n \n **FATAL INFO** \n **DATE**: ${data.date} \n **HOSTNAME**: ${data.hostname}`,
          color: 16776960,
        },
      ],
    };
    try {
      const response = await axios.post(
        "https://discord.com/api/webhooks/1125296663146283089/dRxwlY8RqhkDmGSrBEI4VnOyjf0eUwNLJlpebfrqBnSkC7w_lQzsnAtSVl4HLS4PqHN0",
        payload,
      );
    } catch (e: any) {
      logger.fatal(
        "Webhook failed: " +
          e.message +
          "\n" +
          "Url: https://discord.com/api/webhooks/1125296663146283089/dRxwlY8RqhkDmGSrBEI4VnOyjf0eUwNLJlpebfrqBnSkC7w_lQzsnAtSVl4HLS4PqHN0",
      );
    }

    process.exit(1);
  },

  trace: function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    console.log(o, n);
  },

  debug: function (o: unknown, ...n: (undefined | unknown[])[]) {
    if (config.mode == "testing") return;
    console.log(o, n);
  },

  child: function () {
    const child = Object.create(this);
    return child;
  },
};

const startText = () => {
  console.log(
    colors.blue(" ____    _    ___ ______   __\n"),
    colors.blue("|  _ \\  / \\  |_ _/ ___\\ \\ / /\n"),
    colors.blue("| | | |/ _ \\  | |\\___ \\ V / \n"),
    colors.blue("| |_| / ___ \\ | | ___) || |   \n"),
    colors.blue("|____/_/   \\_\\___|____/ |_|  "),
  );
};

export { startText };
export default logger;

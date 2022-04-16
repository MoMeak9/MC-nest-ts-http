import { gameServer } from "./gameServer";

export const codeContent = {
  en: (userName) => `
  <p style="text-indent: 2em;">Dear${userName}：</p>
  <p style="text-indent: 2em;">You have passed our whitelist review! The whitelist will take effect in one minute.
  <p style="text-indent: 2em;">Server address：${gameServer}</p>
  <p style="text-align: right;">—— LightWorld</p>
`,
  zh: (userName) => `
  <p style="text-indent: 2em;">亲爱的${userName}：</p>
  <p style="text-indent: 2em;">您通过了我们的白名单审核！白名单将在1分钟内生效。
  <p style="text-indent: 2em;">服务器地址：${gameServer}</p>
  <p style="text-align: right;">—— 辉光世界|LightWorld</p>
`
};

export const auditContent = {
  en: (code) => `
    <p style="text-indent: 2em;">Dear LightWorld World registered player：</p>
    <p style="text-indent: 2em;">Your registration verification code<strong>${code}</strong>, Verification code valid for 5 minutes, please use as soon as possible!
    <p style="text-indent: 2em;">Wish you every success in your work</p>
    <p style="text-align: right;">—— 辉光世界|LightWorld</p>
`,
  zh: (code) => `
    <p style="text-indent: 2em;">亲爱的辉光世界注册玩家：</p>
    <p style="text-indent: 2em;">您的注册验证码<strong>${code}</strong>，验证码5分钟内有效，请尽快使用！
    <p style="text-indent: 2em;">祝您工作顺利，心想事成</p>
    <p style="text-align: right;">—— 辉光世界|LightWorld</p>
`
};

export default {
  codeContent,
  auditContent
};

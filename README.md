# 六同音游部主页

厦门六中同安校区音游玩家交流社群主页。基于 Astro、TypeScript 和原生 CSS，静态构建，无运行时后端、外部字体或前端框架依赖。

## 本地开发

需要 Node.js 22.23.4+（建议 Node.js 24 LTS）和 npm。

```sh
npm ci
npm run dev
```

打开终端显示的本地地址，默认 `http://127.0.0.1:4321/`。

```sh
npm run check
npm run build
npm run preview
```

构建产物在 `dist/`，可部署到静态托管服务。站点部署在根路径，`/docs/` 继续由已有文档站提供；托管时请保留该路径的独立配置。生产域名在 `astro.config.mjs`、页面 canonical 和 Open Graph 元数据中配置。

## 内容与设计

- `src/pages/index.astro`：社群介绍、交流原则、申请入口、常见问题。申请链接指向[文档中心](https://ltyyb.auntstudio.com/docs/)，要求以最新文档与群公告为准。
- `src/styles/global.css`：布局、设计变量、移动端适配；视觉延续 `DESIGN.md` 的近黑背景、细分隔线、等宽标签、描边胶囊按钮，以橙色轨迹增加活力。
- `src/components/RhythmArtwork.astro` 与 `src/styles/rhythm.css`：原创 SVG 节奏插图与三种玩法示意。
- `src/components/ArcadeArtwork.astro`：街机示意参考 [maimai DX 官方玩法](https://maimai.sega.com/play/howto/)的圆形触屏、八键布局、向外移动的环形音符与星形滑条，沿用本站配色；仅作视觉演示。
- `src/scripts/home.ts`：玩法切换、节拍回应、一次性滚动显现、屏外动画暂停。导航中的暂停按钮控制装饰动效，当前会话内记忆选择；系统减少动态效果偏好优先。关闭 JavaScript 时正文、导航、申请入口、常见问题仍可使用。
- `public/brand.webp`：沿用文档站公开的社群标识 `/docs/hero.webp`。

页面使用“社群”定位，不虚构成员数量、活动记录、审核群号或加群链接。玩法图形仅作示意。

上线前请在实际手机上确认触摸反馈、浏览器地址栏与安全区域表现。

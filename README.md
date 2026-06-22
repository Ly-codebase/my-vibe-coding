# The Works of Louie Lu

个人 Vibe Coding 作品集网站 — 炫酷现代 UI + 可在线编辑管理。

## 功能

- **个人信息展示** — Hero、About、Contact 区块
- **作品展示** — Featured 精选 + 更多项目网格
- **在线管理** — `/admin` 面板可编辑个人信息、增删改项目
- **部署同步** — Vercel Blob 持久化，线上编辑即时生效

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

管理面板: [http://localhost:3000/admin](http://localhost:3000/admin)  
本地默认密码: `admin`

## 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在 Vercel 项目设置中添加环境变量:
   - `ADMIN_PASSWORD` — 管理面板密码
4. 在 Vercel Dashboard → Storage → 创建 **Blob Store**，会自动注入 `BLOB_READ_WRITE_TOKEN`
5. 重新部署

部署后，在 `/admin` 编辑并保存，数据写入 Vercel Blob，全站即时同步。

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel Blob

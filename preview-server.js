const http = require("http");
const fs = require("fs");
const pathModule = require("path");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>留材库 Product Pack | 跨境 SKU 资料包代整理服务</title>
    <style>
      body{margin:0;background:#f6f7f9;color:#111827;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .wrap{max-width:1080px;margin:0 auto;padding:48px 24px}
      .card{background:white;border:1px solid #dde4f0;border-radius:12px;padding:28px;box-shadow:0 18px 55px rgba(17,24,39,.08)}
      h1{font-size:44px;line-height:1.1;margin:0}p{color:#5f6b7a;line-height:1.75}
      .btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.btn{border-radius:10px;padding:13px 18px;font-weight:800;text-decoration:none}
      .primary{background:#111827;color:white}.secondary{border:1px solid #dde4f0;color:#111827;background:white}
      img{width:100%;margin-top:28px;border:1px solid #dde4f0;border-radius:12px;background:#f6f7f9}
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="card">
        <img src="/images/liucai-pack-logo.svg" alt="留材库 Product Pack logo" style="width:72px;height:72px;margin:0 0 22px;border:0;border-radius:18px">
        <h1>留材库 Product Pack</h1>
        <p><strong>跨境 SKU 资料包代整理服务</strong></p>
        <p>给中国跨境电商卖家使用：把杂乱 SKU 信息整理成英文 Listing、QR 产品页、包装说明和可打印 Product Info Pack。</p>
        <p>Turn messy SKU information into structured English listings, QR product pages, packaging notes and printable product documentation packs.</p>
        <p>This lightweight preview server only shows the landing summary. Use <strong>npm run dev</strong> for the full Next.js app.</p>
        <div class="btns">
          <a class="btn primary" href="/create">创建产品资料包</a>
          <a class="btn secondary" href="/dashboard">控制台 Dashboard</a>
        </div>
        <img src="/images/liucai-product-pack-hero.jpg" alt="Product information pack preview">
      </section>
    </main>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  const requestPath = (req.url || "/").split("?")[0];

  if (requestPath.startsWith("/images/")) {
    const imagePath = requestPath.replace(/^\/images\//, "");
    const filePath = safeJoin("public", "images", imagePath);

    if (filePath && fs.existsSync(filePath)) {
      res.writeHead(200, { "Content-Type": getContentType(filePath) });
      res.end(fs.readFileSync(filePath));
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Image not found.");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Preview ready: http://localhost:3000");
  console.log("For the full app, run: npm run dev");
});

function safeJoin(...parts) {
  const root = process.cwd();
  const filePath = pathModule.join(root, ...parts);
  return filePath.startsWith(root) ? filePath : null;
}

function getContentType(filePath) {
  const extension = pathModule.extname(filePath).toLowerCase();

  if (extension === ".png") {
    return "image/png";
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return "image/jpeg";
  }

  if (extension === ".webp") {
    return "image/webp";
  }

  return "image/svg+xml";
}

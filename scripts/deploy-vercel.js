const { spawnSync } = require("child_process");

console.log("Product Info Pack Generator deployment helper");
console.log("Running a local production build check before deployment.");

const build = spawnSync("npm", ["run", "build"], { stdio: "inherit" });

if (build.status !== 0) {
  process.exit(build.status || 1);
}

console.log("");
console.log("Build completed.");
console.log("Deploy with your existing Vercel project or connected Git repository.");
console.log("Recommended settings:");
console.log("- Framework Preset: Next.js");
console.log("- Build Command: npm run build");
console.log("- Output Directory: default");
console.log("- Custom domain: keep the existing domain attached to this project");

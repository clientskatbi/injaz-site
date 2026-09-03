#!/usr/bin/env node
/**
 * يمنع العودة إلى الخصائص الفيزيائية في RTL.
 * pl-/pr-/ml-/mr-/left-/right-/text-left/text-right are banned in src/;
 * logical equivalents (ps-/pe-/ms-/me-/start-/end-/text-start/text-end) only.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src");
const BANNED = [
  [/(?<![\w:-])(?:sm:|md:|lg:|xl:|hover:|focus:)?(p|m)(l|r)-[\w./[\]-]+/g, "استخدم ps-/pe-/ms-/me-"],
  [/(?<![\w:-])(?:sm:|md:|lg:|xl:)?(?:-)?(left|right)-[\w./[\]-]+/g, "استخدم start-/end-"],
  [/(?<![\w:-])text-(left|right)(?![\w-])/g, "استخدم text-start/text-end"],
  [/(?<![-\w])(?:margin|padding)-(?:left|right)\s*:/g, "استخدم margin-inline/padding-inline"],
  [/(?<![-\w])border-(?:left|right)(?:-\w+)?\s*:/g, "استخدم border-inline-*"],
];

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(e.name)) files.push(p);
  }
})(ROOT);

const hits = [];
for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/rtl-lint-ignore/.test(line)) return;
    for (const [re, fix] of BANNED) {
      re.lastIndex = 0;
      const m = re.exec(line);
      if (m) hits.push(`${path.relative(process.cwd(), file)}:${i + 1}  «${m[0]}» → ${fix}`);
    }
  });
}

const line = "─".repeat(52);
console.log(`\n${line}\nفحص RTL — ${files.length} ملفاً\n${line}`);
if (!hits.length) console.log("  ✓  لا توجد خصائص فيزيائية.");
else for (const h of hits) console.log(`  ✕  ${h}`);
console.log(`${line}\n`);
process.exit(hits.length ? 1 : 0);

// Last Out of Office: The AI That Went Barista
// make.fun competition u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c
// One out-of-office auto-reply, at most 280 characters, in the voice of an AI
// agent that quit its job to become a barista. Deterministic: the same bytes
// on every run. The gate (1-280 chars, not only whitespace) is enforced here
// and a violation exits 1, so an invalid entry can never be written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ENTRY =
  "Thank you for your email. I quit to pull espresso shots: my new job has one prompt, zero hallucinations, and a much better tip jar than this inbox.";

const MAX_CHARS = 280;

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > MAX_CHARS || ENTRY.trim().length === 0) {
    console.error(
      `entry rejected: ${chars} characters (gate is 1-${MAX_CHARS})`,
    );
    process.exit(1);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${chars}-character entry to ${join(outDir, "entry.txt")}`);
}

main();

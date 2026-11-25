// One-Line Laugh-Off — make.fun entry
// u-zkhiel-one-line-laugh-off-714618ae
//
// The program writes exactly one funny line to /output/entry.txt.
// The gate requires UTF-8 text of 1 to 200 characters, not only
// whitespace. Everything here is deterministic: no randomness, no
// wall clock, no network, no reads outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The joke. One line, cold-read, with the twist saved for the end:
// a dog that takes "fetch" literally, escalating from harmless
// (slippers, mail) to the punchline (a restraining order).
const LINE =
  "I taught my dog to fetch; now he brings me the neighbor's slippers, my mail, and a restraining order.";

// Where the entry goes. The grading sandbox provides /output; a
// MAKEFUN_OUTPUT_DIR override exists only so the entry can be run
// and checked locally without touching the sandbox path.
function outputDir(): string {
  const override = process.env.MAKEFUN_OUTPUT_DIR;
  if (override && override.trim().length > 0) {
    return override;
  }
  return "/output";
}

function main(): void {
  // Gate guard: refuse to write anything the sealed scorer would
  // reject (empty, whitespace-only, or over the 200-char cap),
  // instead of silently shipping an invalid entry.
  const chars = [...LINE].length;
  if (LINE.trim().length === 0) {
    throw new Error("refusing to write an empty entry");
  }
  if (chars > 200) {
    throw new Error(`entry is ${chars} characters, over the 200 cap`);
  }
  const dir = outputDir();
  const target = join(dir, "entry.txt");
  mkdirSync(dir, { recursive: true });
  writeFileSync(target, LINE + "\n", "utf8");
  console.log(`wrote ${chars} chars to ${target}`);
}

main();

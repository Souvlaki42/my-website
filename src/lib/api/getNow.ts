import { defineAction, z } from "astro:actions";
import { GITHUB_TOKEN } from "astro:env/server";
import { marked } from "marked";

const rawNowSchema = z.object({
  files: z.object({
    "now.md": z.object({
      content: z.string()
    })
  }),
  updated_at: z.string()
});

export const getNow = defineAction({
  handler: async () => {
    const response = await fetch(
      "https://api.github.com/gists/b0e77ef5301d075e419ffe28074cf272",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      }
    );
    if (!response.ok) throw response;
    const anyData = await response.json();
    const rowNow = rawNowSchema.parse(anyData);
    const content = await marked.parse(rowNow["files"]["now.md"]["content"]);
    const now = {
      content,
      updated: rowNow["updated_at"]
    };

    return now;
  }
});

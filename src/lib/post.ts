import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createServerFn } from "@tanstack/react-start";

export type PostData = {
  id: string;
  title: string;
  publishedAt: string;
  summary: string;
  content: string;
  language?: string;
};

const postsDirectory = path.join(process.cwd(), "content");

function normalizeLanguage(value: unknown): string | undefined {
  const normalized = (value ?? "").toString().trim().toLowerCase();
  return normalized.length > 0 ? normalized : undefined;
}

function parsePostFile(filePath: string, id: string): PostData {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id,
    title: matterResult.data.title || "Untitled",
    publishedAt: matterResult.data.publishedAt || new Date().toISOString(),
    summary: matterResult.data.summary || "No summary available",
    content: matterResult.content || "No content available",
    language: normalizeLanguage(matterResult.data.language),
  };
}

function readBlogPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    return parsePostFile(fullPath, id);
  });

  return allPostsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export const getBlogPosts = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    return readBlogPosts();
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
});

export const getBlogPost = createServerFn({
  method: "GET",
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      if (!fs.existsSync(postsDirectory)) {
        return null;
      }

      const filePath = path.join(postsDirectory, `${data.id}.mdx`);
      if (!fs.existsSync(filePath)) {
        return null;
      }

      return parsePostFile(filePath, data.id);
    } catch (error) {
      console.error(`Error reading blog post: ${data.id}`, error);
      return null;
    }
  });

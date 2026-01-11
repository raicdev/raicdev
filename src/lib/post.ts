import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";

export type PostData = {
  id: string;
  title: string;
  publishedAt: string;
  summary: string;
  content: string;
  language?: string;
};

type MatterResult = {
  data: Record<string, unknown>;
  content: string;
};

function normalizeLanguage(value: unknown): string | undefined {
  const normalized = (value ?? "").toString().trim().toLowerCase();
  return normalized.length > 0 ? normalized : undefined;
}

function buildPostData(id: string, matterResult: MatterResult): PostData {
  return {
    id,
    title:
      typeof matterResult.data.title === "string"
        ? matterResult.data.title
        : "Untitled",
    publishedAt:
      typeof matterResult.data.publishedAt === "string"
        ? matterResult.data.publishedAt
        : new Date().toISOString(),
    summary:
      typeof matterResult.data.summary === "string"
        ? matterResult.data.summary
        : "No summary available",
    content: matterResult.content || "No content available",
    language: normalizeLanguage(matterResult.data.language),
  };
}

const readBlogPosts = createServerOnlyFn(async (): Promise<PostData[]> => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const { default: matter } = await import("gray-matter");
  const postsDirectory = path.join(process.cwd(), "content");

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
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return buildPostData(id, matterResult as MatterResult);
  });

  return allPostsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

const readBlogPost = createServerOnlyFn(
  async (id: string): Promise<PostData | null> => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { default: matter } = await import("gray-matter");
    const postsDirectory = path.join(process.cwd(), "content");

    if (!fs.existsSync(postsDirectory)) {
      return null;
    }

    const filePath = path.join(postsDirectory, `${id}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(fileContents);
    return buildPostData(id, matterResult as MatterResult);
  },
);

export const getBlogPosts = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    return await readBlogPosts();
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
      return await readBlogPost(data.id);
    } catch (error) {
      console.error(`Error reading blog post: ${data.id}`, error);
      return null;
    }
  });

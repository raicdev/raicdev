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

function getPostId(filePath: string): string {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const fileName = normalizedPath.split("/").pop() ?? normalizedPath;
  return fileName.replace(/\.mdx$/, "");
}

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
  const { default: matter } = await import("gray-matter");
  const postSources = import.meta.glob("../../content/*.mdx", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const allPostsData = Object.entries(postSources).map(([filePath, rawContent]) => {
    const id = getPostId(filePath);
    const matterResult = matter(rawContent);
    return buildPostData(id, matterResult as MatterResult);
  });

  return allPostsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

const readBlogPost = createServerOnlyFn(
  async (id: string): Promise<PostData | null> => {
    const { default: matter } = await import("gray-matter");
    const postSources = import.meta.glob("../../content/*.mdx", {
      query: "?raw",
      import: "default",
      eager: true,
    }) as Record<string, string>;

    const normalizedId = id.replace(/\.mdx$/, "");
    const matchKey = Object.keys(postSources).find(
      (filePath) => getPostId(filePath) === normalizedId,
    );

    if (!matchKey) {
      return null;
    }

    const matterResult = matter(postSources[matchKey]);
    return buildPostData(normalizedId, matterResult as MatterResult);
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

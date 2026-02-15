import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getBlogPost } from "@/lib/post";

export const Route = createFileRoute("/blog/$id")({
  loader: async ({ params }) => {
    const post = await getBlogPost({ data: { id: params.id } });

    if (!post) {
      throw notFound();
    }

    return post;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Blog"} | rai.bio` }],
  }),
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors animate-in fade-in duration-500"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="group-hover:underline underline-offset-4">Back to Blog</span>
        </Link>

        <div className="space-y-3 animate-in fade-in duration-700 delay-100">
          <h1 className="text-4xl font-bold bg-linear-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            {post.title}
          </h1>
          <p className="text-base text-muted-foreground animate-in fade-in slide-in-from-left-3 duration-700 delay-200">
            {post.summary}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-left-2 duration-500 delay-300">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="border-b border-border animate-in fade-in duration-700 delay-400" />
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

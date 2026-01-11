import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <div className="relative">
      <div className="absolute left-0 top-[-48px] z-10">
        <Button variant="ghost" asChild>
          <Link to="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full mb-16">
          <h1 className="text-5xl font-semibold text-foreground tracking-tight mb-2">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.summary}</p>
          <div className="flex items-center gap-2 mt-4">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

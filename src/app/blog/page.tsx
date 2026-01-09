import { ArrowUpRight, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBlogPosts } from "@/lib/post";

type Props = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const posts = getBlogPosts();

  // Determine selected language from search params (server-side)
  const selectedLang = ((await searchParams)?.lang || "jp").toLowerCase();

  const filteredPosts =
    selectedLang && selectedLang !== "all"
      ? posts.filter((p) => (p.language || "en").toLowerCase() === selectedLang)
      : posts;

  return (
    <div className="space-y-16">
      {/* Header */}
      <header className="space-y-4 animate-in fade-in duration-700">
        <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-muted-foreground text-base animate-in fade-in slide-in-from-left-3 duration-700 delay-100">
          Thoughts on code and technology
        </p>
      </header>

      {/* Blog Posts Section */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        {/* Filter controls */}
        <Tabs value={selectedLang || "jp"} className="mb-6">
          <TabsList>
            <TabsTrigger value="jp" asChild>
              <Link href={{ pathname: "/blog", query: { lang: "jp" } }}>日本語</Link>
            </TabsTrigger>
            <TabsTrigger value="en" asChild>
              <Link href={{ pathname: "/blog", query: { lang: "en" } }}>English</Link>
            </TabsTrigger>
            <TabsTrigger value="all" asChild>
              <Link href={{ pathname: "/blog", query: { lang: "all" } }}>すべて</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className="group block space-y-2 p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-border hover:shadow-sm animate-in fade-in slide-in-from-left-2"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                  {post.title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

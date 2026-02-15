import { Link, createFileRoute } from "@tanstack/react-router";
import { SiGithub, SiSpotify, SiX } from "@icons-pack/react-simple-icons";
import { ArrowUpRight, Triangle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectsList } from "@/components/projects-list";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const musics = [
  {
    title: "IOWA",
    artist: "10-FEET",
    link: "https://open.spotify.com/track/1yfXHFxvek4mnILRnedKEo",
    image: "https://i.scdn.co/image/ab67616d00001e02ad4304aa5996fa75dea55154",
  },
  {
    title: "Sono Mukoue",
    artist: "10-FEET",
    link: "https://open.spotify.com/track/0vGTbYvJkMOzwlgxHViUfE",
    image: "https://i.scdn.co/image/ab67616d00001e0263674809f0964e14b28a14d6",
  },
  {
    title: "Shinkirou",
    artist: "10-FEET",
    link: "https://open.spotify.com/track/3wsI1dAwxVngYgg5LHwyR9",
    image: "https://i.scdn.co/image/ab67616d00001e0263674809f0964e14b28a14d6",
  },
  {
    title: "Kaze",
    artist: "10-FEET",
    link: "https://open.spotify.com/track/7tN4bCOV1UMseE3JXkROWD",
    image: "https://i.scdn.co/image/ab67616d00001e028652baadc97a3c2d95307e2e",
  },
  {
    title: "VIBES BY VIBES",
    artist: "10-FEET, WANIMA",
    link: "https://open.spotify.com/track/4IQ8TRkM7s24li5Y6xbEtp",
    image: "https://i.scdn.co/image/ab67616d00001e0280939e7013adeaa97c89febd",
  },
  {
    title: "JOY",
    artist: "WANIMA",
    link: "https://open.spotify.com/track/1TdYXsTtYbud0IieSW5wbh",
    image: "https://i.scdn.co/image/ab67616d00001e02a47ebd6c2e33bda905c84f87",
  },
  {
    title: "BOUNCE",
    artist: "WANIMA",
    link: "https://open.spotify.com/track/17HSDvPT3OGWnyiAJkh5Uw",
    image: "https://i.scdn.co/image/ab67616d00001e02a47ebd6c2e33bda905c84f87",
  },
  {
    title: "CHEEKY",
    artist: "WANIMA",
    link: "https://open.spotify.com/track/65ttzt1Dh390yjQssY5maw",
    image: "https://i.scdn.co/image/ab67616d00001e02be77ec342dae727a2ce8c7d7",
  },
  {
    title: "Takaramono",
    artist: "WANIMA",
    link: "https://open.spotify.com/track/4bcTGxE7oljiiStL4jItFB",
    image: "https://i.scdn.co/image/ab67616d00001e02a47ebd6c2e33bda905c84f87",
  },
];

const socialLinks = [
  { name: "X", icon: SiX, href: "https://x.com/raicdev" },
  { name: "GitHub", icon: SiGithub, href: "https://github.com/raicdev" },
  { name: "Spotify", icon: SiSpotify, href: "https://open.spotify.com/user/31xxxxxx" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "rai.bio" }],
  }),
  component: Home,
});

function Home() {
  const [musicCarouselApi, setMusicCarouselApi] = useState<CarouselApi | null>(null);
  const autoScrollPausedRef = useRef(false);
  const autoScrollResumeTimeoutRef = useRef<number | null>(null);

  const pauseAutoScroll = useCallback(() => {
    autoScrollPausedRef.current = true;
    if (autoScrollResumeTimeoutRef.current) {
      window.clearTimeout(autoScrollResumeTimeoutRef.current);
      autoScrollResumeTimeoutRef.current = null;
    }
  }, []);

  const scheduleAutoScrollResume = useCallback(() => {
    if (autoScrollResumeTimeoutRef.current) {
      window.clearTimeout(autoScrollResumeTimeoutRef.current);
    }
    autoScrollResumeTimeoutRef.current = window.setTimeout(() => {
      autoScrollPausedRef.current = false;
      autoScrollResumeTimeoutRef.current = null;
    }, 2000);
  }, []);

  useEffect(() => {
    if (!musicCarouselApi) return;

    const interval = setInterval(() => {
      if (autoScrollPausedRef.current) return;
      if (musicCarouselApi.canScrollNext()) {
        musicCarouselApi.scrollNext();
      } else {
        musicCarouselApi.scrollTo(0);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [musicCarouselApi]);

  useEffect(() => {
    if (!musicCarouselApi) return;

    musicCarouselApi.on("pointerDown", pauseAutoScroll);
    musicCarouselApi.on("pointerUp", scheduleAutoScrollResume);

    return () => {
      musicCarouselApi.off("pointerDown", pauseAutoScroll);
      musicCarouselApi.off("pointerUp", scheduleAutoScrollResume);
    };
  }, [musicCarouselApi, pauseAutoScroll, scheduleAutoScrollResume]);

  useEffect(() => {
    return () => {
      if (autoScrollResumeTimeoutRef.current) {
        window.clearTimeout(autoScrollResumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-16">
      <header className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-1 bg-linear-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent animate-in fade-in duration-700">
              rai
            </h1>
            <p className="text-muted-foreground text-base animate-in fade-in slide-in-from-left-3 duration-700 delay-100">
              Programmer, Full-Stack Developer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <span className="group-hover:underline underline-offset-4 decoration-2 transition-all">
                {link.name}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          ))}
        </div>
      </header>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <span className="text-muted-foreground inline-block hover:rotate-180 transition-transform duration-500">
              <Triangle className="w-4 h-4" />
            </span>
            <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <Link
            to="/projects"
            className="group text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
          >
            <span className="group-hover:underline underline-offset-4">View All Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <ProjectsList />
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
          <SiSpotify className="w-4 h-4 animate-spotify-pulse text-[#1DB954]" />
          <span className="bg-linear-to-r from-foreground via-[#1DB954]/60 to-foreground bg-clip-text text-transparent">
            Favorite Music
          </span>
        </h2>

        <Carousel
          opts={{ align: "start", dragFree: true, containScroll: "keepSnaps" }}
          setApi={setMusicCarouselApi}
          className="relative -mx-4 px-4 overflow-hidden"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={scheduleAutoScrollResume}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={scheduleAutoScrollResume}
        >
          <CarouselContent className="py-2 pr-0 ml-0">
            {musics.map((music, index) => (
              <CarouselItem key={music.title} className="basis-full pl-0">
                <div
                  className="relative w-full h-36 rounded-lg overflow-hidden select-none animate-in fade-in zoom-in-50"
                  style={{ animationDelay: `${600 + index * 100}ms`, userSelect: "none" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-2xl scale-105"
                    style={{ backgroundImage: `url(${music.image})` }}
                  />

                  <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black" />

                  <div className="relative z-10 p-4 flex flex-col justify-between h-36">
                    <div className="absolute top-2 right-2">
                      <SiSpotify size={24} className="text-white/70" />
                    </div>
                    <div className="flex justify-between items-center gap-3 h-full">
                      <img
                        src={music.image}
                        alt={music.title}
                        width={96}
                        height={96}
                        loading="lazy"
                        className="rounded-md min-w-16 max-w-24"
                      />
                      <div className="min-w-0 text-right mt-auto">
                        <a href={music.link} target="_blank" rel="noreferrer">
                          <div className="text-base font-semibold tracking-tight text-white truncate">
                            {music.title}
                          </div>
                          <div className="text-sm font-medium text-white/70 truncate">
                            {music.artist}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </section>
    </div>
  );
}

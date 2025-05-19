import type { Route } from "./+types/home";
import SiteCard from "../components/SiteCard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "첫페이지 모음" },
    { name: "description", content: "각 커뮤니티의 인기 게시글을 한눈에 볼 수 있습니다." },
  ];
}

export default function Home() {
  const dummySites = [
    {
      site: "디시인사이드",
      posts: [
        { title: "[HOT] 오늘의 베스트 인기글!", href: "https://example.com/post/1", date: "2025-05-19" },
        { title: "화제의 게시글을 확인하세요.", href: "https://example.com/post/2", date: "2025-05-18" },
        { title: "이슈가 되고 있는 게시글 모음!", href: "https://example.com/post/3", date: "2025-05-17" },
      ],
    },
    {
      site: "클리앙",
      posts: [
        { title: "클리앙 인기글 1", href: "https://clien.net/post/1", date: "2025-05-19" },
        { title: "클리앙 인기글 2", href: "https://clien.net/post/2", date: "2025-05-18" },
      ],
    },
  ];

  return (
    <main className="w-full max-w-6xl mx-auto px-1 sm:px-2 py-4">
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {dummySites.map((siteData, idx) => (
          <SiteCard key={siteData.site + idx} site={siteData.site} posts={siteData.posts} />
        ))}
      </div>
    </main>
  );
}

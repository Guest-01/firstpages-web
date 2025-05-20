import type { Route } from "./+types/home";
import SiteCard from "../components/SiteCard";
import { useLoaderData } from "react-router";

export async function loader() {
  // 서버에서만 동작하도록 동적 import 사용
  const fs = await import("fs");
  const path = await import("path");
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.resolve(__dirname, "../../scraped_data/all_articles.json");
  const file = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(file);
  return new Response(JSON.stringify(articles), {
    headers: { "Content-Type": "application/json" },
  });
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "첫페이지 모음" },
    { name: "description", content: "각 커뮤니티의 인기 게시글을 한눈에 볼 수 있습니다." },
  ];
}

export default function Home() {
  const articles = useLoaderData() as Record<string, { title: string; href: string; date: string }[]>;
  return (
    <main className="w-full max-w-6xl mx-auto px-1 sm:px-2 py-4">
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(articles).map(([site, posts]) => (
          <SiteCard key={site} site={site} posts={posts} />
        ))}
      </div>
    </main>
  );
}

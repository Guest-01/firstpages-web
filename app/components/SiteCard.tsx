import React, { useState } from "react";

type Post = {
  title: string;
  href: string;
  date: string;
};

interface PostCardProps {
  site: string;
  posts: Post[];
}

export default function PostCard({ site, posts }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const visiblePosts = expanded ? posts : posts.slice(0, 5);

  const handlePostClick = (href: string) => {
    const openInNewTab = window.localStorage.getItem("openInNewTab") !== "false";
    if (openInNewTab) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="card bg-base-100 border border-primary shadow-lg shadow-primary-content w-full">
      <div className="card-body p-2 sm:p-3">
        <div className="flex items-center gap-2 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75v10.128a1.125 1.125 0 01-1.636.99l-3.114-1.78a.375.375 0 00-.364 0l-3.114 1.78A1.125 1.125 0 015.25 16.878V6.75A2.25 2.25 0 017.5 4.5h9a2.25 2.25 0 012.25 2.25z" />
          </svg>
          <span className="text-base font-bold text-base-content tracking-tight">{site}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <tbody>
              {visiblePosts.map((post, idx) => (
                <tr key={idx} className="hover:bg-primary/10 transition-colors">
                  <td className="p-1">
                    <div
                      role="button"
                      tabIndex={0}
                      className="text-base-content line-clamp-1 cursor-pointer select-none hover:underline focus:underline outline-none"
                      onClick={() => handlePostClick(post.href)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') handlePostClick(post.href);
                      }}
                      aria-label={post.title}
                    >
                      {post.title}
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-xs text-base-content/40 text-right align-middle p-1">{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {posts.length > 5 && (
          <button
            className="btn btn-xs btn-ghost mt-1 flex items-center gap-1 mx-auto"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? '접기' : '더보기'}
          >
            {expanded ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                접기
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                더보기
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

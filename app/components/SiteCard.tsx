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
  return (
    <div className="card bg-white dark:bg-gray-900 border border-primary shadow-lg shadow-primary-content w-full">
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
              {posts.map((post, idx) => (
                <tr key={idx} className="hover:bg-primary/10 transition-colors">
                  <td className="p-1">
                    <a
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-hover text-base-content line-clamp-1"
                    >
                      {post.title}
                    </a>
                  </td>
                  <td className="whitespace-nowrap text-xs text-base-content/40 text-right align-middle p-1">{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

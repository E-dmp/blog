import { client } from '../libs/client';
import { Article } from '../types/article';
import Link from 'next/link';

type Props = {
  blogs: Array<Article>;
};
export default function Home ({ blogs }: Props) {
  return (
    <>
      <div className="p-20 grid grid-cols-3 gap-3">
        {blogs.map(article => (
          <div
            className="w-5/6 rounded overflow-hidden mx-auto border-2"
            key={article.id}>
            <Link href={`/article/${article.id}`} passHref>
              <div className="w-4/4 h-60">
                <img
                  className="w-full h-full object-cover"
                  src={article.eye_catch.url}
                  alt=""
                />
              </div>

              <div className="p-5">
                
                  {(() => {
                    if (article.title.length < 60) {
                      return <h3>{article.title}</h3>;
                    } else {
                      return <h3>{article.title.slice(0, 60) + '...'}</h3>;
                    }
                  })()}
         
              </div>
              <div className="px-5 pb-2">
                {article.tag && (
                  <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700  mb-2">
                    #{article.tag}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blogs: data.contents,
    },
  };
};

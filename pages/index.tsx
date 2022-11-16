import { client } from '../libs/client';
import { Article } from '../types/article';
import Link from 'next/link';

type Props = {
  blogs: Array<Article>;
};
export default function Home ({ blogs }: Props) {
  return (
    <>
      <h1 className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1>
      <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blogs.map(article => (
          <div className="rounded overflow-hidden shadow-lg" key={article.id}>
            <img
              className="w-full"
              src={article.eye_catch.url}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <Link href={`/article/${article.id}`} passHref>
                <h4>{article.title}</h4>
              </Link>
            </div>

            <div className="px-6 pt-4 pb-2">
              {article.tag && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{article.tag}
                </span>
              )}
            </div>
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

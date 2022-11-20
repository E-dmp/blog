import { GetServerSideProps } from 'next';
import { client } from '../../libs/client';

import cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css';

export default function Article ({ blogs, highlightedBody }: any) {
  return (
    <div className="bg-gray-50">
      <div className="px-10 py-6 mx-auto">
        <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
          {/* <img
            className="object-cover w-3/4 shadow-sm h-full"
            src={blogs.eye_catch.url}
          /> */}
          <div className="mt-2">
            <div className="sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-blue-500">
              {blogs.title}
            </div>
          </div>
          {blogs.tag && (
            <div className="flex items-center justify-start mt-4 mb-4">
              <div className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg">
                #{blogs.tag}
              </div>
            </div>
          )}
          <div className="mt-2">
            {/* 入力するのは自分だけなのでdangerouslySetInnerHTML */}
            <div
              dangerouslySetInnerHTML={{ __html: highlightedBody }}
              className="text-2xl text-gray-700 mt-4 rounded "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });

  const paths = data.contents.map(
    (content: { id: any }) => `/article/${content.id}`,
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: any } }) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id });

  const $ = cheerio.load(data.body);

  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      blogs: data,
      highlightedBody: $.html(),
    },
  };
};

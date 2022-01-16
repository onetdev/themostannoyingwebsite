import { GetServerSideProps, NextPage } from "next";
import Error from 'next/error';
import Head from "next/head";
import { useAppSelector } from "@/redux/hooks";
import { selectContentPaywall } from "@/redux/stores/experience";
import LockedContent from "@/components/tricks/LockedContent";
import ArticleService from "@/services/ArticleService";

interface Props {
  slug: string;
}

const ArticleItem: NextPage<Props> = ({ slug }: Props) => {
  const showLocker = useAppSelector(selectContentPaywall);
  const article = ArticleService.getBySlug(slug);

  if (!article) {
    return <Error statusCode={404} />
  }

  return (
    <main>
      <Head>
        <title>{article.title}</title>
        <meta property="og:type" content="article" />
        <meta name="og:description" content={article.intro || article.title} />
        {article.coverImage && <meta property="og:image" content={article.coverImage} />}
      </Head>
      <h1>{article.title}</h1>
      <span>Published on {article.date.toDateString()}</span>
      <LockedContent initialMaxHeight={200} active={showLocker}>
        {article.body}
      </LockedContent>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = ctx.query.slug as string;
  return {
    props: { slug },
  };
};

export default ArticleItem;

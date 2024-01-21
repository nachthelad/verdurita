import Head from "next/head";

type MetaProps = {
  name?: string;
  content?: string;
  property?: string;
}

type CustomHeadProps = {
  title?: string;
  description?: string;
  metaTags?: MetaProps[];
}

const CustomHead: React.FC<CustomHeadProps> = ({
  title = "verdurita",
  description = "Cotizaciones en tiempo real",
  metaTags = [],
}) => (
  <Head>
    <html lang="es" />
    <title>{title}</title>
    <meta charSet="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {metaTags.map((tag, index) => (
      <meta key={index} {...tag} />
    ))}
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default CustomHead;

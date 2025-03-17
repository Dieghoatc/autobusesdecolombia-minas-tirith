interface MetadataProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function Metadata(data : MetadataProps) {
  return (
    <>
      <meta name="description" content={data.description} />
      <link rel="canonical" href={data.url} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="Autobusesdecolobmia.com"></meta>
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp"></meta>
      <meta property="og:url" content={data.url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Título para Twitter" />
      <meta name="twitter:description" content="Descripción para Twitter" />
      <meta name="twitter:image" content={data.image} />
    </>
  );
}

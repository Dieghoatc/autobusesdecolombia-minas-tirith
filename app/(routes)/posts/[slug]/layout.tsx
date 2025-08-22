import { postByIdQuery } from "@/services/api/postById.query";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

interface LayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const postId = Number(resolvedParams.slug.toString().split("_")[0]);
    const post = await postByIdQuery(postId);

    if (!post) {
      return {
        title: "Post no encontrado | Autobuses de Colombia",
        description: "El post que buscas no está disponible.",
      };
    }

    const postImage = post.image_url || "";
    const postTitle = post.title || "";
    const postResume = post.resume || "";

    const title = `${postTitle}`;
    const description = `${postResume}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: postImage
          ? [
              {
                url: postImage,
                width: 1200,
                height: 630,
                alt: `${postResume}`,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error | Autobuses de Colombia",
      description:
        "Ha ocurrido un error al cargar la información del vehículo.",
    };
  }
}

export default function PostLayout({ children }: LayoutProps) {
  return <section>{children}</section>;
}

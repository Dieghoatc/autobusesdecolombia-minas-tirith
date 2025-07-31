import { Header } from "./header/Header";
import { Title } from "./title/Title";
import { Author } from "./author/Author";
import { Image } from "./image/Image";
import { Paragraph } from "./paragraph/Paragraph";
import { Quote } from "./quote/Quote";
import { List } from "./list/List";
import { Fact } from "./fact/Fact";

import styles from "./RenderBlocks.module.css";
import { PostBlock } from "@/services/types/post.type";

interface RenderBlocksProps {
  blocks: PostBlock[];
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  return (
    <section className={styles.container}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "header":
            return (
              <section key={i}>
                <Header items={block.children} />
              </section>
            );

          case "heading":
            return (
              <section key={i}>
                <Title level={block.level} text={block.text} />
              </section>
            );

          case "author":
            return (
              <section key={i}>
                <Author author={block.text} />
              </section>
            );
          case "image":
            return (
              <section key={i}>
                <Image
                  src={block.src}
                  alt={block.alt}
                  overlay={block.overlay}
                  photograper={block.authorPhoto}
                />
              </section>
            );
          case "paragraph":
            return <Paragraph key={i} level={block.level} text={block.text} />;

          case "quote":
            return <Quote key={i} text={block.text} author={block.author} />;

          case "list":
            return <List key={i} style={block.style} items={block.items} />;

          case "fact":
            return (
              <section key={i}>
                <Fact title={block.heading} text={block.text} />
              </section>
            );

          default:
            return null;
        }
      })}
    </section>
  );
}

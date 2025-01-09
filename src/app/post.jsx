import { PrismicImage, PrismicRichText } from "@prismicio/react";
import { dateResolver } from "@/utils/helpers";

const Post = (newsItem) => {
  const resolvedDate = dateResolver(newsItem.first_publication_date.split("T")[0]);

  return (
    <div className="flex flex-col gap-2 text-justify px-4">
      <PrismicImage field={newsItem.data.image} className="w-full h-[350px] object-cover object-center" />
      <h1 className="mt-2">{newsItem.data.title[0].text}</h1>
      <h4 className="pb-2 border-b border-primary">{`${resolvedDate.day} ${resolvedDate.month} ${resolvedDate.year}`}</h4>
      <PrismicRichText field={newsItem.data.body} />
    </div>
  );
};

export default Post;
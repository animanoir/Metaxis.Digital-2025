import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type IndividualBlogPost = {
  slug: string,
  title: string,
  image: string,
  date: string,
  description: string,
  author: string
  featuredArticle: boolean
}

const IndividualBlogPost = ({
  slug, title, image, date, description, author, featuredArticle
}: IndividualBlogPost) => {
  return (
    <div className={`${featuredArticle
      ? "w-full mx-auto pb-10 font-[Karla] border-b-2 border-gray-200 mb-16"
      : "w-2/5 mx-auto pb-20 font-[Karla] md:w-3/5 sm:w-full sm:pb-0"}`}>
      <div className={`${featuredArticle ? "flex flex-col md:flex-row gap-8" : ""}`}>
        <Link href={`/blog/${slug}`} className={`${featuredArticle ? "block md:w-3/5" : "block"}`}>
          <Image
            style={{ objectFit: "cover" }}
            alt={title}
            src={image}
            width={featuredArticle ? 800 : 500}
            height={featuredArticle ? 500 : 300}
            className={`w-full mb-4 hover:opacity-90 transition-opacity ${featuredArticle ? "h-[400px]" : ""}`}
          />
        </Link>
        <Link href={`/blog/${slug}`}>
          <div className={`${featuredArticle ? "md:w-2/5 flex flex-col justify-center" : ""}`}>
            <p className={`font-[Karla] ${featuredArticle ? "text-xl" : "text-lg"} m-0 text-black`}>
              {date}
            </p>
            <h2 className={`text-black ${featuredArticle ? "text-5xl md:text-6xl my-4" : "text-3xl"} hover:text-[#dc143c] transition-colors`}>
              {title}
            </h2>
            <h4 className={`my-2 font-[Lora] font-normal ${featuredArticle ? "text-xl" : "text-base"} text-black p-0 w-fit`}>
              {description}
            </h4>
            <h5 className={`${featuredArticle ? "text-2xl mt-6" : "text-xl"} text-right`}>
              <span className="font-normal">por </span>
              {author}
            </h5>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default IndividualBlogPost
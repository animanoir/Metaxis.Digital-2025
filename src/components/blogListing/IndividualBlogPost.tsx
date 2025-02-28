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
      ? `relative h-screen transform-none  `
      : "w-2/5 mx-auto pb-20 md:w-3/5 sm:w-full sm:pb-0"}`}>

      {featuredArticle ? (
        // Featured article - full viewport with centered content
        <>
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Centered content */}
          <Link href={`/blog/${slug}`}>
            <div className="absolute inset-0 flex items-center justify-center text-center p-8">
              <div className="max-w-3xl bg-black p-8 rounded-lg">
                <p className=" text-xl m-0 text-white">{date}</p>
                <h2 className="text-white text-5xl md:text-6xl my-4 hover:text-[#dc143c] transition-colors">
                  {title}
                </h2>
                <h4 className="my-2 font-[Lora] font-normal text-xl text-white p-0 mx-auto">
                  {description}
                </h4>
                <h5 className="text-2xl mt-6 text-white">
                  <span className="font-normal">por </span>
                  {author}
                </h5>
              </div>
            </div>
          </Link>
        </>
      ) : (
        // Regular article layout
        <div className="font-[Karla] mx-auto py-25 w-lg">
          <Link href={`/blog/${slug}`} className="block">
            <Image
              style={{ objectFit: "cover" }}
              alt={title}
              src={image}
              width={500}
              height={300}
              className="w-full mb-4 hover:opacity-50 transition-opacity"
            />
            <div>
              <p className="font-[Karla] text-lg m-0 text-black">{date}</p>
              <h2 className="text-black text-3xl hover:text-[#dc143c] transition-colors">{title}</h2>
              <h4 className="my-2 font-[Lora] font-normal text-base text-black p-0 w-fit">{description}</h4>
              <h5 className="text-xl text-right">
                <span className="font-normal">por </span>
                {author}
              </h5>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default IndividualBlogPost
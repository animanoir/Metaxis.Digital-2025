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
  featuredArticle: boolean,
  concepts: string[]
}

const IndividualBlogPost = ({
  slug, title, image, date, description, author, featuredArticle, concepts
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
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-4xl p-8 rounded-lg text-left">
              <Link href={`/blog/${slug}`}>
                <p className="font-[Karla] text-xl m-0 mb-2 text-white bg-black px-4 py-2 rounded inline-block">{date}</p>
                <h2 className="text-white font-bold text-5xl md:text-7xl my-4 bg-black px-4 py-2 rounded hover:text-[#dc143c] transition-colors text-left w-fit">
                  {title}
                </h2>
                <h4 className="my-2 font-[Lora] font-normal text-xl text-white p-0 bg-black px-4 py-2 rounded text-left w-fit">
                  {description}
                </h4>
                <h5 className="font-[Lora] text-5 mt-6 text-white bg-black px-4 py-2 rounded inline-block">
                  <span className="font-normal">por </span>
                  {author}
                </h5>
              </Link>
            </div>
          </div>
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
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-[Karla] text-lg m-0 mb-2 bg-black text-white px-3 py-1 rounded inline-block">{date}</p>
              <h2 className="text-black text-3xl hover:text-[#dc143c] transition-colors bg-gray-100 px-3 py-2 rounded w-fit">{title}</h2>
              <h4 className="my-2 font-[Lora] font-normal text-base text-black bg-gray-100 px-3 py-2 rounded w-fit">{description}</h4>
              <h5 className="text-xl bg-black text-white px-3 py-1 rounded inline-block mt-2">
                <span className="font-normal">por </span>
                {author}
              </h5>
            </div>
          </Link>
          <div className="mt-3 flex flex-wrap gap-2">
            {concepts.map((concept) => (
              <Link key={concept} href={`/conceptos/${concept.toLowerCase()}`} className="bg-gray-200 hover:bg-black hover:text-white px-3 py-1 rounded text-sm transition-colors">
                {concept}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IndividualBlogPost
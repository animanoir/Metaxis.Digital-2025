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
      ? `relative h-screen transform-none`
      : "w-full lg:w-2/5 md:w-3/5 mx-auto pb-10 md:pb-20 px-4 sm:px-6 md:px-0"}`}>

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
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 ">
            <div className="max-w-4xl p-4 md:p-8 rounded-lg text-left">
              <Link href={`/blog/${slug}`}>
                <p className="font-[Karla] text-base md:text-xl m-0 mb-2 text-white bg-black px-3 py-1 md:px-4 md:py-2 rounded inline-block">{date}</p>
                <h2 className=" text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl my-3 md:my-4 bg-black px-3 py-1 md:px-4 md:py-2 rounded hover:text-[#dc143c] transition-colors text-left w-fit">
                  {title}
                </h2>
                <h4 className="my-2 font-[Lora] font-normal text-base md:text-xl text-white p-0 bg-black px-3 py-1 md:px-4 md:py-2 rounded text-left w-fit line-clamp-3 md:line-clamp-none">
                  {description}
                </h4>
                <h5 className="font-[Lora] text-sm md:text-base text-white bg-black px-3 py-1 md:px-4 md:py-2 rounded inline-block">
                  <span className="font-normal">por </span>
                  {author}
                </h5>
              </Link>
            </div>
          </div>
        </>
      ) : (
        // Regular article layout
        <div className="font-[Karla] mx-auto py-6 md:py-25 w-full">
          <Link href={`/blog/${slug}`} className="block">
            <Image
              style={{ objectFit: "cover" }}
              alt={title}
              src={image}
              width={500}
              height={300}
              className="w-full h-48 sm:h-64 object-cover mb-4 hover:opacity-50 transition-opacity rounded-t-lg"
            />
          </Link>
          <div className="bg-gray-50 p-3 md:p-4 rounded-b-lg">
            <p className="font-[Karla] text-base md:text-lg m-0 mb-2 bg-black text-white px-2 py-1 md:px-3 rounded inline-block">{date}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {concepts.map((concept) => (
                <Link key={concept} href={`/conceptos/${concept.toLowerCase()}`} className="bg-gray-200 hover:bg-black hover:text-white px-2 py-1 md:px-3 rounded text-xs md:text-sm transition-colors">
                  {concept}
                </Link>
              ))}
            </div>
            <Link href={`/blog/${slug}`} className="block">
              <h2 className="mt-5 text-black text-2xl md:text-3xl hover:text-[#dc143c] transition-colors bg-gray-100 px-2 py-1 md:px-3 md:py-2 rounded w-fit line-clamp-2">{title}</h2>
            </Link>
            <h4 className="my-2 font-[Lora] font-normal text-sm md:text-base text-black bg-gray-100 px-2 py-1 md:px-3 md:py-2 rounded w-fit line-clamp-3">{description}</h4>
            <h5 className="text-base md:text-xl bg-black text-white px-2 py-1 md:px-3 rounded inline-block mt-2 ml-auto float-right">
              <span className="font-normal">por </span>
              {author}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndividualBlogPost
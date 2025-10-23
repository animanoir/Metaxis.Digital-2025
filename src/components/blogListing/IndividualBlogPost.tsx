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
                  <span className="font-normal">by</span>
                  {author}
                </h5>
              </Link>
            </div>
          </div>
        </>
      ) : (
        // Regular article layout
        <div className="font-[Karla] mx-auto md:pt-25 w-full">
          <Link href={`/blog/${slug}`} className="block group">
            <div className="relative h-96 sm:h-[28rem] overflow-hidden rounded-lg">
              <Image
                style={{ objectFit: "cover" }}
                alt={title}
                src={image}
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                {/* Top section - Date and Concepts */}
                <div className="flex flex-col gap-3">
                  <p className="font-[Karla] text-sm md:text-base m-0 bg-black/70 text-white px-3 py-1 rounded inline-block w-fit backdrop-blur-sm">{date}</p>
                  <div className="flex flex-wrap gap-2">
                    {concepts.map((concept) => (
                      <span key={concept} className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 md:px-3 rounded text-xs md:text-sm hover:bg-white/30 transition-colors">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom section - Title, Description, Author */}
                <div className="space-y-2">
                  <h2 className="text-white text-2xl md:text-3xl font-bold group-hover:text-[#dc143c] transition-colors line-clamp-2">
                    {title}
                  </h2>
                  <h4 className="font-[Lora] font-normal text-sm md:text-base text-gray-200 line-clamp-2">
                    {description}
                  </h4>
                  <h5 className="text-sm md:text-base bg-black/70 text-white px-3 py-1 rounded inline-block backdrop-blur-sm">
                    <span className="font-normal">por </span>
                    {author}
                  </h5>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default IndividualBlogPost
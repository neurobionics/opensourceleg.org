interface PageHeroProps {
  title: string
  description: string
  className?: string
}

export function PageHero({ title, description, className = "" }: PageHeroProps) {
  return (
    <div className={`py-12 px-4 sm:px-6 ${className}`}>
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
} 
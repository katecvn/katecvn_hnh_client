interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-4 md:mb-6 px-3 ">
      <div className="flex flex-wrap items-center space-x-2 text-[0.8rem] md:text-sm">
        {items.map((item, index) => (
          <span key={index} className="flex items-center space-x-2">
            {item.href ? (
              <a
                href={item.href}
                className="text-gray-500  hover:text-green-cyan-500 hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-semibold bg-lime-green bg-clip-text text-transparent">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

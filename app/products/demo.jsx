import React, { useState, useEffect, useRef } from 'react';

const AnimatedSection1 = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={`
        relative
        transform transition-all duration-700 ease-out
        ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }
        ${isHovered ? 'translate-y-[-4px] scale-105' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Hiệu ứng gradient border khi hover */}
      <div
        className={`
        absolute inset-0 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        rounded-lg opacity-0 transition-opacity duration-300
        ${isHovered ? 'opacity-20' : ''}
        blur-sm
      `}
      />

      {/* Hiệu ứng ánh sáng */}
      <div
        className={`
        absolute inset-0 
        bg-gradient-to-r from-transparent via-white to-transparent
        opacity-0 transition-all duration-500
        ${isHovered ? 'opacity-10 translate-x-full' : 'translate-x-[-100%]'}
        skew-x-12
      `}
      />

      {/* Nội dung chính */}
      <div className="relative z-10">{children}</div>

      {/* Hiệu ứng particles khi hover */}
      {isHovered && (
        <>
          <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
          <div
            className="absolute top-4 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="absolute bottom-4 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping"
            style={{ animationDelay: '0.4s' }}
          />
          <div
            className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{ animationDelay: '0.6s' }}
          />
        </>
      )}
    </div>
  );
};

// Component demo để test hiệu ứng
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-lg border ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="p-6 pb-4">{children}</div>;

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-bold text-gray-900 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 mt-2 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Button = ({ children, className = '', variant = 'default', onClick }) => {
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Demo component
export default function AnimatedSectionDemo({ products }) {
  const getBadgeColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      green: 'bg-green-100 text-green-800',
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
  };

  const getName = (str) => {
    const words = str.split(' ');
    const shortName =
      words.length > 15 ? words.slice(0, 15).join(' ') + '…' : str;
    return shortName;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <AnimatedSection1 key={product.id} delay={index * 100}>
              <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop';
                    }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={getBadgeColor(product.color)}>
                      {product.category}
                    </Badge>
                    {product.badge && (
                      <Badge variant="secondary">{product.badge}</Badge>
                    )}
                  </div>
                  {product.stock === 0 && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-600 text-white">Hết hàng</Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {getName(product.name)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className="text-lg font-semibold text-blue-600 mb-4">
                      {product.price}
                      {product.originalPrice &&
                        parseFloat(product.originalPrice) >
                          parseFloat(
                            product.price?.replace(/[^\d]/g, '') || 0
                          ) && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            {parseInt(product.originalPrice).toLocaleString(
                              'vi-VN'
                            )}{' '}
                            VNĐ
                          </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() =>
                          product.slug && window.open(product.slug, '_blank')
                        }
                      >
                        Chi tiết
                      </Button>
                      <Button className="flex-1">Liên hệ</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection1>
          ))}
        </div>
      </div>
    </div>
  );
}

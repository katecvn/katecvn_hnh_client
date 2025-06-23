import React from 'react';
import { TestimonialSliderProps } from '../interface';

const TestimonialSlider = ({ feedbacks }: TestimonialSliderProps) => {
  const getBgColor = () => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      gray: 'bg-gray-500',
    };

    const colorKeys = Object.keys(colors);
    const getRandomColor = () => {
      const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      return colors[randomKey];
    };

    return getRandomColor();
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    const first = words[0]?.charAt(0) || '';
    const last = words[words.length - 1]?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <div className="w-full h-full mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
        {feedbacks.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 ${getBgColor()} rounded-full flex items-center justify-center text-white font-bold`}
              >
                {testimonial?.content[0]?.imageUrl ? (
                  <img
                    src={testimonial?.content[0]?.imageUrl}
                    alt={testimonial?.content[0]?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(testimonial?.content[0]?.name)
                )}
              </div>
              <div className="ml-2">
                <p className="font-semibold text-gray-900">
                  {testimonial?.content[0]?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial?.content[0]?.role}
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">5.0</span>
            </div>

            <blockquote className="text-gray-600 mb-4 italic text-sm">
              "{testimonial?.content[0]?.content}"
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;

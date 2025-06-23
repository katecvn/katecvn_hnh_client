'use client';

import {
  Users,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  CalendarClock,
  CalendarCheck,
} from 'lucide-react';
import { JobPosition, PositionCardProps } from '../interface';

export default function PositionCard({
  position,
  index,
  isHovered,
  onHover,
  onLeave,
  onApply,
  onViewDetail,
}: PositionCardProps) {
  const IconComponent = position.icon;

  return (
    <div
      key={index}
      className={`group relative border  border-gray-300  hover:border-blue-300 overflow-hidden rounded-lg transition-all duration-500 hover:shadow-xl hover:scale-105 ${
        position.featured ? 'lg:col-span-2 xl:col-span-1' : ''
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`absolute inset-0 overflow-hidden rounded-lg transition-all duration-500 ${
          isHovered
            ? `bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 opacity-90`
            : 'bg-white  opacity-100'
        }`}
      />

      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-white/40 shadow-2xl" />

      {position.featured && (
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            <Star className="w-3 h-3 mr-1" /> HOT
          </div>
        </div>
      )}

      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="mb-6">
          <div className="w-16 h-16  bg-white/60 rounded-2xl flex items-center justify-center backdrop-blur-sm border  border-gray-200 group-hover:scale-110  group-hover:border-blue-500 transition-transform duration-300 shadow-lg">
            <IconComponent className="w-8 h-8 text-gray-500 group-hover:text-blue-500 " />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent group-hover:opacity-100 transition-opacity duration-300">
          {position.title}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 mr-3 text-gray-500" />
            <span className="text-sm font-medium">{position.department}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-3 text-gray-500" />
            <span className="text-sm font-medium">{position.location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-3 text-gray-500" />
            <span className="text-sm font-medium">{position.type}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
          {position.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {position.requirements.slice(0, 3).map((req, reqIndex) => (
            <span
              key={reqIndex}
              className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700 font-medium"
            >
              {req}
            </span>
          ))}
          {position.requirements.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700 font-medium">
              +{position.requirements.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-800">
            <div className="text-2xl text-sky-600 font-bold">
              {position.salary}
            </div>
            <div className="text-sm text-gray-500">{position.experience}</div>
          </div>
          <div className="flex items-center text-gray-600">
            {new Date(position.deadline) < new Date() ? (
              <p className="flex items-center text-sm text-red-500">
                {' '}
                <CalendarClock className="w-4 h-4 mr-1" /> Đã hết hạn{' '}
              </p>
            ) : (
              <p className=" flex items-center text-sm text-green-600">
                <CalendarCheck className="w-4 h-4 mr-1" />
                Hạn nộp: {position.deadline.toLocaleDateString('vi-VN')}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onApply(position as JobPosition)}
            className="flex-1 text-sm bg-blue-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center group"
          >
            Ứng tuyển ngay
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => onViewDetail(position as JobPosition)}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Chi tiết
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

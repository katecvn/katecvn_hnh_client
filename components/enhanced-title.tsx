'use client';

import { cn } from '@/lib/utils';
import { TextProps } from '@/types/interface';

export const TitleHome = ({ children, className }: TextProps) => {
  return (
    <div className="flex items-center justify-center mt-1 mb-6 md:mb-8 ">
      <div className="flex-grow border-t-2 border-ograne"></div>

      <div className="relative inline-block">
        {/* Tam giác vuông bên trái */}
        <span
          className="
      pointer-events-none absolute -left-2 -top-1 md:-top-2
      w-2 h-4 md:h-[22px] bg-emerald-600  rotate-180
      [clip-path:polygon(0_0,100%_0,0_100%)]
    "
        />

        {/* Tam giác vuông bên phải (đối xứng) */}
        <span
          className="
      pointer-events-none absolute -right-2 -top-1 md:-top-2
      w-2 h-4 md:h-[22px] bg-emerald-600  rotate-180
      [clip-path:polygon(0_0,100%_0,100%_100%)]
    "
        />

        {/* Thân nhãn */}
        <span
          className={cn(
            'relative z-10 bg-gradient-to-r from-green-600/80 via-green-cyan-500/80 to-lime-600/80 text-white px-4 py-2 md:px-10 md:py-3 rounded-b-lg',
            'font-bold uppercase tracking-wide text-base sm:text-lg md:text-xl'
          )}
        >
          {children}
        </span>
      </div>

      <div className="flex-grow border-t-2 border-ograne"></div>
    </div>
  );
};

export const TitleCategory = ({ category }: { category: string }) => {
  return (
    <div className="relative ">
      <div
        className="
                  px-6 py-[6px] bg-gradient-to-r from-green-600/20 via-green-cyan-500/20 to-white/20
                  [clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)]"
      >
        <h3
          className="uppercase text-base sm:text-lg xl:text-xl font-semibold 
                  bg-gradient-to-r from-green-600 via-green-cyan-500 to-lime-600 bg-clip-text text-transparent"
        >
          {category}
        </h3>
      </div>
    </div>
  );
};

export const TitleDetailProduct = ({ title }: { title: string }) => {
  return (
    <div className="p-3 bg-gradient-to-r from-gray-50 via-gray-200 to-gray-50">
      <h2 className="text-center text-base sm:text-lg xl:text-xl text-neutral-gray-800 uppercase font-semibold ">
        {title}
      </h2>
    </div>
  );
};

'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ContactForm } from './contact-form'; // import form của bạn
import { Package, Star, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ContactDialogProps } from '@/pages/interface';

const WowProductSection = ({ product }: { product: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 p-3 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl">
      <div
        className={`relative  overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 p-[2px] transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-4'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 animate-pulse opacity-20"></div>

        <div className="relative bg-white rounded-xl p-6">
          <div className="absolute top-2 right-2">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-4 left-2">
            <Star className="h-3 w-3 text-blue-400 animate-bounce" />
          </div>
          <div className="absolute bottom-2 right-4">
            <Heart
              className="h-4 w-4 text-pink-400 animate-pulse"
              fill="currentColor"
            />
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-md">
                Sản phẩm quan tâm
              </p>
              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-50 blur-sm"></div>
            <div className="relative bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 border border-blue-200/50">
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-700 to-purple-800 text-md font-bold leading-relaxed">
                {product}
              </strong>

              <div
                className="mt-2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-full transform scale-x-0 animate-pulse origin-left transition-transform duration-1000 delay-500"
                style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default function ContactDialog({
  title,
  des,
  product,
  open,
  onOpenChange,
}: ContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollbar-hide overflow-y-auto scrollbar-thumb-only">
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{des}</DialogDescription>
          {product && <WowProductSection product={product} />}
        </DialogHeader>

        <ContactForm title={product ? product : title} />
      </DialogContent>
    </Dialog>
  );
}

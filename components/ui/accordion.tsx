import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  className,
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('border rounded-md divide-y', className)}>
      {items.map(({ id, title, content }) => {
        const isOpen = openId === id;

        return (
          <div key={id} className="border-b">
            <button
              onClick={() => toggle(id)}
              className={cn(
                'w-full flex items-center justify-between py-4 px-4 font-medium text-left transition-all hover:underline',
                isOpen && 'bg-gray-50'
              )}
            >
              <span>{title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            <div
              className={cn(
                'overflow-hidden transition-all duration-300 px-4',
                isOpen ? 'max-h-screen py-2' : 'max-h-0'
              )}
              aria-hidden={!isOpen}
            >
              <div className="text-sm text-gray-700">{content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

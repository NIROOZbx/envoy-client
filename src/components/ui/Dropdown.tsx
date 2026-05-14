import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownOption {
  id: string;
  label: string;
  icon?: any;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  trigger?: React.ReactNode;
  align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  trigger,
  align = 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(o => o.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      {/* Trigger */}
      {trigger ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="cursor-pointer inline-block"
        >
          {trigger}
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center whitespace-nowrap justify-between gap-3 px-4 py-3 bg-white border border-ui-border rounded-2xl transition-all duration-300",
            isOpen ? "border-black shadow-xl shadow-black/5 ring-4 ring-black/5" : "hover:border-black/30",
          )}
        >
          <span className={cn(
            "text-[12px] font-black uppercase tracking-widest",
            selectedOption ? "text-ui-text" : "text-ui-muted opacity-40"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn("w-4 h-4 text-ui-muted transition-transform", isOpen && "rotate-180")} />
        </button>
      )}

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "absolute mt-2 p-2 bg-white border border-ui-border rounded-2xl shadow-2xl z-[150] min-w-[200px] w-max",
              align === 'right' ? "right-0" : "left-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    option.onClick?.();
                    onChange?.(option.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-left",
                    value === option.id ? "bg-black text-white" : "hover:bg-black/5 text-ui-text",
                    option.variant === 'danger' && "text-destructive hover:bg-destructive/5"
                  )}
                >
                  <div className="flex items-center gap-3 pr-4">
                    {option.icon && <option.icon className="w-3.5 h-3.5 opacity-40 shrink-0" />}
                    <span>{option.label}</span>
                  </div>
                  {value === option.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

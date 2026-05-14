import React from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const DocsTOC: React.FC = () => {
  // This will be dynamic in the future based on page content
  const [activeId, setActiveId] = React.useState<string>('');
  
  const mockItems: TOCItem[] = [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'capabilities', text: 'What you can do', level: 2 },
    { id: 'how-it-works', text: 'How it works', level: 2 },
    { id: 'choose-path', text: 'Choose your path', level: 2 },
  ];

  return (
    <aside className="w-[200px] h-screen fixed right-0 top-0 pt-12 pb-10 px-6 hidden xl:block border-l border-black/5 bg-pearl">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-6">
        On this page
      </h4>
      <nav className="space-y-4">
        {mockItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveId(item.id);
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "block text-xs font-semibold transition-all hover:text-black",
              item.level === 3 ? "pl-4" : "",
              activeId === item.id ? "text-black border-l-2 border-black pl-2 -ml-[2px]" : "text-black/40"
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
};

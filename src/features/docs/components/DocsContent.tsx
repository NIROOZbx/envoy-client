import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 group shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
          {filename || language}
        </span>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/10 rounded-md transition-all text-white/40 hover:text-white"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-white/90">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

interface CalloutProps {
  type: 'note' | 'warning' | 'danger' | 'tip';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const styles = {
    note: 'border-blue-500 bg-blue-500/5 text-blue-900',
    warning: 'border-amber-500 bg-amber-500/5 text-amber-900',
    danger: 'border-red-500 bg-red-500/5 text-red-900',
    tip: 'border-green-500 bg-green-500/5 text-green-900',
  };

  const icons = {
    note: 'ℹ',
    warning: '⚠',
    danger: '✖',
    tip: '💡',
  };

  return (
    <div className={cn(
      "my-8 p-6 rounded-xl border border-black/5 bg-black/[0.01]",
      "border-l-4",
      styles[type]
    )}>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold">{icons[type]}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          {title || type}
        </span>
      </div>
      <div className="text-sm font-medium leading-relaxed text-ui-muted-dark">
        {children}
      </div>
    </div>
  );
};

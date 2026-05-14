import React, { useState } from 'react';
import { Copy, Check, Eye, EyeOff, AlertTriangle, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKeyRevealProps {
  rawKey: string;
}

export const ApiKeyReveal: React.FC<ApiKeyRevealProps> = ({ rawKey }) => {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawKey);
    setCopied(true);
    toast.success('API key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-5 items-start">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-black text-amber-900 uppercase tracking-widest text-[10px]">Security Alert</h4>
          <p className="text-xs font-medium text-amber-800 leading-relaxed opacity-80">
            For security reasons, we can only show this key once. If you lose it, you will need to generate a new one. **Store it in a secure location.**
          </p>
        </div>
      </div>

      {/* Key Display */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-60 px-1">
          Your Secret API Key
        </label>
        <div className="relative group">
          <div className="bg-black text-white rounded-2xl p-6 font-mono text-xs break-all pr-32 min-h-[5rem] flex items-center shadow-2xl shadow-black/20">
            {revealed ? rawKey : '••••••••••••••••••••••••••••••••••••••••'}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={() => setRevealed(!revealed)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white/60 hover:text-white"
              title={revealed ? "Hide Key" : "Show Key"}
            >
              {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopy}
              className="p-3 bg-white hover:bg-white/90 rounded-xl transition-all text-black flex items-center gap-2 shadow-xl shadow-black/10"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="text-[10px] font-black uppercase tracking-widest">Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Protection Notice */}
      <div className="flex items-center gap-4 px-2 py-4 border-t border-ui-border">
        <ShieldCheck className="w-5 h-5 text-success" />
        <p className="text-[10px] font-black text-ui-muted uppercase tracking-widest opacity-60">
          Encrypted at rest • Scoped to environment
        </p>
      </div>
    </div>
  );
};

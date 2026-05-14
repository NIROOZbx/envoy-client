import React from 'react';
import { motion } from 'framer-motion';
import { cn, formatDate } from '@/lib/utils';
import { 
  Zap, 
  Terminal, 
  Database, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Hash,
  Fingerprint,
  MessageSquare
} from 'lucide-react';
import { type ActivityLog } from '../../hooks/useActivityLogs';

interface Props {
  log: ActivityLog;
}

export const DiagnosticConsole: React.FC<Props> = ({ log }) => {
  const steps = [
    { id: 'triggered', label: 'API Triggered', time: log.created_at, status: 'success', icon: Zap },
    { id: 'sent', label: 'Provider Sent', time: log.sent_at, status: log.sent_at ? 'success' : 'pending', icon: Cpu },
    { id: 'delivered', label: 'Delivered', time: log.delivered_at || log.failed_at, status: log.delivery_status === 'delivered' ? 'success' : log.delivery_status === 'failed' ? 'failed' : 'pending', icon: log.delivery_status === 'failed' ? AlertCircle : CheckCircle2 },
  ];

  return (
    <div className="p-8 bg-black/[0.02] border-t border-ui-border relative overflow-hidden">
      {/* Spectrum Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-log-transit/5 blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      {log.delivery_status === 'failed' && (
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-log-failure/5 blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      )}

      <div className="grid grid-cols-12 gap-12 relative z-10">
        {/* Column 1: Infrastructure Timeline */}
        <div className="col-span-3 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-3 h-3 text-ui-muted opacity-40" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted">System Trace</h4>
          </div>

          <div className="relative space-y-8">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-ui-border/50" />
            {steps.map((step, i) => (
              <div key={step.id+i} className="relative flex gap-5 group/step">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-500",
                  step.status === 'success' ? "bg-white border-success text-success shadow-success/10" :
                  step.status === 'failed' ? "bg-white border-destructive text-destructive shadow-destructive/10" :
                  "bg-pearl border-ui-border text-ui-muted"
                )}>
                  <step.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-ui-text mb-1">
                    {step.label}
                  </div>
                  {step.time ? (
                    <div className="flex items-center gap-2 text-[9px] font-bold text-ui-muted opacity-60">
                      <Clock className="w-2.5 h-2.5" />
                      {formatDate(step.time, 'HH:mm:ss.SSS')}
                    </div>
                  ) : (
                    <div className="text-[9px] font-bold text-ui-muted opacity-20 italic italic tracking-wider">Awaiting Signal...</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Technical Metadata */}
        <div className="col-span-4 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Fingerprint className="w-3 h-3 text-ui-muted opacity-40" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted">Metadata Node</h4>
          </div>

          <div className="bg-white/50 border border-ui-border/50 rounded-2xl p-6 font-mono text-[11px] space-y-4">
            <div className="flex justify-between items-center group/meta">
              <span className="text-ui-muted flex items-center gap-2">
                <Hash className="w-3 h-3 opacity-30" />
                TRACE_ID
              </span>
              <span className="text-ui-text font-black tracking-tight select-all">{log.id}</span>
            </div>
            <div className="flex justify-between items-center group/meta">
              <span className="text-ui-muted flex items-center gap-2">
                <Database className="w-3 h-3 opacity-30" />
                PROVIDER_ID
              </span>
              <span className="text-ui-text font-black tracking-tight select-all truncate max-w-[200px]" title={log.provider_message_id || 'N/A'}>
                {log.provider_message_id || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center group/meta">
              <span className="text-ui-muted flex items-center gap-2">
                <ArrowRight className="w-3 h-3 opacity-30" />
                PROVIDER
              </span>
              <span className="text-ui-text font-black tracking-tight uppercase text-[10px] px-2 py-0.5 bg-black text-white rounded">
                {log.provider}
              </span>
            </div>
            <div className="flex justify-between items-center group/meta">
              <span className="text-ui-muted flex items-center gap-2">
                <MessageSquare className="w-3 h-3 opacity-30" />
                RECIPIENT
              </span>
              <span className="text-ui-text font-black tracking-tight truncate max-w-[200px]">{log.recipient}</span>
            </div>
          </div>
        </div>

        {/* Column 3: Payload & Logic */}
        <div className="col-span-5 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Database className="w-3 h-3 text-ui-muted opacity-40" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted">Payload Ingress</h4>
            </div>
            <div className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40">JSON / UTF-8</div>
          </div>

          <div className="relative group/payload">
            <div className="absolute -inset-0.5 bg-black/[0.03] rounded-2xl blur-sm group-hover/payload:bg-black/[0.05] transition-all" />
            <pre className="relative bg-black text-pearl p-6 rounded-2xl text-[11px] font-mono leading-relaxed overflow-x-auto no-scrollbar shadow-2xl min-h-[100px]">
              <code className="block">
                {log.trigger_data ? JSON.stringify(log.trigger_data, null, 2) : '// No payload data provided'}
              </code>
            </pre>
          </div>

          {log.delivery_status === 'failed' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-log-failure/[0.03] border border-log-failure/20 shadow-log-failure/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-log-failure/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-log-failure" />
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-log-failure mb-1">Execution Error</h5>
                  <p className="text-[11px] font-bold text-ui-text opacity-80 leading-relaxed">
                    {log.error_message || 'The provider encountered an unexpected failure during dispatch.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

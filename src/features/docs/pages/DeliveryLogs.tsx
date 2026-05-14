import React from 'react';
import { CodeBlock, Callout } from '../components/DocsContent';

export const DeliveryLogsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Delivery Logs</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Monitor the lifecycle of every notification triggered through your workspace.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">What is logged</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Every notification trigger creates a log entry regardless of outcome. The log contains: 
          notification ID, channel, template, recipient, provider used, status, sent timestamp, 
          and error details if delivery failed.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Log statuses</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-2 pr-4 text-[10px] font-black uppercase tracking-widest text-black/30">Status</th>
                <th className="py-2 pl-4 text-[10px] font-black uppercase tracking-widest text-black/30">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4"><code className="text-sm font-black text-black">queued</code></td>
                <td className="py-4 pl-4 text-black/60 font-medium">Accepted by Envoy, pending delivery</td>
              </tr>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4"><code className="text-sm font-black text-black">sent</code></td>
                <td className="py-4 pl-4 text-black/60 font-medium">Provider accepted the message</td>
              </tr>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4"><code className="text-sm font-black text-black">failed</code></td>
                <td className="py-4 pl-4 text-black/60 font-medium">Provider rejected or unreachable after retries</td>
              </tr>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4"><code className="text-sm font-black text-black">dlq</code></td>
                <td className="py-4 pl-4 text-black/60 font-medium">Moved to dead letter queue after all retry attempts exhausted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Querying logs</h2>
        <CodeBlock 
          language="bash" 
          code={`curl "https://api.envoy.dev/v1/notifications/logs?channel=email&status=failed&limit=25" \\\n  -H "Authorization: Bearer ne_live_sk_xxx"`}
        />
      </section>

      <Callout type="warning" title="Note">
        A log with status <code>sent</code> does not guarantee delivery to the end user. It means the 
        provider accepted the message. Bounce handling, spam filtering, and carrier delivery are 
        outside Envoy's control.
      </Callout>
    </div>
  );
};

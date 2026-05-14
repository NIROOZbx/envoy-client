import React from 'react';
import { CodeBlock, Callout } from '../components/DocsContent';

export const ErrorReferencePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Error Reference</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Consistent error handling for all Envoy API requests.
        </p>
      </section>

      <section className="space-y-6">
        <p className="text-black/60 font-medium leading-relaxed">
          All errors return a consistent shape:
        </p>
        <CodeBlock 
          language="json" 
          code={`{\n  "error": "template not found",\n  "code": "TEMPLATE_NOT_FOUND",\n  "status": 422\n}`}
        />
      </section>

      <section className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-2 pr-4 text-[10px] font-black uppercase tracking-widest text-black/30">Code</th>
                <th className="py-2 px-4 text-[10px] font-black uppercase tracking-widest text-black/30">Status</th>
                <th className="py-2 pl-4 text-[10px] font-black uppercase tracking-widest text-black/30">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: 'INVALID_REQUEST', status: '400', meaning: 'Malformed JSON or missing required field' },
                { code: 'UNAUTHORIZED', status: '401', meaning: 'Missing, invalid, or expired API key' },
                { code: 'FORBIDDEN', status: '403', meaning: 'Key environment mismatch or insufficient role' },
                { code: 'NOT_FOUND', status: '404', meaning: 'Resource does not exist in this workspace' },
                { code: 'TEMPLATE_NOT_FOUND', status: '422', meaning: 'Template name not found in workspace' },
                { code: 'PROVIDER_NOT_CONFIGURED', status: '422', meaning: 'No default provider for this channel' },
                { code: 'CREDENTIAL_INVALID', status: '422', meaning: 'Provider rejected the stored credentials' },
                { code: 'RATE_LIMITED', status: '429', meaning: 'Too many requests — back off and retry' },
                { code: 'INTERNAL_ERROR', status: '500', meaning: "Something went wrong on Envoy's side" },
              ].map(err => (
                <tr key={err.code} className="border-b border-black/5 last:border-0">
                  <td className="py-4 pr-4"><code className="text-sm font-black text-black">{err.code}</code></td>
                  <td className="py-4 px-4 font-bold text-black/60">{err.status}</td>
                  <td className="py-4 pl-4 text-black/60 font-medium">{err.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-8">
        <Callout type="danger" title="On 429">
          The response includes a <code>Retry-After</code> header in seconds. Respect it. Repeated 
          requests after a 429 without backing off will result in a longer ban window.
        </Callout>
        
        <Callout type="warning" title="On 500">
          These are bugs on Envoy's side. The notification was not delivered. Safe to retry with 
          the same idempotency key.
        </Callout>
      </div>
    </div>
  );
};

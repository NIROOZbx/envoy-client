import React from 'react';
import { CodeBlock } from '../components/DocsContent';

export const AuthenticationPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Authentication</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Envoy uses API keys to authenticate requests. You can manage your API keys in the dashboard 
          under the API Keys section.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">API Key authentication</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          All API requests must include your API key in the Authorization header:
        </p>
        <CodeBlock 
          language="bash" 
          code={`Authorization: Bearer ne_live_sk_your_key_here`}
        />
        <p className="text-black/60 font-medium leading-relaxed">
          Keys are environment-scoped. A live key (<code>ne_live_</code>) sent to the test environment 
          will be rejected with <code>403</code>. A test key (<code>ne_test_</code>) will never trigger 
          real provider delivery regardless of provider configuration.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Key prefixes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-2 pr-4 text-[10px] font-black uppercase tracking-widest text-black/30">Prefix</th>
                <th className="py-2 px-4 text-[10px] font-black uppercase tracking-widest text-black/30">Environment</th>
                <th className="py-2 pl-4 text-[10px] font-black uppercase tracking-widest text-black/30">Delivers to</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4"><code className="text-sm font-black text-black">ne_live_</code></td>
                <td className="py-4 px-4 font-bold text-black/60">Live</td>
                <td className="py-4 pl-4 font-bold text-black/60">Real providers</td>
              </tr>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4"><code className="text-sm font-black text-black">ne_test_</code></td>
                <td className="py-4 px-4 font-bold text-black/60">Test</td>
                <td className="py-4 pl-4 font-bold text-black/60">Mock providers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Key security</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Never expose your API keys in frontend code, public repositories, or client-side JavaScript. 
          Keys should only exist in server-side environments. If a key is compromised, revoke it 
          immediately from the dashboard — revocation takes effect instantly.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Token authentication (dashboard only)</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          The Envoy dashboard uses short-lived JWTs for session management. These are handled 
          automatically by the dashboard and are not relevant to API integrations.
        </p>
      </section>
    </div>
  );
};

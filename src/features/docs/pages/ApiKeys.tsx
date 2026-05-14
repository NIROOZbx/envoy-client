import React from 'react';
import { CodeBlock } from '../components/DocsContent';

export const ApiKeysPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">API Keys</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Manage access to the Envoy API using environment-scoped secret keys.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Creating a key</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Keys are created per environment. You cannot change a key's environment after creation. 
          Create test keys for development and staging. Create live keys only for production systems.
        </p>
        <p className="text-black/60 font-medium leading-relaxed">
          After creation, the full key is shown once. Copy it immediately. Envoy stores only a 
          SHA-256 hash — the plaintext is unrecoverable.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Key hints</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          The dashboard shows the last 6 characters of each key as a hint for identification:
        </p>
        <CodeBlock 
          language="text" 
          code={`ne_live_sk_...m3n4o5   created Jan 15   expires never   active\nne_test_sk_...x8y9z0   created Jan 10   expires Feb 10  active`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Setting expiry</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Keys can be created with an expiry date. After the expiry date, the key returns <code>401</code>. 
          Set expiry for keys issued to third-party integrations or contractors.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Revoking a key</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Revocation is instant. Any request using a revoked key returns <code>401</code> immediately. 
          Revocation cannot be undone — create a new key if needed.
        </p>
      </section>
    </div>
  );
};

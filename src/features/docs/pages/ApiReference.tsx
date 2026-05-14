import React from 'react';
import { CodeBlock } from '../components/DocsContent';
import { cn } from '@/lib/utils';

const MethodBadge = ({ method }: { method: string }) => {
  const styles: any = {
    POST: 'bg-blue-500 text-white',
    GET: 'bg-green-500 text-white',
    PATCH: 'bg-amber-500 text-white',
    DELETE: 'bg-red-500 text-white',
  };
  return (
    <span className={cn(
      "px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase",
      styles[method] || 'bg-black text-white'
    )}>
      {method}
    </span>
  );
};

const ParamRow = ({ name, type, required, desc }: any) => (
  <tr className="border-b border-black/5 last:border-0 group">
    <td className="py-4 pr-4 align-top">
      <code className="text-xs font-black text-black">{name}</code>
    </td>
    <td className="py-4 px-4 align-top">
      <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{type}</span>
    </td>
    <td className="py-4 px-4 align-top text-center">
      {required ? (
        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Required</span>
      ) : (
        <span className="text-[10px] font-black text-black/20 uppercase tracking-widest">Optional</span>
      )}
    </td>
    <td className="py-4 pl-4 align-top">
      <p className="text-xs text-black/60 font-medium leading-relaxed">{desc}</p>
    </td>
  </tr>
);

const EndpointSection = ({ method, path, desc, params, headers, response }: any) => (
  <section className="space-y-8 pt-12 border-t border-black/5 first:border-0 first:pt-0">
    <div className="flex items-center gap-4">
      <MethodBadge method={method} />
      <code className="text-sm font-black text-black tracking-tight">{path}</code>
    </div>

    <p className="text-lg text-black/60 font-medium leading-relaxed max-w-2xl">
      {desc}
    </p>

    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Headers</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <tbody>
            {headers.map((h: any) => (
              <tr key={h.name} className="border-b border-black/5 last:border-0">
                <td className="py-3 pr-4 w-1/3"><code className="text-xs font-black text-black">{h.name}</code></td>
                <td className="py-3 px-4 w-1/4"><span className="text-[10px] font-bold text-black/40 uppercase">{h.type}</span></td>
                <td className="py-3 pl-4"><p className="text-xs text-black/60 font-medium">{h.desc}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Request Body</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/10">
              <th className="py-2 pr-4 text-[10px] font-black uppercase tracking-widest text-black/30">Name</th>
              <th className="py-2 px-4 text-[10px] font-black uppercase tracking-widest text-black/30">Type</th>
              <th className="py-2 px-4 text-[10px] font-black uppercase tracking-widest text-black/30 text-center">Required</th>
              <th className="py-2 pl-4 text-[10px] font-black uppercase tracking-widest text-black/30">Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map((p: any) => <ParamRow key={p.name} {...p} />)}
          </tbody>
        </table>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-4">Request Example</h4>
        <CodeBlock 
          language="json" 
          code={`{\n  "template": "welcome-email",\n  "recipient": "user@example.com",\n  "payload": {\n    "AppName": "Acme",\n    "FirstName": "Alice"\n  }\n}`}
        />
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-4">Response 200</h4>
        <CodeBlock 
          language="json" 
          code={response}
        />
      </div>
    </div>
  </section>
);

const EndpointRow = ({ method, path }: { method: string; path: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-black/5 last:border-0 group">
    <div className="flex items-center gap-4">
      <div className={cn(
        "text-[10px] font-black px-2 py-0.5 rounded-md",
        method === 'GET' ? "bg-blue-500/10 text-blue-600" :
        method === 'POST' ? "bg-green-500/10 text-green-600" :
        method === 'PATCH' ? "bg-orange-500/10 text-orange-600" :
        "bg-red-500/10 text-red-600"
      )}>
        {method}
      </div>
      <code className="text-sm font-black text-black tracking-tight">{path}</code>
    </div>
  </div>
);

export const ApiReferencePage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">API Reference</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          The Envoy API is organized around REST. Our API has predictable resource-oriented 
          URLs, accepts JSON-encoded request bodies, and returns JSON-encoded responses.
        </p>
      </section>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Auth</h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl px-6 py-2">
            <EndpointRow method="POST" path="/v1/auth/register" />
            <EndpointRow method="POST" path="/v1/auth/login" />
            <EndpointRow method="POST" path="/v1/auth/logout" />
            <EndpointRow method="POST" path="/v1/auth/refresh" />
            <EndpointRow method="GET" path="/v1/auth/google" />
            <EndpointRow method="GET" path="/v1/auth/google/callback" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Users</h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl px-6 py-2">
            <EndpointRow method="GET" path="/v1/users/me" />
            <EndpointRow method="PATCH" path="/v1/users/me" />
            <EndpointRow method="PATCH" path="/v1/users/me/password" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Workspaces</h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl px-6 py-2">
            <EndpointRow method="GET" path="/v1/workspaces/current" />
            <EndpointRow method="PATCH" path="/v1/workspaces/current" />
            <EndpointRow method="GET" path="/v1/workspaces/current/members" />
            <EndpointRow method="PATCH" path="/v1/workspaces/current/members/:userID/role" />
            <EndpointRow method="DELETE" path="/v1/workspaces/current/members/:userID" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">API Keys</h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl px-6 py-2">
            <EndpointRow method="GET" path="/v1/api-keys" />
            <EndpointRow method="POST" path="/v1/api-keys" />
            <EndpointRow method="PATCH" path="/v1/api-keys/:id/revoke" />
            <EndpointRow method="DELETE" path="/v1/api-keys/:id" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Providers</h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl px-6 py-2">
            <EndpointRow method="GET" path="/v1/providers" />
            <EndpointRow method="POST" path="/v1/providers" />
            <EndpointRow method="PATCH" path="/v1/providers/:id" />
            <EndpointRow method="DELETE" path="/v1/providers/:id" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Templates</h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl px-6 py-2">
            <EndpointRow method="GET" path="/v1/templates" />
            <EndpointRow method="POST" path="/v1/templates" />
            <EndpointRow method="PATCH" path="/v1/templates/:id" />
            <EndpointRow method="DELETE" path="/v1/templates/:id" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Notifications</h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl px-6 py-2">
            <EndpointRow method="POST" path="/v1/notifications/trigger" />
            <EndpointRow method="GET" path="/v1/notifications/logs" />
            <EndpointRow method="GET" path="/v1/notifications/logs/:id" />
          </div>
        </section>
      </div>

      <div className="pt-24 space-y-12 border-t border-black/5">
        <h2 className="text-3xl font-black tracking-tight">Primary Endpoints</h2>
        <EndpointSection 
          method="POST"
          path="/v1/notifications/trigger"
          desc="Triggers a notification using a template. Requires a valid API key with the matching environment scope."
          headers={[
            { name: 'Authorization', type: 'string', desc: 'Bearer ne_live_sk_xxx' },
            { name: 'Content-Type', type: 'string', desc: 'application/json' }
          ]}
          params={[
            { name: 'template', type: 'string', required: true, desc: 'The unique name or ID of the notification template.' },
            { name: 'recipient', type: 'string', required: true, desc: 'Target email address or phone number.' },
            { name: 'payload', type: 'object', required: false, desc: 'Dynamic variables for the template (Handlebars support).' },
            { name: 'idempotency_key', type: 'string', required: false, desc: 'Prevents duplicate delivery within 24 hours.' },
          ]}
          response={`{\n  "id": "notif_01hx...",\n  "status": "queued",\n  "channel": "email",\n  "template": "welcome-email",\n  "created_at": "2024-01-15T10:30:00Z"\n}`}
        />
      </div>
    </div>
  );
};

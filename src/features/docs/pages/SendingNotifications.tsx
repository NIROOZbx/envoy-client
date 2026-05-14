import React from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock, Callout } from '../components/DocsContent';

export const SendingNotificationsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Sending Notifications</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Learn how to trigger notifications from your application using the Envoy API or our <Link to="/docs/go-sdk" className="text-black underline underline-offset-4 decoration-black/20 hover:decoration-black transition-all">Go SDK</Link>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">The trigger endpoint</h2>
        <CodeBlock 
          language="text" 
          code={`POST /v1/notifications/trigger`}
        />
        <p className="text-black/60 font-medium leading-relaxed">
          This is the only endpoint your application needs to send notifications. Everything else — 
          provider selection, channel routing, retry logic — is handled by Envoy.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Required fields</h2>
        <ul className="space-y-4">
          <li className="text-black/60 font-medium leading-relaxed">
            <code className="text-black font-black text-xs">template</code> — the name or ID of the template to use.
          </li>
          <li className="text-black/60 font-medium leading-relaxed">
            <code className="text-black font-black text-xs">recipient</code> — an email address for email channel, a phone number in E.164 format (<code>+15551234567</code>) for SMS.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Optional fields</h2>
        <ul className="space-y-4">
          <li className="text-black/60 font-medium leading-relaxed">
            <code className="text-black font-black text-xs">idempotency_key</code> — strongly recommended. A unique string for this notification event. Prevents duplicate delivery on retries.
          </li>
          <li className="text-black/60 font-medium leading-relaxed">
            <code className="text-black font-black text-xs">payload</code> — key-value object of template variables. Must include all <code>{`{{.Variable}}`}</code> placeholders used in the template.
          </li>
          <li className="text-black/60 font-medium leading-relaxed">
            <code className="text-black font-black text-xs">provider_id</code> — override the workspace default provider for this request.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Delivery is asynchronous</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          The trigger endpoint always returns <code>status: queued</code>. Your application should not wait 
          for <code>status: sent</code>. If you need to confirm delivery, poll the logs endpoint or set up 
          a webhook (coming soon).
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Using idempotency keys</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          A good idempotency key is event-scoped and user-scoped:
        </p>
        <CodeBlock 
          language="text" 
          code={`password-reset-{userID}-{timestamp}\norder-confirmed-{orderID}\ninvoice-{invoiceID}-reminder-1`}
        />
        <p className="text-black/60 font-medium leading-relaxed">
          Do not use random UUIDs as idempotency keys. A random key defeats the purpose — it will never 
          match a retry.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Template variables</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Variables in templates use Go template syntax: <code>{`{{.VariableName}}`}</code>. 
          Variable names are case-sensitive. If your template contains <code>{`{{.FirstName}}`}</code> 
          and you pass <code>firstname</code> in the payload, the placeholder will not be replaced.
        </p>
      </section>
    </div>
  );
};

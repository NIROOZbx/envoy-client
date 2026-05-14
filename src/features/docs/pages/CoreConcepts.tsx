import React from 'react';
import { Callout } from '../components/DocsContent';

const ConceptBlock = ({ title, id, children }: any) => (
  <section className="space-y-4" id={id}>
    <h2 className="text-2xl font-black tracking-tight">{title}</h2>
    <div className="text-lg text-black/60 font-medium leading-relaxed">
      {children}
    </div>
  </section>
);

export const CoreConceptsPage: React.FC = () => {
  return (
    <div className="space-y-20">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Core Concepts</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Understanding the fundamental architecture of Envoy will help you build more reliable 
          and scalable notification systems.
        </p>
      </section>

      <ConceptBlock title="Workspaces" id="workspaces">
        <p>
          A workspace is your team's isolated environment inside Envoy. All your providers, 
          templates, API keys, members, and logs live inside a workspace. Nothing crosses 
          workspace boundaries. If you're building a SaaS product, your entire product 
          runs under one workspace.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Environments" id="environments">
        <p>
          Every workspace has two environments: live and test. Live sends real notifications 
          through real providers. Test sends to mock providers — nothing reaches an actual 
          inbox or phone. Switch environments with a single header. Your API keys are 
          scoped to one environment and will be rejected if used against the other.
        </p>
      </ConceptBlock>

      <ConceptBlock title="API Keys" id="api-keys">
        <p>
          API keys authenticate your application to Envoy. Live keys are prefixed <code>ne_live_</code>. 
          Test keys are prefixed <code>ne_test_</code>. Keys are shown once at creation and never again. 
          If you lose a key, revoke it and create a new one.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Providers" id="providers">
        <p>
          A provider is the third-party service that physically delivers your notification. 
          Envoy currently supports SendGrid and Amazon SES for email, and Twilio for SMS. 
          You configure credentials once, per workspace. Your application never talks 
          to these providers directly — Envoy does.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Templates" id="templates">
        <p>
          A template defines the shape of a notification. It has a name, a channel, a subject 
          (email only), and a body with <code>{`{{.VariableName}}`}</code> placeholders. When you 
          trigger a notification, you pass a payload of values that fill those placeholders. 
          Templates are version-controlled per workspace.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Async Delivery" id="async-delivery">
        <p>
          When you trigger a notification, Envoy returns immediately with <code>status: queued</code>. 
          The actual delivery happens asynchronously via an internal event queue. 
          This means your application is never blocked waiting for a provider to respond. 
          Check delivery status via the logs API or the dashboard.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Idempotency" id="idempotency">
        <p>
          Pass an <code>idempotency_key</code> with every trigger request. If you send the same 
          key twice — due to a retry, a network blip, or a bug — Envoy will process it once 
          and return the same response. Use a key that is unique to the event: 
          <code>user-signup-{`{userID}`}</code>, <code>order-confirmed-{`{orderID}`}</code>.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Dead Letter Queue" id="dlq">
        <p>
          If Envoy cannot deliver a notification after all retry attempts, it moves the message 
          to the dead letter queue. You can inspect failed messages and retry them from the 
          dashboard or the API. Nothing is silently dropped.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Roles" id="roles">
        <p>
          Every workspace member has a role. Owners have full control. Admins can manage 
          providers, templates, keys, and members but cannot delete the workspace. 
          Members have read-only access to logs and templates.
        </p>
      </ConceptBlock>
    </div>
  );
};

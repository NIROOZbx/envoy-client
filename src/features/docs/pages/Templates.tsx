import React from 'react';
import { CodeBlock } from '../components/DocsContent';

export const TemplatesPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Templates</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Manage your notification content using flexible, version-controlled templates.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Creating a template</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Templates belong to a workspace and a channel. A template cannot span channels — if you need to 
          send both an email and an SMS for the same event, create two templates and trigger both.
        </p>
        <CodeBlock 
          language="bash" 
          code={`curl -X POST https://api.envoy.dev/v1/templates \\
  -H "Authorization: Bearer ne_live_sk_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "password-reset",
    "channel": "email",
    "subject": "Reset your password",
    "body": "Hi {{.FirstName}},\\n\\nClick the link below to reset your password. This link expires in 15 minutes.\\n\\n{{.ResetURL}}\\n\\nIf you did not request this, ignore this email."
  }'`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Updating a template</h2>
        <CodeBlock 
          language="bash" 
          code={`curl -X PATCH https://api.envoy.dev/v1/templates/tmpl_01hx4k9m2p \\
  -H "Authorization: Bearer ne_live_sk_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Reset your {{.AppName}} password",
    "body": "Hi {{.FirstName}}, reset here: {{.ResetURL}}"
  }'`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Template naming</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Use lowercase, hyphenated names that describe the event, not the channel. 
          Good: <code>password-reset</code>, <code>order-confirmed</code>, <code>trial-expiring</code>. 
          Bad: <code>email1</code>, <code>sms-template-new</code>, <code>test</code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">SMS templates</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          SMS templates do not have a subject field. Keep bodies under 160 characters to avoid carrier 
          splitting. Variables count toward the character limit based on their rendered length, 
          not the placeholder length.
        </p>
        <CodeBlock 
          language="json" 
          code={`{\n  "name": "otp-sms",\n  "channel": "sms",\n  "body": "Your {{.AppName}} verification code is {{.Code}}. Expires in 10 minutes."\n}`}
        />
      </section>
    </div>
  );
};

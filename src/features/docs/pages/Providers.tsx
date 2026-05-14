import React from 'react';
import { CodeBlock } from '../components/DocsContent';

export const ProvidersPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Providers</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Connect your notification providers to Envoy. We support major services for email and SMS.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">How provider selection works</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          When you trigger a notification, Envoy selects the provider for that channel as follows: 
          if you passed a <code>provider_id</code> in the request, that provider is used. Otherwise, 
          the workspace default for that channel is used. If no default is configured, the request 
          fails with <code>422</code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">SendGrid</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Required credentials: <strong>API Key</strong>.
        </p>
        <p className="text-black/60 font-medium leading-relaxed">
          Your SendGrid API key must have Mail Send permissions. You also need a verified sender 
          email or domain configured in your SendGrid account — Envoy sends from the address you 
          verify there.
        </p>
        <CodeBlock 
          language="json" 
          code={`{\n  "type": "sendgrid",\n  "channel": "email",\n  "credentials": {\n    "api_key": "SG.xxxxxxxxxxxxxxxxxxxx"\n  },\n  "is_default": true\n}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Amazon SES</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Required credentials: <strong>Access Key ID, Secret Access Key, Region, Sender Email</strong>.
        </p>
        <p className="text-black/60 font-medium leading-relaxed">
          The IAM user must have <code>ses:SendEmail</code> permission. The sender email must be 
          verified in SES. If your SES account is in sandbox mode, recipient emails must also 
          be verified.
        </p>
        <CodeBlock 
          language="json" 
          code={`{\n  "type": "ses",\n  "channel": "email",\n  "credentials": {\n    "access_key_id": "AKIAIOSFODNN7EXAMPLE",\n    "secret_access_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n    "region": "us-east-1",\n    "sender_email": "no-reply@yourdomain.com"\n  },\n  "is_default": false\n}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Twilio</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Required credentials: <strong>Account SID, Auth Token, From Number</strong>.
        </p>
        <p className="text-black/60 font-medium leading-relaxed">
          The from number must be a Twilio number in your account. For trial accounts, recipient 
          numbers must be verified in Twilio. Numbers must be in E.164 format: <code>+15551234567</code>.
        </p>
        <CodeBlock 
          language="json" 
          code={`{\n  "type": "twilio",\n  "channel": "sms",\n  "credentials": {\n    "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n    "auth_token": "your_auth_token",\n    "from_number": "+15551234567"\n  },\n  "is_default": true\n}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Rotating provider credentials</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          To rotate credentials without downtime: add the new provider with updated credentials, 
          set it as default, verify a test notification goes through, then delete the old provider.
        </p>
      </section>
    </div>
  );
};

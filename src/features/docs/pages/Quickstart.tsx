import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/DocsContent';


const Step = ({ number, title, children }: any) => (
  <div className="relative pl-12 pb-16 last:pb-0">
    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">
      {number}
    </div>
    {/* Connector line */}
    <div className="absolute left-4 top-8 bottom-0 `w-px` bg-black/5 last:hidden" />
    
    <h3 className="text-xl font-black tracking-tight mb-4 text-ui-text">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export const QuickstartPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Quickstart</h1>
        <p className="text-xl text-ui-muted-dark font-medium leading-relaxed">
          Get Envoy up and running in less than 5 minutes. Use the <Link to="/docs/go-sdk" className="text-black underline underline-offset-4 decoration-black/20 hover:decoration-black transition-all">Go SDK</Link> for the best experience.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-ui-text">Before you begin</h2>
        <p className="text-ui-muted-dark font-medium leading-relaxed">
          You will need an Envoy account, a workspace, and credentials for at least one provider 
          (SendGrid API key, AWS IAM credentials for SES, or a Twilio account SID and auth token).
        </p>
      </section>

      <div className="mt-16">
        <Step number="1" title="Create your workspace">
          <p className="text-ui-muted-dark">
            Sign in to the Envoy dashboard and create a workspace. Give it the name of your product 
            or team. You will land on the workspace overview.
          </p>
        </Step>

        <Step number="2" title="Add a provider">
          <p className="text-ui-muted-dark">
            Go to Providers and click Add Provider. Select your provider type, enter your 
            credentials, and set it as the default for that channel. Credentials are encrypted 
            at rest and never returned after saving.
          </p>
          <div className="space-y-4 mt-4">
            <p className="text-xs font-bold text-ui-muted-subtle uppercase">Requirements:</p>
            <ul className="text-sm text-ui-muted-dark space-y-2 list-disc pl-5">
              <li><strong>SendGrid:</strong> your SendGrid API key.</li>
              <li><strong>Amazon SES:</strong> Access Key ID, Secret Access Key, AWS Region, and a verified sender email.</li>
              <li><strong>Twilio:</strong> Account SID, Auth Token, and your Twilio phone number.</li>
            </ul>
          </div>
        </Step>

        <Step number="3" title="Create an API key">
          <p className="text-ui-muted-dark">
            Go to API Keys and click Create Key. Choose the Test environment to start. Copy the key 
            immediately — it will not be shown again. Your key will look like:
          </p>
          <CodeBlock 
            language="text" 
            code={`ne_test_sk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`}
          />
        </Step>

        <Step number="4" title="Create a template">
          <CodeBlock 
            language="bash" 
            code={`curl -X POST https://api.envoy.dev/v1/templates \\
  -H "Authorization: Bearer ne_test_sk_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "welcome-email",
    "channel": "email",
    "subject": "Welcome to {{.AppName}}",
    "body": "Hi {{.FirstName}},\\n\\nYour account is ready. Get started at {{.LoginURL}}.\\n\\nThanks,\\nThe {{.AppName}} team"
  }'`}
          />
          <p className="text-xs font-bold text-ui-muted-subtle uppercase mb-4">Response:</p>
          <CodeBlock 
            language="json" 
            code={`{\n  "id": "tmpl_01hx4k9m2p",\n  "name": "welcome-email",\n  "channel": "email",\n  "created_at": "2024-01-15T10:00:00Z"\n}`}
          />
        </Step>

        <Step number="5" title="Send your first notification">
          <CodeBlock 
            language="bash" 
            code={`curl -X POST https://api.envoy.dev/v1/notifications/trigger \\
  -H "Authorization: Bearer ne_test_sk_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template": "welcome-email",
    "recipient": "alice@example.com",
    "idempotency_key": "welcome-alice-001",
    "payload": {
      "FirstName": "Alice",
      "AppName": "Acme",
      "LoginURL": "https://acme.com/login"
    }
  }'`}
          />
          <p className="text-xs font-bold text-ui-muted-subtle uppercase mb-4">Response:</p>
          <CodeBlock 
            language="json" 
            code={`{\n  "id": "notif_01hx4k9m3q",\n  "status": "queued",\n  "channel": "email",\n  "template": "welcome-email",\n  "recipient": "alice@example.com",\n  "created_at": "2024-01-15T10:00:05Z"\n}`}
          />
        </Step>

        <Step number="6" title="Check delivery">
          <CodeBlock 
            language="bash" 
            code={`curl https://api.envoy.dev/v1/notifications/logs/notif_01hx4k9m3q \\\n  -H "Authorization: Bearer ne_test_sk_xxx"`}
          />
          <p className="text-xs font-bold text-ui-muted-subtle uppercase mb-4">Response:</p>
          <CodeBlock 
            language="json" 
            code={`{\n  "id": "notif_01hx4k9m3q",\n  "status": "sent",\n  "channel": "email",\n  "provider": "sendgrid",\n  "recipient": "alice@example.com",\n  "sent_at": "2024-01-15T10:00:06Z",\n  "error": null\n}`}
          />
          <p className="text-ui-muted-dark mt-4">
            In test environment, <code>status: sent</code> means the mock provider accepted the message. 
            No real email was delivered. Switch to a live key and a live provider to send real notifications.
          </p>
        </Step>
      </div>
    </div>
  );
};

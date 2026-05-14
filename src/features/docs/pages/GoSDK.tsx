import React from 'react';
import { CodeBlock, Callout } from '../components/DocsContent';

export const GoSDKPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Go SDK</h1>
        <p className="text-xl text-ui-muted-dark font-medium leading-relaxed">
          The official Go client for Envoy. Trigger notifications and manage subscriber preferences 
          with just a few lines of code.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-ui-text">Installation</h2>
        <CodeBlock 
          language="bash" 
          code={`go get github.com/NIROOZbx/notification-engine/sdk`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-ui-text">Quick Start</h2>
        <CodeBlock 
          language="go" 
          code={`package main

import (
    "context"
    "fmt"
    "github.com/NIROOZbx/notification-engine/sdk"
)

func main() {
    client := sdk.NewClient("ne_test_sk_...")
    ctx := context.Background()

    // Trigger a notification
    err := client.Notifications.Trigger(ctx, &sdk.TriggerRequest{
        Recipient: "user@example.com",
        Template:  "welcome-email",
        Payload: map[string]any{
            "FirstName": "Alice",
        },
    })
    
    if err != nil {
        fmt.Printf("Delivery failed: %v\\n", err)
        return
    }
    
    fmt.Println("Notification successfully queued")
}`}
        />
      </section>

      <section className="space-y-12 pt-12 border-t border-black/5">
        <h2 className="text-3xl font-black tracking-tight text-ui-text">Core Methods</h2>

        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-xl font-black tracking-tight text-ui-text">1. Trigger Notification</h3>
            <p className="text-ui-muted-dark font-medium leading-relaxed">
              Delivers a notification based on a pre-defined template and recipient contact.
            </p>
            <CodeBlock 
              language="go" 
              code={`err := client.Notifications.Trigger(ctx, &sdk.TriggerRequest{
    Recipient:      "user@example.com",
    Template:       "password-reset",
    Payload: map[string]any{
        "reset_link": "https://acme.com/reset/abc123",
    },
    IdempotencyKey: "reset_user_123_uuid",
})`}
            />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black tracking-tight text-ui-text">2. Identify Subscriber</h3>
            <p className="text-ui-muted-dark font-medium leading-relaxed">
              Registers or updates a subscriber's contact information and global metadata.
            </p>
            <CodeBlock 
              language="go" 
              code={`err := client.Subscribers.Identify(ctx, &sdk.IdentifyRequest{
    Recipient: "user_123",
    Email:     "user@example.com",
    Phone:     "+1234567890",
    Metadata: map[string]any{
        "plan": "premium",
    },
})`}
            />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black tracking-tight text-ui-text">3. Manage Preferences</h3>
            <p className="text-ui-muted-dark font-medium leading-relaxed">
              Opt a subscriber in or out of specific notification templates or channels.
            </p>
            <CodeBlock 
              language="go" 
              code={`err := client.Subscribers.SetPreference(ctx, &sdk.SetPreferenceRequest{
    Recipient: "user_123",
    Template:  "marketing-newsletter",
    Enabled:   false, // Unsubscribe
})`}
            />
          </section>
        </div>
      </section>

      <section className="space-y-6 pt-12 border-t border-black/5">
        <h2 className="text-2xl font-black tracking-tight text-ui-text">Requirements</h2>
        <ul className="space-y-3 text-ui-muted-dark font-medium">
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
            Go 1.25.1 or later
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
            A valid Envoy API key
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
            At least one active provider configured
          </li>
        </ul>
      </section>
    </div>
  );
};

import React from 'react';
import { CodeBlock } from '../components/DocsContent';

export const SelfHostingPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Self-hosting</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Run Envoy on your own infrastructure using Docker and Kubernetes.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Requirements</h2>
        <ul className="space-y-2 list-disc pl-6 text-black/60 font-medium leading-relaxed">
          <li>Docker and Docker Compose</li>
          <li>PostgreSQL 15+</li>
          <li>Redis 7+</li>
          <li>Kafka 3.4+ (or a managed Kafka service — Confluent Cloud, Upstash Kafka, Amazon MSK)</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Environment variables</h2>
        <CodeBlock 
          language="bash" 
          code={`# Database\nDATABASE_URL=postgres://user:password@localhost:5432/envoy\n\n# Redis\nREDIS_URL=redis://localhost:6379\n\n# Kafka\nKAFKA_BROKERS=localhost:9092\nKAFKA_NOTIFICATIONS_TOPIC=notifications\nKAFKA_DLQ_TOPIC=notifications.dlq\n\n# Auth\nJWT_SECRET=your-256-bit-secret\nJWT_ACCESS_TTL=15m\nJWT_REFRESH_TTL=7d\n\n# Encryption (for provider credentials)\nAES_KEY=your-32-byte-hex-key\n\n# Google OAuth (optional)\nGOOGLE_CLIENT_ID=your-client-id\nGOOGLE_CLIENT_SECRET=your-client-secret\nGOOGLE_CALLBACK_URL=https://yourdomain.com/api/v1/auth/google/callback\n\n# App\nPORT=8080\nENV=production`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Docker Compose</h2>
        <CodeBlock 
          language="yaml" 
          code={`version: "3.9"\nservices:\n  api:\n    image: envoy/api:latest\n    ports:\n      - "8080:8080"\n    env_file: .env\n    depends_on:\n      - postgres\n      - redis\n      - kafka\n\n  postgres:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_DB: envoy\n      POSTGRES_USER: envoy\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\n  redis:\n    image: redis:7-alpine\n\n  kafka:\n    image: confluentinc/cp-kafka:7.4.0\n    environment:\n      KAFKA_BROKER_ID: 1\n      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181\n      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092\n      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"\n\n  zookeeper:\n    image: confluentinc/cp-zookeeper:7.4.0\n    environment:\n      ZOOKEEPER_CLIENT_PORT: 2181\n\nvolumes:\n  pgdata:`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Running migrations</h2>
        <CodeBlock 
          language="bash" 
          code={`docker exec -it envoy-api ./envoy migrate up`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Health check</h2>
        <CodeBlock 
          language="bash" 
          code={`curl https://yourdomain.com/api/v1/health\n# {"status":"ok","version":"1.0.0"}`}
        />
      </section>
    </div>
  );
};

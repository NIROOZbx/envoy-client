import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getDocBySlug } from '../constants/docs-registry';

export const DocsContentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/docs/introduction" replace />;
  }

  const page = getDocBySlug(slug);

  if (!page) {
    return <Navigate to="/docs/introduction" replace />;
  }

  const ContentComponent = page.component;

  return (
    <div className="w-full">
      <React.Suspense fallback={
        <div className="space-y-8 animate-pulse">
          <div className="h-12 w-2/3 bg-black/5 rounded-2xl" />
          <div className="h-4 w-full bg-black/5 rounded-lg" />
          <div className="h-4 w-full bg-black/5 rounded-lg" />
          <div className="h-4 w-5/6 bg-black/5 rounded-lg" />
          <div className="mt-12 h-64 w-full bg-black/5 rounded-3xl" />
        </div>
      }>
        <ContentComponent />
      </React.Suspense>
    </div>
  );
};

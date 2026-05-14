import React from 'react';

export const WorkspacesPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Workspaces</h1>
        <p className="text-xl text-black/60 font-medium leading-relaxed">
          Isolated environments for your team and notification infrastructure.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Member roles</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-2 pr-4 text-[10px] font-black uppercase tracking-widest text-black/30">Role</th>
                <th className="py-2 pl-4 text-[10px] font-black uppercase tracking-widest text-black/30">Can do</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4 font-black text-black">Owner</td>
                <td className="py-4 pl-4 text-black/60 font-medium">Everything. Transfer ownership, delete workspace.</td>
              </tr>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4 font-black text-black">Admin</td>
                <td className="py-4 pl-4 text-black/60 font-medium">Manage providers, templates, keys, members. Cannot delete workspace.</td>
              </tr>
              <tr className="border-b border-black/5 last:border-0">
                <td className="py-4 pr-4 font-black text-black">Member</td>
                <td className="py-4 pl-4 text-black/60 font-medium">Read logs and templates. Cannot create or modify anything.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Environments</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Switching environment changes which providers receive notification triggers and which 
          API keys are accepted. Your templates and member list are shared across environments. 
          Your providers and API keys are environment-scoped.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight">Switching environments via API</h2>
        <p className="text-black/60 font-medium leading-relaxed">
          Pass the appropriate key. The environment is determined by the key prefix, not a 
          separate header. There is no "environment" parameter — <code>ne_live_</code> keys always 
          route to live, <code>ne_test_</code> keys always route to test.
        </p>
      </section>
    </div>
  );
};

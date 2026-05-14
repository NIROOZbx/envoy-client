import React from 'react';
import { Save, Plus } from 'lucide-react';
import { Spinner, Form, FormField, FormTextArea, FormDropdown } from '@/components/ui';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const workflowSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  description: z.string().max(1000).optional(),
  event_type: z.string().min(1, 'Trigger event is required').regex(/^[a-z0-9._-]+$/, 'Event trigger must be lowercase and only contain letters, numbers, dots, underscores or hyphens'),
  layout_id: z.string().optional(),
  status: z.enum(['draft', 'live', 'dropped']).optional(),
});

type WorkflowFormData = z.infer<typeof workflowSchema>;

interface WorkflowFormProps {
  initialData: WorkflowFormData;
  onSave: (data: WorkflowFormData) => void;
  isLoading: boolean;
  mode?: 'create' | 'edit';
  layouts: { id: string; name: string }[];
  className?: string;
}

export const WorkflowForm: React.FC<WorkflowFormProps> = ({ 
  initialData, 
  onSave, 
  isLoading, 
  mode = 'edit',
  layouts,
  className
}) => {
  return (
    <Form 
      schema={workflowSchema} 
      onSubmit={onSave} 
      defaultValues={initialData}
      className={cn("space-y-6 sm:space-y-8", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField 
          name="name" 
          label="Workflow Name" 
          placeholder="e.g. Welcome Email Series" 
        />
        
        <FormField 
          name="event_type" 
          label="Trigger Event" 
          placeholder="e.g. user.signed_up" 
          disabled={mode === 'edit'}
        />
      </div>

      <FormDropdown 
        name="layout_id"
        label="Layout Assignment"
        options={[
          { id: '', label: 'No Layout (Raw Content)' },
          ...layouts.map(l => ({ id: l.id, label: l.name }))
        ]}
        placeholder="Select a layout"
      />

      <FormTextArea 
        name="description" 
        label="Workflow Description  (optional)" 
        placeholder="What does this notification sequence do?"
        rows={4}
      />
      
      <div className="pt-4">
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Spinner className="w-4 h-4 text-white" /> : (mode === 'create' ? <Plus className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
          {mode === 'create' ? 'Create Workflow' : 'Update Configuration'}
        </button>
      </div>
    </Form>
  );
};

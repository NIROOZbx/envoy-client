import React from 'react';
import { Save, Plus } from 'lucide-react';
import { Spinner, Form, FormField, FormTextArea, FormCheckbox } from '@/components/ui';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const layoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  html: z.string().min(1, 'HTML content is required').refine(
    (val) => val.includes('{{content}}'),
    { message: 'Layout must contain the {{content}} placeholder' }
  ),
  is_default: z.boolean().optional(),
});

type LayoutFormData = z.infer<typeof layoutSchema>;

interface LayoutFormProps {
  initialData: LayoutFormData;
  onSave: (data: LayoutFormData) => void;
  isLoading: boolean;
  mode?: 'create' | 'edit';
  showDefaultCheckbox?: boolean;
  className?: string;
}

export const LayoutForm: React.FC<LayoutFormProps> = ({ 
  initialData, 
  onSave, 
  isLoading, 
  mode = 'edit',
  showDefaultCheckbox = false,
  className
}) => {
  return (
    <Form 
      schema={layoutSchema} 
      onSubmit={onSave} 
      defaultValues={initialData}
      className={cn("space-y-6 sm:space-y-8", className)}
    >
      <FormField 
        name="name" 
        label="Layout Name" 
        placeholder="e.g. Transactional Base" 
      />

      <FormTextArea 
        name="html" 
        label="HTML Source" 
        description="Required: {{content}} placeholder"
        rows={mode === 'create' ? 6 : 12}
        className="sm:rows-[10] lg:rows-[18]"
      />

      {showDefaultCheckbox && (
        <FormCheckbox 
          name="is_default" 
          label="Set as Primary" 
          description="Automatically apply to new workflows"
        />
      )}
      
      <div className="pt-4">
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Spinner className="w-4 h-4 text-white" /> : (mode === 'create' ? <Plus className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
          {mode === 'create' ? 'Create Layout' : 'Update Layout'}
        </button>
      </div>
    </Form>
  );
};

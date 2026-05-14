import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dropdown } from './Dropdown';

interface FormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
  defaultValues?: any;
}

export function Form<T extends z.ZodType>({ schema, onSubmit, children, className, defaultValues }: FormProps<T>) {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(async (data) => await onSubmit(data))} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type = 'text', placeholder, disabled, onChange }) => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const error = errors[name];

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 last:mb-0">
      <label htmlFor={name} className="px-0.5 text-[10px] font-black uppercase tracking-widest text-ui-muted">
        {label}
      </label>
      
      <div className="relative">
        <input
          {...register(name)}
          id={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            register(name).onChange(e);
            onChange?.(e);
          }}
          className={cn(
            "w-full bg-ui-bg border border-ui-border rounded-xl px-4 py-3 font-bold text-sm outline-none transition-all focus:ring-2 ring-black/5 text-ui-text shadow-inner shadow-black/[0.02]",
            error && "border-destructive ring-destructive/5",
            disabled && "opacity-50 cursor-not-allowed bg-ui-bg/50"
          )}
        />
        
        {isPassword && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors p-1 disabled:opacity-0"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span className="px-0.5 text-[10px] font-bold text-destructive animate-in fade-in slide-in-from-top-1">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  description?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ name, label, placeholder, rows = 5, disabled, className, description }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div className="flex flex-col gap-1.5 last:mb-0">
      <div className="flex justify-between items-center px-0.5">
        <label htmlFor={name} className="text-[10px] font-black uppercase tracking-widest text-ui-muted">
          {label}
        </label>
        {description && <span className="text-[8px] font-bold lowercase text-ui-muted italic opacity-60">{description}</span>}
      </div>
      
      <textarea
        {...register(name)}
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full bg-ui-bg border border-ui-border rounded-2xl px-5 py-4 font-mono text-xs outline-none transition-all focus:ring-2 ring-black/5 text-ui-text resize-none leading-relaxed shadow-inner shadow-black/[0.02]",
          error && "border-destructive ring-destructive/5",
          disabled && "opacity-50 cursor-not-allowed bg-ui-bg/50",
          className
        )}
      />

      {error && (
        <span className="px-0.5 text-[10px] font-bold text-destructive animate-in fade-in slide-in-from-top-1">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

interface FormCheckboxProps {
  name: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, disabled, description }) => {
  const { register } = useFormContext();

  return (
    <label className={cn(
      "flex items-center gap-3 cursor-pointer group p-2.5 rounded-2xl hover:bg-ui-bg transition-all border border-transparent hover:border-ui-border",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none"
    )}>
      <div className="relative flex items-center">
        <input 
          type="checkbox" 
          {...register(name)}
          disabled={disabled}
          className="peer w-5 h-5 appearance-none rounded-lg border-2 border-ui-border checked:bg-black transition-all cursor-pointer"
        />
        <svg 
          className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-[3px] pointer-events-none transition-opacity" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={4}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <div className="text-[10px] font-black uppercase tracking-widest text-ui-text">{label}</div>
        {description && <p className="text-[8px] font-bold text-ui-muted uppercase tracking-tighter opacity-60 leading-tight mt-0.5">{description}</p>}
      </div>
    </label>
  );
}

interface FormSectionProps {
  step?: number | string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ step, title, description, children, className }) => (
  <div className={cn("bg-ui-muted/5 rounded-3xl p-6 sm:p-8 border border-ui-border space-y-8", className)}>
    <div className="flex items-center gap-4">
      {step && (
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-xs shadow-lg shadow-black/10">
          {step}
        </div>
      )}
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-text leading-tight">{title}</h4>
        {description && <p className="text-[9px] font-bold text-ui-muted uppercase opacity-40 mt-1">{description}</p>}
      </div>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

interface FormDropdownProps {
  name: string;
  label: string;
  options: { id: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({ name, label, options, placeholder, disabled }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div className="flex flex-col gap-1.5 last:mb-0">
      <label className="px-0.5 text-[10px] font-black uppercase tracking-widest text-ui-muted">
        {label}
      </label>
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Dropdown
            options={options}
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            className={cn(
              "w-full",
              error && "border-destructive ring-destructive/5",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        )}
      />

      {error && (
        <span className="px-0.5 text-[10px] font-bold text-destructive animate-in fade-in slide-in-from-top-1">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

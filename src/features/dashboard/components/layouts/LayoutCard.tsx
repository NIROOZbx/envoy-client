import { Layout as LayoutIcon, Trash2, Star, MoreHorizontal } from 'lucide-react';
import { Dropdown, type DropdownOption } from '@/components/ui';
import { ResourceCard } from '../ResourceCard';

interface LayoutCardProps {
  id: string;
  name: string;
  createdAt: string;
  isDefault: boolean;
  onDelete: () => void;
  onSetDefault: () => void;
  isSettingDefault: boolean;
}

export const LayoutCard: React.FC<LayoutCardProps> = ({ 
  id, 
  name, 
  createdAt, 
  isDefault, 
  onDelete, 
  onSetDefault,  
}) => {
  const actions: DropdownOption[] = [
    ...(!isDefault ? [{
      id: 'set-default',
      label: 'Set as Primary',
      icon: Star,
      onClick: onSetDefault
    }] : []),
    {
      id: 'delete',
      label: 'Delete Layout',
      icon: Trash2,
      onClick: onDelete,
      variant: 'danger'
    }
  ];

  return (
    <ResourceCard
      id={id}
      name={name}
      href={`/dashboard/layouts/${id}`}
      icon={LayoutIcon}
      updatedAt={createdAt}
      status={isDefault ? { label: 'Primary', type: 'default' } : { label: 'Layout', type: 'other' }}
      actions={
        <Dropdown 
          options={actions}
          align="right"
          trigger={
            <button className="text-ui-muted hover:text-black transition-colors p-2 rounded-xl hover:bg-ui-bg">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          }
        />
      }
    />
  );
};

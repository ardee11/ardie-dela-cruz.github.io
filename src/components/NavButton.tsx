import { type LucideIcon } from 'lucide-react';

interface NavButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean; 
  onClick: () => void;
}

export function NavButton({ icon: Icon, label, active, onClick }: NavButtonProps) {
  return (
    <button 
      className={`icon-btn ${active ? 'active' : ''}`} 
      onClick={onClick}
    >
      <Icon size={24} />
      <span className="tooltip">{label}</span>
    </button>
  );
}
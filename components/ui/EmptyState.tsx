import { Coffee } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'Belum ada data',
  description = 'Data akan muncul di sini setelah ditambahkan.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-coffee-900/50 border border-coffee-700/30 flex items-center justify-center mb-4">
        {icon || <Coffee size={28} className="text-coffee-500" />}
      </div>
      <h3 className="font-display text-lg text-cream-200 mb-2">{title}</h3>
      <p className="text-cream-400 text-sm max-w-xs">{description}</p>
    </div>
  );
}

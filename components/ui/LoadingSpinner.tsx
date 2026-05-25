export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizes[size]} spinner`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-espresso flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 spinner mx-auto mb-4" />
        <p className="font-accent text-coffee-300 text-lg">Menyeduh kopi terbaik...</p>
      </div>
    </div>
  );
}

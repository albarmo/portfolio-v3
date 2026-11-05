interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div role="alert" className="mb-6 border border-accent bg-accent px-4 py-3">
      <samp className="font-mono text-xs font-bold text-white">
        <span aria-hidden="true">⚠ </span>
        {message}
      </samp>
    </div>
  );
}

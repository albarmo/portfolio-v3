export function TailwindIndicator() {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs ">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}

export const Header = () => {
  return (
    <header className="bg-[var(--primary)] text-[var(--foreground)] py-4 px-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-5xl font-bold font-sans pb-3">AI-Powered Requirement Extraction</h1>
          <h3 className="text-sm font-semibold">NextJS Demo by Alejandro Grau</h3>
        </div>
      </div>
    </header>
  );
}
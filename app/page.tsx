import SortingVisualizer from '@/components/SortingVisualizer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="py-6 px-6 md:px-8 border-b bg-card">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Sorting Algorithm Visualizer by Bolt
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compare different sorting algorithms side by side
          </p>
        </div>
      </header>

      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <SortingVisualizer />
      </div>

      <footer className="py-4 px-6 md:px-8 border-t bg-card">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Sorting Algorithm Visualizer © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
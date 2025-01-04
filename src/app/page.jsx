import { renderContent } from '@/utils/prismic-fetcher';

export default async function Home() {
  const pageId = 'Z3g-cRIAACwAIyPI';
  const pageUrl = 'home';
  const page = await renderContent(pageId);

  return (
    <div className="container h-full flex flex-col">
      <main className="flex-grow overflow-auto break-words whitespace-normal">
        {page ? JSON.stringify(page) : 'De pagina kon niet geladen worden.'}
      </main>
      <footer className="bottom-0 w-full h-12 border-t border-primary flex items-center justify-center">
        <h6>Website door <a href="https://www.manoukvandraanen.com" target="_blank" rel="noopener noreferrer" className="text-xs">Manouk van Draanen</a></h6>
      </footer>
    </div>
  );
}
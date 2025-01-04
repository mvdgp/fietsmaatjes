import { createClient } from '../prismicio';

async function fetchPageData() {
  const client = createClient();
  const page = await client.getByUID('page', 'home');
  console.log(JSON.stringify(page));
  return page;
}

export default async function Home() {
  const page = await fetchPageData();

  return (
    <div className="container h-full flex flex-col">
      <main className="flex-grow overflow-auto">
        {JSON.stringify(page)}
      </main>
      <footer className="w-full h-12 border-t border-primary flex items-center justify-center">
        <h6>Website door <a href="www.manoukvandraanen.com" target="_blank" rel="noopener noreferrer" className="text-xs">Manouk van Draanen</a></h6>
      </footer>
    </div>
  );
}
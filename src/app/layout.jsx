import './globals.css';
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import NavigationMenu from '@/components/navigation-menu';
import SocialBar from '@/components/social-bar';
import SearchBar from '@/components/search-bar';
import { buildMenu } from '@/utils/menu-builder';

export default async function RootLayout({ children }) {
  const menuItems = await buildMenu();

  return (
    <html lang="en">
      <body className="h-[100dvh] w-[100dvw] flex flex-col">
        <header className={`
          fixed top-0 left-0 w-full h-16 px-4
          bg-primary flex items-center justify-between
        `}>
          <NavigationMenu menuItems={menuItems} />
          <div className="flex items-center gap-4">
            <SocialBar />
            <SearchBar />
          </div>
        </header>
        <main className="flex-grow mt-16">
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </main>
      </body>
    </html>
  );
}
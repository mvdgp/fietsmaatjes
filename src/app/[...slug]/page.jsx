"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { renderContent } from '@/utils/prismic-fetcher';
import NotFound from '@/components/404';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';

const Page = () => {
    const path = usePathname();
    const router = useRouter();

    let slug = 'home';
    if (path !== '/') slug = path.split('/').pop();

    const [content, setContent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                
                // Subpages are always redirected to their full UID
                const response = await renderContent(slug);
                if (response.uid !== response.fullUid) {
                    router.replace(`/${response.fullUid}`);
                }

                setContent(response);
                setError(false); // Reset error state if content is fetched successfully
            } catch (error) {
                console.error('Error fetching content:', error);
                setError(true); // Set error state if fetching content fails
            }
        };

        fetchContent();
    }, [slug]);

    if (error) {
        return <NotFound />;
    }

    return (
        <div className="h-full flex flex-col">
            <main className="flex-grow overflow-auto break-words whitespace-normal">
                {content && (
                    <div className="flex flex-row">
                        <SliceZone slices={content.data.slices} components={components} />
                    </div>
                )}
            </main>
            <footer className="bottom-0 w-full h-12 border-t border-primary flex items-center justify-center">
                <h6>Website door <a href="https://www.manoukvandraanen.com" target="_blank" rel="noopener noreferrer" className="text-xs">Manouk van Draanen</a></h6>
            </footer>
        </div>
    );
};

export default Page;
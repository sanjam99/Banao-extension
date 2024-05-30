import React, { useState } from 'react';
import axios from 'axios';
import Example from './components/loader';

const App: React.FC = () => {
    const [links, setLinks] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const linkArray = links.split('\n').map(link => link.trim());
        try {
            for (const link of linkArray) {
                await axios.post('http://localhost:3000/api/scrape', { url: link });
            }
            alert('Profiles scraped successfully');
        } catch (error) {
            console.error('Error scraping profiles:', error);
            alert('There was an error scraping the profiles.');
        }
        setLoading(false);
    };

    if (loading) {
        return (<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl font-bold mb-6">LinkedIn Profile Scraper</h1>
        <Example />;
        </div>)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h1 className="text-3xl font-bold mb-6">LinkedIn Profile Scraper</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 shadow-md rounded-lg p-6">
                <textarea
                    rows={10}
                    cols={50}
                    value={links}
                    onChange={(e) => setLinks(e.target.value)}
                    placeholder="Enter LinkedIn profile links, one per line"
                    className="w-full p-2 border border-gray-600 rounded-lg mb-4 bg-black text-white"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-2xl border-2 border-dashed border-white bg-black px-6 py-3 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default App;

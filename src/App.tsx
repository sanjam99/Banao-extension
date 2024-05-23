import { useState } from 'react';
import './App.css'

function App(){
  const [title, setTitle] = useState<string>('');

  const fetchTitle = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const currentTab = tabs[0];
        setTitle(currentTab.title || 'No title');
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tab Title Fetcher by Sanket Jambhulkar</h1>
      <div className="container flex items-center justify-between px-6 py-3 mx-auto">
            <a href="#">
            <img className="w-full h-full max-w-md" src="https://merakiui.com/images/components/Email-campaign-bro.svg" alt="email illustration vector art"></img>
            </a>
        </div>
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={fetchTitle}>
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Fetch Tab Title
        </span>
      </button>
      <p className="text-blue-400 text-xl">{title}</p>
    </div>
  );
};

export default App

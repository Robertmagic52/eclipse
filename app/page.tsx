'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/shortcut');
        const json = await res.json();
        if (json.default_user) {
          setData(json.default_user);
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-8 bg-zinc-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Performer Control Center</h1>
      {data ? (
        <div className="bg-zinc-800 p-4 rounded-lg max-w-md space-y-3">
          <p><strong>Update Type:</strong> {data.updateType || 'None'}</p>
          <p>
            <strong>Current URL:</strong>{' '}
            {data.url ? (
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline break-all"
              >
                {data.url}
              </a>
            ) : (
              <span className="text-zinc-400">None</span>
            )}
          </p>
          <p><strong>Is Locked:</strong> {data.isLocked ? 'Yes' : 'No'}</p>
          {data.screenshot && (
            <div className="mt-4">
              <p className="text-sm text-zinc-400 mb-1">Live Screenshot:</p>
              <img
                src={`data:image/jpeg;base64,${data.screenshot}`}
                alt="Screenshot"
                className="rounded w-full"
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-zinc-400">Waiting for shortcut updates...</p>
      )}
    </main>
  );
}

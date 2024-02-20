// Inside src/App.tsx
import React, { useState, useEffect } from 'react';
import BitcoinBlocksTable from './BitcoinBlocksTable';
import './App.css';

interface Block {
  height: number;
  hash: string;
  header: string;
  adjustedTimestamp: string;
}

const App: React.FC = () => {
  const [blockData, setBlockData] = useState<Block[]>([]);
  const itemsPerPage = 10; // Set your preferred number of items per page
  
  useEffect(() => {
    // Assuming you fetch the data from an API
    // Replace this with your API call
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.bitaps.com/btc/v1/blockchain/blocks/date/20240219');
        const data: { data: Block[] } = await response.json();
        setBlockData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Bitcoin Blocks</h1>
      <BitcoinBlocksTable data={blockData} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default App;

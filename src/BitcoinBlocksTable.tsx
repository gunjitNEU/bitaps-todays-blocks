import React, { useState } from 'react';

interface Block {
  height: number;
  hash: string;
  header: string;
  adjustedTimestamp: string;
}

interface BitcoinBlocksTableProps {
  data: Block[];
  itemsPerPage: number;
}

const BitcoinBlocksTable: React.FC<BitcoinBlocksTableProps> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Header</th>
            <th>Adjusted Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((block, index) => (
            <tr key={index}>
              <td>{block.height}</td>
              <td>{block.hash}</td>
              <td>{block.header}</td>
              <td>{block.adjustedTimestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul>
      {pageNumbers.map((number) => (
        <li key={number} className={number === currentPage ? 'active' : ''}>
          <button onClick={() => paginate(number)}>{number}</button>
        </li>
      ))}
    </ul>
  );
};

export default BitcoinBlocksTable;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, Download } from 'lucide-react';
import Button from './Button';

const Table = ({ 
  columns: rawColumns, 
  data = [], 
  title = "Data Table",
  description,
  onExport,
  searchPlaceholder = "Search...",
  isLoading = false
}) => {
  // Normalize columns: support both {header, accessor, cell} and {label, key, render}
  const columns = rawColumns.map(col => ({
    header: col.header || col.label || '',
    accessor: col.accessor || col.key || '',
    cell: col.cell || (col.render ? (row) => col.render(row[col.key || col.accessor], row) : null)
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const safeData = Array.isArray(data) ? data : [];
  const filteredData = safeData.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col w-full">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all w-full sm:w-64"
            />
          </div>
          {onExport && (
            <Button variant="outline" className="px-4 py-2 text-sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 whitespace-nowrap">{col.header}</th>
              ))}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400">
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  key={idx} 
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      {col.cell ? col.cell(row) : row[col.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-16 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      {searchTerm ? 'No results match your search.' : 'No records found.'}
                    </p>
                    {searchTerm && <p className="text-xs text-gray-400">Try a different search term.</p>}
                  </div>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <span className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-medium text-gray-900">{filteredData.length}</span> results
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-medium text-gray-700 px-2">
            Page {currentPage} of {totalPages || 1}
          </div>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;


import React from 'react';

const AcronymsPage: React.FC = () => {
  return (
    <div className="wiki-page">
      <div className="wiki-page-header mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-wiki-header">Acronyms</h1>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-wiki-border rounded hover:bg-wiki-hover">Follow</button>
            <button className="px-3 py-1 text-sm border border-wiki-border rounded hover:bg-wiki-hover">Edit</button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs">C</div>
            <span>Chad Martin</span>
          </div>
          <span>Jan 26, 2023</span>
        </div>
      </div>

      <div className="wiki-page-content">
        <h2 className="text-2xl font-bold mb-4 text-wiki-header">Acronym List</h2>
        
        <div className="overflow-x-auto">
          <table className="wiki-table mb-8">
            <thead>
              <tr>
                <th className="w-1/3">Acronyms</th>
                <th className="w-2/3">Stands for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-medium bg-gray-50">
                <td colSpan={2}>Departments</td>
              </tr>
              <tr>
                <td>NCS</td>
                <td>Neighborly Customer Solutions</td>
              </tr>
              <tr>
                <td>NSS</td>
                <td>Neighborly Service Solutions</td>
              </tr>
              <tr>
                <td>OTH</td>
                <td>Own The Home</td>
              </tr>
              
              <tr className="font-medium bg-gray-50">
                <td colSpan={2}>Applications</td>
              </tr>
              <tr>
                <td>CAN</td>
                <td>Call A Neighbor</td>
              </tr>
              <tr>
                <td>CDP</td>
                <td>Customer Data Platform</td>
              </tr>
              <tr>
                <td>CES</td>
                <td>Customer Engagement System</td>
              </tr>
              <tr>
                <td>CPK</td>
                <td>Crownpeak Content Management System</td>
              </tr>
              <tr>
                <td>DIH</td>
                <td>Data Integration Hub</td>
              </tr>
              <tr>
                <td>FAN</td>
                <td>Find a Neighbor</td>
              </tr>
              <tr>
                <td>FSM</td>
                <td>Field Service Management</td>
              </tr>
              <tr>
                <td>GBIS</td>
                <td>Geography-based Business Information Solutions</td>
              </tr>
              <tr>
                <td>GP</td>
                <td>Great Plains</td>
              </tr>
              <tr>
                <td>MPG</td>
                <td>Menu Pricing Guide</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcronymsPage;

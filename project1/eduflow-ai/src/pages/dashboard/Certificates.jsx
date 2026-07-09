import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Table from '../../components/Table';

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      // In production, this would fetch from /api/reports/certificates/
      // For now, if the DB fails to connect, we use mock data to keep the UI beautiful
      const response = await fetch('http://localhost:8000/api/reports/certificates/');
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (err) {
      console.log('Failed to fetch certificates:', err);
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCertificate = (cert) => {
    setSelectedCert(cert);
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const columns = [
    { key: 'certificate_id', label: 'Certificate ID' },
    { key: 'title', label: 'Title' },
    { key: 'student_name', label: 'Student' },
    { key: 'issue_date', label: 'Issue Date' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (_, item) => (
        <Button variant="outline" onClick={() => generateCertificate(item)}>
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </Button>
      )
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-500 mt-1">Manage and generate student certificates</p>
        </div>
        {user?.role !== 'student' && (
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" /> Generate New
          </Button>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input type="text" placeholder="Search certificates..." className="pl-10 w-full" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <Table 
          columns={columns} 
          data={certificates} 
          isLoading={isLoading} 
        />
      </motion.div>

      {/* Printable Certificate Template (Hidden on Screen, Visible on Print) */}
      {isPrinting && selectedCert && (
        <div className="fixed inset-0 bg-white z-[9999] print:block flex items-center justify-center p-8">
          <div className="w-[1056px] h-[816px] border-[16px] border-primary-900 p-12 relative bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]">
            <div className="absolute inset-0 border-[4px] border-primary-500 m-4" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-8">
              <Award className="w-24 h-24 text-primary-600" />
              <h1 className="text-6xl font-serif font-bold text-gray-900 tracking-widest uppercase">Certificate of Achievement</h1>
              <p className="text-xl text-gray-600 uppercase tracking-widest">This is proudly presented to</p>
              <h2 className="text-5xl font-script text-primary-800 font-bold italic">{selectedCert.student_name}</h2>
              <div className="w-64 h-px bg-gray-300 mx-auto my-4" />
              <p className="text-2xl text-gray-700 max-w-2xl leading-relaxed">{selectedCert.description}</p>
              <p className="text-lg text-gray-500 mt-4">For the award of {selectedCert.title}</p>
              
              <div className="flex justify-between w-full px-24 pt-16 mt-auto">
                <div className="text-center">
                  <div className="w-48 h-px bg-gray-400 mb-2" />
                  <p className="font-bold text-gray-800">{selectedCert.issue_date}</p>
                  <p className="text-sm text-gray-500 uppercase">Date</p>
                </div>
                <div className="text-center">
                  <div className="w-48 h-px bg-gray-400 mb-2" />
                  <p className="font-bold text-gray-800">{selectedCert.issued_by}</p>
                  <p className="text-sm text-gray-500 uppercase">Authorized Signature</p>
                </div>
              </div>
              <div className="absolute bottom-12 right-12 text-gray-400 text-sm font-mono">
                ID: {selectedCert.certificate_id}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Print */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .fixed.inset-0.z-\\[9999\\] * { visibility: visible; }
          .fixed.inset-0.z-\\[9999\\] { position: absolute; left: 0; top: 0; padding: 0; margin: 0; background: white; }
          @page { size: landscape; margin: 0; }
        }
      `}} />
    </div>
  );
};

export default Certificates;

import { useState } from 'react';
import { Download, Terminal, Laptop, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import { DriverDownload } from '../types';
import { driverDownloads } from '../data';

export default function DownloadsView() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);

  const handleSimulateDownload = (driver: DriverDownload) => {
    if (downloadingId) return; // wait for current to finish
    setDownloadingId(driver.id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadedFiles((old) => [...old, driver.id]);
            setDownloadingId(null);
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div id="downloads-view-container" className="max-w-7xl mx-auto px-4 py-8 space-y-16 animate-in fade-in duration-200">
      
      {/* 1. Header Banner */}
      <div className="text-center space-y-2">
        <span className="bg-sky-50 text-sky-800 text-[10px] font-bold px-3 py-1 rounded-full border border-sky-200 uppercase tracking-widest">
          Drivers & Utilities
        </span>
        <h1 className="font-display font-extrabold text-3.5xl text-blue-950">
          USB Crypto Token Drivers & Signing Software
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Download certified driver installers for ePass2003, mToken, and Proxkey hardware, along with emSigner utilities for GST and MCA portals.
        </p>
      </div>

      {/* 2. Download Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs select-none">
        <div className="bg-slate-50 border-b border-slate-250 p-5 flex justify-between items-center">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-sm">Official Driver Library</h3>
            <p className="text-xs text-slate-500">Fully virus-tested secure installers. Supports Windows 10/11 and latest macOS.</p>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-5">Software / Utility Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">OS Support</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4 text-right">Download Link</th>
              </tr>
            </thead>
            <tbody>
              {driverDownloads.map((driver) => {
                const isDownloading = downloadingId === driver.id;
                const isDownloaded = downloadedFiles.includes(driver.id);

                return (
                  <tr key={driver.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-50 text-blue-800 p-2.5 rounded-xl border border-blue-100 shrink-0">
                          <Laptop className="w-4 h-4 text-blue-900" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-slate-900 text-sm">{driver.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Version: {driver.version}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-500">{driver.category}</td>
                    <td className="py-4 px-4 font-medium">
                      <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        {driver.os}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-medium text-slate-400">{driver.size}</td>
                    <td className="py-4 px-4 text-right">
                      {isDownloading ? (
                        <div className="w-36 ml-auto flex items-center space-x-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border">
                            <div 
                              className="bg-blue-600 h-full transition-all duration-150" 
                              style={{ width: `${downloadProgress}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-slate-400 w-8">{downloadProgress}%</span>
                        </div>
                      ) : isDownloaded ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs select-none bg-emerald-50 border border-emerald-100 py-1.5 px-3 rounded-xl">
                          <CheckCircle2 className="w-4 h-4" /> Downloaded
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSimulateDownload(driver)}
                          className="bg-blue-75 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold py-1.5 px-4 rounded-xl text-xs inline-flex items-center space-x-1 cursor-pointer transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Utility</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Helper Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="font-display font-extrabold text-blue-950 text-xl">How to install your crypto token?</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Follow these brief steps to install your physical USB secure token. Your digital signature certificate must be loaded into the FIPS token database before attempting government filings.
          </p>
          <ol className="list-decimal list-inside text-xs text-slate-500 space-y-2 pl-1 leading-relaxed">
            <li>Download the compatible brand driver (e.g. ePass2003) for your operating system.</li>
            <li>Run the installer executable as administrator and complete the setup wizard.</li>
            <li>Plug your secure FIPS USB token into your physical laptop or desktop port.</li>
            <li>Open your token manager utility from the system tray and register the cryptographic certificate on your computer.</li>
          </ol>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3">
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest flex items-center gap-1">
            <Terminal className="w-4 h-4" /> Signer Utility Guide (GST & MCA)
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Portals like the Goods and Services Tax (GST) and Ministry of Corporate Affairs (MCA) require a background signing tool called <strong>emSigner</strong> to connect your browser with your physical USB certificate.
          </p>
          <div className="bg-amber-50 border border-amber-100 text-amber-800 text-[11px] p-3 rounded-xl flex items-start gap-1.5 leading-relaxed">
            <span className="font-bold">⚠️ Warning:</span>
            <span>Make sure you have installed the correct 64-bit Java Runtime Environment (JRE) on your computer before running emSigner, otherwise the web utility will fail to bind ports.</span>
          </div>
        </div>
      </div>

    </div>
  );
}

import React from 'react';

export default function LiveFileUploadDemo(): React.ReactNode {
  const [isDragging, setIsDragging] = React.useState(false);
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">File Upload with MIME Type Restriction</p>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
          className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-orange-500 bg-orange-50 scale-[1.02]'
              : 'border-gray-300 bg-white hover:border-orange-400'
          }`}
        >
          <svg className={`mx-auto h-12 w-12 mb-4 ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className={`text-base font-medium mb-1 ${isDragging ? 'text-orange-600' : 'text-gray-700'}`}>
            {isDragging ? 'Drop files here' : 'Drag and drop files here'}
          </p>
          <p className="text-sm text-gray-500">or click to browse</p>
          <p className="text-xs text-gray-400 mt-2">Accepts: Images · Max: 10MB</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-500">
          File Preview with <code>accept</code> Prop Examples
        </p>
        <div className="space-y-2">
          {[
            { name: 'profile-image.jpg', size: '2.4 MB', type: 'image', rule: 'accept="image/*"' },
            { name: 'document.pdf', size: '856 KB', type: 'pdf', rule: 'accept=".pdf"' },
          ].map((file) => (
            <div key={file.name} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                  {file.type === 'image' ? '🖼' : '📄'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-orange-500 font-mono bg-orange-50 px-2 py-0.5 rounded">
                  {file.rule}
                </span>
                <button className="text-gray-400 hover:text-red-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-sm font-medium text-orange-800 mb-1">💡 MIME Type Restriction</p>
        <p className="text-xs text-orange-700">
          Use the <code className="bg-orange-100 px-1 rounded">accept</code> prop on FileUpload to restrict
          which file types users can select. Supports MIME types (<code>image/*</code>), specific types
          (<code>image/jpeg</code>), and extensions (<code>.pdf</code>). Combined with <code>maxSize</code>
          and <code>maxFiles</code>, you get full file validation out of the box.
        </p>
      </div>
    </div>
  );
}

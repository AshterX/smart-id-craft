
import React from 'react';
import { CardTemplate, StudentData } from './types';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';

interface CardTemplateProps {
  data: StudentData;
  className?: string;
  cardRef?: React.RefObject<HTMLDivElement>;
}

// Helper function to create a smaller data object for QR code
const createQRCodeData = (data: StudentData) => {
  // Create a new object with essential info but without the photo
  const qrData = {
    id: data.id,
    name: data.name,
    rollNumber: data.rollNumber,
    classDiv: data.classDiv,
    allergies: data.allergies,
    rackNumber: data.rackNumber,
    busRouteNumber: data.busRouteNumber,
  };
  
  return JSON.stringify(qrData);
};

export const Template1: React.FC<CardTemplateProps> = ({ data, className, cardRef }) => {
  return (
    <div 
      ref={cardRef}
      className={cn("id-card-base template-1", className)}
    >
      <div className="bg-unity-primary text-white p-4">
        <h2 className="text-xl font-bold text-center">UNITY SCHOOL</h2>
        <p className="text-center text-sm">Student Identification Card</p>
      </div>
      
      <div className="flex-1 p-4 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-unity-light mb-3">
          {data.photo ? (
            <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Photo</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-unity-dark mb-1">{data.name}</h3>
        <p className="text-unity-secondary text-sm mb-3">Roll No: {data.rollNumber}</p>
        
        <div className="w-full grid grid-cols-2 gap-2 mb-3">
          <div className="text-sm">
            <p className="font-semibold text-unity-tertiary">Class & Division</p>
            <p>{data.classDiv}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-unity-tertiary">Rack Number</p>
            <p>{data.rackNumber}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-unity-tertiary">Bus Route</p>
            <p>{data.busRouteNumber}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-unity-tertiary">Allergies</p>
            <p>{data.allergies.length > 0 ? data.allergies.join(', ') : 'None'}</p>
          </div>
        </div>
        
        <div className="mt-auto">
          <QRCodeSVG 
            value={createQRCodeData(data)} 
            size={96} 
            level="M" // Medium error correction level
          />
          <p className="text-xs text-center mt-1 text-gray-500">Scan for full details</p>
        </div>
      </div>
      
      <div className="bg-unity-primary text-white p-2 text-xs text-center">
        <p>Valid for Academic Year 2025-2026</p>
      </div>
    </div>
  );
};

export const Template2: React.FC<CardTemplateProps> = ({ data, className, cardRef }) => {
  return (
    <div 
      ref={cardRef}
      className={cn("id-card-base template-2", className)}
    >
      <div className="p-4 border-b border-unity-accent">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">UNITY SCHOOL</h2>
          <QRCodeSVG 
            value={createQRCodeData(data)} 
            size={48} 
            bgColor="transparent" 
            fgColor="white" 
            level="M" // Medium error correction level
          />
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex gap-4 mb-4">
          <div className="w-24 h-32 rounded overflow-hidden border-2 border-unity-accent">
            {data.photo ? (
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-unity-dark flex items-center justify-center">
                <span className="text-gray-400">No Photo</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold">{data.name}</h3>
            <p className="text-sm mb-3 opacity-80">ID: {data.rollNumber}</p>
            
            <div className="space-y-1">
              <div className="text-sm">
                <span className="opacity-80">Class:</span> {data.classDiv}
              </div>
              <div className="text-sm">
                <span className="opacity-80">Rack:</span> {data.rackNumber}
              </div>
              <div className="text-sm">
                <span className="opacity-80">Bus Route:</span> {data.busRouteNumber}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-bold opacity-90 border-b border-unity-accent inline-block pb-1 mb-1">ALLERGIES</h4>
          <p className="text-sm">{data.allergies.length > 0 ? data.allergies.join(', ') : 'None'}</p>
        </div>
      </div>
      
      <div className="mt-auto p-3 bg-unity-accent text-white text-center font-medium">
        <p>Unity School - Empowering Minds, Building Futures</p>
      </div>
    </div>
  );
};

export const getTemplateComponent = (template: CardTemplate) => {
  switch(template) {
    case 'template-1':
      return Template1;
    case 'template-2':
      return Template2;
    default:
      return Template1;
  }
};

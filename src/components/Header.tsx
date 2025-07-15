import React from 'react';
import { Thermometer, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Thermometer className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-nexa">
                  Paris Cool Spots
                </h1>
                <p className="text-sm text-gray-600">
                  Trouvez des endroits frais à Paris
                </p>
              </div>
            </div>
          </div>

          {/* Indicateur de localisation */}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Paris, France</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
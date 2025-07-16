import React from 'react';
import { Thermometer, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-w-0">
          {/* Logo et titre */}
          <div className="flex items-center min-w-0 flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Thermometer className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2 sm:mr-3" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  Paris Cool Spots
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Trouvez des endroits frais à Paris
                </p>
              </div>
            </div>
          </div>

          {/* Indicateur de localisation */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600 ml-2 flex-shrink-0">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Paris, France</span>
            <span className="sm:hidden">Paris</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
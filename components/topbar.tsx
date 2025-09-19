import React from 'react';
import { MapPin, Phone } from 'lucide-react';

type TopBarProps = {
  address?: string;
  hotline?: string;
};

export default function TopBar({
  address = 'TT2-23, Khu Liền kề IEC, xã Tứ Hiệp, huyện Thanh Trì, TP Hà Nội.',
  hotline = '0916 95 33 55',
}: TopBarProps) {
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const telHref = `tel:${hotline.replace(/\s/g, '')}`;

  return (
    <div
      id="top-bar"
      className="text-green-cyan-200 "
      style={{ fontWeight: 600 }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2">
          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
              title={address}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-[0.8rem]">{address}</span>
            </a>

            <a
              href={telHref}
              className="inline-flex items-center gap-2 hover:text-white transition-colors mt-1 md:mt-0"
              title={hotline}
            >
              <Phone className="h-4 w-4" />
              <span className="text-[0.8rem]">{hotline}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

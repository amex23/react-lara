import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function ImageWithBadge({ src, alt, viewCount, size = 'sm' }: { src: string; alt: string; viewCount: number; size?: 'sm' | 'lg' }) {
    const cls = size === 'lg' ? 'w-full h-[120px] object-cover' : 'w-full h-[120px] object-cover';
    return (
        <div className="relative">
            <img src={src} alt={alt} className={`${cls} object-cover rounded border shadow-sm`} />
                <span className="absolute px-1 py-0 top-[3%] right-6 text-xs text-white font-bold rounded-sm leading-tight">
                    <FontAwesomeIcon icon={faEye} />
                </span>

            {viewCount > 0 && (
                
                <span className="bg-red-500 absolute px-1 py-0 top-[3%] right-2 text-xs text-white font-bold rounded-sm leading-tight">
                    
                    {viewCount}
                </span>
                
            )}
        </div>
    );
}
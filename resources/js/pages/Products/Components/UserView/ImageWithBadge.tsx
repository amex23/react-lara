import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function ImageWithBadge({ src, alt, viewCount, size = 'sm' }: { src: string; alt: string; viewCount: number; size?: 'sm' | 'lg' }) {
    const cls = size === 'lg' ? 'w-full h-[120px] object-cover' : 'w-full h-[120px] object-cover';
    return (
        <div className="relative">
            <img src={src} alt={alt} className={`${cls} object-cover rounded border shadow-sm`} />

            <span className="absolute top-[3%] z-[99] flex bg-[#4A4A4A] flex items-center justify-center rounded-xs ml-2 mt-2 px-[1px] py-[1px]">
                <span className="px-1 py-0 text-xs text-white font-bold rounded-sm leading-tight">
                        <FontAwesomeIcon icon={faEye} />
                </span>
                {viewCount > 0 && (
                    
                    <span className="bg-red-500 px-1 py-0 text-xs text-white font-bold rounded-sm leading-tight">
                        
                        {viewCount}
                    </span>
                    
                )}
            </span>
                
        </div>
    );
}


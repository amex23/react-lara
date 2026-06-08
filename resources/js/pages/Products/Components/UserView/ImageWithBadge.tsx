import React from 'react';

export default function ImageWithBadge({ src, alt, viewCount, size = 'sm' }: { src: string; alt: string; viewCount: number; size?: 'sm' | 'lg' }) {
    const cls = size === 'lg' ? 'w-full h-auto object-cover' : 'w-full h-auto';
    return (
        <div className="relative">
            <img src={src} alt={alt} className={`${cls} object-cover rounded border shadow-sm`} />
            {viewCount > 0 && (
                <span className="absolute px-1 py-0 top-[2%] right-0 text-md text-white font-bold rounded-sm leading-tight">
                    {viewCount}
                </span>
                
            )}
            {/* <i className="fa fa-eye absolute" aria-hidden="true"></i> */}
        </div>
    );
}

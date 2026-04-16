import React from 'react';

export default function ImageWithBadge({ src, alt, viewCount, size = 'sm' }: { src: string; alt: string; viewCount: number; size?: 'sm' | 'lg' }) {
    const cls = size === 'lg' ? 'w-16 h-16' : 'w-18 h-18';
    return (
        <div className="relative">
            <img src={src} alt={alt} className={`${cls} object-cover rounded border shadow-sm`} />
            {viewCount > 0 && (
                <span className="bg-red-500 absolute px-1 py-0 top-[2%] right-0 text-md text-white font-bold rounded-sm leading-tight">
                    {viewCount}
                </span>
            )}
        </div>
    );
}

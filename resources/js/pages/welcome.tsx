import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

const PREVIEW_IMAGES = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop&q=80',
];

const DURATION = 4000;

// ── Silent Geolocation Capture ────────────────────────────────────────────
function useSilentGeolocation() {
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;
                const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';

                fetch('/api/visitor-location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        lat: latitude,
                        lon: longitude,
                        accuracy: Math.round(accuracy),
                    }),
                }).catch(() => {
                    // Silently fail — never break the page
                });
            },
            () => {
                // User denied or unavailable — silently ignore
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);
}

function StoryOverlay({
    images,
    startIndex,
    onClose,
}: {
    images: string[];
    startIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(startIndex);
    const [progress, setProgress] = useState<number[]>(images.map((_, i) => (i < startIndex ? 100 : 0)));
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const goTo = (index: number) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setCurrent(index);
        setProgress(images.map((_, i) => (i < index ? 100 : 0)));
        startTimeRef.current = performance.now();
        animateBar(index, performance.now());
        timerRef.current = setTimeout(() => {
            if (index < images.length - 1) goTo(index + 1);
            else onClose();
        }, DURATION);
    };

    const animateBar = (index: number, startTime: number) => {
        const tick = (now: number) => {
            const elapsed = now - startTime;
            const pct = Math.min((elapsed / DURATION) * 100, 100);
            setProgress(prev => prev.map((v, i) => (i === index ? pct : v)));
            if (pct < 100) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        goTo(startIndex);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden shadow-2xl bg-black"
                style={{ height: '80vh' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Progress bars */}
                <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2 mt-1">
                    {images.map((_, i) => (
                        <div key={i} className="flex-1 h-[3px] bg-[#949494] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#5CBAE6] rounded-full"
                                style={{ width: `${progress[i]}%`, transition: 'none' }}
                            />
                        </div>
                    ))}
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/40 rounded-full hover:bg-black/60 transition"
                >
                    <span className="font-bold text-white">✕</span>
                </button>

                {/* Tap zones */}
                <div className="absolute inset-0 flex z-10">
                    <div className="w-1/2 h-full cursor-pointer" onClick={() => current > 0 && goTo(current - 1)} />
                    <div className="w-1/2 h-full cursor-pointer" onClick={() => current < images.length - 1 ? goTo(current + 1) : onClose()} />
                </div>

                {/* Image */}
                <img
                    src={images[current]}
                    alt={`Story ${current + 1}`}
                    className="w-full h-full object-cover block"
                />

                {/* Counter */}
                <div className="absolute mt-[-14px] flex justify-center bottom-10 left-0 right-0">
                    <span className='bg-gray-500 text-white font-bold px-5 py-2'>CHECKOUT</span>
                </div>
            </div>
        </div>
    );
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [overlayIndex, setOverlayIndex] = useState<number | null>(null);

    // Silently capture geolocation on page load
    useSilentGeolocation();

    return (
        <>
            <Head title="">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">

                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link href={dashboard()} className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] font-bold">
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link href={register()} className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] bg-[#37B6FF] dark:hover:border-[#62605b] text-white font-bold">
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center flex-col justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 gap-y-5 md:gap-y-10">

                    {/* Story circles */}
                    <div className="w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="flex items-center justify-start md:justify-center gap-3 md:gap-6 px-0 md:px-4 md:pt-2 pb-2 min-w-max md:min-w-0 mx-auto">
                            {PREVIEW_IMAGES.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setOverlayIndex(i)}
                                    className="rounded-full border-[3px] border-[#37B6FF] w-[100px] h-[100px] md:w-[112px] md:h-[112px] overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-transform focus:outline-none"
                                >
                                    <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover pointer-events-none" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615]">
                            <span className="">
                                <div>
                                    <h1 className="mb-1 text-4xl font-bold tracking-wide text-center md:text-start text-[#474747]">ShopMyDay</h1>
                                </div>
                            </span>
                            <p className="mb-2 text-[15px] text-[#706f6c] dark:text-[#A1A09A] mt-7 leading-[24px] text-center md:text-start">
                                Letting you post 24-hour product stories on your e-commerce store. Each story your day highlights with direct checkout links, making it easy for viewers to tap and buy. This story-driven approach increases engagement and boosts conversions.
                            </p>
                        </div>

                        <div
                            className="relative h-[300px] md:h-[400px] -mb-px w-full shrink-0 overflow-hidden rounded-t-lg lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg"
                            style={{
                                backgroundImage: `url('/images/new-logo.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                        </div>
                    </div>

                    <div className="text-md md:text-xl text-center md:text-start flex gap-1 items-center"><b>20%</b> of Profit goes to <a href="https://www.worldvision.org.ph/"><b>WorldVision</b></a> Charity <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#37B6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg></div>


                    <div className='mt-7'>
                        <div className="flex w-full justify-center gap-2 lg:gap-3">
                            <a className='text-sm lg:text-[15px] text-center' href="/privacy-policy"> 
                            ● &nbsp;Privacy Policy</a>
                            <a className='text-sm lg:text-[15px] text-center' href="/terms-of-service"> ● &nbsp;Terms of Service</a>
                            <a className='text-sm lg:text-[15px] text-center' href="/refund-policy"> ● &nbsp;Refund Policy</a> 
                        </div>

                        <div className="pt-3 flex flex-row gap-3 md:mt-0 block text-center justify-center items-center">
                            <a className='text-sm lg:text-[15px]' href="/contact-us">● &nbsp;Contact Us</a>
                            <a className='text-sm lg:text-[15px]' href="/pricing">● &nbsp;Pricing Plan</a>
                            <span className='hidden md:block text-sm lg:text-[15px]'>● &nbsp; Made with ❤️ </span>
                            <span className='block md:hidden text-sm lg:text-[15px]'>&nbsp; Made with ❤️</span>
                        </div>

                        <div className="pt-3 flex flex-row gap-3 md:mt-0 block text-center justify-center items-center">                        
                            <span className='hidden md:block text-sm lg:text-[15px]'>ⓒ Copyright 2026 </span>                        
                        </div>
                    </div>


                    <span className='block md:hidden text-sm lg:text-[15px]'>ⓒ Copyright 2026</span>
                    
                    <div className='flex w-full justify-center gap-x-3'>
                        <a href="https://www.facebook.com/profile.php?id=61578801329161" target="_blank" 
                        rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="#37B6FF"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>

                        <a href="https://www.instagram.com/shopmydayapp/" target="_blank" rel="noopener noreferrer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="#37B6FF"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>

                        <a href="https://www.tiktok.com/@shopmydayapp" target="_blank" rel="noopener noreferrer" >
                         <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="h-5 w-5"
                          >
                            {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                            <path
                              fill="#37B6FF"
                              d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                            />
                          </svg>
                        </a>
                        
                        
                        
                    </div>

                    
                </div>
            </div>

            {/* Story overlay */}
            {overlayIndex !== null && (
                <StoryOverlay
                    images={PREVIEW_IMAGES}
                    startIndex={overlayIndex}
                    onClose={() => setOverlayIndex(null)}
                />
            )}
        </>
    );
}

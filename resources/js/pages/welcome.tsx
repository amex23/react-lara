import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

const PREVIEW_IMAGES = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80', // watch
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=600&fit=crop&q=80', // shirt
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop&q=80', // tech gadget
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&q=80', // appliance
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&q=80', // sneakers
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop&q=80', // camera gadget
];

const DURATION = 4000;

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
                        <div key={i} className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full"
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
                    <span className="font-bold text-[#E82E13]">✕</span>
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
                <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-xs z-10">
                    {current + 1} / {images.length}
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
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] ">
                            <span className="">
                                <div>
                                 <h1 className="mb-1 text-4xl font-bold tracking-wide text-center md:text-start text-[#474747]">ShopMyDays</h1>
                                
                                </div>

                            </span>
                            <p className="mb-2 text-[15px] text-[#706f6c] dark:text-[#A1A09A] mt-7 leading-[24px] text-center md:text-start">
                                Letting you post 24-hour product stories. Each story your day highlights with direct checkout links, making it easy for viewers to tap and buy. This story-driven approach increases engagement and boosts conversions.
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

                    <div className="text-xl text-center md:text-start"><b>20%</b> of Profit goes to <a href="https://www.worldvision.org.ph/"><b>WorldVision</b></a> Charity</div>
                    <div className="mt-3 md:mt-0 block text-center">ⓒ Copyright 2026 | Made with ❤️</div>
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
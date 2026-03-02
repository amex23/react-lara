import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center flex-col justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 gap-y-5 md:gap-y-10">

                    <div className="tw-py-8 tw-text-center py-4 md:py-4 my-app">
                    <div className="overflow-x-hidden">
                        <div id="draggableRow" className="flex items-center justify-start md:justify-center gap-3 md:gap-6 container md:pt-2 overflow-x-auto touch-pan-x scrollbar-none">

                        <div id="storyCircles" className="hidden md:flex gap-3 md:gap-6">
                            
                            {[
                               
                                'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
                                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
                                'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop',
                                'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=200&h=200&fit=crop',
                                'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop',
                                 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=200&h=200&fit=crop',
                            ].map((img, i) => (
                                <div
                                    key={i}
                                    className="rounded-full border-[3px] border-[#6b724f]/30 w-[100px] h-[100px] md:w-[112px] md:h-[112px] overflow-hidden flex-shrink-0"
                                >
                                    <img
                                        src={img}
                                        alt={`Preview ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div id="storyCircles" className="flex md:hidden gap-3 md:gap-6">
                            
                            {[
                               
                                'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
                                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
                                'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop',
                            ].map((img, i) => (
                                <div
                                    key={i}
                                    className="rounded-full border-[3px] border-[#6b724f]/30 w-[100px] h-[100px] md:w-[112px] md:h-[112px] overflow-hidden flex-shrink-0"
                                >
                                    <img
                                        src={img}
                                        alt={`Preview ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>


                        </div>
                    </div>
                </div>

                    <div className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 text-3xl font-bold">
                                ShopMyDayApp
                            </h1>
                            <p className="mb-2 text-[15px] text-[#706f6c] dark:text-[#A1A09A] mt-7">
                                letting users post 24-hour product stories. Each story includes direct product links, making it easy for viewers to tap and buy. This story-driven approach increases engagement and boosts conversions.
                            </p>
                           
                        </div>

                        <div className="relative h-[300px] md:h-[400px] -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#f5f2ec] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#1a1a0f] flex items-center justify-center">

                            {/* MyDay Logo SVG */}
                            <svg
                                viewBox="0 0 300 300"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-48 h-48 lg:w-64 lg:h-64 translate-y-0 opacity-100 transition-all duration-750 starting:translate-y-6 starting:opacity-0"
                            >
                                {/* Outer ring */}
                                <circle cx="150" cy="150" r="130" stroke="#6b724f" strokeWidth="6" fill="none" />

                                {/* Sun rays */}
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                                    const rad = (angle * Math.PI) / 180;
                                    const x1 = 150 + 110 * Math.cos(rad);
                                    const y1 = 150 + 110 * Math.sin(rad);
                                    const x2 = 150 + 128 * Math.cos(rad);
                                    const y2 = 150 + 128 * Math.sin(rad);
                                    return (
                                        <line
                                            key={i}
                                            x1={x1} y1={y1}
                                            x2={x2} y2={y2}
                                            stroke="#6b724f"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                    );
                                })}

                                {/* Inner circle / sun body */}
                                <circle cx="150" cy="150" r="60" fill="#6b724f" />

                                {/* Story circles around the sun */}
                                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                                    const rad = (angle * Math.PI) / 180;
                                    const cx = 150 + 90 * Math.cos(rad);
                                    const cy = 150 + 90 * Math.sin(rad);
                                    return (
                                        <g key={i}>
                                            <circle cx={cx} cy={cy} r="16" fill="#fff" stroke="#6b724f" strokeWidth="3" />
                                            <circle cx={cx} cy={cy} r="10" fill="#c8d4a0" />
                                        </g>
                                    );
                                })}

                                {/* Center text: "my" */}
                                <text
                                    x="150"
                                    y="144"
                                    textAnchor="middle"
                                    fontSize="22"
                                    fontWeight="bold"
                                    fill="#fff"
                                    fontFamily="system-ui, sans-serif"
                                    letterSpacing="1"
                                >
                                    my
                                </text>

                                {/* Center text: "day" */}
                                <text
                                    x="150"
                                    y="168"
                                    textAnchor="middle"
                                    fontSize="22"
                                    fontWeight="bold"
                                    fill="#f5f2ec"
                                    fontFamily="system-ui, sans-serif"
                                    letterSpacing="1"
                                >
                                    day
                                </text>

                                {/* Bottom tagline */}
                                <text
                                    x="150"
                                    y="258"
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6b724f"
                                    fontFamily="system-ui, sans-serif"
                                    letterSpacing="2"
                                >
                                    SHOP MY DAY
                                </text>
                            </svg>

                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                        </div>

                    </div>

                    <div className='text-xl'>
                        20% of Profit goes to Charity
                    </div>
                
                </div>
                <div className="hidden h-14.5 lg:block">ⓒ Copyright 2026</div>
            </div>
        </>
    );
}




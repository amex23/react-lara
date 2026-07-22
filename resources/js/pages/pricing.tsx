import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function Pricing() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: '📸',
            title: 'Story-Style Product Display',
            desc: 'Showcase up to 6 product images in a 24-hour story format — just like Instagram Stories, but with direct checkout links built in.',
        },
        {
            icon: '🛒',
            title: 'Direct Checkout Integration',
            desc: 'Each product image links directly to your Shopify checkout. Customers tap and buy instantly — no extra steps, no friction.',
        },
        {
            icon: '📊',
            title: 'Real-Time Analytics Dashboard',
            desc: 'Track profile views, checkout clicks, and order counts in real time. See exactly which products are getting the most attention every day.',
        },
        {
            icon: '📈',
            title: 'Conversion Rate Tracking',
            desc: 'Monitor how many profile views convert to actual checkouts and orders. Set custom date ranges to measure your store\'s performance over time.',
        },
        {
            icon: '📦',
            title: 'Order Tracking from ShopMyDay',
            desc: 'See orders that came directly through your ShopMyDay profile — customer name, items purchased, revenue, and date. All in one place.',
        },
        {
            icon: '📅',
            title: 'Stats Calendar',
            desc: 'A visual calendar showing your daily views and checkouts. Spot your busiest days and plan promotions around your peak traffic.',
        },
        {
            icon: '🔗',
            title: 'Shareable Store Profile',
            desc: 'Get a public store profile URL you can share anywhere — social media, messaging apps, bio links — to drive traffic directly to your products.',
        },
        {
            icon: '💳',
            title: 'Automatic Monthly Billing',
            desc: 'Subscribe once and forget it. Your card is automatically charged monthly. No manual renewals, no interruptions to your store.',
        },
        {
            icon: '❤️',
            title: '20% Goes to World Vision',
            desc: 'Every subscription contributes to a good cause. 20% of profits go to World Vision Philippines to support children and communities in need.',
        },
    ];

    return (
        <>
            <Head title="Pricing - ShopMyDay" />
            <div className="min-h-screen bg-gray-50">

                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

                        <Link href="/" className='flex items-center gap-2'>
                            <img src="/images/new-logo.png" alt="ShopMyDayApp Logo" className="w-[60px] rounded-md object-contain" />
                                <div className="ml-1 grid flex-1 text-left text-sm">
                                    <span className="mb-0.5 truncate leading-tight font-semibold text-md md:text-lg">
                                        ShopMyDay
                                    </span>
                                </div>
                            </Link>

                        <div className="flex gap-3">
                            {auth?.user ? (
                                <Link href="/dashboard" className="text-sm bg-[#37B6FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="text-sm bg-[#37B6FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hero */}
                <div className="bg-white pt-16 pb-12 text-center border-b">
                    <div className="max-w-2xl mx-auto px-6">
                        <span className="inline-block bg-blue-50 text-[#37B6FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            Simple Pricing
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            One plan. Everything included.
                        </h1>
                        <p className="text-lg text-gray-500">
                            Everything you need to turn your product stories into sales. No hidden fees, no tiers — just one straightforward monthly subscription.
                        </p>
                    </div>
                </div>

                {/* Basic Pricing Card */}
                <div className="max-w-5xl mx-auto px-6 py-16">
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                        {/* Main card */}
                        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg border-2 border-[#37B6FF] overflow-hidden">
                            <div className="bg-[#37B6FF] px-8 py-6 text-white text-center">
                                <p className="text-sm font-semibold uppercase tracking-widest opacity-90 mb-1">Basic ShopMyDay Store Plan</p>
                                <div className="flex items-end justify-center gap-1 mt-2">
                                    <span className="text-2xl font-bold">$</span>
                                    <span className="text-6xl font-extrabold leading-none">11</span>
                                    <span className="text-xl font-medium mb-2">/mo</span>
                                </div>
                                <p className="text-sm opacity-80 mt-2">Billed monthly · Cancel anytime</p>
                            </div>

                            <div className="px-8 py-6 space-y-3">
                                {[
                                    'Story-style product display (up to 6 images)',
                                    'Direct Shopify checkout links per image',
                                    'Real-time views & checkout analytics',
                                    'Conversion rate tracking',
                                    'Order tracking from ShopMyDay',
                                    'Daily stats calendar',
                                    'Shareable public store profile URL',
                                    'Automatic monthly billing',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="text-[#37B6FF] font-bold mt-0.5">✓</span>
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="px-8 pb-8">
                                {auth?.user ? (
                                    <a href="/subscribe" className="block w-full text-center bg-[#37B6FF] hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition text-sm">
                                        ⚡ Activate My Store
                                    </a>
                                ) : (
                                    <Link href="/register" className="block w-full text-center bg-[#37B6FF] hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition text-sm">
                                        Get Started Now
                                    </Link>
                                )}
                                <p className="text-xs text-gray-400 text-center mt-3">
                                    Secure payment via Lemon Squeezy · Visa, Mastercard, PayPal accepted
                                </p>
                            </div>
                        </div>

                        {/* What's included summary */}
                        <div className="flex-1 space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">What's included in your subscription</h2>
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4 bg-white rounded-xl p-4 border shadow-sm">
                                    <span className="text-2xl">{f.icon}</span>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                                        <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pro Pricing Card */}
                <div className="max-w-5xl mx-auto px-6 py-16">
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                        {/* Main card */}
                        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg border-2 border-[#37B6FF] overflow-hidden">
                            <div className="bg-[#37B6FF] px-8 py-6 text-white text-center">
                                <p className="text-sm font-semibold uppercase tracking-widest opacity-90 mb-1">Pro ShopMyDay Store Plan</p>
                                <div className="flex items-end justify-center gap-1 mt-2">
                                    <span className="text-2xl font-bold">$</span>
                                    <span className="text-6xl font-extrabold leading-none">25</span>
                                    <span className="text-xl font-medium mb-2">/mo</span>
                                </div>
                                <p className="text-sm opacity-80 mt-2">Billed monthly · Cancel anytime </p>
                            </div>

                            <div className="px-8 py-6 space-y-3">
                                {[
                                    'Story-style product display (up to 12 images)',
                                    'Video reels display (up to 12 videos)',
                                    'Direct Shopify checkout links per image',
                                    'Real-time views & checkout analytics',
                                    'Conversion rate tracking',
                                    'Order tracking from ShopMyDay',
                                    'Daily stats calendar',
                                    'Shareable public store profile URL',
                                    'Automatic monthly billing',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="text-[#37B6FF] font-bold mt-0.5">✓</span>
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="px-8 pb-8">
                                {auth?.user ? (
                                    <a href="/subscribe" className="block w-full text-center bg-[#37B6FF] hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition text-sm">
                                        ⚡ Activate My Store
                                    </a>
                                ) : (
                                    <Link href="/register" className="block w-full text-center bg-[#37B6FF] hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition text-sm">
                                        Get Started Now
                                    </Link>
                                )}
                                <p className="text-xs text-gray-400 text-center mt-3">
                                    Secure payment via Lemon Squeezy · Visa, Mastercard, PayPal accepted
                                </p>
                            </div>
                        </div>

                        {/* What's included summary */}
                        <div className="flex-1 space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">What's included in your subscription</h2>
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4 bg-white rounded-xl p-4 border shadow-sm">
                                    <span className="text-2xl">{f.icon}</span>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                                        <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white border-t py-16">
                    <div className="max-w-2xl mx-auto px-6">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    q: 'How does billing work?',
                                    a: 'You subscribe once and your card is automatically charged $11 every month on the same date. No manual renewals needed.'
                                },
                                {
                                    q: 'Can I cancel anytime?',
                                    a: 'Yes. You can cancel your subscription anytime through your billing portal. Your store stays active until the end of the current billing period.'
                                },
                                {
                                    q: 'What payment methods are accepted?',
                                    a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex) and PayPal through our payment processor Lemon Squeezy.'
                                },
                                {
                                    q: 'Do I need a Shopify store?',
                                    a: 'Yes. ShopMyDay connects your product images to your Shopify checkout links. You\'ll need an active Shopify store to use the checkout integration.'
                                },
                                {
                                    q: 'Is there a free trial?',
                                    a: 'We occasionally offer courtesy trial access at our discretion. Contact us to find out if a trial is available for you.'
                                },
                                {
                                    q: 'What is the 20% World Vision donation?',
                                    a: '20% of ShopMyDay\'s profits go to World Vision Philippines to support children and communities in need. By subscribing, you\'re also helping a great cause.'
                                },
                            ].map((faq, i) => (
                                <div key={i} className="border-b pb-6">
                                    <p className="font-semibold text-gray-900 mb-1">{faq.q}</p>
                                    <p className="text-gray-500 text-sm">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="px-5 lg:px-0 bg-[#37B6FF] py-16 text-center text-white">
                    <h2 className="text-3xl font-bold mb-3">Ready to grow your store?</h2>
                    <p className="text-blue-100 mb-8 text-lg">Join ShopMyDay and start turning story views into sales today.</p>
                    {auth?.user ? (
                        <a href="/subscribe" className="inline-block bg-white text-[#37B6FF] font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition text-sm">
                            ⚡ Activate My Store — $11/mo
                        </a>
                    ) : (
                        <Link href="/register" className="inline-block bg-white text-[#37B6FF] font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition text-sm">
                            Get Started — $11/mo
                        </Link>
                    )}
                </div>

                {/* Footer links */}
                <div className="px-5 lg:px-0 bg-gray-50 py-6 border-t">
                    <div className="flex gap-6 text-sm text-gray-400 justify-center">
                        <Link href="/terms-of-service" className="hover:text-blue-500">Terms of Service</Link>
                        <Link href="/privacy-policy" className="hover:text-blue-500">Privacy Policy</Link>
                        <Link href="/refund-policy" className="hover:text-blue-500">Refund Policy</Link>
                        <Link href="/contact-us" className="hover:text-blue-500">Contact Us</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function ContactUs() {
    const { auth } = usePage<SharedData>().props;

    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!form.name.trim()) newErrors.name = 'Your name is required.';
        if (!form.email.trim()) {
            newErrors.email = 'Your email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!form.subject.trim()) newErrors.subject = 'Please provide a subject.';
        if (!form.message.trim()) newErrors.message = 'Please write your message.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('loading');
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
            const response = await fetch('/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus('success');
                setStatusMessage(data.message ?? "Your message has been sent! We'll get back to you shortly.");
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                    setStatus('idle');
                } else {
                    throw new Error(data.message ?? 'Something went wrong.');
                }
            }
        } catch (err: unknown) {
            setStatus('error');
            setStatusMessage(err instanceof Error ? err.message : 'Unable to send your message. Please try again later.');
        }
    };

    return (
        <>
            <Head title="Contact Us – ShopMyDay">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">

                {/* Nav — same as welcome.tsx */}
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
                                <Link href={register()} className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] bg-[#37B6FF] dark:hover:border-[#62605b] text-white font-bold">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Page content */}
                <div className="w-full max-w-[335px] lg:max-w-2xl">

                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold tracking-wide text-[#474747] dark:text-[#EDEDEC] mb-2">
                            Contact Us
                        </h1>
                        <p className="text-[15px] text-[#706f6c] dark:text-[#A1A09A] leading-[24px]">
                            Have a question or concern? Send us a message and we'll get back to you.
                        </p>
                        <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            Reaches us at{' '}
                            <a href="mailto:support@shopmyday.store" className="text-[#37B6FF] hover:underline font-medium">
                                support@shopmyday.store
                            </a>
                        </p>
                    </div>

                    {/* Success banner */}
                    {status === 'success' && (
                        <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 rounded-lg px-5 py-4 mb-6">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-sm font-medium">{statusMessage}</p>
                        </div>
                    )}

                    {/* Error banner */}
                    {status === 'error' && (
                        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 rounded-lg px-5 py-4 mb-6">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium">{statusMessage}</p>
                        </div>
                    )}

                    {/* Form */}
                    {status !== 'success' && (
                        <div className="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="space-y-5">

                                {/* Name + Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-1.5">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Juan dela Cruz"
                                            className={`w-full rounded-sm border px-3 py-2 text-sm text-[#1b1b18] dark:text-[#EDEDEC] bg-[#FDFDFC] dark:bg-[#0a0a0a] placeholder-[#706f6c] focus:outline-none focus:ring-2 focus:ring-[#37B6FF] transition ${
                                                errors.name ? 'border-red-400' : 'border-[#19140035] dark:border-[#3E3E3A]'
                                            }`}
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-1.5">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className={`w-full rounded-sm border px-3 py-2 text-sm text-[#1b1b18] dark:text-[#EDEDEC] bg-[#FDFDFC] dark:bg-[#0a0a0a] placeholder-[#706f6c] focus:outline-none focus:ring-2 focus:ring-[#37B6FF] transition ${
                                                errors.email ? 'border-red-400' : 'border-[#19140035] dark:border-[#3E3E3A]'
                                            }`}
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-1.5">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="e.g. Order issue, Product question…"
                                        className={`w-full rounded-sm border px-3 py-2 text-sm text-[#1b1b18] dark:text-[#EDEDEC] bg-[#FDFDFC] dark:bg-[#0a0a0a] placeholder-[#706f6c] focus:outline-none focus:ring-2 focus:ring-[#37B6FF] transition ${
                                            errors.subject ? 'border-red-400' : 'border-[#19140035] dark:border-[#3E3E3A]'
                                        }`}
                                    />
                                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-1.5">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here…"
                                        className={`w-full rounded-sm border px-3 py-2 text-sm text-[#1b1b18] dark:text-[#EDEDEC] bg-[#FDFDFC] dark:bg-[#0a0a0a] placeholder-[#706f6c] focus:outline-none focus:ring-2 focus:ring-[#37B6FF] resize-none transition ${
                                            errors.message ? 'border-red-400' : 'border-[#19140035] dark:border-[#3E3E3A]'
                                        }`}
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-2 bg-[#37B6FF] hover:bg-[#1fa3f0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-sm px-6 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-[#37B6FF] focus:ring-offset-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Sending…
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>

                            </div>
                        </div>
                    )}

                    <div className="mt-8 mb-4 text-sm text-center">
                        <Link href="/" className="text-[#706f6c] dark:text-[#A1A09A] hover:text-[#37B6FF] transition">← Back to Home</Link>
                    </div>

                    <div className='flex flex-col items-center gap-y-10'>
                        <div className="text-md md:text-xl text-center md:text-start flex gap-1 items-center"><b>20%</b> of Profit goes to <a href="https://www.worldvision.org.ph/"><b>WorldVision</b></a> Charity <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#37B6FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins-icon lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg></div>
                    <div className="mt-3 md:mt-0 block text-center flex gap-3">ⓒ Copyright 2026 | <a href="">Contact Us</a> | Made with ❤️</div>
                    </div>
                </div>
            </div>
        </>
    );
}
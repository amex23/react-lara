import { Head, Link } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy - ShopMyDay" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                          <Link href="/" className='flex items-center gap-2'>
                            <img src="/images/new-logo.png" alt="ShopMyDayApp Logo" className="w-[60px] rounded-md object-contain" />
                                <div className="ml-1 grid flex-1 text-left text-sm">
                                    <span className="mb-0.5 truncate leading-tight font-semibold text-md lg:text-lg">
                                        ShopMyDay
                                    </span>
                                </div>
                            </Link>
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Home</Link>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6  py-0lg:py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className="text-gray-500 mb-10">Effective Date: May 20, 2026</p>

                    <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8 text-gray-700 leading-relaxed">

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                            <p>ShopMyDay ("we," "us," or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and share information when you use our Platform at www.shopmyday.store.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>

                            <h3 className="font-medium text-gray-800 mb-2 mt-4">2.1 Information You Provide</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Name and email address (during registration)</li>
                                <li>Store name, description, and product images</li>
                                <li>Product pricing and checkout URLs</li>
                                <li>Payment information (processed by Lemon Squeezy — we do not store card details)</li>
                            </ul>

                            <h3 className="font-medium text-gray-800 mb-2 mt-4">2.2 Information Collected Automatically</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>IP address and approximate location</li>
                                <li>Browser type and device information</li>
                                <li>Pages visited and time spent on the Platform</li>
                                <li>Profile views and checkout click data</li>
                            </ul>

                            <h3 className="font-medium text-gray-800 mb-2 mt-4">2.3 Information from Third Parties</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Order data from Shopify when customers purchase through your store links</li>
                                <li>Subscription and billing status from Lemon Squeezy</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                            <p className="mb-3">We use the collected information to:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Provide, operate, and maintain the Platform</li>
                                <li>Process subscription payments and manage billing</li>
                                <li>Display your store profile and product images to potential customers</li>
                                <li>Provide analytics on profile views, checkouts, and orders</li>
                                <li>Send transactional emails and platform notifications</li>
                                <li>Improve the Platform and develop new features</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Sharing</h2>
                            <p className="mb-3">We do not sell your personal information. We may share data with:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Lemon Squeezy — for payment processing and subscription management</li>
                                <li>Shopify — for order tracking and checkout integration</li>
                                <li>Service providers who assist in operating the Platform, under strict confidentiality agreements</li>
                                <li>Law enforcement or government bodies when required by law</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Storage and Security</h2>
                            <p>Your data is stored on secure servers. We implement industry-standard security measures including encryption, access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
                            <p className="mb-3">ShopMyDay uses cookies and similar technologies to:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Maintain your login session</li>
                                <li>Remember your preferences</li>
                                <li>Analyze Platform usage and performance</li>
                            </ul>
                            <p className="mt-3">You may disable cookies in your browser settings, but this may affect Platform functionality.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
                            <p className="mb-3">Under applicable Philippine law (Republic Act 10173 — Data Privacy Act of 2012), you have the right to:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Access the personal data we hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal retention requirements)</li>
                                <li>Withdraw consent to data processing</li>
                                <li>Lodge a complaint with the National Privacy Commission</li>
                            </ul>
                            <p className="mt-3">To exercise these rights, contact us at <a href="https://www.shopmyday.store/contact-us" className="text-blue-600 hover:underline">www.shopmyday.store/contact-us</a>.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Data Retention</h2>
                            <p>We retain your data for as long as your account is active or as needed to provide services. After account termination, we may retain certain data for legal, tax, or business purposes for up to 5 years.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children's Privacy</h2>
                            <p>ShopMyDay is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal information, we will delete it promptly.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Policy</h2>
                            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or platform notification. Continued use of the Platform after changes constitutes acceptance of the updated Policy.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact</h2>
                            <p>For privacy-related questions or requests, contact us at: <a href="https://www.shopmyday.store/contact-us" className="text-blue-600 hover:underline">www.shopmyday.store/contact-us</a></p>
                        </section>

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
            </div>
        </>
    );
}

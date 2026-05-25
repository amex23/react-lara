import { Head, Link } from '@inertiajs/react';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service - ShopMyDay" />
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
                <div className="max-w-4xl mx-auto px-6 py-2 lg:py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                    <p className="text-gray-500 mb-10">Effective Date: May 20, 2026</p>

                    <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8 text-gray-700 leading-relaxed">

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                            <p>By accessing or using ShopMyDay ("the Platform," "we," "us," or "our") at www.shopmyday.store, you ("User," "Seller," or "you") agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use the Platform.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                            <p className="mb-3">ShopMyDay is an online platform that allows sellers to create a store profile, display products, and connect with customers through Shopify-powered storefronts. The Platform offers:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Store profile creation and management</li>
                                <li>Product image display and checkout link integration</li>
                                <li>Analytics including profile views, checkout clicks, and order tracking</li>
                                <li>Monthly subscription-based access to store features</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Eligibility</h2>
                            <p>You must be at least 18 years old and capable of forming a binding contract to use the Platform. By creating an account, you represent that all information you provide is accurate and complete.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Account Registration</h2>
                            <p className="mb-3">To access seller features, you must register for an account. You are responsible for:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use of your account</li>
                            </ul>
                            <p className="mt-3">We reserve the right to terminate accounts that violate these Terms.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Subscription and Payment</h2>
                            <p className="mb-3">Access to ShopMyDay store features requires a paid monthly subscription of <strong>PHP 600.00 per month</strong>, billed through our payment processor Lemon Squeezy.</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Subscriptions are billed on the same date each month based on your sign-up date</li>
                                <li>Payment is processed automatically using the card or payment method on file</li>
                                <li>Failure to maintain a valid payment method may result in suspension of your store</li>
                                <li>You may cancel your subscription at any time; access continues until the end of the current billing period</li>
                            </ul>
                            <p className="mt-3">All payments are processed securely by Lemon Squeezy. ShopMyDay does not store your payment card details.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Seller Responsibilities</h2>
                            <p className="mb-3">As a seller on ShopMyDay, you agree to:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Only list products that you are legally authorized to sell</li>
                                <li>Ensure all product images and descriptions are accurate and not misleading</li>
                                <li>Comply with all applicable Philippine laws and regulations</li>
                                <li>Not use the Platform for any illegal or unauthorized purpose</li>
                                <li>Not upload content that infringes on intellectual property rights</li>
                                <li>Maintain accurate and up-to-date store information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Prohibited Activities</h2>
                            <p className="mb-3">You agree not to:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Use the Platform to sell counterfeit, illegal, or prohibited goods</li>
                                <li>Attempt to hack, disrupt, or damage the Platform</li>
                                <li>Misrepresent your identity or affiliation</li>
                                <li>Engage in spamming or unsolicited communications through the Platform</li>
                                <li>Circumvent any security or access controls</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Intellectual Property</h2>
                            <p>All content on the ShopMyDay platform, including logos, design, and software, is owned by ShopMyDay and protected by applicable intellectual property laws. Sellers retain ownership of their uploaded product images and content but grant ShopMyDay a non-exclusive license to display such content on the Platform.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
                            <p className="mb-3">ShopMyDay provides the Platform "as is" without warranties of any kind. To the maximum extent permitted by law, ShopMyDay shall not be liable for:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Any indirect, incidental, or consequential damages</li>
                                <li>Loss of profits, data, or business opportunities</li>
                                <li>Any damages resulting from third-party services including Shopify or payment processors</li>
                            </ul>
                            <p className="mt-3">Our total liability shall not exceed the amount you paid to ShopMyDay in the three months preceding the claim.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Termination</h2>
                            <p>ShopMyDay reserves the right to suspend or terminate your account at any time for violation of these Terms, non-payment, or any other reason at our sole discretion. You may terminate your account at any time by contacting us or cancelling your subscription.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Governing Law</h2>
                            <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes shall be resolved in the appropriate courts of the Philippines.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h2>
                            <p>We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or platform notification. Continued use of the Platform after changes constitutes acceptance of the new Terms.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact</h2>
                            <p>For questions about these Terms, please contact us at: <a href="https://www.shopmyday.store/contact-us" className="text-blue-600 hover:underline">www.shopmyday.store/contact-us</a></p>
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

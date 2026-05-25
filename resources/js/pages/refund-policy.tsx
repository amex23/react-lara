import { Head, Link } from '@inertiajs/react';

export default function RefundPolicy() {
    return (
        <>
            <Head title="Refund Policy - ShopMyDay" />
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
                <div className="max-w-4xl mx-auto px-6 py-0 lg:py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
                    <p className="text-gray-500 mb-10">Effective Date: May 20, 2026</p>

                    <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8 text-gray-700 leading-relaxed">

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Overview</h2>
                            <p>This Refund Policy applies to subscription payments made to ShopMyDay for access to the Platform's seller features. Please read this policy carefully before subscribing.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Subscription Fees</h2>
                            <p>ShopMyDay charges a monthly subscription fee of <strong>PHP 600.00</strong> for access to seller store features. All payments are processed by Lemon Squeezy, our payment processor.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Refund Eligibility</h2>

                            <h3 className="font-medium text-gray-800 mb-2 mt-4">3.1 Eligible for Refund</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Technical issues on our end that prevented you from accessing the Platform for more than 72 consecutive hours</li>
                                <li>Duplicate charges due to a billing error</li>
                                <li>Charges made after a confirmed cancellation</li>
                            </ul>

                            <h3 className="font-medium text-gray-800 mb-2 mt-4">3.2 Not Eligible for Refund</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Change of mind after subscription activation</li>
                                <li>Partial month usage — subscriptions are billed for the full month</li>
                                <li>Failure to cancel before the next billing cycle</li>
                                <li>Dissatisfaction with features that were accurately described</li>
                                <li>Issues caused by third-party services (Shopify, internet connectivity, etc.)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cancellation Policy</h2>
                            <p className="mb-3">You may cancel your subscription at any time through your Lemon Squeezy account portal or by contacting us. Upon cancellation:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Your store will remain active until the end of the current billing period</li>
                                <li>No further charges will be made after the cancellation date</li>
                                <li>Your subscription will not be automatically renewed</li>
                            </ul>
                            <p className="mt-3">We do not provide pro-rated refunds for the remaining days in a billing period after cancellation.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. How to Request a Refund</h2>
                            <p className="mb-3">To request a refund for an eligible situation:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Contact us at <a href="https://www.shopmyday.store/contact-us" className="text-blue-600 hover:underline">www.shopmyday.store/contact-us</a> within 7 days of the charge</li>
                                <li>Provide your registered email address and a description of the issue</li>
                                <li>Include proof of the billing error or technical issue if applicable</li>
                            </ul>
                            <p className="mt-3">We will review your request within 5 business days and respond via email.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Refund Processing</h2>
                            <p className="mb-3">Approved refunds will be processed through Lemon Squeezy back to your original payment method. Refund processing times:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Credit/debit card refunds: 5–10 business days depending on your bank</li>
                                <li>PayPal refunds: 3–5 business days</li>
                            </ul>
                            <p className="mt-3">ShopMyDay is not responsible for any delays caused by your bank or payment provider.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Disputes</h2>
                            <p>If you believe a charge is incorrect, please contact us before initiating a chargeback with your bank. Chargebacks that are not resolved through our support process may result in suspension of your account.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Free Trial</h2>
                            <p>Certain accounts may be granted temporary access by our administrators as a courtesy trial. These trial periods are provided at our discretion and do not entitle the user to a refund upon subscription activation.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
                            <p>We reserve the right to modify this Refund Policy at any time. Changes will be communicated via email or platform notification. Continued use of the Platform constitutes acceptance of the updated policy.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
                            <p>For refund requests or questions about this policy, please contact us at: <a href="https://www.shopmyday.store/contact-us" className="text-blue-600 hover:underline">www.shopmyday.store/contact-us</a></p>
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

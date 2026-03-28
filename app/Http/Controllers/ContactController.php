<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    /**
     * Show the Contact Us page (Inertia).
     */
    public function index(): \Inertia\Response
    {
        return inertia('contact-us');
    }

    /**
     * Handle the contact form submission and e-mail the admin.
     */
    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:100'],
            'email'   => ['required', 'email', 'max:150'],
            'subject' => ['required', 'string', 'max:200'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $adminEmail = 'support@shopmyday.store';

        Mail::send([], [], function ($mail) use ($validated, $adminEmail) {
            $mail->to($adminEmail)
                 ->replyTo($validated['email'], $validated['name'])
                 ->subject('[ShopMyDay Contact] ' . $validated['subject'])
                 ->html(
                     '<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">'
                     . '<h2 style="color:#f97316;">New Contact Message – ShopMyDay</h2>'
                     . '<table style="width:100%;border-collapse:collapse;">'
                     . '<tr><td style="padding:8px 0;font-weight:bold;color:#374151;">From:</td>'
                     . '<td style="padding:8px 0;color:#111827;">' . e($validated['name']) . ' &lt;' . e($validated['email']) . '&gt;</td></tr>'
                     . '<tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Subject:</td>'
                     . '<td style="padding:8px 0;color:#111827;">' . e($validated['subject']) . '</td></tr>'
                     . '</table>'
                     . '<hr style="margin:16px 0;border-color:#e5e7eb;">'
                     . '<h3 style="color:#374151;">Message</h3>'
                     . '<p style="color:#111827;white-space:pre-wrap;">' . e($validated['message']) . '</p>'
                     . '<hr style="margin:24px 0;border-color:#e5e7eb;">'
                     . '<p style="font-size:12px;color:#9ca3af;">This message was sent via the ShopMyDay contact form.</p>'
                     . '</div>'
                 );
        });

        return response()->json([
            'message' => 'Your message has been sent! We\'ll get back to you shortly.',
        ]);
    }
}
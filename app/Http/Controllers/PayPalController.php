<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use App\Models\Product; // Ensure this matches your model name

class PayPalController extends Controller
{
    private $provider;

    public function __construct()
    {
        $this->provider = new PayPalClient;
        $this->provider->getAccessToken();
    }

    /**
     * Create a subscription for the $11/month plan.
     * Note: You must create this Plan ID in your PayPal Dashboard first.
     */
    public function createSubscription(Request $request)
    {
        // Replace 'P-XXXXXXXXX' with your actual Plan ID from PayPal
        $planId = 'P-XXXXXXXXX'; 

        return response()->json([
            'plan_id' => $planId
        ]);
    }

    /**
     * Handle the successful payment and update the product status.
     */
    public function handleSuccess(Request $request)
    {
        $productId = $request->input('product_id');
        $subscriptionId = $request->input('subscriptionID');

        // Find the store profile and mark as subscribed
        $product = Product::find($productId);
        
        if ($product) {
            $product->update([
                'subscription' => true,
                // Optionally store the subscription ID if you added a column for it
                // 'paypal_subscription_id' => $subscriptionId 
            ]);

            return response()->json(['status' => 'success']);
        }

        return response()->json(['status' => 'error', 'message' => 'Profile not found'], 404);
    }
}
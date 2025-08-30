<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    // Step 1: Get Google login URL
    public function redirect()
    {
        $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
        return response()->json(['url' => $url]);
    }

    // Step 2: Handle callback
    public function callback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'password' => bcrypt(Str::random(16)), // random password
                ]
            );

            // Create Sanctum token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirect to React SPA with token
            return redirect(env('FRONTEND_URL') . '/login?token=' . $token);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Authentication failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

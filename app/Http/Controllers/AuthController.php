<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['success' => false, 'error' => 'Invalid credentials'], 401);
        }

        return response()->json(['success' => true, 'token' => $token, 'status' => true]);
    }


    public function checkToken()
    {
        return response()->json(['success' => true], 200);
    }

    public function refreshToken(Request $request)
    {
        try {
            $token = JWTAuth::parseToken()->refresh();
            return response()->json(['success' => true, 'token' => $token], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'Unable to refresh token'], 401);
        }
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['success' => true], 200);
    }
}

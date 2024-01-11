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
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        return response()->json(['token' => $token,'status'=>true]);
    }

    public function checkToken(){
        return response()->json(['success'=>true],200);
    }

    public function logout(){
        $logout =auth()->logout();
        return response()->json(['success'=>true],200);
    }
}
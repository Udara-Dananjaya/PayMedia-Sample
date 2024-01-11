<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        try {
            $users = User::all();
            
            $responseData = [
                'success' => true,
                'data' => [
                    'message' => 'Data successfully retrieved',
                    'users' => $users,
                ],
            ];

            return response()->json($responseData, 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred'], 500);
        }
    }
    
    

}

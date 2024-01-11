<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    public function index()
    {
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

    public function create(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8|max:12|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                'img' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $user = new User();

            $user->name = Str::ucfirst($request->input('name'));
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));

            if ($request->hasFile('img')) {
                $image = $request->file('img');
                $imageName = 'user_' . $user->id . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $user->img = 'images/' . $imageName;
            }

            $user->save();

            return response()->json(['success' => true, 'data' => ['user' => $user]], 201);
        } catch (ValidationException $e) {
            return response()->json(['success' => false, 'error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'string|max:255',
                'email' => 'email|unique:users,email,' . $id,
                'password' => 'nullable|string|min:8|max:12|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                'img' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $user = User::findOrFail($id);

            if ($request->filled('name') && $request->input('name') !== $user->name) {
                $user->name = Str::ucfirst($request->input('name'));
            }

            if ($request->filled('email') && $request->input('email') !== $user->email) {
                $user->email = $request->input('email');
            }

            if ($request->filled('password')) {
                $user->password = Hash::make($request->input('password'));
            }

            if ($request->hasFile('img')) {
                $image = $request->file('img');
                $imageName = 'user_' . $user->id . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $user->img = 'images/' . $imageName;
            }

            $user->save();

            return response()->json(['success' => true, 'data' => ['user' => $user]], 200);
        } catch (ValidationException $e) {
            return response()->json(['success' => false, 'error' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'error' => "User Not Found"], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = User::find($id);

            if ($user) {
                return response()->json(['success' => true, 'data' => ['user' => $user]], 200);
            } else {
                return response()->json(['success' => false, 'error' => 'User not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json(['success' => true, 'data' => ['message' => 'User deleted successfully']], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}

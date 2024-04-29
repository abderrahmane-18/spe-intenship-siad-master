<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($validated)) {
            return response()->json([
                'message' => 'invalid information',
            ], 401);
        }

        $user = User::where('email', $validated['email'])->first();
        return response()->json([
            'access_token' => $user->createToken('api_token')->plainTextToken,
            'token_type' => 'Bearer',
            'name' => $user->name,
            'id' => $user->id,
        ]);
    }

   /*
    public function updateProfile(Request $request)
{
    $user = Auth::user();

    // Validate the request data
    $validatedData = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email,' ,
    ]);
    $user=$request->user();


    // Update the user's profile
    
    
    $user->update($validatedData);

    return response()->json([
        'message' => 'Profile updated successfully'
    ]);
}
*/
public function index(Request $request)
{
    $user = Auth::user();
    if ($user) {
        return response()->json($user);
    } else {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }
}
public function showUser($id)
{
    $user = User::findOrFail($id);
    $result=array('status'=>true,'message'=>'user hase been fetch succefully','data'=>$user);

    return response()->json($result,200);
}
public function update(Request $request, $id)
    {
     
            // Find User
            
            $user = User::find($id);
            if(!$user)
            {
                {
                    return response()->json([
                        'status'=>404,
                        'message' => "Id not Found"
                    ],200);
                }
            }
            $validator=Validator::make($request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'. $user->id,
            //'password' => 'required',
            ]);
            if($validator->fails()){
                $result =array('status'=>false,'message'=>'Validation error occured', 
                'error_message'=>$validator->errors());
                return response()->json($result,400);

            }
            $user->name=$request->name;
            $user->email=$request->email;
           // $user->password=$request->password;
            $user->save();

$result=array('status'=>true,'message'=>'user hase been updated succefully','data'=>$user);
return response()->json($result,200);
       // return response()->json($result,$responseCode)

    }

}
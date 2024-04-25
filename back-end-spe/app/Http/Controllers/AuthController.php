<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
  public function login (Request $request )
  {
      $validated=$request->validate([
          'email'=>'required|email',
          'password'=>'required',
      ]);
      if(! Auth::attempt(($validated)))
      {
          return response()->json([
              'message'=>'invalid inforamtion',
          ],401);
      }
      /*
          else {
              return response()->json([
                  'message'=>'valid inforamtion',
              ]);
          }
*/
          $user=User::where('email',$validated['email'])->first();
          return response()->json([
              'access_token'=>$user->createToken('api_token')->plainTextToken,
              'token_type'=>'Bearer',
          ]);
      
  }
}

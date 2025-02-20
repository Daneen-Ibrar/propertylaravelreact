<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    public function index() {
      //  dd(
      //      Hash::make('password'),
       //     '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
       //     Hash::check('password', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
       // );

        return inertia('Index/Index',
        [
            'message' => 'Hello from Laravel'
        ]
    
    );
    }

    public function show () {
         return inertia('Index/Show');
    }
}

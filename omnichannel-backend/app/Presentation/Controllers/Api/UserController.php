<?php

namespace App\Presentation\Controllers\Api;

use App\Application\Services\UserService;
use App\Domain\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function create(Request $request)
    {
        try {
            $user = $this->userService->createUser($request->all());
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getAll()
    {
        try {
            $users = $this->userService->getAllUsers();
            // $hostname = env("DB_HOST", "somedefaultvalue");
            // return response()->json($hostname,201);
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = $this->userService->updateUser($request->all(), $id);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}

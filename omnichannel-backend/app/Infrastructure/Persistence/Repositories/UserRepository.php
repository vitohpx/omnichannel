<?php

namespace App\Infrastructure\Persistence\Repositories;

use App\Domain\Models\User;
use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserRepositoryInterface
{
    public function create(User $user): User
    {
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'address' => $user->address,
            'state' => $user->state,
            'birth_date' => $user->birthDate,
        ];

        $id = DB::table('users')->insertGetId($data);
        $user->id = $id;

        return $user;
    }

    public function update(User $user): User
    {
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'address' => $user->address,
            'state' => $user->state,
            'birth_date' => $user->birthDate,
        ];

        DB::table('users')->where('id', $user->id)->update($data);

        return $user;
    }

    public function findById(int $id): ?User
    {
        $data = DB::table('users')->where('id', $id)->first();

        if (!$data) {
            return null;
        }

        return new User((array) $data);
    }

    public function getAll(): array
    {
        $data = DB::table('users')->get();

        $users = [];

        foreach ($data as $item) {
            $users[] = new User((array) $item);
        }

        return $users;
    }
}

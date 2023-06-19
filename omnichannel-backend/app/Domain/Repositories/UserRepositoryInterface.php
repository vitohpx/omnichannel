<?php

namespace App\Domain\Repositories;

use App\Domain\Models\User;

interface UserRepositoryInterface
{
    public function create(User $user): User;

    public function update(User $user): User;

    public function findById(int $id): ?User;

    public function getAll(): array;
}

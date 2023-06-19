<?php
namespace App\Domain\Models;

use Illuminate\Support\Facades\Validator;

class User
{
    public $id;
    public $name;
    public $email;
    public $address;
    public $state;
    public $birthDate;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->name = $data['name'] ?? '';
        $this->email = $data['email'] ?? '';
        $this->address = $data['address'] ?? '';
        $this->state = $data['state'] ?? '';
        $this->birthDate = $data['birthDate'] ?? null;
    }

    public function isUnderage(): bool
    {
        $now = new \DateTime();
        $birthDate = new \DateTime($this->birthDate);
        $age = $now->diff($birthDate)->y;

        return $age < 18;
    }
}

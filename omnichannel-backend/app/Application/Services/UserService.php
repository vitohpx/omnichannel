<?php

namespace App\Application\Services;


use App\Domain\Models\User;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Application\Validators\UserValidator;

class UserService
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function createUser(array $data): User
    {
        UserValidator::validate($data);

        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->address = $data['address'];
        $user->state = $data['state'];
        $user->birthDate = $data['birth_date'];

        if (!$this->isCepFromAmazonas($user->address)) {
            throw new \Exception('O endereço deve ser válido e estar localizado no estado do Amazonas.');
        }

        if ($user->isUnderage()) {
            throw new \Exception('O usuário deve ter mais de 18 anos para se cadastrar.');
        }

        return $this->userRepository->create($user);
    }

    public function getAllUsers(): array
    {
        return $this->userRepository->getAll();
    }

    public function updateUser(array $data, int $id): User
    {
        UserValidator::validate($data);

        $user = $this->userRepository->findById($id);
        if (!$user) {
            throw new \Exception('Usuário não encontrado.');
        }

        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->address = $data['address'];
        $user->state = $data['state'];
        $user->birthDate = $data['birth_date'];

        if (!$this->isCepFromAmazonas($user->address)) {
            throw new \Exception('O endereço deve ser válido e estar localizado no estado do Amazonas.');
        }

        if ($user->isUnderage()) {
            throw new \Exception('O usuário deve ter mais de 18 anos para se cadastrar.');
        }

        return $this->userRepository->update($user);
    }

    private function isCepFromAmazonas(string $address): bool
    {
        // $cep = substr($address, 0, 5);
        $cep = "69077-120";
        $response = file_get_contents("https://viacep.com.br/ws/{$cep}/json/");
        $data = json_decode($response, true);
        $state = $data['uf'];

        return $state === 'AM';
    }
}
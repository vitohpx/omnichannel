<?php

namespace App\Application\Validators;

use Illuminate\Support\Facades\Validator;

class UserValidator
{
    public static function validate(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'address' => 'required',
            'state' => 'required|in:AM',
            'birth_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }
    }
}

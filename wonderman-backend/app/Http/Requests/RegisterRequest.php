<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "first_name" => ["required", "string", "min:3", "max:30"],
            "last_name" => ["required", "string", "min:3", "max:30"],
            "login" => ["required", "string", "min:3", "max:30", "unique:users"],
            "email" => ["required", "email", "min:3", "max:50", "unique:users"],
            "password" => ["required", Password::min(8)->mixedCase()->numbers(), "confirmed"],
            "password_confirmation " => [],
            "avatar" => ["file", "nullable", "mimes:jpg,png"]
        ];
    }
}

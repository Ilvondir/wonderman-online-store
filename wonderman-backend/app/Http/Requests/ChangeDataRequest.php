<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChangeDataRequest extends FormRequest
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
            "first_name" => ["nullable", "string", "min:3", "max:30"],
            "last_name" => ["nullable", "string", "min:3", "max:30"],
            "login" => ["nullable", "string", "min:3", "max:30", Rule::unique('users')->ignore($this->user()->id)],
            "email" => ["nullable", "email", "min:3", "max:50", Rule::unique('users')->ignore($this->user()->id)],
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBudgets extends Model
{
    use HasFactory;
    
    protected $fillable = ['budget_id', 'user_id', 'title', 'desc', 'budget_date'];
    
}

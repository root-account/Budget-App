<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetItems extends Model
{
    use HasFactory;

    protected $fillable = ['budget_id', 'title', 'desc', 'type', 'amount', 'group_title'];

}

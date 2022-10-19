<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use app\Models\UserBudgets;
use app\Models\UserBudgetItems;

class BudgetsController extends Controller
{
    //

    // GET ALL BUDGETS
    public function getAllBudgets(Request $request){

        $budgets = DB::table('user_budgets')->get();

        return response()->json($budgets, 200);
    }

    // CREATE NEW BUDGET
    public function createBudgets(Request $request){

        $budget_id = str_replace(' ','_',$request->title);
        $budget_id = $budget_id.'_'.rand(0, 9999);

        $user_id = "ephraim_64";

        $budgets = DB::table('user_budgets')->insert([
            'budget_id' => $budget_id, 
            'user_id' => $user_id,
            'title' => $request->title, 
            'desc' => $request->desc,
            'budget_date' => $request->budget_date,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if($budgets){
            return response()->json("Item created.", 200);
        }else{

        }
    }


    // CREATE ALL BUDGET ITEMS
    public function getBudgetItems(Request $request, $budget_id){

        if (DB::table('user_budgets')->where('budget_id', $request->budget_id)->exists()) {
            $budget_items = DB::table('budget_items')->where('budget_id', $budget_id)->get();

            return response()->json($budget_items, 200);
        }else{
            return response()->json("Budget with that ID does not exist.", 200);
        }
        
    }

    // ADD BUDGET ITEM
    public function createBudgetItems(Request $request){

        if (DB::table('user_budgets')->where('budget_id', $request->budget_id)->exists()) {

            $group_title = $request->group_title ? $request->group_title : "General";
            $group_id = str_replace(' ','_',$group_title);
            $group_id = strtolower($group_id);

            

            $budget_item = DB::table('budget_items')->insert([
                'budget_id' => $request->budget_id, 
                'title' => $request->title, 
                'desc' => $request->desc,
                'amount' => $request->amount,
                'type' => $request->type,
                'group_title' => $group_title,
                'group_id' => $group_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            if($budget_item){
                return response()->json("Item added.", 200);
            }else{
    
            }
        }else{
            return response()->json("Budget with that ID does not exist.", 200);
        }
        
    }

    public function group_by($key, $data) {
        $result = array();
    
        foreach($data as $val) {
            if(array_key_exists($key, $val)){
                $result[$val[$key]][] = $val;
            }else{
                $result[""][] = $val;
            }
        }
    
        return $result;
    }

    // GET BUDGET DETAILS
    public function getBudgetDetails(Request $request, $budget_id){

        $budget_details = array();

        if (DB::table('user_budgets')->where('budget_id', $request->budget_id)->exists()) {

            $budget_items = DB::table('budget_items')->where('budget_id', $budget_id)->get();

            // print_r($budget_items);

            // $budget_items_grouped = $byGroup = $this->group_by("group_id", json_decode($budget_items, true));

            $income = array();
            $expenses = array();
            $expenses_grouped = array();
            $income_total = 0;
            $expenses_total = 0;
            $expenses_group_total = array();
            $amount_remaining = 0;


            foreach ($budget_items as $item) {   
                if (strtolower($item->type) == "income") {
                    array_push($income, $item);

                    $income_total = $income_total+$item->amount;
                }else{
                    array_push($expenses, $item);
                    $expenses_total = $expenses_total+$item->amount;
                }
            }

            $amount_remaining = $income_total-$expenses_total;
            $expenses_grouped = $this->group_by("group_title", json_decode(json_encode($expenses), true) );

            $expenses_arr =  json_decode(json_encode($expenses), true);

            $expenses_group_total = array_reduce($expenses_arr, function($carry, $item){ 
                if(!isset($carry[$item['group_title']])){ 
                    $carry[$item['group_title']] = ['group_title'=>$item['group_title'],'amount'=>$item['amount']]; 
                } else { 
                    $carry[$item['group_title']]['amount'] += $item['amount']; 
                } 
                return $carry; 
            });


            $budget_details = array(
                [
                    'income' => $income,
                    'expenses' =>  $expenses_grouped,
                    'expenses_group_total' => $expenses_group_total,
                    'income_total' => $income_total,
                    'expenses_total' => $expenses_total,
                    'amount_remaining' => $amount_remaining,
                ]
            );

            // return response()->json($budget_items_grouped, 200);
            return response()->json($budget_details, 200);
        }else{
            return response()->json("Budget with that ID does not exist.", 200);
        }
        
    }


}

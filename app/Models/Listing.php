<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Listing extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'beds', 'baths', 'area', 'city', 'code', 'street', 'street_nr', 'price', 'description'
    ];
    
    
    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class, 'listing_id');
    }
    
    public function images(): HasMany
    {
        return $this->hasMany(ListingImage::class);
    }


    public function scopeWithoutSold(Builder $query): Builder
    {
      //  return $query->doesntHave('offers')
        //    ->orWhereHas(
         //       'offers',
          //      fn (Builder $query) => $query->whereNull('accepted_at')
          //          ->whereNull('rejected_at')
           // );

            return $query->whereNull('sold_at');
    }
    public function owner()
    {
        return $this->belongsTo(User::class, 'by_user_id'); // ✅ Ensure this matches your DB column
    }
    

 
}

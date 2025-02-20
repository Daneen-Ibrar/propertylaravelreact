<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController; 
use App\Http\Controllers\ListingController; 
use App\Http\Controllers\ListingOfferController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserAccountController;
use App\Http\Controllers\RealtorListingController;
use App\Http\Controllers\RealtorListingImageController;
use App\Http\Controllers\RealtorListingAcceptOfferController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NotificationSeenController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\MessageController;

Route::middleware(['auth'])->group(function () {
    Route::get('/messages/{user}', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::post('/messages/read/{user}', [MessageController::class, 'markAsRead'])->name('messages.markAsRead');
});

Route::get('/messages/{user}', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);


Route::get('/', [ListingController::class, 'index'] );



  Route::resource('listing', ListingController::class)
  ->only(['create', 'store', 'edit', 'update'])
  ->middleware('auth');
Route::resource('listing', ListingController::class)
  ->except(['create', 'store', 'edit', 'update', 'destroy']);

Route::get('login', [AuthController::class, 'create'])
  ->name('login');
Route::post('login', [AuthController::class, 'store'])
  ->name('login.store');
Route::delete('logout', [AuthController::class, 'destroy'])
  ->name('logout');


  Route::name('offer.accept')
  ->put(
    'offer/{offer}/accept',
    RealtorListingAcceptOfferController::class
  );

  Route::put('/realtor/offer/{offer}/accept', RealtorListingAcceptOfferController::class)
  ->name('realtor.offer.accept');



Route::get('/user-account/create', [UserAccountController::class, 'create'])->name('user-account.create');
Route::post('/user-account/store', [UserAccountController::class, 'store'])->name('user-account.store');

Route::prefix('realtor')
  ->name('realtor.')
  ->middleware('auth')
  ->group(function () {
    Route::resource('listing', RealtorListingController::class)
    ->only(['index', 'destroy']);
});

Route::get('/realtor/listing/{listing}/image/create', [RealtorListingImageController::class, 'create'])
    ->name('realtor.listing.image.create')
    ->middleware('auth'); // Add middleware if required

    Route::post('/realtor/listing/{listing}/image', [RealtorListingImageController::class, 'store'])
    ->name('realtor.listing.image.store')
    ->middleware('auth');

 
    Route::delete('/realtor/listing/{listing}/image/{image}', [RealtorListingImageController::class, 'destroy'])
    ->name('realtor.listing.image.destroy');

   Route::resource('listing.offer', ListingOfferController::class)
  ->middleware('auth')
  ->only(['store']);

  Route::post('/listing/{listing}/offer', [ListingOfferController::class, 'store'])
    ->name('listing.offer.store');
    

    Route::get('/realtor/listing/{listing}', [RealtorListingController::class, 'show'])
    ->name('realtor.listing.show');




    Route::get('/realtor/listing', [RealtorListingController::class, 'index'])
    ->name('realtor.listing.index');

    Route::middleware(['auth'])->group(function () {
      // Notification listing routes
      Route::resource('notification', NotificationController::class)
          ->only(['index']);
  
      Route::get('/notifications', [NotificationController::class, 'index'])
          ->name('notification.listing.index');
  
      Route::get('/notifications/show', [NotificationController::class, 'show'])
          ->name('notification.listing.show');
  
      // Mark notification as seen (PUT)
      Route::put('/notification/{notification}/seen', NotificationSeenController::class)
          ->name('notification.seen');
  });

  Route::get('/realtor/listing/{listing}', [RealtorListingController::class, 'show'])->name('realtor.listing.show');





  

  Route::prefix('notifications')->group(function () {
    Route::patch('/offers/{offer}/accept', [ListingOfferController::class, 'accept'])
        ->name('notifications.offers.accept');

    Route::patch('/offers/{offer}/reject', [ListingOfferController::class, 'reject'])
        ->name('notifications.offers.reject');
});

  
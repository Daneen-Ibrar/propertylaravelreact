<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationSeenController extends Controller
{
    public function __invoke(DatabaseNotification $notification)
    {
        logger('Authenticated User ID:', [auth()->id()]);
        logger('Notification Notifiable ID:', [$notification->notifiable_id]);
    
        $this->authorize('update', $notification);
    
        $notification->markAsRead();
    
        return redirect()->back()
            ->with('success', 'Notification marked as read');
    }
    
}
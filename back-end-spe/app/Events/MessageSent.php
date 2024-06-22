<?php
namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
use InteractsWithSockets, SerializesModels;

public $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('chat.'.$this->message->sender_id.'.'.$this->message->recipient_id);
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message->content,
            'sender' => $this->message->sender->name,
        ];
    }
}
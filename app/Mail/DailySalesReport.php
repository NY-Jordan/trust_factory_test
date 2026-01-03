<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class DailySalesReport extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        private Collection $salesData,
        private array $stats,
        private Carbon $date
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "📊 Daily Sales Report - {$this->date->format('M d, Y')}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'email.daily-sales-report',
            with: [
                'salesData' => $this->salesData,
                'stats' => $this->stats,
                'date' => $this->date,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

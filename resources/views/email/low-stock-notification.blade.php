<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .content { padding: 20px 0; }
        .product-details { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
        .button { display: inline-block; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .warning { color: #dc2626; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; color: #dc2626;">⚠️ Low Stock Notification</h1>
        </div>

        <div class="content">
            <p>Dear Administrator,</p>

            <p>The following product is running low on stock and requires immediate attention:</p>

            <div class="product-details">
                <p><strong>Product Name:</strong> {{ $product->name }}</p>
                <p><strong>Current Stock:</strong> <span class="warning">{{ $product->stock }} units</span></p>
                <p><strong>Price:</strong> ${{ number_format($product->price, 2) }}</p>
                <p><strong>Description:</strong> {{ $product->description }}</p>
                <p><strong>Stock Threshold:</strong> {{ $threshold }} units</p>
            </div>

            <p>Please reorder this product as soon as possible to avoid stockouts and lost sales.</p>

            <a href="{{ route('dashboard') }}" class="button">View Dashboard</a>

            <p>If you have any questions, please contact the support team.</p>
        </div>

        <div class="footer">
            <p>{{ config('app.name') }} - Automated Low Stock Alert</p>
        </div>
    </div>
</body>
</html>

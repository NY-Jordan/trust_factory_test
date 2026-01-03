<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0; }
        .stat-box { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; text-align: center; }
        .stat-label { color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .stat-value { font-size: 28px; font-weight: bold; color: #667eea; margin-top: 10px; }
        .section { margin: 30px 0; }
        .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .products-table { width: 100%; border-collapse: collapse; }
        .products-table thead { background: #f8f9fa; }
        .products-table th, .products-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }
        .products-table th { font-weight: bold; color: #333; }
        .products-table tbody tr:hover { background: #f8f9fa; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e0e0e0; padding-top: 20px; }
        .highlight { color: #667eea; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Daily Sales Report</h1>
            <p>{{ $date->format('l, F d, Y') }}</p>
        </div>

        <!-- Statistics -->
        <div class="stats">
            <div class="stat-box">
                <div class="stat-label">Products Sold</div>
                <div class="stat-value">{{ $stats['total_products_sold'] }}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Units Sold</div>
                <div class="stat-value">{{ $stats['total_units_sold'] }}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Total Revenue</div>
                <div class="stat-value">${{ number_format($stats['total_revenue'], 2) }}</div>
            </div>
        </div>

        <!-- Products Table -->
        <div class="section">
            <div class="section-title">🛍️ Products Sold Today</div>
            <table class="products-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Units Sold</th>
                        <th>Transactions</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($salesData as $sale)
                    <tr>
                        <td>{{ $sale['product_name'] }}</td>
                        <td>${{ number_format($sale['unit_price'], 2) }}</td>
                        <td><strong>{{ $sale['total_quantity'] }}</strong></td>
                        <td>{{ $sale['sold_count'] }}</td>
                        <td><span class="highlight">${{ number_format($sale['total_revenue'], 2) }}</span></td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="footer">
            <p>This is an automated daily sales report sent at 6:00 PM every evening.</p>
            <p>{{ config('app.name') }} - Sales Department</p>
        </div>
    </div>
</body>
</html>

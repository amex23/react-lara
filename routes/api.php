use App\Models\VisitorLog;

Route::middleware('auth')->get('/api/visitor-logs', function () {
    abort_unless(auth()->user()->user_type === 'admin', 403);
    return VisitorLog::latest()->limit(100)->get();
});
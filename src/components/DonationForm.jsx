export default function DonationForm() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 sticky top-32">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Secure Donation</h2>
        <span className="material-symbols-outlined text-green-500">verified_user</span>
      </div>

      <form className="space-y-6">

        {/* Frequency */}
        <div>
          <label className="block text-sm font-semibold mb-3">Frequency</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button type="button" className="py-2 bg-white dark:bg-slate-700 rounded text-primary">
              One-time
            </button>
            <button type="button" className="py-2 rounded">
              Monthly
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold mb-3">Select Amount</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button type="button" className="border rounded-lg py-3">$25</button>
            <button type="button" className="border border-primary bg-primary/5 rounded-lg py-3">$50</button>
            <button type="button" className="border rounded-lg py-3">$100</button>
            <button type="button" className="border rounded-lg py-3">Custom</button>
          </div>
        </div>

        {/* Submit */}
        <button className="w-full bg-primary text-white py-4 rounded-lg font-bold">
          Proceed to Payment
        </button>

      </form>

    </div>
  )
}

export default function ImpactSection() {
  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          Your Impact
        </h2>
      </div>

      {/* Card 1 */}
      <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-3xl">school</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">Supporting Public Education</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Empowering the next generation with better tools and modern classrooms.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-3xl">construction</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">Infrastructure Development</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Supporting roads, green energy, and public transport.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-3xl">diversity_3</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">Social Welfare Programs</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Supporting elderly care, food security, and health programs.
          </p>
        </div>
      </div>

    </div>
  )
}

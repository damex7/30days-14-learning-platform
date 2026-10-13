import Link from 'next/link'
import { Icon } from '@/components/ui/icon'
import {
  DURATION_BUCKETS,
  DURATION_FILTERS,
  LEVEL_LABELS,
  LEVELS,
  PRICE_FILTER_LABELS,
  PRICE_FILTERS,
  SORT_KEYS,
  SORT_LABELS,
} from '@/lib/constants'
import { cn } from '@/lib/cn'
import { catalogHref } from '@/lib/search-params'
import type { CatalogQuery, CategoryWithCount } from '@/lib/types'

/*
  FILTERS AS LINKS. Every option is a plain <Link> to the catalogue URL with
  that filter changed, so filtering works without JavaScript, every filtered
  view has a shareable URL, and the Back button undoes a filter. The current
  choice is marked with aria-current, not just a colour.

  A Server Component: no state needed, the URL is the state.
*/

type Option = { label: string; href: string; active: boolean }

function FilterGroup({ title, options }: { title: string; options: Option[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-wide text-subtle uppercase">{title}</h3>
      <ul className="mt-2 flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
        {options.map((option) => (
          <li key={option.label}>
            <Link
              href={option.href}
              scroll={false}
              aria-current={option.active ? 'true' : undefined}
              className={cn(
                'inline-flex min-h-9 items-center gap-1.5 rounded-pill border px-3 text-sm transition-colors lg:w-full lg:rounded-control lg:border-transparent',
                option.active
                  ? 'border-brand bg-brand-soft font-semibold text-brand'
                  : 'border-line bg-raised text-muted hover:border-line-strong hover:text-ink lg:bg-transparent lg:hover:bg-sunken',
              )}
            >
              {option.active && <Icon name="check" className="size-3.5" />}
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FilterPanel({ query, categories }: { query: CatalogQuery; categories: readonly CategoryWithCount[] }) {
  return (
    <div className="grid gap-6">
      <FilterGroup
        title="Category"
        options={[
          { label: 'All categories', href: catalogHref(query, { category: undefined }), active: !query.category },
          ...categories.map((c) => ({ label: `${c.name} (${c.courseCount})`, href: catalogHref(query, { category: c.slug }), active: query.category === c.slug })),
        ]}
      />
      <FilterGroup
        title="Level"
        options={[
          { label: 'Any level', href: catalogHref(query, { level: undefined }), active: !query.level },
          ...LEVELS.map((level) => ({ label: LEVEL_LABELS[level], href: catalogHref(query, { level }), active: query.level === level })),
        ]}
      />
      <FilterGroup
        title="Price"
        options={[
          { label: 'Free and paid', href: catalogHref(query, { price: undefined }), active: !query.price },
          ...PRICE_FILTERS.map((price) => ({ label: PRICE_FILTER_LABELS[price], href: catalogHref(query, { price }), active: query.price === price })),
        ]}
      />
      <FilterGroup
        title="Duration"
        options={[
          { label: 'Any length', href: catalogHref(query, { duration: undefined }), active: !query.duration },
          ...DURATION_FILTERS.map((duration) => ({
            label: DURATION_BUCKETS[duration].label,
            href: catalogHref(query, { duration }),
            active: query.duration === duration,
          })),
        ]}
      />
      <FilterGroup
        title="Sort by"
        options={SORT_KEYS.map((sort) => ({ label: SORT_LABELS[sort], href: catalogHref(query, { sort }), active: query.sort === sort }))}
      />
    </div>
  )
}

/**
 * On phones the filters fold away inside a <details> (no JavaScript needed);
 * on large screens they sit in a sidebar. Both copies exist in the HTML, but
 * the hidden one is display:none, so screen readers and the keyboard only
 * ever meet one.
 */
export function CatalogFilters({ query, categories, activeCount }: { query: CatalogQuery; categories: readonly CategoryWithCount[]; activeCount: number }) {
  return (
    <>
      <details className="group rounded-card border border-line bg-raised lg:hidden">
        <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 font-semibold">
          <span>
            Filter and sort
            {activeCount > 0 && <span className="ml-2 rounded-pill bg-brand px-2 py-0.5 text-xs text-brand-ink">{activeCount} active</span>}
          </span>
          <Icon name="chevronDown" className="size-5 transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-line p-4">
          <FilterPanel query={query} categories={categories} />
        </div>
      </details>
      <aside aria-label="Filter and sort" className="hidden lg:block">
        <FilterPanel query={query} categories={categories} />
      </aside>
    </>
  )
}

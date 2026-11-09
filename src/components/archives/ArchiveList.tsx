import { useMemo, useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { searchPosts, type Post } from '../../lib/search'

export type { Post }

export type ArchiveListProps = {
  posts?: Post[]
  initialQuery?: string
}

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    }
  } catch {
  }
  return dateStr
}

function useUrlQuery(initialQuery: string = '') {
  const [query, setQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search)
        const q = params.get('q')
        if (q !== null) return q
      } catch {
      }
    }
    return initialQuery || ''
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const params = new URLSearchParams(window.location.search)
      const currentQ = params.get('q') ?? ''
      const nextQ = (query || '').trim()
      if (currentQ !== nextQ) {
        if (nextQ) {
          params.set('q', nextQ)
        } else {
          params.delete('q')
        }
        const qs = params.toString()
        const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`
        window.history.replaceState({}, '', newUrl)
      }
    } catch {
    }
  }, [query])

  return [query, setQuery] as const
}

function PostItem({ post }: { post: Post }) {
  return (
    <article className="group">
      <div className="flex items-start justify-between gap-6 sm:gap-8">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors text-balance">
            <a href={`/projects/${post.slug}`} className="hover:text-primary">
              {post.title}
            </a>
          </h3>
          <p className="mt-2 mb-3 text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
            {post.excerpt}
          </p>
        </div>
        <div className="text-right shrink-0 whitespace-nowrap pt-0.5">
          <time className="text-xs sm:text-sm text-muted-foreground block">
            {post.period ?? formatDisplayDate(post.date)}
          </time>
        </div>
      </div>
    </article>
  )
}

export default function ArchiveList({ posts = [], initialQuery = '' }: ArchiveListProps) {
  const [query, setQuery] = useUrlQuery(initialQuery)


  const filteredPosts = useMemo(() => {
    return searchPosts(posts || [], query || '')
  }, [posts, query])

  const safePosts = filteredPosts || []

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="max-w-md">
          <SearchBar 
            value={query || ''} 
            onChange={setQuery} 
            placeholder="Search projects..." 
            posts={posts}
          />
        </div>
        <div className="mt-4 border-b border-border/100" />
      </div>

      {safePosts.length === 0 ? (
        <div className="text-center text-muted-foreground py-12" aria-live="polite" role="status">
          No matching projects found.
        </div>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {safePosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

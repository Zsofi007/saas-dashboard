import { Check, Copy, Link2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const COPIED_MS = 2800

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

type CopyToClipboardButtonProps = {
  text: string
  /** Shown before copy (e.g. "Copy link", "Copy"). */
  idleLabel: string
  /** Icon beside the idle label: chain for URLs, clipboard for secrets/text. */
  variant?: 'link' | 'copy'
  /** Accessible name when idle (defaults to idleLabel). */
  ariaLabel?: string
  className?: string
}

export function CopyToClipboardButton({
  text,
  idleLabel,
  variant = 'link',
  ariaLabel,
  className = '',
}: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => () => clearTimer(), [clearTimer])

  const handleClick = async () => {
    clearTimer()
    const ok = await writeToClipboard(text)
    if (!ok) return
    setCopied(true)
    timeoutRef.current = setTimeout(() => {
      setCopied(false)
      timeoutRef.current = null
    }, COPIED_MS)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      aria-label={copied ? 'Copied to clipboard' : (ariaLabel ?? idleLabel)}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
        copied
          ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
          : 'border-border bg-surface-elevated text-foreground hover:border-accent/40'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
          Copied
        </>
      ) : (
        <>
          {variant === 'copy' ? (
            <Copy className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
          ) : (
            <Link2 className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
          )}
          {idleLabel}
        </>
      )}
    </button>
  )
}

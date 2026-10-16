import { useId, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

/** Hover/focus previews the panel; clicking pins it for touch and mouse users. */
export function InfoReveal({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  const region = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  return (
    <div ref={region} className="mt-5 w-full" onPointerLeave={() => {
      if (!pinned && !region.current?.contains(document.activeElement)) setOpen(false);
    }} onBlur={event => {
      if (!pinned && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }} onKeyDown={event => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setPinned(false);
        trigger.current?.focus();
        setOpen(false);
      }
    }}>
      <button ref={trigger} type="button" aria-expanded={open} aria-controls={id}
        aria-label={`${open ? 'Hide' : 'Show'} details about ${title}`}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
        onFocus={() => setOpen(true)}
        onClick={() => { setPinned(!pinned); setOpen(!pinned); }}
        className="inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-4 py-3 text-left text-sm font-semibold text-cyan-200 transition-colors hover:border-lime-300/60 hover:bg-cyan-400/10 hover:text-lime-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300 motion-reduce:transition-none">
        <span>{pinned ? 'Close details' : 'Explore details'}</span>
        <ChevronDown aria-hidden="true" size={17} className={`shrink-0 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}/>
      </button>
      <div id={id} hidden={!open} className="info-panel mt-3 rounded-lg border border-cyan-400/20 bg-slate-950/80 p-4 text-sm leading-7 text-slate-200">
        {children}
      </div>
    </div>
  );
}

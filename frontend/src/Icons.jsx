import React from 'react';

// Lightweight local icon set — no external package required.
// Each icon accepts the same basic props we were using from lucide-react:
// size, color, className.

const base = (size) => ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
});

export function User({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

export function Phone({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

export function Wrench({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z" />
        </svg>
    );
}

export function Clock({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
        </svg>
    );
}

export function ShieldCheck({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

export function CheckCircle2({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

export function AlertTriangle({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    );
}

export function ClipboardList({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <rect x="6" y="4" width="12" height="16" rx="2" />
            <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
            <path d="M9 11h6" />
            <path d="M9 15h6" />
            <path d="M9 7h6" />
        </svg>
    );
}

export function Stamp({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <path d="M8 3h8l1 5H7l1-5z" />
            <path d="M9 8v5l-2 2h10l-2-2V8" />
            <path d="M4 20h16" />
            <path d="M6 20v-3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
        </svg>
    );
}

export function X({ size = 24, color = 'currentColor', className = '' }) {
    return (
        <svg {...base(size)} style={{ color }} className={className}>
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
        </svg>
    );
}
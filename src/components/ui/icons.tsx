import type { CSSProperties, ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function baseProps(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
}

export function ArrowRightIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function MapPinIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function PhoneIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5.2 12.8 19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.2a2 2 0 0 1-.6 1.8l-1.3 1.3a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 1.8-.6l3.2.5a2 2 0 0 1 1.8 2.1Z" />
    </svg>
  );
}

export function MailIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ClockIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function MessageCircleIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M7 18.5c-1.5-.4-2.8-1.2-3.7-2.3C2.5 15 2 13.6 2 12c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8c-1.2 0-2.3-.2-3.4-.5L4 21l1.6-2.5Z" />
    </svg>
  );
}

export function NavigationIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="m3 11 18-8-8 18-2.6-7.4L3 11Z" />
    </svg>
  );
}

export function CheckIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function StarIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.2 6.5 20l1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

export function SparkIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M12 3v6" />
      <path d="m15 6-3 6-3-6" />
      <path d="M5 14h14" />
      <path d="m7 18 5 3 5-3" />
    </svg>
  );
}

export function BoltIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function CarIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M5 16 7 8h10l2 8" />
      <rect x="3" y="11" width="18" height="5" rx="2" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </svg>
  );
}

export function TrainIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <rect x="6" y="3" width="12" height="14" rx="2" />
      <path d="M8 19h8" />
      <path d="m9 17-2 4" />
      <path d="m15 17 2 4" />
      <path d="M9 7h2" />
      <path d="M13 7h2" />
    </svg>
  );
}

export function PlaneIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M10 14 3 11l18-7-7 18-3-7Z" />
      <path d="M10 14 6 18" />
    </svg>
  );
}

export function GridIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

export function IconBadge({
  children,
  size = 42,
  rounded = 12,
  style,
}: {
  children: ReactNode;
  size?: number;
  rounded?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: rounded,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gold)',
        background: 'rgba(212,175,55,0.06)',
        border: '1px solid rgba(212,175,55,0.18)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

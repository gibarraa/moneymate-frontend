import type { SVGProps } from "react";

const createIcon =
  (path: JSX.Element) =>
  ({ className, ...props }: SVGProps<SVGSVGElement>) =>
    (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {path}
      </svg>
    );

export const DashboardIcon = createIcon(
  <>
    <path d="M4 13.5h7V4H4z" />
    <path d="M13 20h7v-9h-7z" />
    <path d="M13 10h7V4h-7z" />
    <path d="M4 20h7v-4.5H4z" />
  </>,
);

export const TransactionsIcon = createIcon(
  <>
    <path d="M4 7h16" />
    <path d="M7 4l-3 3 3 3" />
    <path d="M20 17H4" />
    <path d="M17 20l3-3-3-3" />
  </>,
);

export const BudgetIcon = createIcon(
  <>
    <path d="M4 8.5h16" />
    <path d="M7 4h10v16H7z" />
    <path d="M10 12h4" />
  </>,
);

export const GoalsIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 1.5" />
  </>,
);

export const ReportsIcon = createIcon(
  <>
    <path d="M5 19V9" />
    <path d="M12 19V5" />
    <path d="M19 19v-7" />
  </>,
);

export const SettingsIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.7Z" />
  </>,
);

export const LogoutIcon = createIcon(
  <>
    <path d="M9 20H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
    <path d="M16 17l4-5-4-5" />
    <path d="M20 12H9" />
  </>,
);

export const WalletIcon = createIcon(
  <>
    <path d="M4 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
    <path d="M14 12h6" />
    <circle cx="16" cy="12" r="1" />
    <path d="M6 6V5a1 1 0 0 1 1-1h9" />
  </>,
);

export const SparklesIcon = createIcon(
  <>
    <path d="m12 3 1.8 4.8L18.5 10l-4.7 1.9L12 17l-1.8-5.1L5.5 10l4.7-2.2Z" />
    <path d="M19 4v2" />
    <path d="M20 5h-2" />
    <path d="M4 18v2" />
    <path d="M5 19H3" />
  </>,
);

export const MenuIcon = createIcon(
  <>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </>,
);

export const CloseIcon = createIcon(
  <>
    <path d="m6 6 12 12" />
    <path d="m18 6-12 12" />
  </>,
);

export const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-3.5-3.5" />
  </>,
);

export const PlusIcon = createIcon(
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>,
);

export const PencilIcon = createIcon(
  <>
    <path d="m4 20 4.2-1 9.5-9.5a2.1 2.1 0 0 0-3-3L5.2 16 4 20z" />
    <path d="m13.5 7.5 3 3" />
  </>,
);

export const TrashIcon = createIcon(
  <>
    <path d="M4 7h16" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M6 7l1 12a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-.9l1-12" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </>,
);

export const CalendarIcon = createIcon(
  <>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M4 10h16" />
  </>,
);

export const ArrowUpIcon = createIcon(
  <>
    <path d="m12 19 6-6" />
    <path d="M18 13V5H10" />
  </>,
);

export const ArrowDownIcon = createIcon(
  <>
    <path d="m12 5 6 6" />
    <path d="M18 11v8H10" />
  </>,
);

export const CheckIcon = createIcon(
  <>
    <path d="m5 13 4 4L19 7" />
  </>,
);

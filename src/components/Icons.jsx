const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.3 4.7 5.2.8-3.8 3.6.9 5.2L12 15.8 7.4 17.8l.9-5.2L4.5 9l5.2-.8L12 3.5z" />
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13.5" r="3" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12l9-9h7v7l-9 9z" />
      <circle cx="16" cy="8" r="1.2" />
    </>
  ),
  phone: (
    <path d="M7 3h4l1 4-2.5 1.5a12 12 0 0 0 6 6L17 12l4 1v4a2 2 0 0 1-2 2C9.4 19 5 14.6 5 5a2 2 0 0 1 2-2z" />
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </>
  ),
  check: (
    <path d="M5 12.5l4 4 10-10" />
  ),
  spark: (
    <path d="M12 3l1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3z" />
  ),
  list: (
    <>
      <path d="M8 7h12M8 12h12M8 17h12" />
      <circle cx="4.5" cy="7" r="1" />
      <circle cx="4.5" cy="12" r="1" />
      <circle cx="4.5" cy="17" r="1" />
    </>
  ),
};

export function Icon({ name, size = 22, className = '' }) {
  return (
    <svg
      className={`pw-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.search}
    </svg>
  );
}

export default Icon;

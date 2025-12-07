import React from "react";

import classNames from "classnames";

export interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (() => void) | ((e: any) => void);
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  id,
  children,
  className,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={classNames(
        "inline-flex items-center justify-center rounded-3xl px-4 py-2.5",
        "text-sm font-medium transition-colors focus:outline-none md:text-base",

        {
          // Primary — Accent system
          "bg-accent-muted text-accent hover:bg-accent-glow cursor-pointer":
            variant === "primary" && !disabled,
          "bg-accent-muted text-accent-text cursor-not-allowed opacity-50":
            variant === "primary" && disabled,

          // Secondary — Neutral/system
          "bg-background text-primary hover:bg-surface hover:border-surface cursor-pointer border":
            variant === "secondary" && !disabled,
          "bg-surface text-muted cursor-not-allowed":
            variant === "secondary" && disabled,
        },

        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;

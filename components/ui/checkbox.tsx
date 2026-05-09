import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-gray-300 bg-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-blue-500 checked:border-blue-500",
            className
          )}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            if (onCheckedChange) onCheckedChange(e.target.checked);
          }}
          ref={ref}
          {...props}
        />
        <Check className="pointer-events-none absolute hidden h-3 w-3 text-white peer-checked:block" strokeWidth={3} />
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

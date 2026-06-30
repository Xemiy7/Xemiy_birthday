import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-base pressable transition-premium outline-none select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "btn-primary btn-shine",
        primary: "btn-primary btn-shine",
        secondary: "btn-secondary btn-shine",
        outline: "btn-outline btn-shine",
        ghost: "btn-ghost",
        destructive:
          "border border-mono-600 bg-mono-800 text-mono-100 px-6 py-3 hover:bg-mono-700 btn-shine",
        link: "rounded-none border-0 bg-transparent px-0 py-0 text-foreground normal-case tracking-normal hover-underline overflow-visible before:content-none",
        glass: "btn-secondary glass-strong btn-shine",
      },
      size: {
        default: "h-10 px-6 text-caption",
        sm: "h-8 gap-1.5 px-4 text-[0.625rem]",
        lg: "h-12 gap-2 px-8 text-caption",
        xl: "h-14 gap-2.5 px-10 text-body-sm tracking-widest",
        icon: "size-10 rounded-full p-0",
        "icon-sm": "size-8 rounded-full p-0",
        "icon-lg": "size-12 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

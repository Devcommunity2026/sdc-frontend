import React, { forwardRef } from 'react'
import { cva } from 'class-variance-authority';
import { cn } from '../../libs/utils';

const buttonVariants = cva(
    "rounded-lg cursor-pointer transition-all ease-in duration-100",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
                outline: " border-3  border-primary dark:border-primary text-primary dark:text-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/25 ",

            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-12 rounded-xl px-8 text-base",
                xl: "h-14 rounded-xl px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const Button = forwardRef(({ className, variant, size, children, ...props }, ref) => {
    return (
        <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} onClick={props.onClick}>
            {children}
        </button>
    )
})

export default Button

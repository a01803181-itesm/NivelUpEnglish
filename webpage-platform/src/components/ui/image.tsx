import * as React from "react"
import { cn } from "../../lib/utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }
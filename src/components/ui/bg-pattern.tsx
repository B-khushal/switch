import React from 'react';
import { cn } from '../../lib/utils';

interface BGPatternProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'grid' | 'dots' | 'lines';
  size?: number;
  mask?: 'fade-edges' | 'fade-bottom' | 'none';
  className?: string;
  fill?: string;
}

export function BGPattern({
  variant = 'grid',
  size = 40,
  mask = 'none',
  className,
  fill = 'currentColor',
  ...props
}: BGPatternProps) {
  const patternId = React.useId();

  const getMaskStyle = () => {
    switch (mask) {
      case 'fade-edges':
        return {
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        };
      case 'fade-bottom':
        return {
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        };
      default:
        return {};
    }
  };

  const renderPattern = () => {
    switch (variant) {
      case 'dots':
        return (
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={size / 2} cy={size / 2} r={1.5} fill={fill} />
          </pattern>
        );
      case 'lines':
        return (
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M 0 ${size} L ${size} 0`}
              fill="none"
              stroke={fill}
              strokeWidth="1"
            />
          </pattern>
        );
      case 'grid':
      default:
        return (
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M.5 ${size}V.5H${size}`}
              fill="none"
              stroke={fill}
              strokeWidth="1"
            />
          </pattern>
        );
    }
  };

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className
      )}
      style={getMaskStyle()}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        {...props}
      >
        <defs>{renderPattern()}</defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

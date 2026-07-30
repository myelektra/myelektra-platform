import { Link } from 'react-router-dom';
import React from 'react';

/**
 * Renders price text with [Book Meeting for Pricing] as a clickable link.
 * Usage: <PriceDisplay price="per project" /> or <PriceDisplay price="USD x,xxx per month" />
 */
const PriceDisplay: React.FC<{ price: string; className?: string; style?: React.CSSProperties }> = ({ price, className = '', style }) => {
  if (price.startsWith('[Book Meeting for Pricing]')) {
    const suffix = price.replace('[Book Meeting for Pricing]', '').trim();
    return (
      <p className={className} style={style}>
        <Link
          to="/consultation"
          className="text-teal hover:text-teal-hover underline underline-offset-2 decoration-teal/40 hover:decoration-teal transition-colors"
        >
          [Book Meeting for Pricing]
        </Link>
        {suffix ? ` ${suffix}` : ''}
      </p>
    );
  }

  return <p className={className} style={style}>{price}</p>;
};

export default PriceDisplay;

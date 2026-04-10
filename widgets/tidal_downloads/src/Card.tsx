import React from 'react';
import { DownloadIcon } from './DownloadIcon';

interface CardLink {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

export interface CardProps {
  title: string;
  links: CardLink[];
}

export const Card: React.FC<CardProps> = ({ title, links }) => {
  return (
    <div className="td-card">
      <div className="td-card-title">{title}</div>
      <div className="td-links">
        {links.map((link, index) => (
          <a
            key={index}
            className="td-link"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon || <DownloadIcon />}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Card;
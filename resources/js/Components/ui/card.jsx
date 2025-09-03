import React from 'react';

export const Card = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl bg-card p-6
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export const GradientCard = ({ children, className = '' }) => {
  return (
    <div className={`relative p-[1px] rounded-xl overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <div className="relative bg-card rounded-xl p-6 h-full">
        {children}
      </div>
    </div>
  );
};

export const HoverCard = ({ icon: Icon, title, description, className = '' }) => {
  return (
    <div className={`group hover:bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-0.5 rounded-xl transition-all duration-300 ${className}`}>
      <div className="flex items-start space-x-4 p-4 rounded-xl bg-card backdrop-blur-sm transition-all duration-300">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

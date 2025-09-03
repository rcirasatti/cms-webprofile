import React from 'react';

export const GradientButton = ({ children, onClick, className = '', size = 'default' }) => {
  const sizeClasses = {
    'sm': 'px-4 py-2 text-sm',
    'default': 'px-6 py-3',
    'lg': 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative bg-gradient-to-r from-primary via-secondary to-accent
        font-medium text-white rounded-xl
        transition-all duration-300
        hover:scale-105 hover:shadow-xl hover:shadow-primary/20
        active:scale-95 backdrop-blur-sm
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <span className="absolute inset-0 rounded-xl bg-white mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity" />
      <span className="relative">{children}</span>
    </button>
  );
};

export const OutlineButton = ({ children, onClick, className = '', size = 'default' }) => {
  const sizeClasses = {
    'sm': 'px-4 py-2 text-sm',
    'default': 'px-6 py-3',
    'lg': 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative border-2 border-primary/20
        font-medium text-foreground rounded-xl
        transition-all duration-300
        hover:border-primary/40 hover:bg-primary/5
        active:scale-95
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const IconButton = ({ icon: Icon, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-lg bg-background/50
        hover:bg-primary/5 transition-colors duration-300
        ${className}
      `}
    >
      <Icon className="w-5 h-5 text-foreground/70" />
    </button>
  );
};

import React from 'react';

const Button = ({ children, onClick, className = '', style = {}, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`game-button ${className}`}
            style={{
                backgroundColor: 'var(--panel-bg)',
                color: 'var(--text-main)',
                border: '2px solid var(--panel-border)',
                borderRadius: '14px',
                padding: '15px 30px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '400px',
                margin: '10px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                ...style
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--panel-bg)';
                e.currentTarget.style.borderColor = 'var(--panel-border)';
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

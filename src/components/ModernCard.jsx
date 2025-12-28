import React from 'react';
import './ModernCard.css';

const ModernCard = ({
    title,
    description,
    icon,
    variant = 'default',
    hoverable = true,
    bordered = true,
    ...props
}) => {
    return (
        <div
            className={`modern-card ${variant} ${hoverable ? 'hoverable' : ''} ${bordered ? 'bordered' : ''}`}
            {...props}
        >
            {icon && <div className="modern-card-icon">{icon}</div>}
            <div className="modern-card-content">
                {title && <h3 className="modern-card-title">{title}</h3>}
                {description && <p className="modern-card-description">{description}</p>}
            </div>
        </div>
    );
};

export default ModernCard;

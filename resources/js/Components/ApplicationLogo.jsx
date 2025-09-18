export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* House Base */}
            <rect x="20" y="45" width="60" height="40" fill="currentColor" opacity="0.8"/>
            
            {/* Roof */}
            <polygon points="15,45 50,20 85,45" fill="currentColor"/>
            
            {/* Door */}
            <rect x="42" y="60" width="16" height="25" fill="white"/>
            
            {/* Windows */}
            <rect x="25" y="50" width="12" height="12" fill="white"/>
            <rect x="63" y="50" width="12" height="12" fill="white"/>
            
            {/* IoT Signal Waves */}
            <circle cx="50" cy="35" r="3" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
            <circle cx="50" cy="35" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="50" cy="35" r="9" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
            
            {/* IoT Devices - Small dots */}
            <circle cx="31" cy="56" r="1.5" fill="#10B981"/>
            <circle cx="69" cy="56" r="1.5" fill="#10B981"/>
            <circle cx="50" cy="72" r="1.5" fill="#10B981"/>
        </svg>
    );
}

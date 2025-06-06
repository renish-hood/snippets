import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Tooltip({ children, content, delay = 500, position = "top" }: any) {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const showTooltip = () => {
        const id = setTimeout(() => setIsVisible(true), delay);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTimeoutId(id as any);
    };

    const hideTooltip = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsVisible(false);
    };

    const positionClasses = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
    };

    const arrowClasses = {
        top: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900",
        bottom: "absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900",
        left: "absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900",
        right: "absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"
    };
    // ?CONCEPT: RENDER PROPS: Call children as a function with tooltip state/methods */
    return (
        <div className="relative inline-block">

            {/*  RENDER PROPS: Call children as a function with tooltip state/methods */}
            {children({
                isVisible,
                showTooltip,
                hideTooltip,
                tooltipProps: {
                    onMouseEnter: showTooltip,
                    onMouseLeave: hideTooltip
                }
            })}

            {/* Tooltip UI */}
            {isVisible && (
                <div className={`absolute ${positionClasses[position as keyof typeof positionClasses]} px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50 opacity-90 pointer-events-none`}>
                    {content}
                    <div className={arrowClasses[position as keyof typeof positionClasses]}></div>
                </div>
            )}
        </div>
    );
}

export default Tooltip
import { useEffect, useRef } from "react";

export function withLogger<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function LoggerComponent(props: P) {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const renderCount = useRef(0);
    const previousProps = useRef<P | null>(null);
    
    // Increment render count
    renderCount.current += 1;
    
    useEffect(() => {
      console.log(`🚀 [${componentName}] Component mounted at:`, new Date().toISOString());
      console.log(`📦 [${componentName}] Initial Props:`, props);
      
      // Log performance timing
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`💀 [${componentName}] Component unmounted at:`, new Date().toISOString());
        console.log(`⏱️ [${componentName}] Component was mounted for:`, `${(endTime - startTime).toFixed(2)}ms`);
        console.log(`🔄 [${componentName}] Total renders:`, renderCount.current);
      };
    }, []);

    // Log every re-render with render count
    useEffect(() => {
      if (renderCount.current > 1) {
        console.log(`🔄 [${componentName}] Re-render #${renderCount.current} at:`, new Date().toISOString());
        console.log(`📦 [${componentName}] Current Props:`, props);
        
        // Check if props actually changed
        if (previousProps.current) {
          const propsChanged = JSON.stringify(previousProps.current) !== JSON.stringify(props);
          if (propsChanged) {
            console.log(`🔀 [${componentName}] Props changed!`);
            console.log(`📦 [${componentName}] Previous Props:`, previousProps.current);
            console.log(`📦 [${componentName}] New Props:`, props);
          } else {
            console.log(`🔄 [${componentName}] Re-render triggered by internal state change (props unchanged)`);
          }
        }
      }
      
      // Store current props for next comparison
      previousProps.current = JSON.parse(JSON.stringify(props));
    });

    // Detailed prop change logging
    useEffect(() => {
      if (renderCount.current > 1) {
        console.log(`📝 [${componentName}] Props effect triggered - props may have changed:`, props);
      }
    }, [props]);

    return <WrappedComponent {...props} />;
  };
}

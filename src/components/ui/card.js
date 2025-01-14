export const Card = ({ children, className }) => (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
  
  export const CardHeader = ({ children, className }) => (
    <div className={`p-4 border-b dark:border-gray-700 ${className}`}>{children}</div>
  );
  
  export const CardContent = ({ children, className }) => (
    <div className={`p-4 ${className}`}>{children}</div>
  );
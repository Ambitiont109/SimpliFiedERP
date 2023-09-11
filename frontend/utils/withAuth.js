import { useEffect } from 'react';
import { useRouter } from 'next/router';

function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();    
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.replace('/login');
      }
    }, []);

    return <Component {...props} />;
  };
}

export default withAuth;
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <>
      <LoginForm />
      <p className="mt-10 text-center text-[11px] font-bold uppercase tracking-widest text-black/30">
        New to Envoy? {' '}
        <Link to="/register" className="text-black hover:underline underline-offset-4 decoration-black/20">
          Create Account
        </Link>
      </p>
    </>
  );
};

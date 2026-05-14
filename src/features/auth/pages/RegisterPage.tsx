import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <>
      <RegisterForm />
      <p className="mt-10 text-center text-[11px] font-bold uppercase tracking-widest text-black/30">
        Already have an account? {' '}
        <Link to="/login" className="text-black hover:underline underline-offset-4 decoration-black/20">
          Sign In
        </Link>
      </p>
    </>
  );
};

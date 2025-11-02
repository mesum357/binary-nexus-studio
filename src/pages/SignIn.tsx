import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      toast.success('Signed in successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-white/5 rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="glass-card p-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Welcome Back</h1>
          <p className="text-muted mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 bg-white/5 border-white/10 rounded-xl"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 bg-white/5 border-white/10 rounded-xl"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary text-white py-6 text-lg rounded-xl shadow-glow hover:opacity-90 transition-opacity"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <p className="text-center text-sm text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-orange hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;


'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';
import Link from 'next/link';

import PageWrapper from '../../_components/page-wrapper';
import { Button } from '../../_components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../_components/ui/card';
import { Input } from '../../_components/ui/input';
import { Label } from '../../_components/ui/label';
import { Separator } from '../../_components/ui/separator';
import { signIn } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const formData = new FormData(event.currentTarget);

    setLoading(true);
    const res = await signIn(formData);
    if (res && res.error) {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <PageWrapper contained centered>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            <h1>Log in</h1>
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col p-6 gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {error && <p className="text-destructive">{error}</p>}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader className="animate-spin" /> : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

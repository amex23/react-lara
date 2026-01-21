import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';

export default function RegisterAdmin() {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setProcessing(true);

        router.post(
            route('register.admin.store'),
            new FormData(e.currentTarget),
            {
                onError: (err) => setErrors(err),
                onFinish: () => setProcessing(false),
            }
        );
    }

    return (
        <AuthLayout
            title="Create Admin Account"
            description="Admin-only account creation"
        >
            <Head title="Register Admin" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing && <Spinner />}
                        Create Admin
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={login()}>Log in</TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}


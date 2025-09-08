import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Share2, Twitter } from 'lucide-react';

import PageWrapper from './_components/page-wrapper';
import { Button } from './_components/ui/button';

export default function HomePage() {
  return (
    <PageWrapper padded={false}>
      <div className="grid w-full lg:grid-cols-2">
        {/* Left Section */}
        <div className="posi relative flex flex-1 flex-col items-center justify-between bg-[url(/todos.jpg)] bg-cover bg-center bg-no-repeat p-8 lg:p-12">
          <div className="z-10 flex w-full items-center justify-start">
            <div className="flex items-center gap-2">
              <Image
                src={'/logo.png'}
                width={30}
                height={28}
                alt="..."
              />
              <span className="text-lg font-medium text-black">My Todo App</span>
            </div>
          </div>

          <nav className="relative z-10 mt-8 flex w-full justify-center gap-6 text-gray-600 lg:justify-start">
            <Link href="#" className="text-black hover:underline">
              About
            </Link>
            <Link href="#" className="text-black hover:underline">
              Contact
            </Link>
            <Link href="#" className="text-black hover:underline">
              Feedback
            </Link>
            <Link href="#" className="text-black hover:underline">
              Help
            </Link>
          </nav>
          <div className="absolute inset-0 bg-white opacity-15"></div>
        </div>

        {/* Right Section */}
        <div className="relative flex flex-1 flex-col items-center justify-between bg-gradient-to-br p-8 lg:p-12">
          <div className="flex w-full items-center justify-end">
            <Share2 className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100" />
          </div>

          <div className="flex flex-col items-center space-y-20 text-center">
            <div className="relative z-10 flex flex-col items-center space-y-2 text-center">
              <h1 className="text-4xl font-bold text-primary lg:text-5xl">My Todo App</h1>
              <p className="text-muted-foreground lg:text-lg">Manage your tasks and stay organized!</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold md:text-2xl">Start Organizing Today!</h2>
              <Link href="/login">
                <Button type="submit" className="rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-center gap-6 lg:justify-end">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-white opacity-80 hover:opacity-100" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-white opacity-80 hover:opacity-100" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-white opacity-80 hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    })

    if (error) {
      return redirect('/login?message=Could not sign up user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="neo-card flex flex-col items-center gap-6 mt-20">
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-3xl font-bold font-black">LOGIN</h1>
          <p className="text-sm">Silakan masuk atau daftar untuk melanjutkan belajar.</p>
        </div>

        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold" htmlFor="email">Email</label>
            <input 
               className="neo-input" 
               name="email" 
               placeholder="you@example.com" 
               required 
            />
          </div>
          
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-bold" htmlFor="password">Password</label>
            <input 
                className="neo-input" 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                required 
            />
          </div>

          <div className="flex flex-col gap-2 relative">
             <label className="text-sm font-bold" htmlFor="name">Full Name (Only for Sign Up)</label>
             <input 
                  className="neo-input" 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
              />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button formAction={signIn} className="neo-btn w-full h-12 flex gap-3 text-lg bg-neo-primary text-white hover:text-black">
              Sign In
            </button>
            <button formAction={signUp} className="neo-btn w-full h-12 flex gap-3 text-lg bg-white">
              Sign Up
            </button>
          </div>
        </form>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-neo-accent border-2 border-neo-border text-center">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  )
}

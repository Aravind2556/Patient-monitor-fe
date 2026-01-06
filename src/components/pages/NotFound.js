import React from 'react'

function NotFound() {
    return (
        <section className='relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-primary-50 overflow-hidden px-4 py-12'>
            <div className='pointer-events-none absolute inset-0 opacity-70'>
                <div className='absolute -left-20 top-20 h-48 w-48 rounded-full bg-primary-100 blur-3xl' />
                <div className='absolute bottom-10 right-10 h-64 w-64 rounded-full bg-sky-100 blur-3xl' />
            </div>

            <div className='relative z-10 mx-auto max-w-4xl'>
                <div className='flex flex-col items-center justify-center space-y-8 text-center' style={{ minHeight: '80vh' }}>
                    <div className='space-y-4'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-red-700 shadow-sm'>
                            Error 404
                        </div>

                        <h1 className='text-8xl font-extrabold text-primary-700 sm:text-9xl'>404</h1>

                        <div className='space-y-2'>
                            <h2 className='text-2xl font-bold text-slate-900 sm:text-3xl'>Page Not Found</h2>
                            <p className='text-base text-slate-600 sm:text-lg max-w-md mx-auto'>
                                Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                            </p>
                        </div>
                    </div>

                    <div className='rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-100 max-w-md w-full'>
                        <div className='space-y-4'>
                            <h3 className='text-lg font-semibold text-slate-900'>What can you do?</h3>

                            <div className='space-y-3 text-left'>
                                <div className='flex items-start gap-3 rounded-xl bg-slate-50 p-3'>
                                    <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold'>
                                        ←
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-900'>Go back to previous page</p>
                                        <p className='text-xs text-slate-500'>Return to where you came from</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3 rounded-xl bg-slate-50 p-3'>
                                    <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700 font-bold'>
                                        🏠
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-900'>Return to homepage</p>
                                        <p className='text-xs text-slate-500'>Start fresh from the main page</p>
                                    </div>
                                </div>
-
                            </div>

                            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                                <button
                                    onClick={() => window.history.back()}
                                    className='flex-1 rounded-full border-2 border-primary-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 shadow-sm transition hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-200'
                                >
                                    Go Back
                                </button>
                                <a
                                    href='/'
                                    className='flex-1 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-[1px] hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-200 text-center'
                                >
                                    Go Home
                                </a>
                            </div>
                        </div>
                    </div>

                    <p className='text-xs text-slate-500'>
                        If you believe this is an error, please contact your healthcare provider.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default NotFound
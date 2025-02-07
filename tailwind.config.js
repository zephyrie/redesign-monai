/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.html',
        './src/**/*.{html,js}',
        './assets/**/*.{html,js}',
        './apps/**/*.{html,js}',
        './research/**/*.{html,js}'
    ],
    theme: {
        container: {
            center: true,
            padding: '1rem'
        },
        extend: {
            zIndex: {
                '-10': '-10',
            },
            inset: {
                '100': '100%',
            },
            colors: {
                brand: {
                    DEFAULT: '#05789e',
                    primary: '#05789e',
                    dark: '#046483',
                    light: '#e6f3f7'
                },
                neutral: {
                    purewhite: '#ffffff',
                    darkestblack: '#1a1a1a'
                }
            },
            display: ['hover', 'group-hover'],
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
                '20': 'repeat(20, minmax(0, 1fr))'
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#5D5D5D',
                        a: {
                            color: '#05789e',
                            '&:hover': {
                                color: '#046483',
                            },
                        },
                        '--tw-prose-code': 'text-gray-800',
                    },
                },
            }
        }
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            cursor: ['disabled'],
            backgroundColor: ['active', 'disabled'],
            textColor: ['active', 'disabled']
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require("kutty")
    ],
}
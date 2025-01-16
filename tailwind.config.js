const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        './*.html',
        './components/**/*.html',
        './assets/js/*.js'
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
                    DEFAULT: '#5DC1B7',
                    primary: {
                        DEFAULT: '#02A3A3',
                        light: '#E6F3F7',
                        dark: '#017373'
                    },
                    secondary: '#98D9D5',
                    light: '#E6F3F7',
                    dark: '#05789E'
                },
                neutral: {
                    darkestblack: '#272727',
                    gray1: '#5D5D5D',
                    gray2: '#BEBEBE',
                    lightgray: '#F5F5F5',
                    purewhite: '#FFFFFF'
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
                            color: '#02A3A3',
                            '&:hover': {
                                color: '#05789E',
                            },
                        },
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
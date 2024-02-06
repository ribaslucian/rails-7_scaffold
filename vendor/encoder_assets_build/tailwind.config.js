module.exports = {
  darkMode: 'class',
  // important: true,
  content: [
    // rails folders
    "./javascripts/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./../../app/**/*.{html,erb}",
    "./../../lib/**/*.{html,erb}",
    "./../../vendor/**/*.{html,erb}",
    //
    "./node_modules/@themesberg/flowbite/**/*.js",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'Be Vietnam Pro', 'ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['Roboto', '"Open Sans"'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@themesberg/flowbite/plugin')
    require('@tailwindcss/aspect-ratio'),
    require('@themesberg/flowbite/plugin'),
    require('tw-elements/dist/plugin')
  ],
}

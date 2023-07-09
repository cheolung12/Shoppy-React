/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors:{
        // 변수 색상 지정
        brand: '#F96162'
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`
      },
    },
  },
  plugins: [], 
}


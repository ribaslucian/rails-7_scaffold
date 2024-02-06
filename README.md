**0. Pre install resources:**
![Ruby Version](https://img.shields.io/badge/Ruby-3.2.3-red.svg)
![Rails Version](https://img.shields.io/badge/Rails-7.1.3-brightgreen.svg)
![Node.js Version](https://img.shields.io/badge/Node.js-16.18.1-green.svg)
![npm Version](https://img.shields.io/badge/npm-8.19.2-blue.svg)
![Yarn Version](https://img.shields.io/badge/Yarn-1.22.21-yellow.svg)

**1. Project inicialization:**
`rails new ScaffoldRails7 --skip-javascript --skip-sprockets --skip-asset-pipeline`

**2. Install gem foreman:**
`bundle add foreman`

**3. Create ./Procfile.dev file on project root with:**
>
    rails: rails s -p 3000 -b 0.0.0.0 2> rails_terminal_logs.txt
    esbuilder_and_sass: node encoder-assets-server.js
    tailwind: npx tailwindcss -i stylesheets/tailwind.css -o ../../app/assets/dist/application-tailwind.css --minify --watch
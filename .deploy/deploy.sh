cd ~/frontend_course
npm run build:prod

rm -rf ~/../var/www/frontend_course/html
mv ~/frontend_course/build ~/../var/www/frontend_course/html
PROJECT_NAME=$1 # parameter
BUILD_FOLDER="build"
DEST_PATH="/var/www/html"

if [[ -z $PROJECT_NAME ]]
	then
	  printf "Enter project folder name: "
		read -r PROJECT_NAME
		if [[ -z $PROJECT_NAME ]]
    	then
    		echo "exit..."
    		exit
    	fi
	fi

cd ~/"$PROJECT_NAME" || exit
echo "Current path '${PWD}'"

read -p "Pull from GitHub? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Fetching project from gitHub..."
  echo
  git pull
fi

echo "Start build project to '${BUILD_FOLDER}' folder..."
npm run build:prod
echo "Removing folder with renaming from '${BUILD_FOLDER}' to '${DEST_PATH}'..."
rm -rf "$DEST_PATH" && mv "$BUILD_FOLDER" "$DEST_PATH"

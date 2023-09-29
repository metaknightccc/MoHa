@echo off

echo Setting up npm server

if exist react-app\node_modules\ (
    echo node_modules already exist
) else (
    cd react-app
    echo installing dependencies
    npm install
)
mkdir monorepo-project
cd monorepo-project
npm init -y
cd packages
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install 
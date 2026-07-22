# --- Stage 1: Build Angular ---
FROM node:24 AS build
WORKDIR /app

COPY package*.json ./

# 💡 ใช้แค่บรรทัดนี้พอครับ กันแพ็กเกจตีกัน
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# ก๊อปปี้ไฟล์ที่บิลด์แล้วไปที่ Nginx
COPY --from=build /app/dist/authentication-portal-identity-web/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
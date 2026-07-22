# ----------------------------------------------------
# Stage 1: Build & Publish
# ----------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 1. ก๊อปปี้ไฟล์ .csproj และ Restore package ก่อน (เพื่อประโยชน์เรื่อง Docker Layer Cache)
COPY ["Authentication.Portal.Identity.Api/Authentication.Portal.Identity.Api.csproj", "Authentication.Portal.Identity.Api/"]
RUN dotnet restore "Authentication.Portal.Identity.Api/Authentication.Portal.Identity.Api.csproj"

# 2. ก๊อปปี้โค้ดที่เหลือทั้งหมดเข้ามาบิลด์
COPY . .
WORKDIR "/src/Authentication.Portal.Identity.Api"
RUN dotnet publish "Authentication.Portal.Identity.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ----------------------------------------------------
# Stage 2: Runtime (ขนาดเล็ก รันเสถียร ไม่หลง Path)
# ----------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# ก๊อปปี้เฉพาะผลลัพธ์จาก Stage 1 มาใช้งาน
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "Authentication.Portal.Identity.Api.dll"]
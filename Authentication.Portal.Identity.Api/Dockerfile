# ----------------------------------------------------
# Stage 1: Build & Publish
# ----------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src


COPY ["Authentication.Portal.Identity.Api/Authentication.Portal.Identity.Api.csproj", "Authentication.Portal.Identity.Api/"]
RUN dotnet restore "Authentication.Portal.Identity.Api/Authentication.Portal.Identity.Api.csproj"


COPY . .
WORKDIR "/src/Authentication.Portal.Identity.Api"
RUN dotnet publish "Authentication.Portal.Identity.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ----------------------------------------------------
# Stage 2: Runtime 
# ----------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app


COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "Authentication.Portal.Identity.Api.dll"]
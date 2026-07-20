using Authentication.Portal.Identity.Api.DTOs;
using Authentication.Portal.Identity.Api.Models.Entities;
using Authentication.Portal.Identity.Api.Repositories;

namespace Authentication.Portal.Identity.Api.Services;

public interface IAuthService
{
    Task<(UserResponse? User, string? Error, int StatusCode)> RegisterAsync(
        RegisterRequest request,
        CancellationToken cancellationToken = default);

    Task<(LoginResponse? Response, string? Error, int StatusCode)> LoginAsync(
        LoginRequest request,
        CancellationToken cancellationToken = default);

    Task<(UserResponse? User, string? Error, int StatusCode)> GetCurrentUserAsync(
        int userId,
        CancellationToken cancellationToken = default);
}

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthService(IUserRepository userRepository, IJwtTokenService jwtTokenService)
    {
        _userRepository = userRepository;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<(UserResponse? User, string? Error, int StatusCode)> RegisterAsync(
        RegisterRequest request,
        CancellationToken cancellationToken = default)
    {
        if (await _userRepository.UsernameExistsAsync(request.Username, cancellationToken))
        {
            return (null, "Username is already taken.", StatusCodes.Status409Conflict);
        }

        var user = new User
        {
            Username = request.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow
        };

        var createdUser = await _userRepository.AddAsync(user, cancellationToken);

        return (new UserResponse
        {
            Id = createdUser.Id,
            Username = createdUser.Username
        }, null, StatusCodes.Status201Created);
    }

    public async Task<(LoginResponse? Response, string? Error, int StatusCode)> LoginAsync(
        LoginRequest request,
        CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetByUsernameAsync(request.Username, cancellationToken);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return (null, "Invalid username or password.", StatusCodes.Status401Unauthorized);
        }

        var token = _jwtTokenService.GenerateToken(user);

        return (new LoginResponse
        {
            Token = token,
            Username = user.Username
        }, null, StatusCodes.Status200OK);
    }

    public async Task<(UserResponse? User, string? Error, int StatusCode)> GetCurrentUserAsync(
        int userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetByIdAsync(userId, cancellationToken);

        if (user is null)
        {
            return (null, "User not found.", StatusCodes.Status401Unauthorized);
        }

        return (new UserResponse
        {
            Id = user.Id,
            Username = user.Username
        }, null, StatusCodes.Status200OK);
    }
}

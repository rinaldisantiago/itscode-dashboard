[HttpPost] 
        public IActionResult Login([FromBody] LoginRequestDTO request) // 👈 Obtenemos datos del cuerpo
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if(String.IsNullOrWhiteSpace(request.userName) || 
                   String.IsNullOrWhiteSpace(request.password))
                {
                    return BadRequest(new { message = "Usuario y/o contraseña son obligatorios." });
                }

                User user = this.df.CreateDAOUser().Login(request.userName);

                if (user is null || !user.IsPasswordValid(request.password))
                {
                    return Unauthorized(new { message = "Invalid username or password." });
                }

                if (user.IsBanned)
                {
                    Ban ban = this.df.CreateDAOBan().GetBanByUserId(user);
                  
                    return Unauthorized(new
                    {
                        message = "Usuario Baneado.",
                        reason = ban.Reason,
                    });

                }

                if (request.isLoginDashboard && (user.Role is null || !user.Role.Id.Equals((int)RoleEnum.Admin)))
                {
                    return Unauthorized(new { message = "Acceso denegado. Se requieren permisos de administrador." });
                }

                LoginResponseDTO response = new LoginResponseDTO
                {
                    id = user.Id,
                    fullName = user.FullName,
                    userName = user.UserName,
                    email = user.Email,
                    urlAvatar = user.GetAvatar()
                };

                ConnectedUsersCounter.Instance.AddUser();
                return Ok(new
                {
                    message = "Login successful",
                    user = response,
                });
            }

            catch(Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error interno del servidor.",
                    error = ex.Message
                });
            }
        }


        public class LoginRequestDTO
{
    public bool isLoginDashboard { get; set; }
    public string? userName { get; set; }
    public string? password { get; set; }
}
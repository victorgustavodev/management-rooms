export const RESPONSE = {
  EXAMPLE: (id: string) => ({
    message: `Exemplo de resposta com ID: ${id}`
  }),
  COMMON: {
    API_KEY_REQUIRED: 'Chave de API é obrigatória',
    INVALID_API_KEY: 'Chave de API inválida'
  },
  USERS: {
    NOT_FOUND: 'Usuário não encontrado',
    CREATED_SUCCESSFULLY: 'Usuário criado com sucesso',
    UPDATED_SUCCESSFULLY: 'Usuário atualizado com sucesso',
    FETCHED_SUCCESSFULLY: 'Usuários buscados com sucesso',
    FOUND_SUCCESSFULLY: 'Usuario buscado com sucesso',
    DELETED_SUCCESSFULLY: 'Usuário deletado com sucesso'
  },
  ROOMS: {
    NOT_FOUND: 'Sala não encontrada',
    CREATED_SUCCESSFULLY: 'Sala criada com sucesso',
    UPDATED_SUCCESSFULLY: 'Sala atualizada com sucesso',
    FETCHED_SUCCESSFULLY: 'Salas buscadas com sucesso',
    FOUND_SUCCESSFULLY: 'Sala buscada com sucesso',
    DELETED_SUCCESSFULLY: 'Sala deletada com sucesso'
  },
  BOOKINGS: {
    NOT_FOUND: 'Reserva não encontrada',
    CREATED_SUCCESSFULLY: 'Reserva criada com sucesso',
    UPDATED_SUCCESSFULLY: 'Reserva atualizada com sucesso',
    FETCHED_SUCCESSFULLY: 'Reservas buscadas com sucesso',
    FOUND_SUCCESSFULLY: 'Reserva buscada com sucesso',
    DELETED_SUCCESSFULLY: 'Reserva deletada com sucesso'
  },
  AUTH: {
    MISSING_EMAIL: 'Email é obrigatório',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    AUTHENTICATED_SUCCESSFULLY: 'Usuário autenticado com sucesso',
    INVALID_TOKEN: 'Token inválido',
    INVALID_OTP: 'OTP inválido',
    PROFILE_FETCHED_SUCCESSFULLY: 'Perfil do usuário obtido com sucesso',
    SEND_EMAIL_AUTH_SUCCESS: 'Enviado e-mail com intruções de autenticação',
    GENERATE_TOKEN_SUCCESS: 'Token gerado com sucesso',
    USER_NOT_FOUND: 'Usuário não encontrado',
    TOKEN_EXPIRED: 'Token expirado'
  }
};

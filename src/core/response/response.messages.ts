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
    FETCHED_SUCCESSFULLY: 'Usuários buscados com sucesso'
  },
  TRIBE: {
    CREATED_SUCCESSFULLY: 'Tribo criada com sucesso a uma tribo',
    UPDATED_SUCCESSFULLY: 'Tribo atualizada com sucesso a uma tribo',
    FETCHED_SUCCESSFULLY: 'Tribos buscadas com sucesso'
  },
  TRIBE_MEMBERS: {
    ADDED_SUCCESSFULLY: 'Membro adicionado com sucesso a uma tribo'
  },
  SKILLS: {
    CREATED_SUCCESSFULLY: 'Skill criada com sucesso',
    FETCHED_SUCCESSFULLY: 'Skills buscadas com sucesso',
    UPDATED_SUCCESSFULLY: 'Skill atualizada com sucesso'
  },
  KINGDOMS: {
    CREATED_SUCCESSFULLY: 'Reino criado com sucesso',
    FETCHED_SUCCESSFULLY: 'Reinos buscados com sucesso',
    UPDATED_SUCCESSFULLY: 'Reino atualizado com sucesso',
    DELETED_SUCCESSFULLY: 'Reino deletado com sucesso'
  },
  FILES: {
    CREATED_SUCCESSFULLY: 'File criado com sucesso',
    UPDATED_SUCCESSFULLY: 'File atualizado com sucesso'
  },
  SQUAD: {
    CREATED_SUCCESSFULLY: 'Squad criada com sucesso',
    UPDATED_SUCCESSFULLY: 'Squad atualizada com sucesso'
  },
  SQUAD_MEMBERS: {
    ADDED_SUCCESSFULLY: 'Squad Member adicionado com sucesso'
  },
  CONSTRUCTION: {
    CREATED_SUCCESSFULLY: 'Construção criada com sucesso',
    UPDATED_SUCCESSFULLY: 'Construção atualizada com sucesso'
  },
  CERTIFICATES: {
    CREATED_SUCCESSFULLY: 'Certificado criado com sucesso',
    FETCHED_SUCCESSFULLY: 'Certificados buscados com sucesso',
    UPDATED_SUCCESSFULLY: 'Certificado atualizado com sucesso'
  },
  BOARD: {
    CREATED_SUCCESSFULLY: 'Board criado com sucesso',
    UPDATED_SUCCESSFULLY: 'Board atualizado com sucesso'
  },
  MISSION_PARTICIPANT: {
    NOT_FOUND: 'Participante da Missão não encontrado.',
    UPDATED_SUCCESSFULLY: 'Participante da Missão atualizado com sucesso'
  },
  RATE_MISSION: {
    CREATED_SUCCESSFULLY: 'Experiência atribuida com sucesso.'
  },
  EMAILS: {
    WELCOME_TEMPLATE: (name: string, link: string) => ({
      subject: 'Bem-vindo à nossa plataforma!',
      text: `Olá ${name},\n\nSeja bem-vindo à nossa plataforma! Estamos felizes em tê-lo conosco.\n\n Clique no link abaixo e acesse sua conta\n\n ${link} \n\nAtenciosamente,\nEquipe Incubem Quest Hub`,
      html: `<p>Olá ${name},</p><p>Seja bem-vindo à nossa plataforma! Estamos felizes em tê-lo conosco.</p>
      Clique no link abaixo e acesse sua conta <a href="${link}">${link}</a><p>Atenciosamente,<br/>Equipe Incubem Quest Hub</p>`
    }),
    SEND_SUCCESS_MESSAGE: (from: string, to: string, subject: string) =>
      `E-mail enviado com sucesso de ${from} para ${to} com assunto "${subject}"`,
    SEND_FAILURE_MESSAGE: (
      from: string,
      to: string,
      subject: string,
      error?: string
    ) =>
      `Falha ao enviar e-mail de ${from} para ${to} com assunto "${subject}". Erro: ${error || 'N/A'}`,
    MAGIC_LINK_AUTH_TEMPLATE: (link: string) => ({
      subject: 'Link de autenticação',
      text: `Olá, clique no link abaixo para autenticar sua conta: ${link}`,
      html: `<p>Olá,</p><p>Clique no link abaixo para autenticar sua conta:</p><a href="${link}">Autenticar</a>`
    }),
    MAGIC_LINK_INACTIVATED_ACCOUNT_TEMPLATE: () => ({
      subject: 'Conta não existente ou inativada',
      text: 'Olá, sua conta não existe ou está inativada. Contate o suporte para mais informações.',
      html: `<p>Olá,</p><p> Sua conta não existe ou está inativada. Contate o suporte para mais informações.</p>`
    }),
    OTP_AUTH_TEMPLATE: (otp: string) => ({
      subject: 'Seu código de autenticação',
      text: `Seu código de autenticação é: ${otp}`,
      html: `<p>Seu código de autenticação é: <strong>${otp}</strong></p>`
    }),
    OTP_INACTIVATED_ACCOUNT_TEMPLATE: () => ({
      subject: 'Conta não existente ou inativada',
      text: 'Olá, sua conta não existe ou está inativada. Contate o suporte para mais informações.',
      html: `<p>Olá,</p><p> Sua conta não existe ou está inativada. Contate o suporte para mais informações.</p>`
    }),
    TEST_ERROR: 'Erro ao enviar e-mail de teste'
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
}

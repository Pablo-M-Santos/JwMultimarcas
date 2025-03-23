import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API de Autenticação",
      description: "Documentação da API de autenticação com Node.js, JWT e PostgreSQL",
      version: "1.0.0",
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Token JWT para autenticação",
      },
    },
    basePath: "/",
  },
  apis: ["./src/authRoutes.js", "./src/protectedRoutes.js"], // Define onde buscar as rotas para gerar documentação
};

// Cria a documentação Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };

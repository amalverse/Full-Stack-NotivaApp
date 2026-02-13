import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NotivaApp API",
      version: "1.0.0",
      description: "API documentation for NotivaApp",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the user",
            },
            name: {
              type: "string",
              description: "The name of the user",
            },
            email: {
              type: "string",
              description: "The email of the user",
            },
            password: {
              type: "string",
              description: "The password of the user",
            },
            isVerified: {
              type: "boolean",
              description: "Is the user email verified",
            },
          },
        },
        Note: {
          type: "object",
          required: ["user"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the note",
            },
            user: {
              type: "string",
              description: "The user id",
            },
            title: {
              type: "string",
              description: "The title of the note",
            },
            type: {
              type: "string",
              enum: ["text", "checklist"],
              description: "The type of the note",
            },
            text: {
              type: "string",
              description: "The content of the note (for text type)",
            },
            checklist: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  isCompleted: { type: "boolean" },
                },
              },
              description: "The checklist items (for checklist type)",
            },
            isPinned: {
              type: "boolean",
              description: "Is the note pinned",
            },
            isArchived: {
              type: "boolean",
              description: "Is the note archived",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date the note was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date the note was updated",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

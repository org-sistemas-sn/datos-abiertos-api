const corsOptions = {
  origin: "*", // Permitir cualquier origen
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  credentials: true, // Si necesitas cookies o credenciales
};

export default corsOptions;

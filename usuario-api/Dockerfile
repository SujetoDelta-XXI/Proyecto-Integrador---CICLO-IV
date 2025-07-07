# Imagen base con Java 24
FROM amazoncorretto:24-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el JAR al directorio de trabajo y lo renombra
COPY target/demo-0.0.1-SNAPSHOT.jar integrador-v1.jar

# Expone el puerto 8080 (por defecto en Spring Boot)
EXPOSE 8080

# Comando de entrada
ENTRYPOINT ["java", "-jar", "integrador-v1.jar"]
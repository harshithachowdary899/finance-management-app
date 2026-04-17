FROM maven:3.8.7-eclipse-temurin-8 AS build
WORKDIR /app
COPY . .
WORKDIR /app/backend
RUN mvn clean package -DskipTests

FROM eclipse-temurin:8-jre
WORKDIR /app
COPY --from=build /app/backend/target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]

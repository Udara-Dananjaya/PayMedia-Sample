# PayMedia-Sample
To create an ASP.NET Core Web API project using the command line, you can use the .NET CLI (Command Line Interface). Follow these steps:

1. **Open Command Prompt (Windows) or Terminal (macOS/Linux)**:
   - Navigate to the directory where you want to create your project.

2. **Run the following commands**:

```bash
dotnet new webapi -n YourProjectName -o YourProjectName
cd YourProjectName
```

Replace `YourProjectName` with the name you want for your project.

3. **Set the target framework to .NET 6.0**:

```bash
dotnet new globaljson --sdk-version 6.0.100
```

This command creates a `global.json` file in your project directory, specifying the SDK version to use.

4. **Run the project**:

```bash
dotnet run
```

By default, Swagger is included in the project template for ASP.NET Core Web API. When you run the project in the development environment, Swagger API documentation will be automatically enabled.

These commands will set up a new ASP.NET Core Web API project with .NET 6.0 framework and enable Swagger API documentation.

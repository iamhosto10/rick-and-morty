# Rick and Morty Memory Game - Frontend Engineering Challenge

**Autor:** Gerardo Andrés Ramírez Ávila | Fullstack Software Engineer

**🌐 Despliegue en vivo:** [https://rick-and-morty-seven-woad.vercel.app/](https://rick-and-morty-seven-woad.vercel.app/)

Aplicación interactiva de memoria desarrollada con React y TypeScript, consumiendo la API pública de Rick and Morty. Este proyecto fue construido desde cero sin depender de librerías de componentes UI prefabricadas, priorizando una arquitectura escalable, código limpio y una experiencia de usuario fluida.

## 🚀 Instrucciones para correr el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/rick-morty-memory.git
   cd rick-morty-memory
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en entorno de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en http://localhost:5173.

## 🧠 Mi enfoque de desarrollo

A lo largo de mi trayectoria en el ecosistema JavaScript/TypeScript, he aprendido que la clave para aplicaciones mantenibles es la separación estricta de responsabilidades. Para este desafío, estructuré el proyecto basándome en una arquitectura orientada a features:

- **Aislamiento de la UI:** Diseño de componentes especializados (como Card, Button, Input) completamente desacoplados de la lógica de negocio.
- **Lógica encapsulada:** Extracción de la máquina de estados del juego y el consumo de la API hacia Custom Hooks (`useGameEngine`, `useDeck`).
- **Inmutabilidad y Tipado:** Uso estricto de interfaces de TypeScript para definir contratos claros entre la capa de datos y la vista, asegurando la integridad del estado durante el flujo asíncrono del juego.

## 🛠 Decisiones técnicas y razonamiento detrás

### 1. Sistema de Diseño Propio (Tailwind CSS + Utilidades)
Dado el requerimiento de no utilizar UI frameworks, opté por construir un sistema de diseño propio utilizando Tailwind CSS. Inspirado en filosofías modernas como la de Shadcn UI, implementé utilidades (`clsx` + `tailwind-merge`) para crear componentes base altamente componibles. Esto me permitió replicar fielmente el diseño provisto en Figma, manejando estados de hover, focus y animaciones 3D puramente mediante clases utilitarias, manteniendo un DOM ligero.

### 2. Autenticación Simulada (Context API)
Para cumplir con el requerimiento de inicio de sesión y manejo de tokens, implementé una solución ligera usando React Context (`AuthContext`) y `sessionStorage`. Esto evita sobreingeniar con herramientas como Redux o Zustand para un estado global pequeño, demostrando a la vez cómo proteger rutas mediante un componente `ProtectedRoute` con `react-router-dom`.

### 3. Motor de Juego y Prevención de Race Conditions
El núcleo del juego reside en `useGameEngine`. En lugar de dispersar temporizadores (`setTimeout`) en la vista, el hook maneja internamente un estado de bloqueo (`isLocked`). Esto garantiza que el usuario no pueda interactuar con el tablero mientras las cartas se están volteando u ocultando (ya sea el temporizador inicial de 3 segundos o el de 1 segundo de comparación), previniendo comportamientos anómalos o múltiples cartas volteadas simultáneamente.

### 4. Algoritmo de Barajado (Fisher-Yates)
Para cumplir con la mezcla inicial de las cartas, descarté el uso de un simple `Math.random() - 0.5` con `sort()` por ser ineficiente y predecible. Implementé el algoritmo matemático de Fisher-Yates, garantizando una distribución estadística verdaderamente aleatoria y sin sesgos en el tablero 4x3.


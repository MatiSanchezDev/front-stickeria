# 🧾 Stickeria App — Gestión de Pedidos & Ingresos

Aplicación web desarrollada con **Next.js 15** y **TypeScript**, diseñada para gestionar stickers, pedidos e ingresos de manera ágil. El proyecto forma parte de una experiencia real como freelancer y está enfocado en la solución de necesidades comerciales concretas.

---

## Tabla de Contenidos

- [Funcionalidades](#funcionalidades)
- [Novedades de esta versión](#novedades)
- [Tecnologías](#tecnologías)
- [Capturas de Pantalla](#capturas)
- [Variables de Entorno](#variables-de-entorno)
- [Configuración de Supabase](#supabase)
- [Instalación y uso](#instalación)
- [Deploy en Vercel](#deploy)
- [Contacto](#contacto)

---

## Funcionalidades <a name="funcionalidades"></a>

- 🧲 **Gestión de stickers** — crear, eliminar y reordenar con drag & drop persistente
- 📦 **Gestión de pedidos** — crear pedidos con múltiples stickers, cantidades editables y descuento
- 💬 **Mensaje al cliente** — generación y copia automática del resumen del pedido
- ✅ **Estado de pedidos** — marcar como pagado / entregado con checkboxes en tiempo real
- 📈 **Dashboard de ingresos** — métricas, gráficos y filtros por mes y año
- 🔐 **Autenticación** — login con JWT almacenado en cookies
- 📱 **Responsive** — diseño mobile-first adaptado a móvil y escritorio

---

## Novedades de esta versión <a name="novedades"></a>

### UX/UI — Rediseño completo estilo ImagineAI
- Tema oscuro dark navy (`#0f0f1e`) con cards `#1a1a2e`
- Gradientes púrpura → rosa (`#a855f7` → `#ec4899`) en botones, títulos y badges
- Botones estilo pill (`rounded-full`) consistentes en toda la app
- Hover overlay en cards de stickers con botones centrados y transición suave
- Favicon personalizado generado como PNG con gradiente

### Stickers — Drag & Drop persistente
- Reordenamiento visual con `@dnd-kit/core` y `@dnd-kit/sortable`
- El orden se guarda en Supabase vía RPC (`reorder_stickers`) — persiste entre sesiones
- Cards más grandes con nombre y precio centrados, hover que revela acciones

### Pedidos — Mejoras funcionales
- Cantidad editable por ítem con validación de dígitos
- Paginación de 30 pedidos por página con controles prev/next/first/last
- Scroll suave hacia la tabla al cambiar de página (sin scroll al inicio)
- Numeración de pedidos por posición global real
- Botón flotante para volver al inicio de la página

### Dashboard de Ingresos — Nuevo
- **4 stat cards**: total del período, total histórico, cantidad de pedidos, promedio por pedido
- **Comparativa automática** vs período anterior con badge ▲/▼ y porcentaje
- **2 cards operacionales**: monto por cobrar (`prepaid: false`) y pedidos sin entregar
- **Bar chart**: ingresos por mes con gradiente púrpura/rosa
- **Area chart**: acumulado del año (curva de crecimiento)
- **Line chart**: ticket promedio por mes
- **Top 5 clientes**: ranking histórico con barras de progreso
- **Tabla mensual**: desglose ordenado por mayor ingreso con badge al mejor mes
- Filtros por año y mes con disponibilidad dinámica según los datos

---

## Tecnologías <a name="tecnologías"></a>

| Categoría | Tecnología |
|-----------|-----------|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | JWT + cookies |
| Drag & Drop | @dnd-kit/core, @dnd-kit/sortable |
| Gráficos | Recharts |
| UI extras | Lucide Icons, SweetAlert2, React Toastify |
| Estado global | Zustand |
| Deploy | Vercel |

---

## Capturas de Pantalla <a name="capturas"></a>

> Reemplazá las imágenes con capturas actualizadas del nuevo diseño.

![Dashboard](https://github.com/MatiSanchezDev/next-stickeria/blob/main/ejemplo1.png?raw=true)
![Ingresos](https://github.com/MatiSanchezDev/next-stickeria/blob/main/ejemplo2.png?raw=true)

---

## Variables de Entorno <a name="variables-de-entorno"></a>

Creá un archivo `.env` en la raíz del proyecto con:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
JWT_SECRET=tu-jwt-secret
```

> Las variables **no** llevan el prefijo `NEXT_PUBLIC_` porque se usan exclusivamente en el servidor (API routes y server components).

---

## Configuración de Supabase <a name="supabase"></a>

### Tablas necesarias

La app espera las tablas `stickers` y `orders` en tu proyecto Supabase.

### Agregar columna de orden a stickers

Ejecutá el siguiente SQL en el **SQL Editor** de Supabase para habilitar el drag & drop persistente:

```sql
-- 1. Agregar columna position
ALTER TABLE stickers ADD COLUMN position integer;

-- 2. Inicializar con el orden actual
UPDATE stickers SET position = subquery.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) AS rn
  FROM stickers
) AS subquery
WHERE stickers.id = subquery.id;

-- 3. Crear función para reordenar en bulk
CREATE OR REPLACE FUNCTION reorder_stickers(items jsonb)
RETURNS void AS $$
BEGIN
  UPDATE stickers s
  SET position = (item->>'position')::integer
  FROM jsonb_array_elements(items) AS item
  WHERE s.id = (item->>'id')::integer;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Recargar schema cache
NOTIFY pgrst, 'reload schema';
```

---

## Instalación y uso <a name="instalación"></a>

### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiSanchezDev/next-stickeria.git
cd next-stickeria
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editá .env con tus credenciales de Supabase
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Build de producción

```bash
npm run build
npm start
```

---

## Deploy en Vercel <a name="deploy"></a>

La forma más rápida es conectar el repositorio directamente desde Vercel:

1. Entrá a [vercel.com](https://vercel.com) → **New Project**
2. Importá `MatiSanchezDev/next-stickeria`
3. Vercel detecta Next.js automáticamente
4. En **Environment Variables** agregá:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `JWT_SECRET`
5. Click **Deploy**

Cada push a `main` despliega automáticamente.

---

## Contacto <a name="contacto"></a>

**Matias N. Sanchez**
📧 [sanchezmatidev@gmail.com](mailto:sanchezmatidev@gmail.com)
🐙 [MatiSanchezDev](https://github.com/MatiSanchezDev)
💼 [LinkedIn](https://www.linkedin.com/in/ms-dev-web/)

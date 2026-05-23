# 🚀 Crash Course: TypeScript + React + Tailwind CSS
### *From Figma File → Production-Ready Code*

> **Goal:** You have a Figma design file. This guide takes you from zero to implementing that design using TypeScript, React, and Tailwind CSS — step by step.

---

## 📋 Table of Contents
1. [Prerequisites & Setup](#phase-0-prerequisites--environment-setup)
2. [Phase 1 — Reading Your Figma File](#phase-1-reading-your-figma-file-like-a-developer)
3. [Phase 2 — TypeScript Fundamentals](#phase-2-typescript-fundamentals)
4. [Phase 3 — React Core Concepts](#phase-3-react-core-concepts)
5. [Phase 4 — Tailwind CSS](#phase-4-tailwind-css)
6. [Phase 5 — Wiring It All Together](#phase-5-wiring-it-all-together-figma--react--typescript--tailwind)
7. [Phase 6 — Project Structure & Best Practices](#phase-6-project-structure--professional-best-practices)
8. [Cheatsheets & Quick References](#-quick-reference-cheatsheets)

---

## ⏱ Estimated Time Investment

| Phase | Topic | Time |
|-------|-------|------|
| 0 | Setup & Prerequisites | 30 min |
| 1 | Figma for Developers | 1 hour |
| 2 | TypeScript | 4–6 hours |
| 3 | React | 5–8 hours |
| 4 | Tailwind CSS | 2–3 hours |
| 5 | Figma → Code Workflow | 3–5 hours |
| 6 | Best Practices | 1–2 hours |
| **Total** | **Full Stack** | **~16–25 hours** |

---

## Phase 0: Prerequisites & Environment Setup

### 🎯 What You Need Before Starting

> **IMPORTANT:** You MUST be comfortable with HTML, CSS, and **modern JavaScript (ES6+)** before starting. TypeScript and React build directly on top of JavaScript.

**JavaScript concepts to be solid on:**
- Arrow functions `() => {}`
- Destructuring `const { name } = user`
- Spread operator `...array`
- Array methods: `.map()`, `.filter()`, `.reduce()`
- Promises and `async/await`
- Modules: `import` / `export`

### 🎬 JavaScript Refresher Videos (watch if needed)

| # | Video | Channel | Duration | Link |
|---|-------|---------|----------|------|
| 1 | JavaScript ES6+ Crash Course | Traversy Media | 1h 40m | https://www.youtube.com/watch?v=NCwa_xi0Uuc |
| 2 | Async JavaScript (Promises, Async/Await) | Web Dev Simplified | 24m | https://www.youtube.com/watch?v=V_Kr9OSfDeU |
| 3 | JavaScript Array Methods (map, filter, reduce) | Web Dev Simplified | 22m | https://www.youtube.com/watch?v=R8rmfD9Y5-c |

### 🛠 Environment Setup

**Step 1: Install Required Tools**
```bash
# 1. Install Node.js (v18+) from https://nodejs.org
# 2. Install VS Code from https://code.visualstudio.com

# Verify installation
node --version    # Should show v18+
npm --version     # Should show 8+
```

**Step 2: Essential VS Code Extensions**

Install all of these — they will save you hours:
| Extension | Purpose |
|-----------|---------|
| **ESLint** | Catches JavaScript/TypeScript errors |
| **Prettier** | Auto-formats your code |
| **Tailwind CSS IntelliSense** | Autocomplete for Tailwind classes |
| **ES7+ React/Redux Snippets** | Fast component scaffolding |
| **TypeScript Error Translator** | Translates cryptic TS errors to plain English |
| **Figma for VS Code** | Inspect Figma designs without leaving VS Code |

**Step 3: Create Your Project (Vite + React + TypeScript)**
```bash
# Create a new project (this is the modern way, NOT create-react-app)
npm create vite@latest my-figma-project -- --template react-ts

# Navigate into the project
cd my-figma-project

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start the dev server
npm run dev
```

**Step 4: Configure Tailwind CSS**

Open `tailwind.config.js` and add:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 You'll add your Figma design tokens here later
    },
  },
  plugins: [],
}
```

Open `src/index.css` and replace its content with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Phase 1: Reading Your Figma File Like a Developer

> **NOTE:** This phase is CRITICAL. Understanding your Figma file before writing a single line of code will save you from rewriting everything later.

### 🎬 Figma for Developers — Videos to Watch

| # | Video | Channel | Duration | Link |
|---|-------|---------|----------|------|
| 1 | **Figma for Developers — Full Crash Course** | Kodaps Academy | 1h 15m | https://www.youtube.com/watch?v=B242nuM3y2s |
| 2 | **Figma Dev Mode — The Complete Guide** | DesignCourse | 28m | https://www.youtube.com/watch?v=SEevRGREbzc |
| 3 | **How Developers Should Read Figma Files** | Fireship | 11m | https://www.youtube.com/watch?v=Gu1so3pz4bA |
| 4 | **Design Tokens Explained** | Kevin Powell | 18m | https://www.youtube.com/watch?v=KzRlBrRq3BU |

### 🔍 Step 1: Enter Dev Mode
- Open your Figma file
- Press **`Shift + D`** or click the **Dev Mode toggle** (top-right, `</>` icon)
- This switches from "design" view to "developer" view

### 🎨 Step 2: Extract Your Design Tokens

Click on any element in Dev Mode and inspect the right panel. Write down:

#### Colors
```
Inspect: Right panel → Fill → Copy hex value
Example found: #6366F1 (primary), #F1F5F9 (background), #0F172A (text)
```

#### Typography
```
Click on any text → Right panel shows:
- Font Family: Inter
- Font Size: 16px
- Font Weight: 600
- Line Height: 24px
```

#### Spacing
```
Hold Option/Alt and hover between elements to see spacing gaps
Common values: 8px, 16px, 24px, 32px, 48px, 64px
```

### 📌 Step 3: Map Figma Values to Tailwind Config

Once you've identified your design tokens, put them in `tailwind.config.js`:
```js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          500: '#6366f1',   // Your Figma primary color
          600: '#4f46e5',   // Hover state
          900: '#1e1b4b',
        },
        // Add all colors from your Figma file
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],   // Your Figma font
      },
      fontSize: {
        'display': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'heading': ['32px', { lineHeight: '40px', fontWeight: '600' }],
      },
      spacing: {
        '18': '72px',   // Custom spacing from Figma
      }
    },
  },
}
```

### 🧩 Step 4: Identify and List Your Components

Look at your Figma file and list every reusable element:
```
✅ Navbar
✅ Button (Primary, Secondary, Ghost variants)
✅ Card
✅ Input Field
✅ Badge / Tag
✅ Hero Section
✅ Footer
```

> **TIP:** In Figma, anything that appears multiple times IS a component. Each Figma component = one React component you'll build.

### 🗂 Step 5: Plan Your Component Hierarchy

```
App
├── Layout
│   ├── Navbar
│   └── Footer
├── pages/
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── FeaturesSection
│   │   └── CTASection
│   └── AboutPage
└── components/
    ├── Button
    ├── Card
    └── Badge
```

---

## Phase 2: TypeScript Fundamentals

> **NOTE:** TypeScript = JavaScript with types. Think of types as labels that tell you "this variable is always a number" or "this function always returns a string." TypeScript catches bugs before the code even runs.

### 🎬 TypeScript Videos to Watch

**Watch in this order:**

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **TypeScript Crash Course** | Traversy Media | 1h 30m | Best starting point, practical and concise | https://www.youtube.com/watch?v=BCg9d-oigyc |
| 2 | **TypeScript Full Course for Beginners** | Dave Gray | 8h | Deep dive, includes TS with React sections | https://www.youtube.com/watch?v=mwF112JzFfI |
| 3 | **TypeScript 101 – Zero To Mastery** | ZTM / Jayson Lennon | 4h | Modern TS fundamentals, great for 2025 | https://www.youtube.com/watch?v=F3p1y33V50w |
| 4 | **TypeScript in 100 Seconds** | Fireship | 2m | Quick conceptual overview | https://www.youtube.com/watch?v=zQnBQ4tB3ZA |

> **Recommended strategy:** Watch #1 (Traversy) first to get the concepts, then refer to #2 (Dave Gray) for specific topics you need deeper on.

---

### 📚 Core TypeScript Concepts

#### 2.1 Basic Types

```typescript
// Primitive types
let name: string = "Alice";
let age: number = 25;
let isActive: boolean = true;

// Arrays
let colors: string[] = ["red", "blue", "green"];
let numbers: number[] = [1, 2, 3];
let mixed: (string | number)[] = ["hello", 42]; // union type in array

// Any (avoid this! defeats the purpose of TypeScript)
let anything: any = "bad practice";

// Unknown (better alternative to any — forces you to check type first)
let unknown: unknown = "something";
if (typeof unknown === "string") {
  console.log(unknown.toUpperCase()); // ✅ safe
}
```

#### 2.2 Type Inference (TypeScript is smart!)

```typescript
// You DON'T always need to write the type — TS figures it out:
let message = "Hello World";   // TS knows this is a string
let count = 42;                // TS knows this is a number

// But you DO need types for function parameters:
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

#### 2.3 Interfaces (Most Important for React!)

Interfaces define the "shape" of an object — exactly like a Figma component spec:

```typescript
// Think of this like a Figma component with defined properties
interface ButtonProps {
  label: string;
  variant: "primary" | "secondary" | "ghost";  // only these 3 values allowed
  size?: "sm" | "md" | "lg";                   // ? means optional
  onClick: () => void;                          // function with no return
  disabled?: boolean;
}

// Using the interface
const btn: ButtonProps = {
  label: "Click Me",
  variant: "primary",
  onClick: () => console.log("clicked")
  // size and disabled are optional, so we can skip them
};
```

#### 2.4 Type Aliases

```typescript
// type alias (very similar to interface, used for complex types)
type Color = "red" | "green" | "blue";
type ID = string | number;

type CardData = {
  id: ID;
  title: string;
  description: string;
  color: Color;
  tags: string[];
};
```

#### 2.5 Generics (Powerful but Simple Idea)

```typescript
// Without generics — you'd have to write this for every type:
function getFirstString(arr: string[]): string { return arr[0]; }
function getFirstNumber(arr: number[]): number { return arr[0]; }

// WITH generics — one function handles all types:
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstWord = getFirst<string>(["hello", "world"]);   // string
const firstNum = getFirst<number>([1, 2, 3]);             // number

// In React, you'll see this ALL the time:
// useState<User | null>(null)
// useState<string[]>([])
```

#### 2.6 TypeScript with Functions

```typescript
// Arrow function with types
const add = (a: number, b: number): number => a + b;

// Async function
const fetchUser = async (id: number): Promise<User> => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
};

// Function that takes a callback
const runCallback = (callback: (message: string) => void): void => {
  callback("Hello!");
};
```

#### 2.7 Enums (Great for Figma Variants)

```typescript
// Your Figma has button variants? Use enums!
enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Ghost = "ghost",
  Danger = "danger"
}

// Usage:
const myVariant: ButtonVariant = ButtonVariant.Primary;
```

---

### 🚨 Common TypeScript Errors and What They Mean

| Error Message | What It Means | Fix |
|---------------|---------------|-----|
| `Type 'string' is not assignable to type 'number'` | Wrong type passed | Change the type or value |
| `Object is possibly 'undefined'` | Value might not exist | Use optional chaining `?.` or a null check |
| `Property 'x' does not exist on type 'Y'` | Accessing a property not in the interface | Add property to interface or fix the access |
| `Argument of type 'string' is not assignable to parameter of type 'number'` | Wrong argument type | Check the function signature |

---

## Phase 3: React Core Concepts

> **NOTE:** React is a UI library that lets you build UIs as a tree of reusable components. Each component = one piece of your Figma file.

### 🎬 React Videos to Watch

**Watch in this order:**

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **React in 100 Seconds** | Fireship | 2m | Quick conceptual overview first | https://www.youtube.com/watch?v=Tn6-PIqc4UM |
| 2 | **React Crash Course 2024** | Traversy Media | 2h | Best beginner crash course with Vite | https://www.youtube.com/watch?v=LDB4uaJ87e0 |
| 3 | **React Full Course for Beginners** | freeCodeCamp | 7h | Comprehensive with 50+ challenges | https://www.youtube.com/watch?v=x4rFhThSX04 |
| 4 | **React Hooks Explained** | Web Dev Simplified | 40m | Deep dive into useState, useEffect, etc. | https://www.youtube.com/watch?v=O6P86uwfdR0 |
| 5 | **React + TypeScript Full Course** | Dave Gray | 5h | Specifically TS + React together | https://www.youtube.com/watch?v=MbsfalanV7U |

---

### 📚 Core React Concepts

#### 3.1 Your First Component (Figma Frame → React Component)

When you see a "Card" in Figma, you write:

```tsx
// src/components/Card.tsx

// 1. Define the props (what the component accepts — like Figma component properties)
interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  badge?: string;
}

// 2. Create the component (a function that returns JSX)
const Card = ({ title, description, imageUrl, badge }: CardProps) => {
  return (
    <div className="rounded-xl bg-white shadow-md p-6">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      )}
      {badge && (
        <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900 mt-3">{title}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default Card;
```

```tsx
// Using the Card component in another file:
import Card from './components/Card';

const App = () => {
  return (
    <div>
      <Card
        title="Feature Title"
        description="This is a description from your Figma file."
        badge="New"
      />
    </div>
  );
};
```

#### 3.2 JSX Rules (Critical!)

```tsx
// ✅ Rule 1: Always return ONE root element (use <> </> fragment if needed)
return (
  <>
    <Header />
    <Main />
    <Footer />
  </>
);

// ✅ Rule 2: className instead of class (because class is a JS keyword)
<div className="flex items-center gap-4">

// ✅ Rule 3: Self-close tags that have no children
<img src="photo.jpg" alt="Photo" />
<br />
<Input />

// ✅ Rule 4: JavaScript expressions go in curly braces {}
<p>{user.name}</p>
<h1>{2 + 2}</h1>
```

#### 3.3 useState — Managing Data in Components

```tsx
import { useState } from 'react';

// Figma has a "Like" button that toggles? Use useState!
const LikeButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const handleLike = () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <button onClick={handleLike} className={`px-4 py-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
      {isLiked ? '❤️' : '🤍'} {likeCount}
    </button>
  );
};
```

```tsx
// TypeScript useState with objects
interface User {
  id: number;
  name: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>{user?.name}</p>}
    </div>
  );
};
```

#### 3.4 useEffect — Running Code at the Right Time

```tsx
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Runs ONCE when the component first appears on screen
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=10');
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty array = run once on mount

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <div key={product.id} className="rounded-xl shadow-md p-4">
          <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded-lg" />
          <h3 className="font-bold mt-2">{product.title}</h3>
          <p className="text-indigo-600 font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
};
```

#### 3.5 Props vs State — When to Use Which

| | Props | State |
|---|-------|-------|
| **What it is** | Data passed FROM parent TO child | Data managed INSIDE the component |
| **Who controls it** | Parent component | The component itself |
| **Can change?** | No (read-only in child) | Yes (via `setState`) |
| **Figma analogy** | Component properties in Figma | Component interaction states |

#### 3.6 Lists and Keys (Rendering Figma Repeating Elements)

```tsx
// Your Figma has a list of cards? Use .map()!
interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const team: TeamMember[] = [
  { id: 1, name: "Sarah Chen", role: "UI Designer", avatar: "/avatars/sarah.jpg" },
  { id: 2, name: "Marcus Lee", role: "Developer", avatar: "/avatars/marcus.jpg" },
];

const TeamSection = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    {team.map((member) => (
      // Always add a unique key prop when using .map()
      <div key={member.id} className="text-center p-6 bg-white rounded-2xl shadow-sm">
        <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto" />
        <h3 className="font-bold mt-3">{member.name}</h3>
        <p className="text-gray-500 text-sm">{member.role}</p>
      </div>
    ))}
  </div>
);
```

#### 3.7 Event Handling

```tsx
// onClick, onChange, onSubmit — the most common events in Figma interactions

const ContactForm = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // prevent page reload
    console.log({ email, message });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full border rounded-lg px-4 py-2"
      />
      <textarea
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        placeholder="Your message"
        className="w-full border rounded-lg px-4 py-2 h-32"
      />
      <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
        Send Message
      </button>
    </form>
  );
};
```

#### 3.8 Conditional Rendering (Figma States)

```tsx
// Figma has hover states, empty states, loading states? Handle them here:
const UserCard = ({ user }: { user: User | null }) => {
  // Method 1: Early return
  if (!user) return <div className="p-4 text-gray-400">No user found</div>;

  // Method 2: Ternary inside JSX
  return (
    <div className="p-4 bg-white rounded-xl">
      {user.isVerified ? (
        <span className="text-green-500">✅ Verified</span>
      ) : (
        <span className="text-yellow-500">⚠️ Pending</span>
      )}

      {/* Method 3: Short-circuit (only render if condition is true) */}
      {user.isPremium && <span className="bg-gold text-white px-2 py-1 rounded">⭐ Premium</span>}

      <h2 className="text-xl font-bold">{user.name}</h2>
    </div>
  );
};
```

---

## Phase 4: Tailwind CSS

> **NOTE:** Tailwind CSS = utility-first CSS. Instead of writing custom CSS, you use pre-built class names directly in your HTML/JSX. It's like having Figma's design panel as CSS classes.

### 🎬 Tailwind CSS Videos to Watch

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **Tailwind CSS in 100 Seconds** | Fireship | 2m | Quick concept overview | https://www.youtube.com/watch?v=mr15Xzb1Ook |
| 2 | **Tailwind CSS v4 Crash Course 2025** | PedroTech | 1h 30m | **Best beginner crash course** — ends with a full project | https://www.youtube.com/watch?v=DenUCuq4G94 |
| 3 | **Build a Responsive Website with Tailwind CSS** | Kevin Powell | 2h | Excellent for Figma → Tailwind workflow | https://www.youtube.com/watch?v=ft30zcMlFao |
| 4 | **The Ultimate Tailwind CSS Series 2025** | Manu Arora | Series | Goes from beginner to advanced patterns | https://www.youtube.com/@ManuArora |

---

### 📚 Tailwind CSS Core Concepts

#### 4.1 The Mental Model — Think in Design Properties

```
Figma property          →   Tailwind class
─────────────────────────────────────────
Width: 100%             →   w-full
Width: 320px            →   w-80
Height: 48px            →   h-12
Padding: 16px           →   p-4
Padding: 16px 24px      →   py-4 px-6
Margin top: 24px        →   mt-6
Border radius: 8px      →   rounded-lg
Border radius: full     →   rounded-full
Font size: 16px         →   text-base
Font size: 24px         →   text-2xl
Font weight: 700        →   font-bold
Color: #6366F1          →   text-indigo-500
Background: #EEF2FF     →   bg-indigo-50
Display: flex           →   flex
Flex direction: row     →   flex-row (default)
Flex direction: column  →   flex-col
Justify: center         →   justify-center
Align items: center     →   items-center
Gap: 16px               →   gap-4
Grid cols: 3            →   grid grid-cols-3
Shadow: medium          →   shadow-md
Opacity: 50%            →   opacity-50
```

> **TIP:** Tailwind uses a **4px spacing scale**: `1` = 4px, `2` = 8px, `4` = 16px, `6` = 24px, `8` = 32px, `10` = 40px, `12` = 48px, `16` = 64px.

#### 4.2 Responsive Design (Mobile First)

Figma usually has desktop and mobile frames. Here's how to handle both:

```tsx
// No prefix = mobile (smallest screen)
// md: = tablets (768px+)
// lg: = desktop (1024px+)
// xl: = large desktop (1280px+)

<div className="
  grid
  grid-cols-1          /* mobile: 1 column */
  md:grid-cols-2       /* tablet: 2 columns */
  lg:grid-cols-3       /* desktop: 3 columns */
  gap-4
  md:gap-6
  p-4
  md:p-8
  lg:p-12
">
```

#### 4.3 Hover, Focus, and Active States (Figma Interaction States)

```tsx
// Figma has "Hover" variant? Add hover: prefix in Tailwind
<button className="
  bg-indigo-500
  text-white
  px-6
  py-3
  rounded-xl
  font-semibold
  hover:bg-indigo-600        /* hover state */
  hover:shadow-lg            /* shadow on hover */
  active:scale-95            /* slight shrink on click */
  focus:outline-none
  focus:ring-2
  focus:ring-indigo-400      /* accessibility focus ring */
  transition-all
  duration-200               /* smooth animation */
  cursor-pointer
">
  Get Started
</button>
```

#### 4.4 Dark Mode

```tsx
// In tailwind.config.js, add: darkMode: 'class'

// Then in your components:
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hello</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

#### 4.5 Creating Reusable Component Classes

```tsx
// Separate React component (preferred)
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Button = ({ children, variant = 'primary', size = 'md', onClick }: ButtonProps) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2";

  const variantClasses = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
    ghost: "bg-transparent text-indigo-500 hover:bg-indigo-50 focus:ring-indigo-300",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
};
```

#### 4.6 Common Layout Patterns from Figma

```tsx
// Navbar from Figma
const Navbar = () => (
  <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-gray-100">
    <div className="flex items-center gap-2">
      <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
      <span className="text-xl font-bold text-gray-900">Brand</span>
    </div>
    <div className="hidden md:flex items-center gap-8">
      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</a>
      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</a>
    </div>
    <Button variant="primary" size="sm">Get Started</Button>
  </nav>
);

// Hero Section from Figma
const Hero = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-6">
    <div className="max-w-3xl mx-auto text-center">
      <span className="bg-indigo-100 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full">
        🚀 Now in Beta
      </span>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-6 leading-tight">
        Build Faster with <span className="text-indigo-500">Our Platform</span>
      </h1>
      <p className="text-gray-500 text-lg mt-6 max-w-xl mx-auto">
        Turn your Figma designs into beautiful, production-ready React components in minutes.
      </p>
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button variant="primary" size="lg">Start for Free</Button>
        <Button variant="ghost" size="lg">See Demo →</Button>
      </div>
    </div>
  </section>
);
```

---

## Phase 5: Wiring It All Together — Figma → React + TypeScript + Tailwind

### 🎬 Integration Videos to Watch

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **Figma to React — Full Build** | Colby Fayock | 1h 20m | Watch a pro convert a Figma file to React | https://www.youtube.com/watch?v=PdVVjXI7XLw |
| 2 | **React + TypeScript + Tailwind — Build a Dashboard** | PedroTech | 2h | A complete project combining all three | https://www.youtube.com/watch?v=jLD_OvWgMiw |
| 3 | **How to Use Tailwind CSS with React** | Kevin Powell | 45m | Deep dive into the integration | https://www.youtube.com/watch?v=tS7upsfuxmo |
| 4 | **Design System in React + Tailwind** | ByteGrad | 1h | Building a reusable component library from Figma | https://www.youtube.com/watch?v=CQuTF-bkOgc |

---

### 🗺 The Figma-to-Code Workflow (Step by Step)

```
Step 1. Open Figma → Enter Dev Mode (Shift+D)
         ↓
Step 2. List ALL components you see
         ↓
Step 3. Extract design tokens (colors, fonts, spacing)
         ↓
Step 4. Configure tailwind.config.js with those tokens
         ↓
Step 5. Create interfaces/types for each component's data
         ↓
Step 6. Build smallest components first (Button, Badge, Input)
         ↓
Step 7. Build sections (Hero, Features, Footer)
         ↓
Step 8. Assemble sections into pages
         ↓
Step 9. Add state and interactivity
         ↓
Step 10. Test responsiveness (mobile + tablet + desktop)
```

### 📁 Project File Structure (Professional)

```
src/
├── components/           # Reusable UI components (from Figma components)
│   ├── ui/               # Base components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Modal.tsx
│   ├── layout/           # Page layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── sections/         # Page sections (from Figma frames)
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       └── CTASection.tsx
│
├── pages/                # Full pages
│   ├── HomePage.tsx
│   └── AboutPage.tsx
│
├── types/                # TypeScript interfaces
│   ├── index.ts          # Export all types from here
│   └── api.ts            # API response types
│
├── hooks/                # Custom React hooks
│   ├── useFetch.ts
│   └── useLocalStorage.ts
│
├── utils/                # Helper functions
│   └── formatters.ts
│
├── assets/               # Images, SVGs from Figma export
│   └── images/
│
├── App.tsx
├── main.tsx
└── index.css             # Tailwind directives + global styles
```

### 🔄 Complete Component Example (Figma → Code)

Here's a complete example going from Figma inspection to finished code:

**Figma Specs (what you see in Dev Mode):**
```
Component: PricingCard
Width: 360px
Padding: 32px
Background: #FFFFFF
Border radius: 16px
Shadow: 0 4px 24px rgba(0,0,0,0.08)

Title: "Pro Plan"  →  Font: Inter 600, 20px, #111827
Price: "$49"       →  Font: Inter 700, 48px, #6366F1
Period: "/month"   →  Font: Inter 400, 16px, #6B7280
Features: List of checkmarks with text
CTA Button: Primary, full width, "Get Started"
```

**Resulting TypeScript + React + Tailwind Code:**

```tsx
// src/types/index.ts
export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaLabel: string;
}

// src/components/ui/PricingCard.tsx
import { PricingPlan } from '../../types';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: number) => void;
}

const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  return (
    <div
      className={`
        relative flex flex-col
        bg-white rounded-2xl p-8
        shadow-[0_4px_24px_rgba(0,0,0,0.08)]
        border-2 transition-all duration-300
        hover:shadow-[0_8px_40px_rgba(99,102,241,0.2)]
        hover:-translate-y-1
        ${plan.isPopular ? 'border-indigo-500' : 'border-transparent'}
      `}
    >
      {/* Popular badge */}
      {plan.isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
          MOST POPULAR
        </span>
      )}

      {/* Plan Name */}
      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{plan.description}</p>

      {/* Price */}
      <div className="flex items-end gap-1 mt-6">
        <span className="text-5xl font-bold text-indigo-500">${plan.price}</span>
        <span className="text-gray-400 text-base mb-1">{plan.period}</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mt-8 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="text-indigo-500 flex-shrink-0">✅</span>
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => onSelect(plan.id)}
        className={`
          w-full mt-8 py-3 rounded-xl font-semibold text-base
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${plan.isPopular
            ? 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300'
          }
        `}
      >
        {plan.ctaLabel}
      </button>
    </div>
  );
};

export default PricingCard;
```

---

## Phase 6: Project Structure & Professional Best Practices

### 🎬 Architecture Videos to Watch

| # | Video | Channel | Duration | Link |
|---|-------|---------|----------|------|
| 1 | **React Project Structure — Best Practices 2024** | ByteGrad | 25m | https://www.youtube.com/watch?v=y96Hn1-C6eo |
| 2 | **React TypeScript Best Practices** | Jack Herrington | 30m | https://www.youtube.com/watch?v=ALv_bLor21o |
| 3 | **Component Design Patterns in React** | Web Dev Simplified | 45m | https://www.youtube.com/watch?v=YaZg8wg39QQ |

---

### ✅ Professional Best Practices

#### 6.1 Always Type Your Props
```tsx
// ❌ Bad — no types
const Card = ({ title, onClick }) => { ... }

// ✅ Good — typed interface
interface CardProps {
  title: string;
  onClick: () => void;
}
const Card = ({ title, onClick }: CardProps) => { ... }
```

#### 6.2 Use `children` Prop for Flexible Components
```tsx
interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;  // anything can go inside
}

const Section = ({ title, subtitle, children }: SectionProps) => (
  <section className="py-20 px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-3">{subtitle}</p>}
    </div>
    {children}
  </section>
);

// Usage — anything can go inside:
<Section title="Our Features" subtitle="Everything you need">
  <div className="grid grid-cols-3 gap-6">
    <FeatureCard ... />
    <FeatureCard ... />
  </div>
</Section>
```

#### 6.3 Custom Hooks (Extract Repeated Logic)
```tsx
// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const json: T = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// Usage in any component:
const { data: products, loading, error } = useFetch<Product[]>('/api/products');
```

#### 6.4 Export All Types from One File
```ts
// src/types/index.ts — single source of truth for all types
export interface User { id: number; name: string; email: string; }
export interface Product { id: number; title: string; price: number; }
export interface PricingPlan { id: number; name: string; price: number; }

// Import from anywhere:
import { User, Product } from '../types';
```

---

## 📋 Quick Reference Cheatsheets

### Tailwind Spacing Scale
```
1  = 4px    |  5  = 20px   |  10 = 40px   |  20 = 80px
2  = 8px    |  6  = 24px   |  12 = 48px   |  24 = 96px
3  = 12px   |  7  = 28px   |  14 = 56px   |  32 = 128px
4  = 16px   |  8  = 32px   |  16 = 64px   |  40 = 160px
```

### Tailwind Breakpoints
```
sm:   640px+    (small tablet)
md:   768px+    (tablet)
lg:   1024px+   (laptop)
xl:   1280px+   (desktop)
2xl:  1536px+   (large desktop)
```

### TypeScript Event Types for React
```tsx
onClick:    React.MouseEvent<HTMLButtonElement>
onChange:   React.ChangeEvent<HTMLInputElement>
onSubmit:   React.FormEvent<HTMLFormElement>
onKeyDown:  React.KeyboardEvent<HTMLInputElement>
onFocus:    React.FocusEvent<HTMLInputElement>
```

### Common Tailwind Classes Reference
```
Layout:     flex, grid, block, inline-flex, hidden
Flex:       flex-row, flex-col, items-center, justify-between, gap-4
Grid:       grid-cols-2, grid-cols-3, col-span-2
Spacing:    p-4, px-6, py-3, m-4, mt-6, mb-8, space-y-4
Sizing:     w-full, h-screen, max-w-xl, min-h-screen
Typography: text-sm, text-base, text-xl, font-bold, text-center
Colors:     text-gray-900, bg-white, text-indigo-500
Borders:    border, border-gray-200, rounded-xl, rounded-full
Shadows:    shadow-sm, shadow-md, shadow-lg, shadow-xl
Effects:    transition-all, duration-200, hover:bg-indigo-600, opacity-50
```

---

## 🗺 Recommended Learning Order (Week Plan)

### Day 1–2: Foundation
- [ ] Watch TypeScript Crash Course (Traversy Media, 1.5h)
- [ ] Set up your Vite + React + TypeScript + Tailwind project
- [ ] Open your Figma file in Dev Mode
- [ ] Extract and document all your design tokens

### Day 3–4: React Fundamentals
- [ ] Watch React Crash Course (Traversy Media, 2h)
- [ ] Build your first 3 components: Button, Card, Badge
- [ ] Match them to your Figma designs

### Day 5: Tailwind Deep Dive
- [ ] Watch Tailwind CSS v4 Crash Course (PedroTech, 1.5h)
- [ ] Configure tailwind.config.js with your Figma tokens
- [ ] Build your Navbar and Hero section

### Day 6: Integration
- [ ] Watch Figma to React (Colby Fayock, 1.3h)
- [ ] Build all remaining sections from your Figma file
- [ ] Add useState for interactive elements

### Day 7: Polish
- [ ] Test responsiveness (resize browser or use DevTools)
- [ ] Add hover effects and transitions
- [ ] Fix any TypeScript errors
- [ ] Do a final comparison against your Figma file

---

## 🔧 Useful Tools & Resources

| Tool | Purpose | Link |
|------|---------|-------|
| **Tailwind CSS Docs** | Official reference | https://tailwindcss.com/docs |
| **React Docs** | Official React reference | https://react.dev |
| **TypeScript Handbook** | Official TS reference | https://www.typescriptlang.org/docs/handbook/intro.html |
| **Tailwind Cheat Sheet** | Quick class lookup | https://nerdcave.com/tailwind-cheat-sheet |
| **Total TypeScript** | Interactive TS exercises | https://www.totaltypescript.com/tutorials/beginners-typescript |
| **Lucide Icons** | Icon library for React | https://lucide.dev |
| **Headless UI** | Unstyled accessible components | https://headlessui.com |
| **Heroicons** | SVG icons by Tailwind team | https://heroicons.com |
| **clsx** | Conditional class merging utility | npm install clsx |
| **Figma Inspect** | Figma Dev Mode | In Figma: Shift + D |

---

> **THE GOLDEN RULE:** Always code along. Open your editor next to every video. Pause and type the code yourself. Passive watching builds 10% of the skill; actively coding builds the other 90%.

> **STUCK?** The best resources for React/TypeScript/Tailwind questions:
> - https://stackoverflow.com
> - The React Discord: https://discord.gg/reactiflux
> - The official docs linked in the table above

---

## Phase 7: React Router — Multi-Page Navigation

> **NOTE:** Your Figma file likely has multiple pages (Home, About, Contact, etc.). React Router lets you navigate between them without reloading the page — just like clicking links in Figma prototypes.

### 🎬 React Router Videos to Watch

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **React Router in 100 Seconds** | Fireship | 2m | Concept overview | https://www.youtube.com/watch?v=Ul3y1LXxzdU |
| 2 | **Learn React Router V6 in 45 Minutes** | Web Dev Simplified | 45m | Best concise crash course | https://www.youtube.com/watch?v=Ul3y1LXxzdU |
| 3 | **React Router 6 – Tutorial for Beginners** | freeCodeCamp (Coding Addict) | 2h | Project-based, covers protected routes | https://www.youtube.com/watch?v=nDGA3km5He4 |
| 4 | **Learn React Routing v6.4 — 2024 Guide** | WolfDenCode | 1h | Modern `createBrowserRouter` approach | https://www.youtube.com/watch?v=oTIh7E5fk4g |

---

### 📚 React Router Core Concepts

#### 7.1 Installation & Basic Setup

```bash
npm install react-router-dom
```

```tsx
// src/main.tsx — wrap your app with the router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,          // shared layout (Navbar + Footer)
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },      // /
      { path: 'about', element: <AboutPage /> },   // /about
      { path: 'contact', element: <ContactPage /> },// /contact
    ],
  },
]);

// In your App.tsx or main.tsx:
<RouterProvider router={router} />
```

#### 7.2 The Layout Component (Shared Navbar + Footer)

```tsx
// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Outlet = where the current page's content gets rendered
const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />   {/* ← Each page renders here */}
    </main>
    <Footer />
  </div>
);

export default Layout;
```

#### 7.3 Navigation Links (Replace `<a>` tags from Figma)

```tsx
import { Link, NavLink, useNavigate } from 'react-router-dom';

// Method 1: Link — basic navigation
<Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>

// Method 2: NavLink — automatically adds active styling
const Navbar = () => (
  <nav className="flex gap-8">
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
          : "text-gray-600 hover:text-gray-900"
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/about"
      className={({ isActive }) =>
        isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
      }
    >
      About
    </NavLink>
  </nav>
);

// Method 3: useNavigate — programmatic navigation (after form submit, etc.)
const ContactForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... submit form
    navigate('/thank-you');   // redirect after success
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

#### 7.4 Dynamic Routes & URL Parameters

```tsx
// In your router config:
{ path: 'products/:id', element: <ProductDetailPage /> }

// In the component — read the URL param:
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return <h1>Product ID: {id}</h1>;
};

// Linking to dynamic routes:
<Link to={`/products/${product.id}`}>{product.name}</Link>
```

#### 7.5 404 Not Found Page

```tsx
// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-8xl font-bold text-indigo-500">404</h1>
    <h2 className="text-2xl font-bold text-gray-900 mt-4">Page not found</h2>
    <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
    <Link to="/" className="mt-8 bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition-all">
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;
```

---

## Phase 8: State Management — Sharing Data Across Components

> **NOTE:** When data needs to be shared between many components (like a shopping cart, logged-in user, or theme), you need a state management solution. Context API is built-in; Zustand is a lightweight library.

### 🎬 State Management Videos to Watch

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **React Context API Explained** | Web Dev Simplified | 20m | Learn Context first | https://www.youtube.com/watch?v=5LrDIWkK_Bc |
| 2 | **Context API vs Zustand** | Cosden Solutions | 18m | Understand when to use which | https://www.youtube.com/watch?v=_ngCLZ5Iz-0 |
| 3 | **Zustand Full Tutorial** | PedroTech | 40m | Best Zustand beginner tutorial | https://www.youtube.com/watch?v=KCr-UNsM3vA |
| 4 | **Zustand vs Redux vs Context** | Fireship | 10m | Quick comparison | https://www.youtube.com/watch?v=5-1LM2NySR0 |

---

### 📚 State Management Concepts

#### 8.1 When to Use What

```
useState      →  Local component state (a button toggle, form input)
Context API   →  Global state that rarely changes (theme, language, auth user)
Zustand       →  Global state that changes often (cart, UI state, notifications)
```

#### 8.2 Context API — Dark Mode / Theme Example

```tsx
// src/context/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the shape of the context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// 2. Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the Provider component (wraps your whole app)
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
    document.documentElement.classList.toggle('dark');  // for Tailwind dark mode
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Create a custom hook to use this context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
};
```

```tsx
// src/main.tsx — wrap your app
import { ThemeProvider } from './context/ThemeContext';

<ThemeProvider>
  <RouterProvider router={router} />
</ThemeProvider>

// In any component — use the context
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};
```

#### 8.3 Zustand — Shopping Cart Example

```bash
npm install zustand
```

```tsx
// src/store/cartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (newItem) => {
    const items = get().items;
    const existing = items.find(i => i.id === newItem.id);

    const updatedItems = existing
      ? items.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...items, { ...newItem, quantity: 1 }];

    set({
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    });
  },

  removeItem: (id) => {
    const updatedItems = get().items.filter(i => i.id !== id);
    set({
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    });
  },

  updateQuantity: (id, quantity) => {
    const updatedItems = get().items.map(i => i.id === id ? { ...i, quantity } : i);
    set({
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    });
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
```

```tsx
// Using the cart store in any component — NO Provider needed!
import { useCartStore } from '../store/cartStore';

// Add to cart button (on Product card)
const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore(state => state.addItem);  // only subscribes to addItem

  return (
    <div className="rounded-xl bg-white shadow-md p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="font-bold mt-3">{product.name}</h3>
      <p className="text-indigo-600 font-semibold">${product.price}</p>
      <button
        onClick={() => addItem({ ...product, quantity: 1 })}
        className="mt-3 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
};

// Cart icon in Navbar showing count
const CartIcon = () => {
  const totalItems = useCartStore(state => state.totalItems);  // only re-renders when this changes

  return (
    <div className="relative">
      <span>🛒</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};
```

---

## Phase 9: Forms with Validation — React Hook Form + Zod

> **NOTE:** Any Figma file with contact forms, login/signup pages, or checkout flows needs proper form handling. React Hook Form + Zod is the professional standard in 2025.

### 🎬 Forms Videos to Watch

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **React Hook Form Tutorial (with Zod)** | Cosden Solutions | 35m | Best complete tutorial | https://www.youtube.com/watch?v=cc_xmawJ8Kg |
| 2 | **React Hook Form in 30 Minutes** | Web Dev Simplified | 30m | Concise fundamentals | https://www.youtube.com/watch?v=R_Pj593TH_Q |
| 3 | **Zod Crash Course** | Jack Herrington | 25m | Master Zod schema validation | https://www.youtube.com/watch?v=L6BE-U3oy80 |
| 4 | **Full Form Validation in React + TypeScript** | ByteGrad | 45m | End-to-end typed form example | https://www.youtube.com/watch?v=u6PQ5xZAv7Q |

---

### 📚 Forms Core Concepts

#### 9.1 Installation

```bash
npm install react-hook-form zod @hookform/resolvers
```

#### 9.2 Complete Form Example (Contact Page from Figma)

```tsx
// src/pages/ContactPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// Step 1: Define validation schema with Zod
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.enum(['general', 'support', 'billing', 'other'], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Maximum 500 characters'),
  agreed: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

// Step 2: Infer TypeScript type from schema (no duplicate code!)
type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Step 3: Initialize the form
  const {
    register,           // connect inputs to form
    handleSubmit,       // wraps your submit handler with validation
    formState: { errors, isSubmitting },  // access errors and loading state
    reset,              // reset form to default values
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Step 4: Handle submission (only called if validation passes)
  const onSubmit = async (data: ContactFormData) => {
    console.log('Form data:', data);
    // await sendToAPI(data);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
          <p className="text-gray-500 mt-2">We'll get back to you within 24 hours.</p>
          <button onClick={() => setIsSubmitted(false)} className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600">
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
      <p className="text-gray-500 mt-2">Fill out the form and we'll be in touch.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">

        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              {...register('firstName')}
              placeholder="John"
              className={`w-full border rounded-xl px-4 py-2.5 outline-none transition-all
                ${errors.firstName
                  ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                  : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              {...register('lastName')}
              placeholder="Doe"
              className={`w-full border rounded-xl px-4 py-2.5 outline-none transition-all
                ${errors.lastName ? 'border-red-400' : 'border-gray-200 focus:border-indigo-400'}`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="john@example.com"
            className={`w-full border rounded-xl px-4 py-2.5 outline-none transition-all
              ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Subject Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
          <select
            {...register('subject')}
            className={`w-full border rounded-xl px-4 py-2.5 outline-none bg-white transition-all
              ${errors.subject ? 'border-red-400' : 'border-gray-200 focus:border-indigo-400'}`}
          >
            <option value="">Select a subject...</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="billing">Billing</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            {...register('message')}
            rows={5}
            placeholder="Tell us how we can help..."
            className={`w-full border rounded-xl px-4 py-2.5 outline-none resize-none transition-all
              ${errors.message ? 'border-red-400' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'}`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-3">
          <input {...register('agreed')} type="checkbox" id="agreed" className="mt-1 w-4 h-4 accent-indigo-500" />
          <label htmlFor="agreed" className="text-sm text-gray-600">
            I agree to the <a href="#" className="text-indigo-500 underline">Terms of Service</a> and <a href="#" className="text-indigo-500 underline">Privacy Policy</a>
          </label>
        </div>
        {errors.agreed && <p className="text-red-500 text-xs -mt-3">{errors.agreed.message}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

      </form>
    </section>
  );
};

export default ContactPage;
```

#### 9.3 Zod Validation Rules Quick Reference

```typescript
// String validations
z.string()
z.string().min(3)
z.string().max(100)
z.string().email()
z.string().url()
z.string().regex(/pattern/)
z.string().nonempty('Required')

// Number validations
z.number().min(0)
z.number().max(100)
z.number().int()
z.number().positive()

// Optional fields
z.string().optional()              // can be undefined
z.string().nullable()              // can be null
z.string().nullish()               // can be null OR undefined

// Enum (dropdown options)
z.enum(['option1', 'option2'])

// Boolean
z.boolean().refine(val => val === true, 'Must be checked')

// Object
z.object({ name: z.string(), age: z.number() })

// Array
z.array(z.string()).min(1, 'Select at least one')
```

---

## Phase 10: Animations — Bringing Your Figma Prototypes to Life

> **NOTE:** Figma prototypes show animations and transitions. Framer Motion is the easiest way to bring these interactions to life in React.

### 🎬 Animation Videos to Watch

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **Framer Motion in 15 Minutes** | Various | 15m | Fast intro to core concepts | https://www.youtube.com/watch?v=1vKiPwEYbyk |
| 2 | **Framer Motion (React) — The Basics** | PedroTech | 45m | Comprehensive beginner tutorial | https://www.youtube.com/watch?v=6P6v68xT9fI |
| 3 | **Framer Motion Layout Animations** | The Code Creative | 20m | Animate element repositioning | https://www.youtube.com/watch?v=83f0f7tUfI0 |
| 4 | **Scroll Animations in React** | Web Dev Simplified | 30m | Animate on scroll (very popular effect) | https://www.youtube.com/watch?v=T33NN_pPeNI |

---

### 📚 Animation Core Concepts

```bash
npm install framer-motion
```

#### 10.1 Basic Animations (`motion` component)

```tsx
import { motion } from 'framer-motion';

// Wrap any HTML element with motion. to animate it
// initial = starting state, animate = end state, transition = how it gets there

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Slide up from bottom (very common Figma prototype effect)
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  Hero Content
</motion.div>

// Scale in (popup/modal effect)
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
  Modal
</motion.div>
```

#### 10.2 Hover & Tap Gestures (Figma Hover States)

```tsx
// Interactive button with gestures
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: '#4f46e5' }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
  className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold"
>
  Get Started
</motion.button>

// Card hover effect
<motion.div
  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)' }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  className="bg-white rounded-2xl p-6 shadow-md cursor-pointer"
>
  Card Content
</motion.div>
```

#### 10.3 Stagger Children (List animations)

```tsx
// Animate a list of cards one after another
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 100ms delay between each child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeatureGrid = ({ features }: { features: Feature[] }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-3 gap-6"
  >
    {features.map((feature) => (
      <motion.div key={feature.id} variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm">
        <span className="text-3xl">{feature.icon}</span>
        <h3 className="font-bold mt-3">{feature.title}</h3>
        <p className="text-gray-500 mt-1 text-sm">{feature.description}</p>
      </motion.div>
    ))}
  </motion.div>
);
```

#### 10.4 Animate on Scroll (whileInView)

```tsx
// Elements animate when they scroll into view — very popular on landing pages
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}       // only animate once
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  <h2 className="text-3xl font-bold">This section animates on scroll</h2>
</motion.div>
```

#### 10.5 Page Transitions (Between Routes)

```tsx
// Wrap page content to animate when navigating between routes
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Use it in each page:
const HomePage = () => (
  <PageWrapper>
    <HeroSection />
    <FeaturesSection />
  </PageWrapper>
);
```

#### 10.6 Tailwind-Only Animations (No library needed for simple effects)

```tsx
// Pure CSS animations via Tailwind — great for performance

// Pulse (loading skeleton)
<div className="w-full h-6 bg-gray-200 rounded animate-pulse" />

// Spin (loading spinner)
<div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

// Bounce (call-to-action)
<div className="animate-bounce">⬇️ Scroll down</div>

// Custom fade-in via Tailwind config
// tailwind.config.js → theme.extend.animation:
animation: {
  'fade-in': 'fadeIn 0.5s ease-out',
  'slide-up': 'slideUp 0.6s ease-out',
},
keyframes: {
  fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
  slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
},
```

---

## Phase 11: Deployment — Go Live

> **NOTE:** Once you've built your project from the Figma file, you need to deploy it so the world can see it. Vercel and Netlify are the easiest options and are FREE for personal projects.

### 🎬 Deployment Videos to Watch

| # | Video | Channel | Duration | Why Watch | Link |
|---|-------|---------|----------|-----------|------|
| 1 | **Deploy React App to Vercel in 5 Minutes** | Traversy Media | 8m | Fastest deployment method | https://www.youtube.com/watch?v=ySus5ZS0b94 |
| 2 | **Deploy React Vite to Netlify** | freeCodeCamp | 12m | Netlify alternative | https://www.youtube.com/watch?v=4h8B080Mv4U |
| 3 | **CI/CD with GitHub Actions + Vercel** | Fireship | 15m | Professional auto-deploy setup | https://www.youtube.com/watch?v=scEDHsr3APg |

---

### 📚 Deployment Steps

#### Method A: Vercel (Recommended — 5 Minutes)

```bash
# Step 1: Push your code to GitHub first
git init
git add .
git commit -m "Initial commit"
git push origin main

# OR deploy directly from terminal:
npm install -g vercel
vercel

# Step 2: Go to vercel.com → Sign in with GitHub
# Step 3: Click "Add New Project" → Import your repo
# Step 4: Vercel auto-detects Vite — click "Deploy"
# Step 5: Your site is live at yourproject.vercel.app 🎉

# Every git push automatically re-deploys
```

#### Method B: Netlify (Drag & Drop — Easiest)

```bash
# Step 1: Build your project
npm run build
# This creates a /dist folder

# Step 2: Go to netlify.com → "Add new site" → "Deploy manually"
# Step 3: Drag the /dist folder into the browser
# Step 4: Live in seconds at random-name.netlify.app 🎉
```

#### Method C: Netlify via GitHub (Best for ongoing projects)

```bash
# 1. Push to GitHub
# 2. netlify.com → "Add new site" → "Import from GitHub"
# 3. Configure:
#    Build command: npm run build
#    Publish directory: dist
# 4. Deploy — auto-deploys on every push
```

#### 11.1 Environment Variables (API Keys)

```bash
# NEVER put API keys in your code
# Store them in .env files

# Create .env file in project root:
VITE_API_KEY=your_secret_key_here
VITE_API_URL=https://api.example.com

# Access in code:
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

# Add .env to .gitignore (NEVER commit this!)
# In Vercel/Netlify: add env vars in their dashboard Settings → Environment Variables
```

#### 11.2 Pre-Deployment Checklist

```
Before deploying, check these off:

✅ Build succeeds without errors:   npm run build
✅ No TypeScript errors:            npx tsc --noEmit
✅ Test on mobile viewport (Chrome DevTools → responsive mode)
✅ Test all pages/routes work
✅ Check all images load correctly
✅ Verify forms work (test submissions)
✅ Check all links (no broken links)
✅ Add a favicon (public/favicon.ico)
✅ Update <title> tags for each page (SEO)
✅ Add meta description tags (SEO)
✅ Remove all console.log() statements
✅ API keys are in .env (not hardcoded!)
✅ .env is in .gitignore
```

#### 11.3 Custom Domain (Optional)

```
On Vercel or Netlify:
1. Go to your project → Settings → Domains
2. Add your domain (e.g., myproject.com)
3. Update DNS records at your domain registrar:
   - Add a CNAME record pointing to cname.vercel-dns.com
   - Or follow the exact instructions provided
4. SSL certificate is added automatically (HTTPS for free!)
```

---

## 🏁 Final Review: Figma File to Live Website Checklist

Use this as your complete checklist when working on any Figma-to-code project:

### Phase 0: Setup
- [ ] Node.js installed
- [ ] VS Code + extensions installed
- [ ] Vite + React + TypeScript project created
- [ ] Tailwind CSS configured

### Phase 1: Figma Analysis
- [ ] Dev Mode enabled (Shift+D)
- [ ] All colors extracted and documented
- [ ] All fonts extracted and documented
- [ ] All spacing values noted
- [ ] All components listed
- [ ] Component hierarchy planned
- [ ] Design tokens added to tailwind.config.js

### Phase 2–4: Core Learning
- [ ] TypeScript basics understood (types, interfaces, generics)
- [ ] React fundamentals solid (components, props, state, effects)
- [ ] Tailwind CSS utility classes comfortable

### Phase 5–6: Building
- [ ] Base components built (Button, Card, Input, Badge)
- [ ] Layout components built (Navbar, Footer)
- [ ] Page sections built (Hero, Features, CTA, etc.)
- [ ] Pages assembled and routes configured
- [ ] All TypeScript types defined

### Phase 7–10: Enhancement
- [ ] React Router set up for all pages
- [ ] State management added where needed
- [ ] Forms built with validation
- [ ] Animations added to match Figma prototypes

### Phase 11: Deployment
- [ ] Code pushed to GitHub
- [ ] Build succeeds without errors
- [ ] Pre-deployment checklist completed
- [ ] Deployed to Vercel or Netlify
- [ ] Custom domain configured (if applicable)

---

## 📚 Full Video Watch List (All Phases)

A complete list of every video in this guide, in order:

| Phase | Video | Channel | Duration | Link |
|-------|-------|---------|----------|------|
| 0 | JavaScript ES6+ Crash Course | Traversy Media | 1h 40m | https://www.youtube.com/watch?v=NCwa_xi0Uuc |
| 0 | Async JavaScript | Web Dev Simplified | 24m | https://www.youtube.com/watch?v=V_Kr9OSfDeU |
| 1 | Figma for Developers — Full Crash Course | Kodaps Academy | 1h 15m | https://www.youtube.com/watch?v=B242nuM3y2s |
| 1 | Figma Dev Mode — The Complete Guide | DesignCourse | 28m | https://www.youtube.com/watch?v=SEevRGREbzc |
| 1 | How Developers Should Read Figma Files | Fireship | 11m | https://www.youtube.com/watch?v=Gu1so3pz4bA |
| 2 | TypeScript Crash Course | Traversy Media | 1h 30m | https://www.youtube.com/watch?v=BCg9d-oigyc |
| 2 | TypeScript Full Course for Beginners | Dave Gray | 8h | https://www.youtube.com/watch?v=mwF112JzFfI |
| 2 | TypeScript in 100 Seconds | Fireship | 2m | https://www.youtube.com/watch?v=zQnBQ4tB3ZA |
| 3 | React in 100 Seconds | Fireship | 2m | https://www.youtube.com/watch?v=Tn6-PIqc4UM |
| 3 | React Crash Course 2024 | Traversy Media | 2h | https://www.youtube.com/watch?v=LDB4uaJ87e0 |
| 3 | React Hooks Explained | Web Dev Simplified | 40m | https://www.youtube.com/watch?v=O6P86uwfdR0 |
| 3 | React + TypeScript Full Course | Dave Gray | 5h | https://www.youtube.com/watch?v=MbsfalanV7U |
| 4 | Tailwind CSS in 100 Seconds | Fireship | 2m | https://www.youtube.com/watch?v=mr15Xzb1Ook |
| 4 | Tailwind CSS v4 Crash Course 2025 | PedroTech | 1h 30m | https://www.youtube.com/watch?v=DenUCuq4G94 |
| 4 | Build a Responsive Website with Tailwind | Kevin Powell | 2h | https://www.youtube.com/watch?v=ft30zcMlFao |
| 5 | Figma to React — Full Build | Colby Fayock | 1h 20m | https://www.youtube.com/watch?v=PdVVjXI7XLw |
| 5 | React + TypeScript + Tailwind Dashboard | PedroTech | 2h | https://www.youtube.com/watch?v=jLD_OvWgMiw |
| 7 | Learn React Router V6 in 45 Minutes | Web Dev Simplified | 45m | https://www.youtube.com/watch?v=Ul3y1LXxzdU |
| 7 | React Router 6 Tutorial for Beginners | freeCodeCamp | 2h | https://www.youtube.com/watch?v=nDGA3km5He4 |
| 8 | React Context API Explained | Web Dev Simplified | 20m | https://www.youtube.com/watch?v=5LrDIWkK_Bc |
| 8 | Zustand Full Tutorial | PedroTech | 40m | https://www.youtube.com/watch?v=KCr-UNsM3vA |
| 9 | React Hook Form Tutorial (with Zod) | Cosden Solutions | 35m | https://www.youtube.com/watch?v=cc_xmawJ8Kg |
| 9 | Zod Crash Course | Jack Herrington | 25m | https://www.youtube.com/watch?v=L6BE-U3oy80 |
| 10 | Framer Motion (React) — The Basics | PedroTech | 45m | https://www.youtube.com/watch?v=6P6v68xT9fI |
| 10 | Scroll Animations in React | Web Dev Simplified | 30m | https://www.youtube.com/watch?v=T33NN_pPeNI |
| 11 | Deploy React App to Vercel | Traversy Media | 8m | https://www.youtube.com/watch?v=ySus5ZS0b94 |

**Total estimated watch time: ~35–40 hours of curated video content**
**Total practice time: ~20–30 hours of coding**
**Estimated to complete the full guide: 2–4 weeks**

---

> **REMEMBER:** The goal isn't to watch every video. Pick the ones for the topic you're currently working on, code along, then immediately apply it to YOUR Figma project. That's the fastest path to real skill.

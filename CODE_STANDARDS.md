# UniNotes - Code Standards & Best Practices

> Panduan coding standards untuk maintain code quality dan consistency

## 📐 Code Organization

### **Folder Structure Rules**

```
src/app/
├── components/          # ✅ React components only
├── services/            # ✅ API calls & business logic
├── data/                # ✅ Static data
├── types/               # ✅ TypeScript interfaces
├── constants/           # ✅ Constants & config
├── utils/               # ✅ Helper functions
└── config/              # ✅ App configuration
```

**Rules:**
- ❌ **Jangan** import localStorage langsung di components
- ✅ **Gunakan** service layer untuk semua data operations
- ❌ **Jangan** hardcode strings, use constants
- ✅ **Gunakan** TypeScript types untuk semua data

---

## 🎨 Component Standards

### **1. Component Structure**

```typescript
/**
 * ComponentName - Brief description
 * 
 * Detailed description of what this component does.
 * 
 * @example
 * <ComponentName prop1="value" prop2={value} />
 */

// 1️⃣ IMPORTS
// Group: React, External libraries, Internal imports
import { useState, useEffect } from 'react';
import { Upload, FileText } from 'lucide-react';
import { createNote } from '../services/notesService';
import { formatFileSize } from '../utils/formatting';
import type { UserNote } from '../types';

// 2️⃣ INTERFACES/TYPES
interface ComponentProps {
  prop1: string;
  prop2: number;
  onAction?: () => void;
}

// 3️⃣ COMPONENT
export default function ComponentName({ prop1, prop2, onAction }: ComponentProps) {
  // 3.1 State & Hooks
  const [data, setData] = useState<UserNote[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 3.2 Effects
  useEffect(() => {
    loadData();
  }, []);
  
  // 3.3 Handlers
  const loadData = async () => {
    setLoading(true);
    const result = await getAllNotes();
    setData(result);
    setLoading(false);
  };
  
  const handleClick = () => {
    // Handler logic
    onAction?.();
  };
  
  // 3.4 Render helpers (if needed)
  const renderItem = (item: UserNote) => {
    return <div key={item.id}>{item.title}</div>;
  };
  
  // 3.5 Early returns
  if (loading) return <LoadingSpinner />;
  if (!data.length) return <EmptyState />;
  
  // 3.6 Main render
  return (
    <div className="container">
      {data.map(renderItem)}
    </div>
  );
}
```

### **2. Component Naming**

```typescript
// ✅ GOOD - PascalCase for components
export default function UserDashboard() { }
export function NoteCard() { }

// ❌ BAD
export default function userDashboard() { }
export function note_card() { }
```

### **3. Props Naming**

```typescript
// ✅ GOOD - Clear, descriptive names
interface Props {
  userName: string;
  onNoteCreate: (note: UserNote) => void;
  isLoading: boolean;
}

// ❌ BAD - Vague, abbreviated
interface Props {
  name: string;        // Ambiguous
  onCreate: () => void; // What is being created?
  loading: boolean;    // Missing 'is' prefix for boolean
}
```

---

## 🔧 Service Layer Standards

### **1. Service Function Structure**

```typescript
/**
 * Get all notes from database
 * 
 * @returns Array of all notes
 * @throws Error if database query fails
 * 
 * 🔄 SUPABASE INTEGRATION:
 * const { data, error } = await supabase
 *   .from('notes')
 *   .select('*, users(name, email)')
 *   .order('created_at', { ascending: false })
 */
export const getAllNotes = (): UserNote[] => {
  const notes = localStorage.getItem(STORAGE_KEYS.POSTS);
  return notes ? JSON.parse(notes) : [];
};
```

**Rules:**
- ✅ Always add JSDoc comments
- ✅ Add `🔄 SUPABASE INTEGRATION` comment with example
- ✅ Return typed values
- ✅ Handle errors gracefully

### **2. Naming Conventions**

```typescript
// ✅ GOOD - Action verbs + noun
export const getNoteById = (id: string) => { };
export const createNote = (note: UserNote) => { };
export const updateNote = (id: string, data: Partial<UserNote>) => { };
export const deleteNote = (id: string) => { };
export const getAllNotes = () => { };

// ❌ BAD
export const note = (id: string) => { };        // Unclear action
export const notes = () => { };                 // Is this getting or setting?
export const noteUpdate = () => { };            // Inconsistent pattern
```

### **3. Return Types**

```typescript
// ✅ GOOD - Consistent return types
interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const createNote = (note: UserNote): ServiceResponse<UserNote> => {
  // Implementation
  return {
    success: true,
    message: 'Note created successfully',
    data: createdNote
  };
};

// ❌ BAD - Inconsistent returns
export const createNote = (note: UserNote) => {
  if (error) return false;           // Boolean
  if (exists) return 'Already exists'; // String
  return note;                        // Object
};
```

---

## 📝 TypeScript Standards

### **1. Always Use Types**

```typescript
// ✅ GOOD
interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

const user: User = {
  name: 'John',
  email: 'john@example.com',
  role: 'user'
};

// ❌ BAD
const user: any = {
  name: 'John',
  email: 'john@example.com',
  role: 'user'
};
```

### **2. Type Imports**

```typescript
// ✅ GOOD - Use type imports
import type { User, UserNote } from '../types';

// ❌ BAD
import { User, UserNote } from '../types';
```

### **3. Optional Chaining**

```typescript
// ✅ GOOD
const userName = user?.name ?? 'Unknown';
onAction?.();

// ❌ BAD
const userName = user && user.name ? user.name : 'Unknown';
if (onAction) onAction();
```

---

## 🎯 State Management

### **1. useState Naming**

```typescript
// ✅ GOOD - Descriptive names
const [notes, setNotes] = useState<UserNote[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

// ❌ BAD - Vague names
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

### **2. Complex State**

```typescript
// ✅ GOOD - Separate concerns
const [filters, setFilters] = useState<DashboardFilters>({
  searchQuery: '',
  selectedFaculty: '',
  selectedProdi: '',
  selectedSemester: '',
  selectedType: 'ALL',
});

// Update specific field
setFilters(prev => ({ ...prev, searchQuery: value }));

// ❌ BAD - Too many individual states
const [searchQuery, setSearchQuery] = useState('');
const [selectedFaculty, setSelectedFaculty] = useState('');
const [selectedProdi, setSelectedProdi] = useState('');
const [selectedSemester, setSelectedSemester] = useState('');
const [selectedType, setSelectedType] = useState('ALL');
```

---

## 🔍 Error Handling

### **1. Service Layer**

```typescript
// ✅ GOOD - Return error info
export const createNote = async (note: UserNote): Promise<ServiceResponse<UserNote>> => {
  try {
    // Implementation
    return {
      success: true,
      message: 'Note created successfully',
      data: createdNote
    };
  } catch (error) {
    console.error('Error creating note:', error);
    return {
      success: false,
      message: error.message || 'Failed to create note'
    };
  }
};

// ❌ BAD - Throw errors without handling
export const createNote = async (note: UserNote) => {
  // May throw unhandled error
  const result = await supabase.from('notes').insert(note);
  return result;
};
```

### **2. Component Layer**

```typescript
// ✅ GOOD - Handle errors gracefully
const handleSubmit = async () => {
  setLoading(true);
  setError('');
  
  const result = await createNote(note);
  
  if (result.success) {
    showNotification('Success!', 'success');
  } else {
    setError(result.message);
    showNotification(result.message, 'error');
  }
  
  setLoading(false);
};

// ❌ BAD - No error handling
const handleSubmit = async () => {
  const result = await createNote(note);
  showNotification('Success!', 'success');
};
```

---

## 🎨 Tailwind CSS Standards

### **1. Class Organization**

```tsx
// ✅ GOOD - Organized by category
<div className="
  flex items-center justify-between     // Layout
  px-4 py-3                              // Spacing
  bg-white border-2 border-black         // Style
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] // Effects
  hover:shadow-none                       // Interactions
  transition-all                          // Animations
">
  Content
</div>

// ❌ BAD - Random order
<div className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex border-black bg-white px-4 hover:shadow-none border-2 items-center">
  Content
</div>
```

### **2. Avoid Font Classes (IMPORTANT)**

```tsx
// ✅ GOOD - Use theme defaults
<h1 className="text-black mb-4">Title</h1>

// ❌ BAD - Override theme
<h1 className="text-4xl font-black leading-tight">Title</h1>
```

**Reason**: `/src/styles/theme.css` sudah define typography defaults untuk setiap HTML element.

### **3. Reusable Classes**

```typescript
// ✅ GOOD - Extract common patterns
const buttonBaseClasses = "px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase";

const buttonPrimaryClasses = `${buttonBaseClasses} bg-[#34A853] text-white`;
const buttonDangerClasses = `${buttonBaseClasses} bg-[#EA4335] text-white`;

// Use in JSX
<button className={buttonPrimaryClasses}>Submit</button>
<button className={buttonDangerClasses}>Delete</button>
```

---

## 🧪 Testing Checklist

### **Before Commit**

- [ ] TypeScript errors: `npm run type-check`
- [ ] Code compiles: `npm run build`
- [ ] No console errors in browser
- [ ] All features tested manually
- [ ] Code follows standards above

### **Feature Testing**

- [ ] Happy path works
- [ ] Error cases handled
- [ ] Loading states shown
- [ ] Empty states shown
- [ ] Edge cases covered

---

## 📚 Documentation Standards

### **1. File Headers**

```typescript
/**
 * UniNotes - [Module Name]
 * 
 * Brief description of what this file does.
 * 
 * Additional context if needed.
 * 
 * @example
 * import { functionName } from './fileName';
 * const result = functionName(params);
 */
```

### **2. Function Documentation**

```typescript
/**
 * Brief one-line description
 * 
 * Detailed description if needed.
 * Explain complex logic, edge cases, etc.
 * 
 * @param param1 - Description of param1
 * @param param2 - Description of param2
 * @returns Description of return value
 * @throws Error description if applicable
 * 
 * @example
 * const result = functionName('value1', 123);
 * 
 * 🔄 SUPABASE INTEGRATION:
 * Code example for Supabase replacement
 */
export const functionName = (param1: string, param2: number): ReturnType => {
  // Implementation
};
```

### **3. Inline Comments**

```typescript
// ✅ GOOD - Explain WHY, not WHAT
// Normalize prodi name for backward compatibility with localStorage data
const normalizedProdi = normalizeProdiName(prodi);

// ❌ BAD - States the obvious
// Set the normalized prodi
const normalizedProdi = normalizeProdiName(prodi);
```

---

## ✅ Code Review Checklist

### **Before Creating PR**

- [ ] Code follows standards above
- [ ] All functions have JSDoc comments
- [ ] TypeScript types used (no `any`)
- [ ] Service layer used (no direct localStorage in components)
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Empty states handled
- [ ] Constants used for strings
- [ ] Supabase integration comments added
- [ ] No console.logs (except debug)
- [ ] Meaningful variable names
- [ ] DRY principle followed

### **Code Quality**

- [ ] Functions < 50 lines
- [ ] Components < 300 lines
- [ ] No nested ternaries
- [ ] No deep nesting (max 3 levels)
- [ ] Consistent naming conventions

---

## 🚫 Common Anti-Patterns to Avoid

```typescript
// ❌ Direct localStorage in components
const notes = JSON.parse(localStorage.getItem('notes'));

// ❌ Using 'any' type
const data: any = fetchData();

// ❌ Not handling loading states
const handleSubmit = async () => {
  await saveData();
  // No loading feedback!
};

// ❌ Hardcoded strings
if (user.role === 'admin') { }

// ❌ No error handling
await createNote(note); // What if it fails?

// ❌ Unclear variable names
const x = getAllNotes();
const temp = x.filter(y => y.id === id);
```

---

## 📖 Further Reading

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

---

**Keep the code clean! 🧹✨**

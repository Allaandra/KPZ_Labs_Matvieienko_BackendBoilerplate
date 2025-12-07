# BackendBoilerplate (Lab 4, 5, 6)

Конструювання Програмного Забезпечення (КПЗ)

Студентка: Матвєєнко Олександра  
Група: ІПЗ-3.03

---

Проєкт реалізує серверну частину системи управління дитячим садком на базі Express, TypeORM та PostgreSQL. Забезпечує повноцінне REST API для роботи з основними сутностями — дитячими групами та дітьми. Реалізовано повний набір CRUD-операцій, використання міграцій, контейнеризація через Docker, а також тестування API через Postman

Архітектура побудована за принципом розділення відповідальності:

- Controller → Service → Repository  
  Контролери відповідають за оркестрацію запитів, сервісний шар містить бізнес-логіку, а репозиторії забезпечують доступ до бази даних
- Middleware  
  Використовується для валідації даних, обробки помилок та перевірки коректності запитів ще до їх потрапляння в бізнес-логіку
- DTO (Data Transfer Object)  
  Відповіді API формуються через DTO, що забезпечує контрольований, безпечний та передбачуваний формат даних, приховуючи внутрішню структуру бази

Загалом проєкт демонструє правильно організовану бекенд-архітектуру з чітким поділом обов’язків, структурованою логікою та якісною обробкою помилок

---

# Посилання:

[Частина 1 - Лабораторно-практична №5](https://github.com/Allaandra/KPZ_Labs_Matvieienko_BackendBoilerplate?tab=readme-ov-file#%D0%BB%D0%B0%D0%B1%D0%BE%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%BD%D0%BE-%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%BD%D0%B0-%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B0-5)  
[Частина 2 - Лабораторно-практична №6](https://github.com/Allaandra/KPZ_Labs_Matvieienko_BackendBoilerplate?tab=readme-ov-file#%D0%BB%D0%B0%D0%B1%D0%BE%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%BD%D0%BE-%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%BD%D0%B0-%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B0-6)  
[Висновок](https://github.com/Allaandra/KPZ_Labs_Matvieienko_BackendBoilerplate?tab=readme-ov-file#%D0%B2%D0%B8%D1%81%D0%BD%D0%BE%D0%B2%D0%BE%D0%BA)

---

# Лабораторно-практична робота №5

**Тема:** Розширення бекенд-додатку власними сутностями та реалізація REST API

---

## 📌 Реалізовані сутності та їхні зв’язки

### 🧒 Сутність **Child** (Дитина)

Поля:

- `id`: number
- `firstName`: string
- `lastName`: string
- `patronymic`: string (необов’язково)
- `birthdayDate`: date
- `group`: зв’язана сутність `KindergartenGroup`

**Зв’язок:**  
`Many-to-One` — кожна дитина належить до однієї групи.

---

### 🧩 Сутність **KindergartenGroup** (Група)

Поля:

- `id`: number
- `name`: string
- `childCount`: number
- `children`: список дітей у групі

**Зв’язок:**  
`One-to-Many` — одна група містить багато дітей.

---

## 🔗 JOIN (пов’язані дані)

API повертає повні об’єкти сутностей.  
Наприклад, GET `/children/:id` повертає:

```json
{
  "id": 3,
  "firstName": "Олена",
  "lastName": "Кравченко",
  "patronymic": "Іванівна",
  "birthdayDate": "2018-03-15",
  "group": {
    "id": 38,
    "name": "Group C",
    "childCount": 1
  }
}
```

---

## 🌐 Postman Environment Variables

У проєкті використовується Postman Environment з такими змінними:

| Variable     | Value                            |
| ------------ | -------------------------------- |
| **host**     | `http://localhost:4000/v1`       |
| **baseUrl**  | `{{host}}`                       |
| **language** | `en`                             |
| **token**    | _Bearer JWT-token (авторизація)_ |

Це дозволяє використовувати короткий і зручний запис ендпоінтів у колекції  
**Наприклад:**

```bash
{{baseUrl}}/groups
{{baseUrl}}/children
```

---

## 📚 REST API Ендпоінти

### 📁 groups

🟧 POST /  
Створення нової групи  
`POST {{baseUrl}}/groups`

🟦 GET /  
Отримання списку всіх груп  
`GET {{baseUrl}}/groups`

🟩 GET /:id  
Отримання конкретної групи за ID  
`GET {{baseUrl}}/groups/:id`

🟪 PUT /:id  
Оновлення даних групи  
`PUT {{baseUrl}}/groups/:id`

🟥 DEL /:id  
Видалення групи  
`DELETE {{baseUrl}}/groups/:id`

---

### 📁 children

🟧 POST /  
Створення дитини  
`POST {{baseUrl}}/children`

🟦 GET /  
Отримання списку всіх дітей (з групами — JOIN)  
`GET {{baseUrl}}/children`

🟩 GET /:id  
Отримання інформації про дитину за ID  
`GET {{baseUrl}}/children/:id`

🟪 PUT /:id  
Оновлення даних дитини  
`PUT {{baseUrl}}/children/:id`

🟥 DEL /:id  
Видалення дитини  
`DELETE {{baseUrl}}/children/:id`

---

# Лабораторно-практична робота №6

**Тема:** Впровадження сервісного шару, валідації та DTO

---

## 🏗 Архітектура проєкту

У лабораторній роботі №6 виконано рефакторинг: логіка розділена між кількома незалежними шарами

### 🔹 Middleware — валідація вхідних даних

Мета: перевірити дані до того, як запит потрапить у контролер

Middleware не містить бізнес-логіки — тільки:

- перевірка типів
- перевірка формату JSON
- перевірка обов’язкових полів
- повернення помилки 400 при некоректних даних

> Тут перехоплюються всі неправильні дані, щоб не падали controller/service

#### 🧩 Приклад Middleware (валідація дитини)

```typescript
import { Request, Response, NextFunction } from 'express';

export async function validateUpdateChild(req: Request, res: Response, next: NextFunction) {
  const { groupId, firstName, lastName, patronymic, birthdayDate } = req.body;

  if (groupId !== undefined && isNaN(Number(groupId))) {
    return res.status(400).json({ error: 'groupId must be a number' });
  }

  if (firstName !== undefined && typeof firstName !== 'string') {
    return res.status(400).json({ error: 'firstName must be a string' });
  }

  if (patronymic !== undefined && typeof patronymic !== 'string') {
    return res.status(400).json({ error: 'patronymic must be a string' });
  }

  if (birthdayDate !== undefined && isNaN(Date.parse(birthdayDate))) {
    return res.status(400).json({ error: 'birthdayDate must be a valid date' });
  }

  return next();
}
```

---

### 🔹 Controller — оркестрація процесу

Контролер:

- отримує вже валідовані дані
- викликає відповідний метод сервісу
- перетворює результат у DTO
- повертає відповідь клієнту

> Контролер не містить бізнес-логіки

#### 📦 Приклад Controller

```typescript
import { Request, Response } from 'express';

import { ChildResponseDTO } from '../dto/ChildResponseDTO';
import { ChildService } from '../services/ChildService';

export class ChildController {
  static async findAll(_req: Request, res: Response) {
    const service = new ChildService();
    const children = await service.findAll();
    return res.json(children.map((c) => new ChildResponseDTO(c)));
  }

  static async findOne(req: Request, res: Response) {
    const service = new ChildService();
    const child = await service.findOne(Number(req.params.id));
    return res.json(new ChildResponseDTO(child));
  }

  static async create(req: Request, res: Response) {
    const service = new ChildService();
    const child = await service.create(req.body);
    return res.status(201).json(new ChildResponseDTO(child));
  }

  static async update(req: Request, res: Response) {
    const service = new ChildService();
    const child = await service.update(Number(req.params.id), req.body);
    return res.status(201).json(new ChildResponseDTO(child));
  }

  static async delete(req: Request, res: Response) {
    const service = new ChildService();
    const result = await service.delete(Number(req.params.id));
    return res.json(result);
  }
}
```

#### 📦 Приклад ResponseDTO

```typescript
import { Child } from '../orm/entities/users/Child';

export class ChildResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthdayDate: Date;
  group: {
    id: number;
    name: string;
  };

  constructor(child: Child) {
    this.id = child.id;
    this.firstName = child.firstName;
    this.lastName = child.lastName;
    this.patronymic = child.patronymic;
    this.birthdayDate = child.birthdayDate;

    this.group = {
      id: child.group.id,
      name: child.group.name,
    };
  }
}
```

---

### 🔹 Service — бізнес-логіка

У сервісах:

- робота з репозиторіями TypeORM
- перевірка існування сутностей
- зміна даних
- логіка оновлення лічильників (childCount)
- помилки виду "Group not found" і т.д.

> Сервіс — це серце програми

⚙️ Приклад Service-класу

```typescript
import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../orm/entities/users/KindergartenGroup';

export class GroupService {
  private repo = getConnection().getRepository(KindergartenGroup);

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['children'] });
  }

  async create(data: { name: string }) {
    const group = this.repo.create({
      name: data.name,
      childCount: 0,
    });

    return await this.repo.save(group);
  }

  async update(id: number, data: { name: string }) {
    const group = await this.findOne(id);

    group.name = data.name;

    return await this.repo.save(group);
  }

  async delete(id: number) {
    const group = await this.findOne(id);
    await this.repo.remove(group);
  }
}
```

---

### 🔹 Repository — доступ до бази даних

TypeORM репозиторії відповідають за:

- пошук даних
- створення та збереження сутностей
- завантаження звʼязків `(relations: ['children'])`

> Контролери і middleware не мають напряму працювати з БД

# Висновок

У ході виконання лабораторних робіт №5 та №6 було створено та вдосконалено серверну частину застосунку для управління даними дитячого садка. Робота охопила повний цикл побудови бекенд-додатку: від проєктування сутностей до впровадження архітектурних патернів і валідації

## ЛР №5 — Основи CRUD та REST API

- Інтегровано схему БД у вигляді ORM-сутностей
- Реалізовано зв'язки між таблицями (One-to-Many, Many-to-One)
- Створено повний набір CRUD-ендпоінтів для груп та дітей
- Забезпечено повернення пов'язаних даних через механізми ORM (JOIN)
- Організовано тестування API через Postman

## ЛР №6 — Архітектура та якість кода

- Впроваджено сервісний шар для інкапсуляції бізнес-логіки
- Реалізовано middleware для валідації вхідних даних
- Додано DTO для контрольованого формату відповідей
- Реорганізовано обробку помилок для безпеки API

## Результати

Проєкт отримав:

- Чітку модульну архітектуру
- Підвищену надійність завдяки централізованій валідації
- Чисті контролери, що виконують лише роль координаторів
- Передбачуваний формат API-відповідей через DTO
- Стабільну роботу всіх операцій зі складеними зв'язками

Отримані навички наближають проєкт до стандартів промислової розробки та забезпечують легку масштабованість та підтримку кода
